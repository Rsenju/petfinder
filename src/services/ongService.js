import { ongs as mockOngs } from "../data/mockData";
import { createId, readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

const normalizeOng = (ong) => ({
  id: ong.id,
  name: ong.name || ong.nome || "ONG Parceira",
  email: ong.email || "contato@ong.org",
  whatsapp: ong.whatsapp || ong.phone || "(71) 99999-0000",
  city: ong.city || "Salvador",
  neighborhood: ong.neighborhood || ong.bairro || "Centro",
  description: ong.description || "",
  owner_user_id: ong.owner_user_id || null,
  image: ong.image || ong.logo || "",
  petsCount: ong.petsCount || 0,
  adoptionsCount: ong.adoptionsCount || 0,
  createdAt: ong.createdAt || new Date().toISOString(),
});

export function seedOngs() {
  const current = readStorage(STORAGE_KEYS.ongs, null);
  if (current?.length >= mockOngs.length && current.some((ong) => ong.id === "ong_feira")) return current;
  return writeStorage(STORAGE_KEYS.ongs, mockOngs.map(normalizeOng));
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
