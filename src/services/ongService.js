import { ongs as mockOngs } from "../data/mockData";
import { createId, readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

const MOCK_ONGS_SEED_VERSION = "2026-06-07-clickable-ong-profiles";

const normalizeOng = (ong) => ({
  id: ong.id,
  name: ong.name || ong.nome || "ONG Parceira",
  email: ong.email || "contato@ong.org",
  whatsapp: ong.whatsapp || ong.phone || "(71) 99999-0000",
  city: ong.city || "Salvador",
  neighborhood: ong.neighborhood || ong.bairro || "Centro",
  address: ong.address || ong.endereco || "",
  serviceArea: ong.serviceArea || ong.service_area || "",
  responsible: ong.responsible || ong.responsavel || "",
  foundedAt: ong.foundedAt || ong.founded_at || "",
  instagram: ong.instagram || "",
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

export async function listOngs() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("ongs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data || []).map(normalizeOng);
  }
  return seedOngs();
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
      service_area: ongData.serviceArea || ongData.service_area || null,
      responsible: ongData.responsible || null,
      founded_at: ongData.foundedAt || ongData.founded_at || null,
      instagram: ongData.instagram || null,
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
