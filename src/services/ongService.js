import { ongs as mockOngs } from "../data/mockData";
import { createId, readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabaseRequest } from "./supabaseClient";

const normalizeOng = (ong) => ({
  id: ong.id,
  name: ong.name || ong.nome || "ONG Parceira",
  email: ong.email || "contato@ong.org",
  whatsapp: ong.whatsapp || ong.phone || "(71) 99999-0000",
  city: ong.city || "Salvador",
  neighborhood: ong.neighborhood || ong.bairro || "Centro",
  description: ong.description || "",
  image: ong.image || ong.logo || "",
  petsCount: ong.petsCount || 0,
  adoptionsCount: ong.adoptionsCount || 0,
  createdAt: ong.createdAt || new Date().toISOString(),
});

export function seedOngs() {
  const current = readStorage(STORAGE_KEYS.ongs, null);
  if (current?.length) return current;
  return writeStorage(STORAGE_KEYS.ongs, mockOngs.map(normalizeOng));
}

export async function listOngs() {
  if (isSupabaseConfigured) {
    return supabaseRequest("ongs?select=*&order=created_at.desc");
  }
  return seedOngs();
}

export async function getOngById(id) {
  const ongs = await listOngs();
  return ongs.find((ong) => ong.id === id || ong.name === id) || null;
}

export async function upsertOng(ongData) {
  if (isSupabaseConfigured) {
    const payload = { ...ongData };
    const path = ongData.id ? `ongs?id=eq.${ongData.id}` : "ongs";
    const method = ongData.id ? "PATCH" : "POST";
    const [saved] = await supabaseRequest(path, {
      method,
      body: JSON.stringify(payload),
    });
    return saved;
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
