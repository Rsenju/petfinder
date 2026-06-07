export const CITY_CENTERS = {
  Salvador: { lat: -12.9777, lng: -38.5016, label: "Salvador" },
  "Lauro de Freitas": { lat: -12.8944, lng: -38.3194, label: "Lauro de Freitas" },
  "Feira de Santana": { lat: -12.2664, lng: -38.9663, label: "Feira de Santana" },
};

export const NEIGHBORHOOD_COORDINATES = {
  Salvador: {
    Barra: { lat: -13.0096, lng: -38.5324 },
    Brotas: { lat: -12.9839, lng: -38.4898 },
    Federacao: { lat: -12.9991, lng: -38.5062 },
    Itapua: { lat: -12.9497, lng: -38.3607 },
    Ondina: { lat: -13.0056, lng: -38.5128 },
    Pituba: { lat: -12.9974, lng: -38.4596 },
    "Rio Vermelho": { lat: -13.0108, lng: -38.4883 },
  },
  "Lauro de Freitas": {
    Buraquinho: { lat: -12.8867, lng: -38.3042 },
    Caji: { lat: -12.9067, lng: -38.3394 },
    Centro: { lat: -12.8944, lng: -38.3194 },
    Itinga: { lat: -12.9185, lng: -38.3482 },
    Portao: { lat: -12.9059, lng: -38.3127 },
    "Vilas do Atlantico": { lat: -12.8784, lng: -38.2926 },
  },
  "Feira de Santana": {
    Caseb: { lat: -12.2449, lng: -38.9472 },
    Kalilandia: { lat: -12.2554, lng: -38.9539 },
    Mangabeira: { lat: -12.2212, lng: -38.9187 },
    "Santa Monica": { lat: -12.2525, lng: -38.9437 },
    "Serraria Brasil": { lat: -12.2557, lng: -38.9738 },
    SIM: { lat: -12.2325, lng: -38.9295 },
    Tomba: { lat: -12.2947, lng: -38.9734 },
  },
};

export const LOCATION_OPTIONS = Object.entries(NEIGHBORHOOD_COORDINATES).flatMap(([city, neighborhoods]) =>
  Object.entries(neighborhoods).map(([neighborhood, coordinates]) => ({
    id: `${city}:${neighborhood}`,
    city,
    neighborhood,
    label: `${neighborhood}, ${city}`,
    ...coordinates,
  })),
);

export const PET_SHOPS = [
  {
    id: "petshop_salvador_amado_bela_vista",
    name: "Amado Pet Shop - Shopping Bela Vista",
    city: "Salvador",
    neighborhood: "Horto Bela Vista",
    address: "Alameda Euvaldo Luz, 92 - Horto Bela Vista, Salvador - BA",
    whatsapp: "(71) 3507-9828",
    instagram: "Instagram informado pelo shopping",
    services: ["racao", "acessorios"],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&h=800&auto=format&fit=crop&q=85",
    lat: -12.9636,
    lng: -38.4667,
    sourceLabel: "Shopping Bela Vista",
    sourceUrl: "https://www.shoppingbelavista.com.br/lojas/amado-pet-shop.html",
    openingHours: "Segunda a sabado 09h as 22h; domingo 13h as 21h",
  },
  {
    id: "petshop_salvador_mundo_pet",
    name: "Mundo Pet - Salvador Shopping",
    city: "Salvador",
    neighborhood: "Caminho das Arvores",
    address: "Avenida Tancredo Neves, 3133 - Salvador Shopping, Salvador - BA",
    whatsapp: "(71) 3838-8608",
    instagram: "Instagram oficial pelo shopping",
    services: ["racao", "acessorios"],
    image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=1200&h=800&auto=format&fit=crop&q=85",
    lat: -12.9788,
    lng: -38.4547,
    sourceLabel: "Salvador Shopping",
    sourceUrl: "https://salvadorshopping.com.br/loja/mundo-pet",
    openingHours: "Segunda a sabado 09h as 22h; domingo 12h as 21h",
  },
  {
    id: "petshop_lauro_cobasi",
    name: "Cobasi Lauro de Freitas",
    city: "Lauro de Freitas",
    neighborhood: "Centro",
    address: "Av. Santos Dumont, 4806 - Lauro de Freitas - BA",
    whatsapp: "(71) 2180-1060",
    instagram: "@cobasi",
    services: ["racao", "farmacia", "acessorios"],
    image: "https://images.unsplash.com/photo-1601758176175-45914394491c?w=1200&h=800&auto=format&fit=crop&q=85",
    lat: -12.8924,
    lng: -38.3192,
    sourceLabel: "Cobasi",
    sourceUrl: "https://www.cobasi.com.br/lojas/cobasi-mp-lauro-de-freitas",
    openingHours: "Segunda a sabado 08h as 18h45; domingo 09h as 17h45",
  },
  {
    id: "petshop_lauro_petz_parque",
    name: "Petz Parque Shopping Bahia",
    city: "Lauro de Freitas",
    neighborhood: "Centro",
    address: "Avenida Santos Dumont, 4360 - Centro, Lauro de Freitas - BA",
    whatsapp: "(71) 3506-1390",
    instagram: "@petz",
    services: ["racao", "acessorios", "banho", "tosa"],
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&h=800&auto=format&fit=crop&q=85",
    lat: -12.8936,
    lng: -38.3199,
    sourceLabel: "Petz",
    sourceUrl: "https://www.petz.com.br/loja/petz-parque-shopping-bahia",
    openingHours: "Segunda a sabado 09h as 22h; domingo 09h as 21h",
  },
  {
    id: "petshop_feira_pets_star",
    name: "Pets Star Petshop",
    city: "Feira de Santana",
    neighborhood: "Olhos D Agua",
    address: "Avenida Governador Joao Durval Carneiro, 67 - Olhos D Agua, Feira de Santana - BA",
    whatsapp: "(75) 8216-9330",
    instagram: "Instagram informado no guia",
    services: ["racao", "acessorios"],
    image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1200&h=800&auto=format&fit=crop&q=85",
    lat: -12.2529,
    lng: -38.9561,
    sourceLabel: "Guia Pinzon",
    sourceUrl: "https://guiapinzon.com.br/ba/pets-star-petshop-932634",
    openingHours: "Consultar horarios pelo WhatsApp",
  },
];

export function getCoordinatesForEntity(entity) {
  if (entity?.lat && entity?.lng) return { lat: Number(entity.lat), lng: Number(entity.lng) };
  if (entity?.latitude && entity?.longitude) {
    return { lat: Number(entity.latitude), lng: Number(entity.longitude) };
  }

  const city = entity?.city;
  const neighborhood = entity?.neighborhood;
  return NEIGHBORHOOD_COORDINATES[city]?.[neighborhood] || CITY_CENTERS[city] || null;
}

export function calculateDistanceKm(origin, destination) {
  if (!origin || !destination) return null;

  const toRadians = (value) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(destination.lat - origin.lat);
  const deltaLng = toRadians(destination.lng - origin.lng);
  const lat1 = toRadians(origin.lat);
  const lat2 = toRadians(destination.lat);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.sin(deltaLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

export function withDistance(entity, origin) {
  const coordinates = getCoordinatesForEntity(entity);
  const distanceKm = origin && coordinates ? calculateDistanceKm(origin, coordinates) : null;
  return { ...entity, coordinates, distanceKm };
}
