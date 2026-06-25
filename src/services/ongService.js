import { ongs as mockOngs } from "../data/mockData";
import { createId, readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabase, withSupabaseTimeout } from "./supabaseClient";

const MOCK_ONGS_SEED_VERSION = "2026-06-07-moderated-ong-profiles";

export const ONG_APPROVAL_STATUS = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
  blocked: "blocked",
};

const normalizeOng = (ong) => {
  const fallback = mockOngs.find((item) => item.id === ong.id) || {};
  const approvalStatus =
    ong.approvalStatus ||
    ong.approval_status ||
    fallback.approvalStatus ||
    ONG_APPROVAL_STATUS.approved;

  return {
    id: ong.id,
    name: ong.name || ong.nome || fallback.name || "ONG Parceira",
    email: ong.email || fallback.email || "contato@ong.org",
    whatsapp: ong.whatsapp || ong.phone || fallback.whatsapp || "(71) 99999-0000",
    city: ong.city || fallback.city || "Salvador",
    neighborhood: ong.neighborhood || ong.bairro || fallback.neighborhood || "Centro",
    address: ong.address || ong.endereco || fallback.address || "",
    latitude: ong.latitude || ong.lat || fallback.latitude || null,
    longitude: ong.longitude || ong.lng || fallback.longitude || null,
    serviceArea: ong.serviceArea || ong.service_area || fallback.serviceArea || "",
    responsible: ong.responsible || ong.responsavel || fallback.responsible || "",
    foundedAt: ong.foundedAt || ong.founded_at || fallback.foundedAt || "",
    instagram: ong.instagram || fallback.instagram || "",
    approvalStatus,
    verified: Boolean(ong.verified ?? ong.is_verified ?? fallback.verified ?? approvalStatus === ONG_APPROVAL_STATUS.approved),
    moderationNote: ong.moderationNote || ong.moderation_note || "",
    description: ong.description || fallback.description || "",
    owner_user_id: ong.owner_user_id || null,
    image: ong.image || ong.image_url || ong.logo || fallback.image || "",
    petsCount: ong.petsCount || fallback.petsCount || 0,
    adoptionsCount: ong.adoptionsCount || fallback.adoptionsCount || 0,
    createdAt: ong.createdAt || ong.created_at || fallback.createdAt || new Date().toISOString(),
  };
};

const isMissingColumnError = (error, column) =>
  /schema cache|could not find|not find|column/i.test(error?.message || "") &&
  new RegExp(column, "i").test(error.message);

export function seedOngs() {
  const current = readStorage(STORAGE_KEYS.ongs, null);
  const currentSeedVersion = readStorage(STORAGE_KEYS.ongsSeedVersion, "");
  const normalizedMocks = mockOngs.map(normalizeOng);

  if (current?.length >= mockOngs.length && currentSeedVersion === MOCK_ONGS_SEED_VERSION) {
    return current;
  }

  const mockIds = new Set(normalizedMocks.map((ong) => ong.id));
  const customOngs = Array.isArray(current) ? current.filter((ong) => !mockIds.has(ong.id)) : [];
  const nextOngs = [...normalizedMocks, ...customOngs.map(normalizeOng)];

  writeStorage(STORAGE_KEYS.ongsSeedVersion, MOCK_ONGS_SEED_VERSION);
  return writeStorage(STORAGE_KEYS.ongs, nextOngs);
}

export async function listOngs(options = {}) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await withSupabaseTimeout(
        supabase
          .from("ongs")
          .select("*")
          .order("created_at", { ascending: false }),
      );
      if (error) throw new Error(error.message);
      const normalized = (data || []).map(normalizeOng);
      const visible = options.includeInactive
        ? normalized
        : normalized.filter((ong) => ong.approvalStatus === ONG_APPROVAL_STATUS.approved);
      return visible.length ? visible : filterOngs(seedOngs(), options);
    } catch (error) {
      if (options.strict) throw error;
      return filterOngs(seedOngs(), options);
    }
  }
  return filterOngs(seedOngs(), options);
}

function filterOngs(ongs, options = {}) {
  return options.includeInactive
    ? ongs
    : ongs.filter((ong) => ong.approvalStatus === ONG_APPROVAL_STATUS.approved);
}

export async function getOngById(id) {
  const ongs = await listOngs();
  return ongs.find((ong) => ong.id === id || ong.name === id) || null;
}

export async function upsertOng(ongData) {
  if (isSupabaseConfigured) {
    const payload = {
      name: ongData.name,
      email: ongData.email,
      whatsapp: ongData.whatsapp,
      city: ongData.city,
      neighborhood: ongData.neighborhood || null,
      address: ongData.address || null,
      latitude: ongData.latitude || ongData.lat || null,
      longitude: ongData.longitude || ongData.lng || null,
      service_area: ongData.serviceArea || ongData.service_area || null,
      responsible: ongData.responsible || null,
      founded_at: ongData.foundedAt || ongData.founded_at || null,
      instagram: ongData.instagram || null,
      approval_status: ongData.approvalStatus || ongData.approval_status || ONG_APPROVAL_STATUS.pending,
      is_verified: Boolean(ongData.verified ?? ongData.is_verified ?? false),
      moderation_note: ongData.moderationNote || ongData.moderation_note || null,
      description: ongData.description || null,
      image_url: ongData.image || ongData.image_url || null,
      owner_user_id: ongData.owner_user_id || null,
    };
    const query = ongData.id
      ? supabase.from("ongs").update(payload).eq("id", ongData.id)
      : supabase.from("ongs").insert({ ...payload, id: createId("ong") });
    const { data, error } = await query.select("*").single();
    if (error) throw new Error(error.message);
    return normalizeOng(data);
  }

  const ongs = seedOngs();
  const nextOng = normalizeOng({
    ...ongData,
    id: ongData.id || createId("ong"),
    createdAt: ongData.createdAt || new Date().toISOString(),
  });
  const exists = ongs.some((ong) => ong.id === nextOng.id);
  const next = exists
    ? ongs.map((ong) => (ong.id === nextOng.id ? nextOng : ong))
    : [nextOng, ...ongs];
  writeStorage(STORAGE_KEYS.ongs, next);
  return nextOng;
}

export async function updateOngModeration(id, { approvalStatus, moderationNote = "" }) {
  const verified = approvalStatus === ONG_APPROVAL_STATUS.approved;

  if (isSupabaseConfigured) {
    const payload = {
      approval_status: approvalStatus,
      is_verified: verified,
      moderation_note: moderationNote || null,
    };

    let { data, error } = await supabase
      .from("ongs")
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();

    if (isMissingColumnError(error, "moderation_note")) {
      const { moderation_note: _unused, ...safePayload } = payload;
      const retry = await supabase
        .from("ongs")
        .update(safePayload)
        .eq("id", id)
        .select("*")
        .single();
      data = retry.data;
      error = retry.error;
    }

    if (error) throw new Error(error.message);
    return normalizeOng(data);
  }

  const ongs = seedOngs();
  const next = ongs.map((ong) =>
    ong.id === id
      ? normalizeOng({
          ...ong,
          approvalStatus,
          verified,
          moderationNote,
        })
      : ong,
  );
  writeStorage(STORAGE_KEYS.ongs, next);
  return next.find((ong) => ong.id === id) || null;
}
