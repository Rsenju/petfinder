import { useParams } from "react-router-dom";
import { ongs } from "../data/mockData";

export default function OngProfile() {
  const { id } = useParams();
  const ong = ongs.find((item) => item.id === id) || ongs[0];
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <img src={ong.image} alt={ong.name} className="h-72 w-full rounded-2xl object-cover" />
      <h1 className="mt-6 text-3xl font-bold">{ong.name}</h1>
      <p className="mt-3 text-slate-300">{ong.description}</p>
      <p className="mt-4 text-slate-400">{ong.city} - {ong.neighborhood} - {ong.whatsapp}</p>
    </main>
  );
}
