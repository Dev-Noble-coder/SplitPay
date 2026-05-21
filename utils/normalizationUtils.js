/**
 * Recursively normalizes all fields that contain 'email' in their key names
 * to be trimmed and lowercased.
 */
export function normalizeEmailFields(obj) {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(normalizeEmailFields);
  }

  const normalized = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      if (typeof key === "string" && key.toLowerCase().includes("email") && typeof val === "string") {
        normalized[key] = val.trim().toLowerCase();
      } else if (typeof val === "object" && val !== null) {
        normalized[key] = normalizeEmailFields(val);
      } else {
        normalized[key] = val;
      }
    }
  }
  return normalized;
}
