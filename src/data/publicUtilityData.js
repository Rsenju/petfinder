export const PUBLIC_CATEGORIES = [
  ["vacinacao", "Vacinação"],
  ["castracao", "Castração"],
  ["zoonoses", "Zoonoses"],
  ["viagem", "Viagens"],
  ["documentos", "Documentos"],
  ["microchip", "Microchip"],
];

export const OFFICIAL_GUIDES = [
  {
    id: "guia-vacina-raiva",
    category: "vacinacao",
    title: "Vacina antirrábica e gratuita em campanhas publicas",
    summary:
      "A antirrábica e a vacina pública essencial para cães e gatos. Em Salvador, a orientação oficial informa vacinação anual e atendimento para animais a partir de 3 meses.",
    action: "Verifique postos e calendário no municipio antes de sair.",
    sourceLabel: "SMS Salvador",
    sourceUrl: "https://saude.salvador.ba.gov.br/vacina-antirrabica-para-caes-e-gatos/",
  },
  {
    id: "guia-vacinas-recomendadas",
    category: "vacinacao",
    title: "Vacinas alem da antirrábica devem ser orientadas por veterinário",
    summary:
      "Vacinas polivalentes e protocolos especificos variam conforme idade, espécie, histórico, ambiente e risco. Use a informacao pública como ponto de partida, não como substituto de consulta.",
    action: "Leve carteira de vacinação e histórico do pet ao veterinário.",
    sourceLabel: "Orientacao PetFinder",
    sourceUrl: "",
  },
  {
    id: "guia-transito-nacional",
    category: "viagem",
    title: "Viagem nacional com cães e gatos dispensa GTA",
    summary:
      "O MAPA informa que cães e gatos em trânsito nacional não precisam de GTA, mas devem estar acompanhados de atestado sanitario emitido por medico veterinário registrado no CRMV.",
    action: "Antes de viajar, emita atestado sanitario e confira regras da companhia transportadora.",
    sourceLabel: "MAPA - Cães e Gatos",
    sourceUrl: "https://www.gov.br/agricultura/pt-br/assuntos/sanidade-animal-e-vegetal/saude-animal/cgtqa/t_nacional/caes-e-gatos",
  },
  {
    id: "guia-transporte-companhia",
    category: "viagem",
    title: "Transporte aéreo ou rodoviario exige atestado de saúde",
    summary:
      "O guia de serviços do MAPA reforça que, em viagens aéreas ou rodoviárias dentro do país, o tutor deve portar atestado de saúde do animal.",
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
    action: "Consulte veterinário e regras do destino antes de microchipar ou viajar.",
    sourceLabel: "Modelo MAPA de atestado sanitario",
    sourceUrl: "https://www.gov.br/agricultura/pt-br/assuntos/sanidade-animal-e-vegetal/saude-animal/transito-animal/arquivos-transito-internacional/Atestadoparatrnsitonacionaldecesegatos.pdf",
  },
];

export const PUBLIC_SERVICES = [
  {
    id: "salvador-vacina-antirrabica",
    city: "Salvador",
    category: "vacinacao",
    title: "Vacina antirrábica para cães e gatos",
    agency: "Secretaria Municipal da Saúde / CCZ",
    description:
      "Servico ocorre durante o ano e tambem em campanhas por bairros. A vacina gratuita ofertada pelo Ministerio da Saúde e a antirrábica.",
    requirements: "Cães e gatos a partir de 3 meses; animais doentes ou debilitados não devem ser vacinados.",
    contact: "Fala Salvador 156",
    address: "Postos e unidades de saúde do municipio",
    sourceLabel: "SMS Salvador",
    sourceUrl: "https://saude.salvador.ba.gov.br/vacina-antirrabica-para-caes-e-gatos/",
  },
  {
    id: "salvador-castracao",
    city: "Salvador",
    category: "castracao",
    title: "Castração gratuita de cães e gatos",
    agency: "DIPA / Secretaria Municipal da Saúde",
    description:
      "A prefeitura informa agendamento para castração gratuita pela rede municipal, com objetivo de controle populacional e reducao de abandono.",
    requirements:
      "RG, cartao SUS do responsável e cartao de vacina antirrábica do animal. A vacina deve ter menos de um ano.",
    contact: "Unidades de Saúde de Referencia ou canais oficiais da DIPA/SMS",
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
      "O CCZ atua com monitoramento da raiva, vacinação antirrábica, orientações e solicitações relacionadas a zoonoses.",
    requirements: "Use os canais oficiais para registrar solicitações e denuncias.",
    contact: "Fala Salvador 156",
    address: "Salvador - BA",
    sourceLabel: "SMS Salvador - CCZ",
    sourceUrl: "https://saude.salvador.ba.gov.br/atuacao-do-centro-de-controle-de-zoonoses-de-salvador-garante-prevencao-e-cuidados-a-populacao-saiba-quando-e-como-acionar-o-orgao/",
  },
  {
    id: "lauro-vacina-antirrabica",
    city: "Lauro de Freitas",
    category: "vacinacao",
    title: "Campanha de vacinação antirrábica",
    agency: "Centro de Controle de Zoonoses / SESA",
    description:
      "A prefeitura informa campanha anual de vacinação antirrábica organizada pelo CCZ, vinculado a Secretaria Municipal de Saúde.",
    requirements: "A vacina deve ser aplicada anualmente. Consulte calendário e pontos do municipio.",
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
      "A prefeitura informou que, mesmo após campanha, a vacinação gratuita segue na sede da Unidade de Controle de Zoonoses.",
    requirements: "Animais com mais de 3 meses e caderneta atrasada devem ser imunizados.",
    contact: "UCZ / Secretaria Municipal de Saúde",
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
      "O CCZ informou atendimento para controle de zoonoses, vacinação antirrábica, exames de leishmaniose e suporte a animais com suspeita de doenças.",
    requirements: "Entre em contato antes de deslocar animal ao servico.",
    contact: "(75) 3617-3237 / WhatsApp (75) 9 9851-8583",
    address: "Feira de Santana - BA",
    sourceLabel: "Prefeitura de Feira de Santana",
    sourceUrl: "https://www.feiradesantana.ba.gov.br/secom/noticias.asp?idn=38274",
  },
];

export const PUBLIC_CHECKLIST = [
  "Mantenha vacina antirrábica anual em dia.",
  "Guarde carteira de vacinação e comprovantes de atendimento veterinário.",
  "Para viagem nacional, providencie atestado sanitario com veterinário registrado no CRMV.",
  "Consulte a prefeitura antes de procurar castração ou vacinação pública.",
  "Em suspeita de zoonose, mordedura ou animal morto suspeito, acione o CCZ/canal oficial.",
];
