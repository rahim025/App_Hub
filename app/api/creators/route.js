import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { sql } from "../../../lib/db";

const ALLOWED = ["Web", "Jeu", "SaaS", "IA", "Outil"];

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return Response.json({ error: "Non connecté" }, { status: 401 });

  const { pseudo, categories } = await request.json();
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(pseudo || "")) {
    return Response.json({ error: "Pseudo invalide" }, { status: 400 });
  }
  const cats = (Array.isArray(categories) ? categories : []).filter((c) => ALLOWED.includes(c));

  await sql`CREATE TABLE IF NOT EXISTS creators (
    email text PRIMARY KEY,
    pseudo text UNIQUE NOT NULL,
    image text,
    categories text,
    created_at timestamptz DEFAULT now()
  )`;

  try {
    await sql`INSERT INTO creators (email, pseudo, image, categories)
      VALUES (${email}, ${pseudo}, ${session.user.image || null}, ${cats.join(",")})`;
  } catch (e) {
    return Response.json({ error: "Pseudo ou compte déjà utilisé" }, { status: 409 });
  }
  return Response.json({ ok: true }, { status: 201 });
}
