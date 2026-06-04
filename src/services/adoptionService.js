import { createId, readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

export function buildAdoptionMessage({ pet, request }) {
  return [
    `Ola! Tenho interesse em adotar o pet ${pet.name}.`,
    "",
    `Nome: ${request.adopter_name}`,
    `Telefone: ${request.adopter_phone}`,
    `Bairro: ${request.adopter_neighborhood}`,
    `Minha casa esta preparada: ${request.home_prepared}`,
    `Preciso de dicas da ONG: ${request.needs_guidance}`,
    `Ja tive ou tenho outros animais: ${request.has_or_had_pets}`,
  ].join("\n");
}

export async function createAdoptionRequest({ pet, request }) {
  const message = buildAdoptionMessage({ pet, request });
  const payload = {
    id: createId("adoption"),
    pet_id: pet.id,
    ong_id: pet.ong_id,
    ...request,
    message,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("adoption_requests")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  const current = readStorage(STORAGE_KEYS.adoptionRequests, []);
  writeStorage(STORAGE_KEYS.adoptionRequests, [payload, ...current]);
  return payload;
}

export function buildWhatsAppUrl(phone, message) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return `https://wa.me/?text=${encodeURIComponent(message)}`;
  const normalized = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export async function listAdoptionRequests(filters = {}) {
  if (isSupabaseConfigured) {
    let query = supabase
      .from("adoption_requests")
      .select("*, pets(name, city), ongs(name)")
      .order("created_at", { ascending: false });
    if (filters.ongId) query = query.eq("ong_id", filters.ongId);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data || [];
  }

  const current = readStorage(STORAGE_KEYS.adoptionRequests, []);
  return filters.ongId ? current.filter((item) => item.ong_id === filters.ongId) : current;
}
