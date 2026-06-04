import { allPets as mockPets, ongs as mockOngs } from "../data/mockData";
import { createId, readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

const findOngForPet = (pet) =>
  mockOngs.find((ong) => ong.name === pet.ong) || mockOngs[0];

export const normalizePet = (pet) => {
  const ong = pet.ongData || pet.ongs || findOngForPet(pet);
  return {
    id: pet.id,
    ong_id: pet.ong_id || ong?.id || "ong_001",
    name: pet.name || pet.nome || "Pet",
    species: pet.species || pet.especie || "dog",
    breed: pet.breed || pet.raca || "Sem raca definida",
    gender: pet.gender || pet.sex || pet.sexo || "macho",
    sex: pet.sex || pet.gender || pet.sexo || "macho",
    size: pet.size || pet.porte || "medio",
    age: pet.age || (pet.idade?.valor ? `${pet.idade.valor} ${pet.idade.tipo}` : "Adulto"),
    ageType: pet.ageType || "adulto",
    city: pet.city || ong?.city || "Salvador",
    neighborhood: pet.neighborhood || ong?.neighborhood || "Centro",
    location: pet.location || `${pet.city || ong?.city || "Salvador"}, BA`,
    description: pet.description || pet.historia || "",
    image: pet.image || pet.image_url || pet.gallery?.[0]?.fullUrl || "",
    image_url: pet.image_url || pet.image || pet.gallery?.[0]?.fullUrl || "",
    status: pet.status || "available",
    tags: Array.isArray(pet.tags) ? pet.tags : [],
    ong: pet.ong || ong?.name || "ONG Parceira",
    ongData: {
      id: ong?.id || pet.ong_id || "ong_001",
      name: ong?.name || pet.ong || "ONG Parceira",
      whatsapp: ong?.whatsapp || ong?.phone || "(71) 99999-0000",
      city: ong?.city || pet.city || "Salvador",
      neighborhood: ong?.neighborhood || "Centro",
      email: ong?.email || "contato@ong.org",
    },
    createdAt: pet.createdAt || pet.created_at || new Date().toISOString(),
  };
};

export function seedPets() {
  const current = readStorage(STORAGE_KEYS.pets, null);
  if (current?.length) return current;
  return writeStorage(STORAGE_KEYS.pets, mockPets.map(normalizePet));
}

export async function listPets(filters = {}) {
  if (isSupabaseConfigured) {
    let query = supabase
      .from("pets")
      .select("*, ongs(*)")
      .order("created_at", { ascending: false });

    if (filters.ongId) query = query.eq("ong_id", filters.ongId);
    if (filters.status) query = query.eq("status", filters.status);

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    const normalized = (data || []).map(normalizePet);
    return normalized.length ? normalized : seedPets();
  }

  const pets = seedPets();
  return pets.filter((pet) => {
    if (filters.ongId && pet.ong_id !== filters.ongId) return false;
    if (filters.status && pet.status !== filters.status) return false;
    return true;
  });
}

export async function getPetById(id) {
  const pets = await listPets();
  return pets.find((pet) => pet.id === id) || null;
}

export async function savePet(petData) {
  if (isSupabaseConfigured) {
    const payload = mapPetPayload(petData);
    const query = petData.id
      ? supabase.from("pets").update(payload).eq("id", petData.id)
      : supabase.from("pets").insert({ ...payload, id: createId("pet") });
    const { data, error } = await query.select("*, ongs(*)").single();
    if (error) throw new Error(error.message);
    return normalizePet(data);
  }

  const pets = seedPets();
  const nextPet = normalizePet({
    ...petData,
    id: petData.id || createId("pet"),
    createdAt: petData.createdAt || new Date().toISOString(),
  });
  const exists = pets.some((pet) => pet.id === nextPet.id);
  const next = exists
    ? pets.map((pet) => (pet.id === nextPet.id ? nextPet : pet))
    : [nextPet, ...pets];
  writeStorage(STORAGE_KEYS.pets, next);
  return nextPet;
}

export async function deletePet(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from("pets").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  }

  const pets = seedPets().filter((pet) => pet.id !== id);
  writeStorage(STORAGE_KEYS.pets, pets);
  return true;
}

function mapPetPayload(petData) {
  return {
    ong_id: petData.ong_id,
    name: petData.name,
    species: petData.species,
    breed: petData.breed || null,
    gender: petData.gender || petData.sex || null,
    size: petData.size || null,
    age: petData.age || null,
    age_type: petData.ageType || petData.age_type || null,
    city: petData.city,
    neighborhood: petData.neighborhood || null,
    description: petData.description,
    image_url: petData.image_url || petData.image || null,
    status: petData.status || "available",
    tags: petData.tags || [],
  };
}
