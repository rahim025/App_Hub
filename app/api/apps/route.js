import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { sql } from "../../../lib/db";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.pseudo) {
    return Response.json({ error: "Réservé aux créateurs" }, { status: 401 });
  }

  const { name, category, url } = await request.json();

  if (!name || !category || !url) {
    return Response.json({ error: "Champs manquants" }, { status: 400 });
  }

  await sql`ALTER TABLE apps ADD COLUMN IF NOT EXISTS creator text`;
  await sql`INSERT INTO apps (name, category, url, creator) VALUES (${name}, ${category}, ${url}, ${session.user.pseudo})`;

  return Response.json({ ok: true });
}
