import { allPets as mockPets, ongs as mockOngs } from "../data/mockData";
import { createId, readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

const MOCK_PETS_SEED_VERSION = "2026-06-07-advanced-pet-profile";

const PET_ID_ALIASES = {
  pet_thor_salvador: "pet_salvador_thor",
  pet_mel_salvador: "pet_salvador_mel",
  pet_apolo_salvador: "pet_salvador_apolo",
  pet_luna_salvador: "pet_salvador_luna",
  pet_nina_salvador: "pet_salvador_nina",
  pet_chico_salvador: "pet_salvador_chico",
  pet_max_lauro: "pet_lauro_max",
  pet_amora_lauro: "pet_lauro_amora",
  pet_bento_lauro: "pet_lauro_bento",
  pet_mia_lauro: "pet_lauro_mia",
  pet_tom_lauro: "pet_lauro_tom",
  pet_simba_lauro: "pet_lauro_simba",
  pet_bob_feira: "pet_feira_bob",
  pet_pandora_feira: "pet_feira_pandora",
  pet_zeca_feira: "pet_feira_zeca",
  pet_frida_feira: "pet_feira_frida",
  pet_theo_feira: "pet_feira_theo",
  pet_pipoca_feira: "pet_feira_pipoca",
};

const slugify = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const findOngForPet = (pet) =>
  mockOngs.find((ong) => ong.name === pet.ong) || mockOngs[0];

const normalizeGallery = (pet) => {
  const rawGallery = pet.gallery || pet.image_gallery || pet.images || [];
  const gallery = Array.isArray(rawGallery)
    ? rawGallery
        .map((item) => {
          if (typeof item === "string") return item;
          return item?.fullUrl || item?.url || item?.image_url || item?.thumbUrl || "";
        })
        .filter(Boolean)
    : [];
  const cover = pet.image || pet.image_url || gallery[0] || "";
  return cover ? [cover, ...gallery.filter((url) => url !== cover)] : gallery;
};

export const normalizePet = (pet) => {
  const ong = pet.ongData || pet.ongs || findOngForPet(pet);
  const ongApprovalStatus = ong?.approvalStatus || ong?.approval_status || "approved";
  const gallery = normalizeGallery(pet);
  return {
    id: pet.id,
    ong_id: pet.ong_id || ong?.id || "ong_001",
    name: pet.name || pet.nome || "Pet",
    species: pet.species || pet.especie || "dog",
    breed: pet.breed || pet.raca || "Sem raça definida",
    gender: pet.gender || pet.sex || pet.sexo || "macho",
    sex: pet.sex || pet.gender || pet.sexo || "macho",
    size: pet.size || pet.porte || "medio",
    age: pet.age || (pet.idade?.valor ? `${pet.idade.valor} ${pet.idade.tipo}` : "Adulto"),
    ageType: pet.ageType || "adulto",
    city: pet.city || ong?.city || "Salvador",
    neighborhood: pet.neighborhood || ong?.neighborhood || "Centro",
    latitude: pet.latitude || pet.lat || null,
    longitude: pet.longitude || pet.lng || null,
    location: pet.location || `${pet.city || ong?.city || "Salvador"}, BA`,
    description: pet.description || pet.historia || "",
    image: pet.image || pet.image_url || gallery[0] || "",
    image_url: pet.image_url || pet.image || gallery[0] || "",
    gallery,
    imageGallery: gallery,
    imageMetadata: pet.imageMetadata || pet.image_metadata || {},
    status: pet.status || "available",
    personality: pet.personality || "",
    healthStatus: pet.healthStatus || pet.health_status || "saudavel",
    vaccinated: Boolean(pet.vaccinated ?? pet.vacinado ?? false),
    castrated: Boolean(pet.castrated ?? pet.castrado ?? false),
    childrenCompatibility: pet.childrenCompatibility || pet.children_compatibility || "não testado",
    catsCompatibility: pet.catsCompatibility || pet.cats_compatibility || "não testado",
    dogsCompatibility: pet.dogsCompatibility || pet.dogs_compatibility || "não testado",
    energyLevel: pet.energyLevel || pet.energy_level || "medio",
    vaccinationRecord: pet.vaccinationRecord || pet.vaccination_record || "",
    veterinaryHistory: pet.veterinaryHistory || pet.veterinary_history || "",
    specialNeeds: pet.specialNeeds || pet.special_needs || "",
    medications: pet.medications || "",
    microchip: Boolean(pet.microchip ?? false),
    weight: pet.weight || "",
    behaviorProfile: pet.behaviorProfile || pet.behavior_profile || pet.personality || "",
    adaptationNeeds: pet.adaptationNeeds || pet.adaptation_needs || "",
    routine: pet.routine || "",
    feeding: pet.feeding || "",
    ongNotes: pet.ongNotes || pet.ong_notes || "",
    tags: Array.isArray(pet.tags) ? pet.tags : [],
    ong: pet.ong || ong?.name || "ONG Parceira",
    ongData: {
      id: ong?.id || pet.ong_id || "ong_001",
      name: ong?.name || pet.ong || "ONG Parceira",
      whatsapp: ong?.whatsapp || ong?.phone || "(71) 99999-0000",
      city: ong?.city || pet.city || "Salvador",
      neighborhood: ong?.neighborhood || "Centro",
      email: ong?.email || "contato@ong.org",
      approvalStatus: ongApprovalStatus,
      verified: Boolean(ong?.verified ?? ong?.is_verified ?? ongApprovalStatus === "approved"),
    },
    ongApprovalStatus,
    createdAt: pet.createdAt || pet.created_at || new Date().toISOString(),
  };
};

export function seedPets() {
  const current = readStorage(STORAGE_KEYS.pets, null);
  const currentSeedVersion = readStorage(STORAGE_KEYS.petsSeedVersion, "");
  const normalizedMocks = mockPets.map(normalizePet);

  if (current?.length >= mockPets.length && currentSeedVersion === MOCK_PETS_SEED_VERSION) {
    return current;
  }

  const mockIds = new Set(normalizedMocks.map((pet) => pet.id));
  const customPets = Array.isArray(current) ? current.filter((pet) => !mockIds.has(pet.id)) : [];
  const nextPets = [...normalizedMocks, ...customPets.map(normalizePet)];

  writeStorage(STORAGE_KEYS.petsSeedVersion, MOCK_PETS_SEED_VERSION);
  return writeStorage(STORAGE_KEYS.pets, nextPets);
}

export async function listPets(filters = {}) {
  if (isSupabaseConfigured) {
    try {
      let query = supabase
        .from("pets")
        .select("*, ongs(*)")
        .order("created_at", { ascending: false });

      if (filters.ongId) query = query.eq("ong_id", filters.ongId);
      if (filters.status) query = query.eq("status", filters.status);

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      const normalized = (data || []).map(normalizePet);
      return normalized.length ? filterPets(normalized, filters) : filterPets(seedPets(), filters);
    } catch (error) {
      if (filters.strict) throw error;
      return filterPets(seedPets(), filters);
    }
  }

  return filterPets(seedPets(), filters);
}

function filterPets(pets, filters = {}) {
  const storedOngs = readStorage(STORAGE_KEYS.ongs, mockOngs);
  const approvedOngIds = new Set(
    storedOngs
      .filter((ong) => (ong.approvalStatus || ong.approval_status || "approved") === "approved")
      .map((ong) => ong.id),
  );

  return pets.filter((pet) => {
    if (filters.ongId && pet.ong_id !== filters.ongId) return false;
    if (filters.status && pet.status !== filters.status) return false;
    if (!filters.ongId && !filters.includeInactive && pet.status !== "available") return false;
    if (!filters.ongId && !filters.includeInactive && !approvedOngIds.has(pet.ong_id)) return false;
    if (!filters.ongId && !filters.includeInactive && pet.ongApprovalStatus !== "approved") return false;
    return true;
  });
}

export async function getPetById(id) {
  const pets = await listPets({ includeInactive: true });
  const foundPet = findPetByUrlId(pets, id);
  if (foundPet) return foundPet;

  return findPetByUrlId(seedPets(), id);
}

function findPetByUrlId(pets, id) {
  const rawId = String(id || "");
  const aliasId = PET_ID_ALIASES[rawId];
  const normalizedId = slugify(rawId);
  const normalizedUnderscoreId = normalizedId.replace(/-/g, "_");

  return (
    pets.find((pet) => pet.id === rawId || pet.id === aliasId) ||
    pets.find((pet) => {
      const candidates = [
        pet.id,
        aliasId,
        pet.name,
        `${pet.name}-${pet.city}`,
        `${pet.city}-${pet.name}`,
        `${pet.name}-${pet.ongData?.city || ""}`,
        `${pet.ongData?.city || ""}-${pet.name}`,
      ].filter(Boolean);

      return candidates.some((candidate) => {
        const slug = slugify(candidate);
        return slug === normalizedId || slug.replace(/-/g, "_") === normalizedUnderscoreId;
      });
    }) ||
    null
  );
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
    latitude: petData.latitude || petData.lat || null,
    longitude: petData.longitude || petData.lng || null,
    description: petData.description,
    image_url: petData.image_url || petData.image || null,
    image_gallery: petData.gallery || petData.imageGallery || petData.image_gallery || [],
    image_metadata: petData.imageMetadata || petData.image_metadata || {},
    status: petData.status || "available",
    tags: petData.tags || [],
    personality: petData.personality || null,
    health_status: petData.healthStatus || petData.health_status || null,
    vaccinated: Boolean(petData.vaccinated),
    castrated: Boolean(petData.castrated),
    children_compatibility: petData.childrenCompatibility || petData.children_compatibility || null,
    cats_compatibility: petData.catsCompatibility || petData.cats_compatibility || null,
    dogs_compatibility: petData.dogsCompatibility || petData.dogs_compatibility || null,
    energy_level: petData.energyLevel || petData.energy_level || null,
    vaccination_record: petData.vaccinationRecord || petData.vaccination_record || null,
    veterinary_history: petData.veterinaryHistory || petData.veterinary_history || null,
    special_needs: petData.specialNeeds || petData.special_needs || null,
    medications: petData.medications || null,
    microchip: Boolean(petData.microchip),
    weight: petData.weight || null,
    behavior_profile: petData.behaviorProfile || petData.behavior_profile || null,
    adaptation_needs: petData.adaptationNeeds || petData.adaptation_needs || null,
    routine: petData.routine || null,
    feeding: petData.feeding || null,
    ong_notes: petData.ongNotes || petData.ong_notes || null,
  };
}
