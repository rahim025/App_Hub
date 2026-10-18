import Prose from "../../components/Prose";
import { site } from "../../lib/site";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <Prose title="Contact">
      <p>Une question, une suggestion ou un projet à signaler ? Écrivez-nous, nous répondons dans les meilleurs délais.</p>
      <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
      <h2>Signaler un projet</h2>
      <p>Pour signaler un contenu illicite, trompeur ou dangereux, indiquez le nom du projet et la raison du signalement. Le projet sera examiné puis retiré si nécessaire.</p>
    </Prose>
  );
}
