export const STORAGE_KEYS = {
  pets: "petfinder:pets",
  ongs: "petfinder:ongs",
  adoptionRequests: "petfinder:adoption_requests",
  authUser: "petfinder:auth_user",
  token: "token",
};

export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Nao foi possivel ler ${key} do localStorage`, error);
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
