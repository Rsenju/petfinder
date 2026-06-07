import { ongs as mockOngs } from "../data/mockData";
import { createId, readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

const MOCK_ONGS_SEED_VERSION = "2026-06-07-moderated-ong-profiles";

export const ONG_APPROVAL_STATUS = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
  blocked: "blocked",
};

const normalizeOng = (ong) => ({
  id: ong.id,
  name: ong.name || ong.nome || "ONG Parceira",
  email: ong.email || "contato@ong.org",
  whatsapp: ong.whatsapp || ong.phone || "(71) 99999-0000",
  city: ong.city || "Salvador",
  neighborhood: ong.neighborhood || ong.bairro || "Centro",
  address: ong.address || ong.endereco || "",
  latitude: ong.latitude || ong.lat || null,
  longitude: ong.longitude || ong.lng || null,
  serviceArea: ong.serviceArea || ong.service_area || "",
  responsible: ong.responsible || ong.responsavel || "",
  foundedAt: ong.foundedAt || ong.founded_at || "",
  instagram: ong.instagram || "",
  approvalStatus: ong.approvalStatus || ong.approval_status || ONG_APPROVAL_STATUS.approved,
  verified: Boolean(ong.verified ?? ong.is_verified ?? (ong.approvalStatus || ong.approval_status) === ONG_APPROVAL_STATUS.approved),
  moderationNote: ong.moderationNote || ong.moderation_note || "",
  description: ong.description || "",
  owner_user_id: ong.owner_user_id || null,
  image: ong.image || ong.logo || "",
  petsCount: ong.petsCount || 0,
  adoptionsCount: ong.adoptionsCount || 0,
  createdAt: ong.createdAt || new Date().toISOString(),
});

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
    const { data, error } = await supabase
      .from("ongs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    const normalized = (data || []).map(normalizeOng);
    return options.includeInactive
      ? normalized
      : normalized.filter((ong) => ong.approvalStatus === ONG_APPROVAL_STATUS.approved);
  }
  const ongs = seedOngs();
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
    const { data, error } = await supabase
      .from("ongs")
      .update({
        approval_status: approvalStatus,
        is_verified: verified,
        moderation_note: moderationNote || null,
      })
      .eq("id", id)
      .select("*")
      .single();
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
