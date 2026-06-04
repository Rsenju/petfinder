export default function Sobre() {
  return <SimplePage title="Sobre o PetFinder" text="Produto para aproximar ONGs e adotantes em um fluxo claro de adocao responsavel." />;
}

function SimplePage({ title, text }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4 text-slate-300">{text}</p>
    </main>
  );
}
