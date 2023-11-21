export function generateUniqueId(prefix?: string) {
  return `${prefix || 'uniqueId'}_${Math.floor(Math.random() * 9999)}`;
}
