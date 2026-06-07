import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Clock,
  ExternalLink,
  FileText,
  Search,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "../data/blogData";

export default function Blog() {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(BLOG_ARTICLES[0]?.id || "");

  const filteredArticles = useMemo(
    () =>
      BLOG_ARTICLES.filter((article) => {
        const searchTarget = `${article.title} ${article.summary} ${article.keyTakeaways.join(" ")}`.toLowerCase();
        if (category && article.category !== category) return false;
        if (query && !searchTarget.includes(query.toLowerCase())) return false;
        return true;
      }),
    [category, query],
  );

  const selectedArticle = BLOG_ARTICLES.find((article) => article.id === selectedId) || filteredArticles[0] || BLOG_ARTICLES[0];
  const featuredArticles = BLOG_ARTICLES.filter((article) => article.featured);

  const handleSelectArticle = (id) => {
    setSelectedId(id);
    window.requestAnimationFrame(() => {
      document.getElementById("blog-reader")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              <BookOpen className="h-4 w-4" />
              Blog educativo
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">Guias para adoção e cuidado responsável</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
              Conteudo pratico para tutores e adotantes, baseado em fontes veterinarias e organizacoes de bem-estar animal.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-[1fr_220px] lg:w-[620px]">
            <label className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar tema..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-400"
              />
            </label>
            <label className="relative">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 pr-10 text-sm text-white outline-none focus:border-blue-400"
              >
                <option value="">Todos os temas</option>
                {BLOG_CATEGORIES.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </label>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-blue-400/25 bg-blue-400/10 p-4 text-sm text-blue-100">
          <div className="flex gap-3">
            <Stethoscope className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              O blog não substitui consulta veterinária. Em caso de dor, apatia, vômitos, diarreia, feridas,
              falta de apetite, falta de ar ou mudança brusca de comportamento, procure atendimento profissional.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">Destaques</h2>
            <p className="mt-1 text-sm text-slate-400">Leituras recomendadas para começar.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} onSelect={handleSelectArticle} featured />
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
              <FileText className="h-4 w-4 text-blue-300" />
              Todos os artigos
            </h2>
            <p className="mt-1 text-xs text-slate-400">{filteredArticles.length} artigo(s) encontrado(s)</p>
          </div>

          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={handleSelectArticle}
              active={selectedArticle?.id === article.id}
              compact
            />
          ))}

          {filteredArticles.length === 0 && (
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-center text-sm text-slate-400">
              Nenhum artigo encontrado.
            </div>
          )}
        </aside>

        {selectedArticle && <ArticleReader article={selectedArticle} />}
      </section>
    </main>
  );
}

function ArticleCard({ article, onSelect, active = false, compact = false, featured = false }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(article.id)}
      className={`w-full rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-500/60 ${
        active ? "border-blue-500 bg-blue-500/10" : "border-slate-700 bg-slate-800"
      } ${featured ? "min-h-56" : ""}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-200">
          {categoryLabel(article.category)}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          {article.readTime}
        </span>
      </div>
      <h3 className={`${compact ? "mt-3 text-sm" : "mt-4 text-lg"} font-semibold text-white`}>{article.title}</h3>
      <p className={`${compact ? "line-clamp-2" : "line-clamp-3"} mt-2 text-sm leading-relaxed text-slate-300`}>
        {article.summary}
      </p>
    </button>
  );
}

function ArticleReader({ article }) {
  return (
    <article id="blog-reader" className="rounded-2xl border border-slate-700 bg-slate-800 p-5 sm:p-7">
      <header>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-200 ring-1 ring-emerald-500/25">
            {categoryLabel(article.category)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">{article.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{article.summary}</p>
      </header>

      <section className="mt-6 rounded-xl border border-slate-700 bg-slate-900/50 p-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          Pontos principais
        </h2>
        <ul className="mt-3 space-y-2">
          {article.keyTakeaways.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 space-y-5">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-white">{section.heading}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">{section.body}</p>
          </section>
        ))}
      </div>

      <footer className="mt-7 border-t border-slate-700 pt-5">
        <h2 className="text-sm font-semibold text-white">Fontes e leitura complementar</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {article.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-blue-300 hover:border-blue-500/60 hover:text-blue-200"
            >
              {source.label}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </footer>
    </article>
  );
}

function categoryLabel(category) {
  return BLOG_CATEGORIES.find(([value]) => value === category)?.[1] || category;
}
