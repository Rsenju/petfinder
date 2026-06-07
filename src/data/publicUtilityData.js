export const PUBLIC_CATEGORIES = [
  ["vacinacao", "Vacinacao"],
  ["castracao", "Castracao"],
  ["zoonoses", "Zoonoses"],
  ["viagem", "Viagens"],
  ["documentos", "Documentos"],
  ["microchip", "Microchip"],
];

export const OFFICIAL_GUIDES = [
  {
    id: "guia-vacina-raiva",
    category: "vacinacao",
    title: "Vacina antirrabica e gratuita em campanhas publicas",
    summary:
      "A antirrabica e a vacina publica essencial para caes e gatos. Em Salvador, a orientacao oficial informa vacinacao anual e atendimento para animais a partir de 3 meses.",
    action: "Verifique postos e calendario no municipio antes de sair.",
    sourceLabel: "SMS Salvador",
    sourceUrl: "https://saude.salvador.ba.gov.br/vacina-antirrabica-para-caes-e-gatos/",
  },
  {
    id: "guia-vacinas-recomendadas",
    category: "vacinacao",
    title: "Vacinas alem da antirrabica devem ser orientadas por veterinario",
    summary:
      "Vacinas polivalentes e protocolos especificos variam conforme idade, especie, historico, ambiente e risco. Use a informacao publica como ponto de partida, nao como substituto de consulta.",
    action: "Leve carteira de vacinacao e historico do pet ao veterinario.",
    sourceLabel: "Orientacao PetFinder",
    sourceUrl: "",
  },
  {
    id: "guia-transito-nacional",
    category: "viagem",
    title: "Viagem nacional com caes e gatos dispensa GTA",
    summary:
      "O MAPA informa que caes e gatos em transito nacional nao precisam de GTA, mas devem estar acompanhados de atestado sanitario emitido por medico veterinario registrado no CRMV.",
    action: "Antes de viajar, emita atestado sanitario e confira regras da companhia transportadora.",
    sourceLabel: "MAPA - Caes e Gatos",
    sourceUrl: "https://www.gov.br/agricultura/pt-br/assuntos/sanidade-animal-e-vegetal/saude-animal/cgtqa/t_nacional/caes-e-gatos",
  },
  {
    id: "guia-transporte-companhia",
    category: "viagem",
    title: "Transporte aereo ou rodoviario exige atestado de saude",
    summary:
      "O guia de servicos do MAPA reforca que, em viagens aereas ou rodoviarias dentro do pais, o tutor deve portar atestado de saude do animal.",
    action: "Confirme prazo de validade do atestado e regras da empresa antes da compra.",
    sourceLabel: "MAPA - Transporte de Animais de Companhia",
    sourceUrl: "https://www.gov.br/agricultura/pt-br/guia-de-servicos/transporte-de-animais-de-companhia",
  },
  {
    id: "guia-microchip",
    category: "microchip",
    title: "Microchip ajuda identificacao, especialmente em viagens",
    summary:
      "O modelo oficial de atestado sanitario nacional possui campo para numero e localizacao de microchip quando presente. Para viagem internacional, exigencias podem ser mais rigorosas.",
    action: "Consulte veterinario e regras do destino antes de microchipar ou viajar.",
    sourceLabel: "Modelo MAPA de atestado sanitario",
    sourceUrl: "https://www.gov.br/agricultura/pt-br/assuntos/sanidade-animal-e-vegetal/saude-animal/transito-animal/arquivos-transito-internacional/Atestadoparatrnsitonacionaldecesegatos.pdf",
  },
];

