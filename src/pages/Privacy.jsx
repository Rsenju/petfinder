import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-300 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Política de Privacidade</h1>
      <p className="mt-3 text-sm text-slate-400">Última atualização: 11 de junho de 2026.</p>

      <div className="mt-8 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white">Dados coletados</h2>
          <p className="mt-2">
            No pedido de pré-adoção, o PetFinder coleta nome, telefone, bairro e respostas sobre a preparação do lar.
            Esses dados são necessários para que a ONG responsável avalie o contato.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white">Compartilhamento</h2>
          <p className="mt-2">
            As informações do pedido são disponibilizadas à ONG responsável pelo pet e incluídas na mensagem aberta no
            WhatsApp. O WhatsApp possui política de privacidade própria.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white">Finalidade e segurança</h2>
          <p className="mt-2">
            Os dados devem ser usados somente para atendimento e acompanhamento da adoção. O acesso administrativo é
            limitado por autenticação e regras de segurança do banco de dados.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white">Seus direitos</h2>
          <p className="mt-2">
            Você pode solicitar confirmação, correção ou exclusão dos seus dados entrando em contato com a ONG que
            recebeu o pedido ou com a administração do PetFinder.
          </p>
        </section>
      </div>

      <Link to="/termos" className="mt-8 inline-flex font-semibold text-blue-300 hover:text-blue-200">
        Consultar Termos de Uso
      </Link>
    </main>
  );
}
