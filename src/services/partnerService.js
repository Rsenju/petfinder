import { PET_SHOPS } from "../data/geoData";
import { isSupabaseConfigured, supabase, withSupabaseTimeout } from "./supabaseClient";

const isSupabasePartnersEnabled = import.meta.env.VITE_ENABLE_SUPABASE_PARTNERS === "true";

const normalizePartner = (partner) => ({
  id: partner.id,
  name: partner.name || "Parceiro PetFinder",
  city: partner.city || "Salvador",
  neighborhood: partner.neighborhood || "Centro",
  address: partner.address || "",
  whatsapp: partner.whatsapp || partner.phone || "",
  instagram: partner.instagram || "",
  services: Array.isArray(partner.services) ? partner.services : [],
  image: partner.image || partner.image_url || "",
  lat: partner.lat || partner.latitude || null,
  lng: partner.lng || partner.longitude || null,
  sourceLabel: partner.sourceLabel || partner.source_label || "",
  sourceUrl: partner.sourceUrl || partner.source_url || "",
  openingHours: partner.openingHours || partner.opening_hours || "",
  status: partner.status || "active",
});

export async function listPartners(filters = {}) {
  let partners = PET_SHOPS.map(normalizePartner);

  if (isSupabaseConfigured && isSupabasePartnersEnabled) {
    try {
      const { data, error } = await withSupabaseTimeout(
        supabase
          .from("partners")
          .select("*")
          .order("city", { ascending: true }),
      );
      if (!error && data?.length) {
        partners = data.map(normalizePartner).filter((partner) => partner.status === "active");
      }
    } catch {
      partners = PET_SHOPS.map(normalizePartner);
    }
  }

  return partners.filter((partner) => {
    if (filters.city && partner.city !== filters.city) return false;
    if (filters.service && !partner.services.includes(filters.service)) return false;
    return true;
  });
}