export const PUBLIC_SERVICES = [
  {
    id: "salvador-vacina-antirrabica",
    city: "Salvador",
    category: "vacinacao",
    title: "Vacina antirrabica para caes e gatos",
    agency: "Secretaria Municipal da Saude / CCZ",
    description:
      "Servico ocorre durante o ano e tambem em campanhas por bairros. A vacina gratuita ofertada pelo Ministerio da Saude e a antirrabica.",
    requirements: "Caes e gatos a partir de 3 meses; animais doentes ou debilitados nao devem ser vacinados.",
    contact: "Fala Salvador 156",
    address: "Postos e unidades de saude do municipio",
    sourceLabel: "SMS Salvador",
    sourceUrl: "https://saude.salvador.ba.gov.br/vacina-antirrabica-para-caes-e-gatos/",
  },
  {
    id: "salvador-castracao",
    city: "Salvador",
    category: "castracao",
    title: "Castracao gratuita de caes e gatos",
    agency: "DIPA / Secretaria Municipal da Saude",
    description:
      "A prefeitura informa agendamento para castracao gratuita pela rede municipal, com objetivo de controle populacional e reducao de abandono.",
    requirements:
      "RG, cartao SUS do responsavel e cartao de vacina antirrabica do animal. A vacina deve ter menos de um ano.",
    contact: "Unidades de Saude de Referencia ou canais oficiais da DIPA/SMS",
    address: "Rede municipal de Salvador",
    sourceLabel: "SMS Salvador - DIPA",
    sourceUrl: "https://saude.salvador.ba.gov.br/populacao-pode-agendar-castracao-gratuita-de-caes-e-gatos/",
  },
  {
    id: "salvador-ccz",
    city: "Salvador",
    category: "zoonoses",
    title: "Centro de Controle de Zoonoses",
    agency: "CCZ Salvador",
    description:
      "O CCZ atua com monitoramento da raiva, vacinacao antirrabica, orientacoes e solicitacoes relacionadas a zoonoses.",
    requirements: "Use os canais oficiais para registrar solicitacoes e denuncias.",
    contact: "Fala Salvador 156",
    address: "Salvador - BA",
    sourceLabel: "SMS Salvador - CCZ",
    sourceUrl: "https://saude.salvador.ba.gov.br/atuacao-do-centro-de-controle-de-zoonoses-de-salvador-garante-prevencao-e-cuidados-a-populacao-saiba-quando-e-como-acionar-o-orgao/",
  },
  {
    id: "lauro-vacina-antirrabica",
    city: "Lauro de Freitas",
    category: "vacinacao",
    title: "Campanha de vacinacao antirrabica",
    agency: "Centro de Controle de Zoonoses / SESA",
    description:
      "A prefeitura informa campanha anual de vacinacao antirrabica organizada pelo CCZ, vinculado a Secretaria Municipal de Saude.",
    requirements: "A vacina deve ser aplicada anualmente. Consulte calendario e pontos do municipio.",
    contact: "Canais oficiais da Prefeitura de Lauro de Freitas",
    address: "Postos divulgados pela prefeitura",
    sourceLabel: "Prefeitura de Lauro de Freitas",
    sourceUrl: "https://laurodefreitas.ba.gov.br/site/noticia/dia-d-da-vacinacao-antirrabica-em-lauro-de-freitas-acontece-neste-sabado-30/6086",
  },
  {
    id: "feira-vacina-antirrabica",
    city: "Feira de Santana",
    category: "vacinacao",
    title: "Vacina contra raiva animal na UCZ",
    agency: "Unidade de Controle de Zoonoses",
    description:
      "A prefeitura informou que, mesmo apos campanha, a vacinacao gratuita segue na sede da Unidade de Controle de Zoonoses.",
    requirements: "Animais com mais de 3 meses e caderneta atrasada devem ser imunizados.",
    contact: "UCZ / Secretaria Municipal de Saude",
    address: "Pedra do Descanso, Feira de Santana - BA",
    sourceLabel: "Prefeitura de Feira de Santana",
    sourceUrl: "https://www.feiradesantana.ba.gov.br/secom/noticias.asp?idn=41355",
  },
  {
    id: "feira-ccz",
    city: "Feira de Santana",
    category: "zoonoses",
    title: "Centro Municipal de Controle de Zoonoses",
    agency: "CCZ Feira de Santana",
    description:
      "O CCZ informou atendimento para controle de zoonoses, vacinacao antirrabica, exames de leishmaniose e suporte a animais com suspeita de doencas.",
    requirements: "Entre em contato antes de deslocar animal ao servico.",
    contact: "(75) 3617-3237 / WhatsApp (75) 9 9851-8583",
    address: "Feira de Santana - BA",
    sourceLabel: "Prefeitura de Feira de Santana",
    sourceUrl: "https://www.feiradesantana.ba.gov.br/secom/noticias.asp?idn=38274",
  },
];

export const PUBLIC_CHECKLIST = [
  "Mantenha vacina antirrabica anual em dia.",
  "Guarde carteira de vacinacao e comprovantes de atendimento veterinario.",
  "Para viagem nacional, providencie atestado sanitario com veterinario registrado no CRMV.",
  "Consulte a prefeitura antes de procurar castracao ou vacinacao publica.",
  "Em suspeita de zoonose, mordedura ou animal morto suspeito, acione o CCZ/canal oficial.",
];
