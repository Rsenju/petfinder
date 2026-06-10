import { createId, readStorage, STORAGE_KEYS, writeStorage } from "./storage";
import { isSupabaseConfigured, supabase, withSupabaseTimeout } from "./supabaseClient";

export const REPORT_REASONS = [
  { value: "wrong_image", label: "Imagem incorreta" },
  { value: "false_info", label: "Informação falsa" },
  { value: "mistreatment", label: "Maus-tratos" },
  { value: "spam", label: "Spam" },
  { value: "inappropriate", label: "Conteúdo inadequado" },
];

const normalizeReport = (report) => ({
  id: report.id,
  pet_id: report.pet_id,
  ong_id: report.ong_id || null,
  reason: report.reason,
  description: report.description || "",
  reporter_name: report.reporter_name || "",
  reporter_contact: report.reporter_contact || "",
  status: report.status || "open",
  created_at: report.created_at || new Date().toISOString(),
  pets: report.pets || null,
  ongs: report.ongs || null,
});

const isMissingReportsTableError = (error) =>
  error?.code === "PGRST205" ||
  (/reports/i.test(error?.message || "") &&
    /schema cache|could not find|not find the table|does not exist/i.test(error.message));

export async function createReport({ pet, report }) {
  const payload = {
    id: createId("report"),
    pet_id: pet.id,
    ong_id: pet.ong_id || null,
    reason: report.reason,
    description: report.description || "",
    reporter_name: report.reporter_name || "",
    reporter_contact: report.reporter_contact || "",
    status: "open",
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("reports")
      .insert(payload)
      .select("*")
      .single();
    if (!error) return normalizeReport(data);
  }

  const current = readStorage(STORAGE_KEYS.reports, []);
  const next = [payload, ...current];
  writeStorage(STORAGE_KEYS.reports, next);
  return normalizeReport(payload);
}

export async function listReports() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await withSupabaseTimeout(
        supabase
          .from("reports")
          .select("*")
          .order("created_at", { ascending: false }),
      );
      if (isMissingReportsTableError(error)) return readStorage(STORAGE_KEYS.reports, []).map(normalizeReport);
      if (error) throw new Error(error.message);
      return (data || []).map(normalizeReport);
    } catch (error) {
      if (!isMissingReportsTableError(error) && error.message !== "Tempo limite ao consultar Supabase") {
        throw error;
      }
      return readStorage(STORAGE_KEYS.reports, []).map(normalizeReport);
    }
  }

  return readStorage(STORAGE_KEYS.reports, []).map(normalizeReport);
}

export async function updateReportStatus(id, status) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await withSupabaseTimeout(
        supabase
          .from("reports")
          .update({ status })
          .eq("id", id)
          .select("*")
          .single(),
      );
      if (!error) return normalizeReport(data);
    } catch {
      // Fall back to local data below.
    }
  }

  const reports = readStorage(STORAGE_KEYS.reports, []);
  const next = reports.map((report) => (report.id === id ? { ...report, status } : report));
  writeStorage(STORAGE_KEYS.reports, next);
  return normalizeReport(next.find((report) => report.id === id));
}
