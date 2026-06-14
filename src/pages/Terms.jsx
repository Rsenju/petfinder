import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-300 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Termos de Uso</h1>
      <p className="mt-3 text-sm text-slate-400">Última atualização: 11 de junho de 2026.</p>

      <div className="mt-8 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white">Finalidade da plataforma</h2>
          <p className="mt-2">
            O PetFinder aproxima adotantes e ONGs. A plataforma não vende animais e não substitui a avaliação, a
            entrevista ou o termo de responsabilidade definidos pela ONG.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white">Responsabilidade das informações</h2>
          <p className="mt-2">
            As ONGs são responsáveis por manter dados, disponibilidade, saúde e contatos dos pets atualizados. O
            adotante deve fornecer informações verdadeiras no pedido de pré-adoção.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white">Uso adequado</h2>
          <p className="mt-2">
            Não é permitido enviar spam, informações falsas, conteúdo ofensivo ou tentar acessar dados e áreas sem
            autorização. Conteúdos e contas podem ser moderados ou bloqueados.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white">Serviços externos</h2>
          <p className="mt-2">
            O contato pode continuar pelo WhatsApp. O uso desse serviço está sujeito aos termos e políticas do próprio
            fornecedor.
          </p>
        </section>
      </div>

      <Link to="/privacidade" className="mt-8 inline-flex font-semibold text-blue-300 hover:text-blue-200">
        Consultar Política de Privacidade
      </Link>
    </main>
  );
}
