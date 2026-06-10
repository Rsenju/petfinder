import { createId, readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabase, withSupabaseTimeout } from "./supabaseClient";

const isMissingAdoptionRequestsTableError = (error) =>
  error?.code === "PGRST205" ||
  (/adoption_requests/i.test(error?.message || "") &&
    /schema cache|could not find|not find the table|does not exist/i.test(error.message));

export function buildAdoptionMessage({ pet, request }) {
  const lines = [
    `Olá! Tenho interesse em adotar o pet ${pet.name}.`,
    "",
    `Pet: ${pet.name}`,
    pet.city ? `Cidade do pet: ${pet.city}` : "",
    "",
    `Nome: ${request.adopter_name}`,
    `Telefone: ${request.adopter_phone}`,
    `Bairro: ${request.adopter_neighborhood}`,
    `Minha casa está preparada: ${request.home_prepared}`,
    `Preciso de dicas da ONG: ${request.needs_guidance}`,
    `Já tive ou tenho outros animais: ${request.has_or_had_pets}`,
  ];

  return lines.filter(Boolean).join("\n");
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
    if (!error) return data;
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
    try {
      let query = supabase
        .from("adoption_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (filters.ongId) query = query.eq("ong_id", filters.ongId);
      const { data, error } = await withSupabaseTimeout(query);
      if (isMissingAdoptionRequestsTableError(error)) {
        const current = readStorage(STORAGE_KEYS.adoptionRequests, []);
        return filters.ongId ? current.filter((item) => item.ong_id === filters.ongId) : current;
      }
      if (error) throw new Error(error.message);
      return data || [];
    } catch (error) {
      if (!isMissingAdoptionRequestsTableError(error) && error.message !== "Tempo limite ao consultar Supabase") {
        throw error;
      }
      const current = readStorage(STORAGE_KEYS.adoptionRequests, []);
      return filters.ongId ? current.filter((item) => item.ong_id === filters.ongId) : current;
    }
  }

  const current = readStorage(STORAGE_KEYS.adoptionRequests, []);
  return filters.ongId ? current.filter((item) => item.ong_id === filters.ongId) : current;
}
