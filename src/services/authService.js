import { getOngById, seedOngs, upsertOng } from "./ongService";
import { readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

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
    ongId: "ong_salvador",
  },
];

const findDemoUserByEmail = (email = "") =>
  demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;

const isMissingProfilesTableError = (error) =>
  error?.code === "PGRST205" ||
  /profiles/i.test(error?.message || "") && /schema cache|could not find|not find the table|does not exist/i.test(error.message);

async function mapDemoSupabaseUser(authUser) {
  const demoUser = findDemoUserByEmail(authUser.email);
  if (!demoUser) return null;

  const ong = demoUser.ongId ? await getOngById(demoUser.ongId) : null;
  return {
    id: authUser.id,
    name: demoUser.name,
    email: authUser.email,
    role: demoUser.role,
    tipo: demoUser.role,
    ongId: demoUser.ongId,
    ong,
  };
}

export async function loginWithCredentials(credentials) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) throw new Error(error.message || "Não foi possível entrar.");
    return getCurrentUser();
  }

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
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    return ensureProfileForUser(data.user);
  }

  seedOngs();
  const user = readStorage(STORAGE_KEYS.authUser, null);
  if (!user?.ongId) return user;
  return { ...user, ong: await getOngById(user.ongId) };
}

export async function logoutUser() {
  if (isSupabaseConfigured) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.authUser);
}

export async function updateCurrentUser(data) {
  const current = await getCurrentUser();
  if (!current) throw new Error("Usuário não autenticado");

  let next = { ...current, ...data };
  if (current.ongId && data.ong) {
    const ong = await upsertOng({ ...data.ong, id: current.ongId });
    next = { ...next, ong };
  }

  writeStorage(STORAGE_KEYS.authUser, next);
  return next;
}

export async function registerOngAccount(data) {
  if (isSupabaseConfigured) {
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          role: "adopter",
        },
      },
    });
    if (error) throw new Error(error.message || "Não foi possível criar a conta.");

    const userId = signUpData.user?.id;
    if (userId) {
      const ongId = `ong_${crypto.randomUUID()}`;
      const { error: ongError } = await supabase.from("ongs").insert({
        id: ongId,
        owner_user_id: userId,
        name: data.ongName,
        email: data.email,
        whatsapp: data.whatsapp,
        city: data.city,
        neighborhood: data.neighborhood || null,
        description: data.description || null,
      });
      if (ongError) throw new Error(ongError.message);

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userId,
        name: data.name,
        email: data.email,
        role: "ong",
        ong_id: ongId,
      });
      if (profileError) throw new Error(profileError.message);
    }

    return getCurrentUser();
  }

  const ong = await upsertOng({
    id: `ong_${Date.now()}`,
    name: data.ongName,
    email: data.email,
    whatsapp: data.whatsapp,
    city: data.city,
    neighborhood: data.neighborhood,
    description: data.description,
  });
  const session = {
    id: `user_${Date.now()}`,
    name: data.name,
    email: data.email,
    role: "ong",
    tipo: "ong",
    ongId: ong.id,
    ong,
  };
  localStorage.setItem(STORAGE_KEYS.token, `local-${session.id}`);
  writeStorage(STORAGE_KEYS.authUser, session);
  return session;
}

export async function loginWithGoogle() {
  if (!isSupabaseConfigured) {
    throw new Error("Configure o Supabase para usar login com Google.");
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  if (error) throw new Error(error.message || "Não foi possível iniciar login com Google.");
}

export function onAuthStateChange(callback) {
  if (!isSupabaseConfigured) return { unsubscribe: () => {} };
  const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
    try {
      callback(session?.user ? await ensureProfileForUser(session.user) : null);
    } catch (error) {
      console.warn("Não foi possível carregar o perfil do usuário.", error);
      callback(session?.user ? await mapDemoSupabaseUser(session.user) : null);
    }
  });
  return data.subscription;
}

export async function listProfiles() {
  if (!isSupabaseConfigured) {
    return demoUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      ong_id: user.ongId || null,
    }));
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("*, ong:ongs(*)")
    .order("created_at", { ascending: false });
  if (isMissingProfilesTableError(error)) {
    return demoUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      ong_id: user.ongId || null,
    }));
  }
  if (error) throw new Error(error.message);
  return data || [];
}

async function ensureProfileForUser(authUser) {
  const { data: existing, error } = await supabase
    .from("profiles")
    .select("*, ong:ongs(*)")
    .eq("id", authUser.id)
    .maybeSingle();

  if (isMissingProfilesTableError(error)) {
    const demoProfile = await mapDemoSupabaseUser(authUser);
    if (demoProfile) return demoProfile;
    throw new Error("A tabela public.profiles não existe no Supabase. Rode o supabase-schema.sql antes de usar login real.");
  }
  if (error) throw new Error(error.message);
  if (existing) return mapProfile(existing, authUser);

  const profile = {
    id: authUser.id,
    name: authUser.user_metadata?.name || authUser.email?.split("@")[0] || "Usuario",
    email: authUser.email,
    role: "adopter",
  };
  const { data: created, error: createError } = await supabase
    .from("profiles")
    .insert(profile)
    .select("*, ong:ongs(*)")
    .single();
  if (isMissingProfilesTableError(createError)) {
    const demoProfile = await mapDemoSupabaseUser(authUser);
    if (demoProfile) return demoProfile;
    throw new Error("A tabela public.profiles não existe no Supabase. Rode o supabase-schema.sql antes de usar login real.");
  }
  if (createError) throw new Error(createError.message);
  return mapProfile(created, authUser);
}

function mapProfile(profile, authUser) {
  return {
    id: profile.id,
    name: profile.name || authUser.user_metadata?.name || authUser.email,
    email: profile.email || authUser.email,
    role: profile.role || "adopter",
    tipo: profile.role || "adopter",
    ongId: profile.ong_id,
    ong: profile.ong || null,
  };
}
