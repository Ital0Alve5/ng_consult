export default function validateName(name: string): boolean {
  const sanitized = sanitizeName(name);
  return sanitized.split(" ").length > 1 && /^[a-zA-ZÀ-ÿ\s]+$/.test(sanitized);
}

function sanitizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}
