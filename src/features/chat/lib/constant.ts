export const MAX_SIZE = 1 * 1024 * 1024;
export const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "text/plain",
];

export const validateAttachment = (file: File): string | null => {
  if (file.size > MAX_SIZE) {
    return `"${file.name}" exceeds 1MB limit`;
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `"${file.name}" is not allowed. Only images and text files are accepted`;
  }
  return null;
};
