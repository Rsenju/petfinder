import { createId, readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabaseRequest } from "./supabaseClient";

export function buildAdoptionMessage({ pet, request }) {
  return [
    `Ola! Quero iniciar um pedido de adocao para ${pet.name}.`,
    "",
    `Nome: ${request.adopter_name}`,
    `Telefone: ${request.adopter_phone}`,
    `Bairro: ${request.adopter_neighborhood}`,
    `Pet: ${pet.name}`,
    `Cidade do pet: ${pet.city}`,
    `Casa preparada: ${request.home_prepared}`,
    `Precisa de dicas da ONG: ${request.needs_guidance}`,
    `Ja possui ou ja teve animais: ${request.has_or_had_pets}`,
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
    const [saved] = await supabaseRequest("adoption_requests", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return saved;
  }

  const current = readStorage(STORAGE_KEYS.adoptionRequests, []);
  writeStorage(STORAGE_KEYS.adoptionRequests, [payload, ...current]);
  return payload;
}

export function buildWhatsAppUrl(phone, message) {
  const digits = String(phone || "").replace(/\D/g, "");
  const normalized = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
