import { isSupabaseConfigured, supabase } from "./supabaseClient";

export const PET_IMAGE_BUCKET = "pet-images";
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE_MB = 6;

const acceptedExtensions = /\.(jpe?g|png|webp)(\?.*)?$/i;
const anyImageExtension = /\.(jpe?g|png|webp|gif|svg|bmp|avif)(\?.*)?$/i;

function loadImageFromSource(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Nao foi possivel carregar a imagem."));
    image.src = source;
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Nao foi possivel ler a imagem."));
    reader.readAsDataURL(file);
  });
}

function canvasToBlob(canvas, type = "image/webp", quality = 0.86) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Nao foi possivel otimizar a imagem."));
      },
      type,
      quality,
    );
  });
}

export async function validateImageFile(file) {
  if (!file) {
    return { valid: false, message: "Selecione uma imagem." };
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, message: "Use apenas JPG, PNG ou WEBP." };
  }

  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    return { valid: false, message: `A imagem deve ter ate ${MAX_IMAGE_SIZE_MB}MB.` };
  }

  const dataUrl = await fileToDataUrl(file);
  const image = await loadImageFromSource(dataUrl);

  if (image.naturalWidth <= image.naturalHeight) {
    return {
      valid: false,
      message: "A imagem precisa ser horizontal, com largura maior que altura.",
    };
  }

  return {
    valid: true,
    width: image.naturalWidth,
    height: image.naturalHeight,
    previewUrl: dataUrl,
  };
}

export async function validateRemoteHorizontalImage(url) {
  if (!url) return { valid: true };

  if (anyImageExtension.test(url) && !acceptedExtensions.test(url)) {
    return { valid: false, message: "Use imagem horizontal em JPG, PNG ou WEBP." };
  }

  try {
    const image = await loadImageFromSource(url);
    return image.naturalWidth > image.naturalHeight
      ? { valid: true, width: image.naturalWidth, height: image.naturalHeight }
      : { valid: false, message: "A imagem precisa ser horizontal, com largura maior que altura." };
  } catch {
    return { valid: false, message: "Nao foi possivel validar a imagem. Confira a URL informada." };
  }
}

export async function createImagePreview(file) {
  const validation = await validateImageFile(file);
  if (!validation.valid) return validation;
  return validation;
}

export async function optimizeImageFile(file, options = {}) {
  const validation = await validateImageFile(file);
  if (!validation.valid) throw new Error(validation.message);

  const {
    maxWidth = 1600,
    maxHeight = 1000,
    quality = 0.86,
  } = options;

  const image = await loadImageFromSource(validation.previewUrl);
  const scale = Math.min(maxWidth / image.naturalWidth, maxHeight / image.naturalHeight, 1);
  const width = Math.round(image.naturalWidth * scale);
  const height = Math.round(image.naturalHeight * scale);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;
  if (!context) throw new Error("Nao foi possivel preparar a imagem.");
  context.drawImage(image, 0, 0, width, height);

  const blob = await canvasToBlob(canvas, "image/webp", quality);

  return {
    blob,
    width,
    height,
    originalName: file.name,
    originalSize: file.size,
    size: blob.size,
    type: "image/webp",
  };
}

export async function uploadPetImages(files, { petId, ongId } = {}) {
  if (!files?.length) {
    return { urls: [], coverUrl: "", metadata: [] };
  }

  const normalizedPetId = petId || `pet_${Date.now()}`;
  const normalizedOngId = ongId || "ong";
  const uploads = [];

  for (const [index, file] of Array.from(files).entries()) {
    const optimized = await optimizeImageFile(file);

    if (isSupabaseConfigured) {
      const path = `${normalizedOngId}/${normalizedPetId}/${Date.now()}-${index}.webp`;
      const { error } = await supabase.storage
        .from(PET_IMAGE_BUCKET)
        .upload(path, optimized.blob, {
          contentType: optimized.type,
          upsert: true,
        });

      if (error) throw new Error(error.message);

      const { data } = supabase.storage.from(PET_IMAGE_BUCKET).getPublicUrl(path);
      uploads.push({ url: data.publicUrl, metadata: { ...optimized, path } });
    } else {
      const url = await fileToDataUrl(optimized.blob);
      uploads.push({ url, metadata: optimized });
    }
  }

  return {
    urls: uploads.map((item) => item.url),
    coverUrl: uploads[0]?.url || "",
    metadata: uploads.map((item) => item.metadata),
  };
}
