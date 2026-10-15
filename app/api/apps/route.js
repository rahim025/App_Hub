import { sql } from "../../../lib/db";

export async function POST(request) {
  const { name, category, url } = await request.json();

  if (!name || !category || !url) {
    return Response.json({ error: "Champs manquants" }, { status: 400 });
  }

  await sql`INSERT INTO apps (name, category, url) VALUES (${name}, ${category}, ${url})`;

  return Response.json({ ok: true });
}
