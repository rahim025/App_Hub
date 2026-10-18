import Prose from "../../components/Prose";
import { site } from "../../lib/site";

export const metadata = { title: "Mentions légales" };

export default function Legal() {
  return (
    <Prose title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>{site.name} est édité par {site.owner}, à titre personnel. Contact : <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <h2>Directeur de la publication</h2>
      <p>{site.owner}.</p>
      <h2>Hébergement</h2>
      <p>Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis. Les données sont stockées chez Neon (base de données PostgreSQL).</p>
      <h2>Propriété intellectuelle</h2>
      <p>Les projets présentés dans le catalogue restent la propriété de leurs créateurs. L’identité visuelle d’{site.name} ne peut être reproduite sans autorisation.</p>
      <h2>Responsabilité</h2>
      <p>{site.name} référence des liens vers des projets hébergés par des tiers et ne peut être tenu responsable de leur contenu ni de leur disponibilité.</p>
    </Prose>
  );
}
