export const STORAGE_KEYS = {
  pets: "petfinder:pets",
  petsSeedVersion: "petfinder:pets_seed_version",
  ongs: "petfinder:ongs",
  ongsSeedVersion: "petfinder:ongs_seed_version",
  adoptionRequests: "petfinder:adoption_requests",
  reports: "petfinder:reports",
  authUser: "petfinder:auth_user",
  token: "token",
};

export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

export function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
