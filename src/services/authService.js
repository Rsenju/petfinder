import { getOngById, seedOngs, upsertOng } from "./ongService";
import { readStorage, STORAGE_KEYS, writeStorage } from "./storage";

const demoUsers = [
  {
    id: "admin_001",
    name: "Administrador PetFinder",
    email: "admin@petfinder.local",
    password: "admin123",
    role: "admin",
  },
  {
    id: "user_ong_001",
    name: "Amigo de Patas",
    email: "ong@petfinder.local",
    password: "ong123",
    role: "ong",
    ongId: "ong_001",
  },
];

export async function loginWithCredentials(credentials) {
  await new Promise((resolve) => setTimeout(resolve, 450));
  const user = demoUsers.find(
    (item) =>
      item.email.toLowerCase() === credentials.email.toLowerCase() &&
      item.password === credentials.password,
  );

  if (!user) {
    throw new Error("Credenciais invalidas. Use uma conta de teste valida.");
  }

  const ong = user.ongId ? await getOngById(user.ongId) : null;
  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    tipo: user.role,
    ongId: user.ongId,
    ong,
  };

  localStorage.setItem(STORAGE_KEYS.token, `local-${user.id}`);
  writeStorage(STORAGE_KEYS.authUser, session);
  return session;
}

export async function getCurrentUser() {
  seedOngs();
  const user = readStorage(STORAGE_KEYS.authUser, null);
  if (!user?.ongId) return user;
  return { ...user, ong: await getOngById(user.ongId) };
}

export async function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.authUser);
}

export async function updateCurrentUser(data) {
  const current = await getCurrentUser();
  if (!current) throw new Error("Usuario nao autenticado");

  let next = { ...current, ...data };
  if (current.ongId && data.ong) {
    const ong = await upsertOng({ ...data.ong, id: current.ongId });
    next = { ...next, ong };
  }

  writeStorage(STORAGE_KEYS.authUser, next);
  return next;
}
