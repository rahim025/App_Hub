import { sql } from "./db";

export async function getApps() {
  try {
    return await sql`SELECT name, category, url, creator FROM apps ORDER BY created_at DESC`;
  } catch (e) {
    // La colonne "creator" n'existe qu'après la première publication.
    return await sql`SELECT name, category, url, NULL AS creator FROM apps ORDER BY created_at DESC`;
  }
}

export async function getApp(name) {
  const rows = (await getApps()).filter((a) => a.name === name);
  return rows[0] || null;
}
