import { ongs } from "../data/mockData";

export default function Ongs() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">ONGs parceiras</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {ongs.map((ong) => (
          <article key={ong.id} className="rounded-xl border border-slate-700 bg-slate-800 p-5">
            <img src={ong.image} alt={ong.name} className="h-40 w-full rounded-lg bg-white object-contain p-2" />
            <h2 className="mt-4 text-xl font-semibold">{ong.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{ong.city} - {ong.neighborhood}</p>
            <p className="mt-3 text-sm text-slate-300">{ong.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
