export const BLOG_CATEGORIES = [
  ["adocao", "Adocao"],
  ["saude", "Saude preventiva"],
  ["comportamento", "Comportamento"],
  ["nutricao", "Nutricao"],
  ["higiene", "Higiene"],
  ["bem-estar", "Bem-estar"],
];

export const BLOG_ARTICLES = [
  {
    id: "primeiros-dias-adocao",
    title: "Primeiros dias depois da adocao: como preparar uma chegada tranquila",
    category: "adocao",
    readTime: "6 min",
    featured: true,
    summary:
      "A chegada ao novo lar deve ser calma, previsivel e sem excesso de estimulos. O pet precisa de tempo para entender cheiros, sons, pessoas e rotina.",
    keyTakeaways: [
      "Prepare um espaco seguro antes de buscar o pet.",
      "Evite visitas, passeios longos e apresentacoes intensas no primeiro momento.",
      "Crie rotina simples para alimentacao, descanso e banheiro.",
    ],
    sections: [
      {
        heading: "Comece pequeno",
        body:
          "Muitos pets adotados chegam cansados ou inseguros. Em vez de liberar a casa inteira, ofereca um comodo inicial com agua, comida, caminha, brinquedo e, no caso dos gatos, caixa de areia. A ASPCA orienta que alguns animais precisam de mais tempo para se sentir confortaveis em um novo ambiente.",
      },
      {
        heading: "Rotina vale mais que entusiasmo",
        body:
          "Nos primeiros dias, mantenha horarios previsiveis. Falar baixo, evitar broncas e reduzir novidades ajuda o pet a associar a casa a seguranca. Se houver outros animais, faca apresentacoes graduais e supervisionadas.",
      },
      {
        heading: "Quando procurar ajuda",
        body:
          "Procure veterinario ou profissional de comportamento se houver apatia persistente, agressividade intensa, falta de apetite, vomitos, diarreia, fuga recorrente ou medo extremo.",
      },
    ],
    sources: [
      {
        label: "ASPCA - Adoption Tips",
        url: "https://www.aspca.org/adopt-pet/adoption-tips",
      },
      {
        label: "ASPCA - Moving With Your Pet",
        url: "https://www.aspca.org/pet-care/general-pet-care/moving-your-pet",
      },
    ],
  },
  {
    id: "vacinacao-caes-gatos",
    title: "Vacinacao de caes e gatos: o que e essencial saber",
    category: "saude",
    readTime: "7 min",
    featured: true,
    summary:
      "Vacinas reduzem risco de doencas graves, mas o protocolo ideal depende de especie, idade, historico e exposicao. A antirrabica tambem tem relevancia publica.",
    keyTakeaways: [
      "Vacina nao e igual para todo pet: estilo de vida importa.",
      "Filhotes, adultos e idosos precisam de planos diferentes.",
      "A antirrabica deve ser mantida em dia conforme regra local e orientacao veterinaria.",
    ],
    sections: [
      {
        heading: "Vacinas essenciais e vacinas por risco",
        body:
          "Guias veterinarios como os da AAHA diferenciam vacinas essenciais e vacinas indicadas conforme risco. Um animal que frequenta banho e tosa, hotel, rua ou ambientes com muitos pets pode ter necessidades diferentes de um animal estritamente indoor.",
      },
      {
        heading: "Nao copie o protocolo de outro animal",
        body:
          "Idade, estado de saude, historico vacinal, gravidez, uso de medicamentos e exposicao ambiental alteram a decisao. Por isso, o calendario deve ser definido com veterinario.",
      },
      {
        heading: "Sinais de alerta",
        body:
          "Apos vacinas, reacoes leves podem acontecer. Procure atendimento se houver inchaco facial, dificuldade para respirar, vomitos repetidos, fraqueza intensa ou piora rapida.",
      },
    ],
    sources: [
      {
        label: "AAHA - Pet Vaccination",
        url: "https://www.aaha.org/resources/pet-vaccination/",
      },
      {
        label: "SMS Salvador - Vacina antirrabica",
        url: "https://saude.salvador.ba.gov.br/vacina-antirrabica-para-caes-e-gatos/",
      },
    ],
  },
  {
    id: "alimentacao-segura",
    title: "Alimentacao segura: como escolher comida sem cair em modismos",
    category: "nutricao",
    readTime: "7 min",
    featured: true,
    summary:
      "Boa alimentacao combina qualidade, adequacao ao pet e acompanhamento. Rotulo bonito nao substitui avaliacao nutricional.",
    keyTakeaways: [
      "Escolha alimento adequado para especie, idade e condicao corporal.",
      "Mudancas de dieta devem ser graduais.",
      "Dietas caseiras ou cruas exigem orientacao veterinaria especializada.",
    ],
    sections: [
      {
        heading: "Avaliacao nutricional faz parte da consulta",
        body:
          "As diretrizes da WSAVA e da AAHA reforcam que nutricao deve ser avaliada de forma rotineira, considerando peso, condicao corporal, historico alimentar, petiscos e ambiente.",
      },
      {
        heading: "Troca de alimento precisa de transicao",
        body:
          "Mudancas bruscas podem causar desconforto gastrointestinal. Quando nao ha emergencia medica, faca transicao gradual e observe fezes, apetite, coceira, vomitos e energia.",
      },
      {
        heading: "Cuidado com receitas sem formulacao",
        body:
          "Comida caseira pode ser uma opcao em casos especificos, mas precisa de formulacao completa. Deficiencias nutricionais podem aparecer lentamente e prejudicar saude.",
      },
    ],
    sources: [
      {
        label: "WSAVA - Global Nutrition Guidelines",
        url: "https://wsava.org/global-guidelines/global-nutrition-guidelines/",
      },
      {
        label: "AAHA - Nutrition and Weight Management Guidelines",
        url: "https://www.aaha.org/aaha-guidelines/2021-aaha-nutrition-and-weight-management-guidelines/home/",
      },
    ],
  },
  {
    id: "ansiedade-separacao",
    title: "Ansiedade por separacao: sinais, prevencao e quando pedir ajuda",
    category: "comportamento",
    readTime: "8 min",
    featured: false,
    summary:
      "Ansiedade por separacao nao e birra. Pode envolver sofrimento real e precisa de manejo cuidadoso, sem punicao.",
    keyTakeaways: [
      "Destruicao, vocalizacao e xixi fora do lugar podem ter causa emocional ou medica.",
      "Treinos de ausencia devem ser graduais.",
      "Punir pode piorar o problema.",
    ],
    sections: [
      {
        heading: "Primeiro descarte causas medicas",
        body:
          "Antes de tratar como comportamento, descarte dor, incontinencia, problemas urinarios, digestivos ou cognitivos. A ASPCA reforca que alguns sinais parecidos com ansiedade podem ter causa medica.",
      },
      {
        heading: "Treine ausencias curtas",
        body:
          "Comece com separacoes muito pequenas, abaixo do limite em que o pet entra em panico. Associe saidas a experiencias positivas e avance devagar.",
      },
      {
        heading: "Casos graves precisam de equipe",
        body:
          "Se o pet se machuca, tenta fugir, baba, treme ou entra em panico, procure veterinario, comportamentalista qualificado ou especialista em comportamento veterinario.",
      },
    ],
    sources: [
      {
        label: "ASPCA - Separation Anxiety",
        url: "https://www.aspca.org/pet-care/dog-care/common-dog-behavior-issues/separation-anxiety",
      },
      {
        label: "ASPCApro - Separation Anxiety in Dogs",
        url: "https://www.aspcapro.org/resource/preventing-treating-separation-anxiety-dogs",
      },
    ],
  },
  {
    id: "higiene-saude-oral",
    title: "Higiene e saude oral: por que boca tambem e saude",
    category: "higiene",
    readTime: "5 min",
    featured: false,
    summary:
      "Dentes, gengiva e mau halito merecem atencao. Saude oral ruim pode causar dor, perda dentaria e queda de qualidade de vida.",
    keyTakeaways: [
      "Acostume o pet ao toque na boca aos poucos.",
      "Use produtos veterinarios, nunca pasta dental humana.",
      "Mau halito forte, sangramento ou dor exigem veterinario.",
    ],
    sections: [
      {
        heading: "Comece com adaptacao",
        body:
          "Antes de escovar, treine o pet a aceitar toque no focinho, labios e dentes. Recompense calma. A escovacao so funciona se for segura para animal e tutor.",
      },
      {
        heading: "Produtos corretos importam",
        body:
          "Use escova, dedeira ou produto indicado para pets. Pasta humana pode conter ingredientes inadequados para animais.",
      },
      {
        heading: "Limpeza profissional",
        body:
          "Tartaro, dor, mobilidade dentaria e gengiva inflamada precisam de avaliacao veterinaria. Procedimentos dentarios devem ser feitos com seguranca e orientacao profissional.",
      },
    ],
    sources: [
      {
        label: "AVMA - Pet Dental Care",
        url: "https://ebusiness.avma.org/files/productdownloads/petdentalcare_brochure.pdf",
      },
      {
        label: "AAHA/AVMA - Preventive Healthcare",
        url: "https://www.aaha.org/resources/preventive-healthcare-for-pets/",
      },
    ],
  },
  {
    id: "socializacao-segura",
    title: "Socializacao sem pressa: apresentando pessoas, caes e gatos",
    category: "comportamento",
    readTime: "6 min",
    featured: false,
    summary:
      "Socializacao nao e jogar o pet em qualquer ambiente. O objetivo e criar experiencias positivas e controladas.",
    keyTakeaways: [
      "Apresentacoes devem ser graduais e supervisionadas.",
      "Respeite sinais de medo, fuga e desconforto.",
      "Evite parques e aglomeracoes logo apos a adocao.",
    ],
    sections: [
      {
        heading: "Observe linguagem corporal",
        body:
          "Rabo baixo, corpo rigido, rosnado, orelhas para tras, tentativa de fuga e bocejos repetidos podem indicar estresse. Interrompa antes de escalar.",
      },
      {
        heading: "Use distancia a favor",
        body:
          "Nem todo encontro precisa ser contato direto. Muitas vezes, ver outro animal de longe e receber recompensa e um passo melhor que forcar aproximacao.",
      },
      {
        heading: "Gatos precisam de territorio",
        body:
          "Para gatos, introducao deve incluir separacao inicial, troca de cheiros, rotas de fuga, locais altos e acesso seguro a caixa de areia.",
      },
    ],
    sources: [
      {
        label: "AAHA - Behavior Management Guidelines",
        url: "https://www.aaha.org/wp-content/uploads/2019/05/2015_aaha_canine_and_feline_behavior_management_guidelines_final.pdf",
      },
      {
        label: "ASPCA - Moving With Your Pet",
        url: "https://www.aspca.org/pet-care/general-pet-care/moving-your-pet",
      },
    ],
  },
  {
    id: "castracao-responsavel",
    title: "Castracao responsavel: beneficios, limites e decisao veterinaria",
    category: "saude",
    readTime: "6 min",
    featured: false,
    summary:
      "Castracao ajuda no controle populacional e pode trazer beneficios de saude, mas idade e momento devem ser avaliados individualmente.",
    keyTakeaways: [
      "Nao existe uma unica idade ideal para todos os animais.",
      "Converse sobre riscos, beneficios, porte, especie e historico.",
      "Programas publicos podem exigir vacina antirrabica atualizada.",
    ],
    sections: [
      {
        heading: "Controle populacional e saude",
        body:
          "Castracao reduz nascimento indesejado e pode prevenir problemas reprodutivos. A decisao deve considerar especie, porte, idade, doencas previas e contexto do tutor.",
      },
      {
        heading: "Programas publicos tem regras",
        body:
          "Servicos publicos costumam exigir documentos e vacina antirrabica recente. Em Salvador, a informacao oficial de castracao cita RG, cartao SUS e cartao de vacina antirrabica.",
      },
      {
        heading: "Recuperacao exige cuidado",
        body:
          "Apos cirurgia, siga orientacao sobre colar, repouso, limpeza, medicacao e retorno. Nao medique por conta propria.",
      },
    ],
    sources: [
      {
        label: "AVMA - Spay/Neuter Brochure",
        url: "https://ebusiness.avma.org/files/productdownloads/spay_neuter_brochure.pdf",
      },
      {
        label: "SMS Salvador - Castracao gratuita",
        url: "https://saude.salvador.ba.gov.br/populacao-pode-agendar-castracao-gratuita-de-caes-e-gatos/",
      },
    ],
  },
  {
    id: "enriquecimento-ambiental",
    title: "Enriquecimento ambiental: menos tedio, mais bem-estar",
    category: "bem-estar",
    readTime: "6 min",
    featured: false,
    summary:
      "Enriquecimento e oferecer oportunidades seguras para cheirar, explorar, brincar, descansar e resolver pequenos desafios.",
    keyTakeaways: [
      "Nao precisa ser caro: rotina e criatividade ajudam muito.",
      "Cães precisam cheirar e se movimentar; gatos precisam escalar e arranhar.",
      "Seguranca vem antes de brinquedo bonito.",
    ],
    sections: [
      {
        heading: "Para caes",
        body:
          "Passeios com cheiros, brinquedos recheaveis, treino curto, busca controlada e descanso ajudam a reduzir tedio. Ajuste intensidade a idade e saude.",
      },
      {
        heading: "Para gatos",
        body:
          "Arranhadores, prateleiras, esconderijos, brincadeiras de caca com varinha e janelas teladas enriquecem a rotina indoor.",
      },
      {
        heading: "Evite excesso",
        body:
          "Pet tambem precisa dormir. Se o animal fica mais irritado, ofegante ou obsessivo, reduza estimulos e procure orientacao.",
      },
    ],
    sources: [
      {
        label: "AAHA - Behavior Management Guidelines",
        url: "https://www.aaha.org/wp-content/uploads/2019/05/2015_aaha_canine_and_feline_behavior_management_guidelines_final.pdf",
      },
      {
        label: "ASPCA - General Cat Care",
        url: "https://www.aspca.org/pet-care/cat-care/general-cat-care",
      },
    ],
  },
  {
    id: "saude-preventiva",
    title: "Saude preventiva: consultas antes do problema aparecer",
    category: "saude",
    readTime: "5 min",
    featured: false,
    summary:
      "Prevenir e acompanhar peso, boca, pele, vacinas, parasitas, comportamento e mudancas sutis antes que virem urgencia.",
    keyTakeaways: [
      "Frequencia de consulta deve ser individual.",
      "Filhotes, idosos e pets com doencas precisam de mais acompanhamento.",
      "Mudancas pequenas de rotina podem sinalizar problema.",
    ],
    sections: [
      {
        heading: "Consulta nao e so vacina",
        body:
          "A avaliacao preventiva inclui peso, condicao corporal, boca, pele, ouvidos, comportamento, dieta, parasitas e historico. AAHA/AVMA destacam a importancia de cuidado preventivo individualizado.",
      },
      {
        heading: "Observe sinais discretos",
        body:
          "Beber mais agua, perder peso, se esconder, mancar, dormir demais, coceira intensa ou mudar apetite sao motivos para investigar.",
      },
      {
        heading: "Leve informacoes",
        body:
          "Fotos, videos, lista de alimentos, medicamentos, vacinas e datas ajudam o veterinario a entender o quadro real.",
      },
    ],
    sources: [
      {
        label: "AAHA/AVMA - Preventive Healthcare",
        url: "https://www.aaha.org/resources/preventive-healthcare-for-pets/",
      },
      {
        label: "AAHA - Frequency of Veterinary Visits",
        url: "https://www.aaha.org/frequency-of-veterinary-visits/",
      },
    ],
  },
  {
    id: "seguranca-casa",
    title: "Casa segura para caes e gatos: checklist antes de adotar",
    category: "bem-estar",
    readTime: "5 min",
    featured: false,
    summary:
      "Uma casa preparada reduz fugas, acidentes e estresse. O preparo deve acontecer antes do pet chegar.",
    keyTakeaways: [
      "Gatos precisam de telas e rotas seguras.",
      "Produtos toxicos, fios e lixo devem ficar fora de alcance.",
      "Defina espaco de descanso longe de excesso de movimento.",
    ],
    sections: [
      {
        heading: "Controle acesso",
        body:
          "Portas, janelas, sacadas, portoes e frestas sao pontos criticos. Gatos devem viver em ambiente telado e caes recem-adotados precisam de supervisao em saidas.",
      },
      {
        heading: "Retire riscos previsiveis",
        body:
          "Guarde produtos de limpeza, medicamentos, plantas toxicas, objetos cortantes, fios soltos e alimentos perigosos. Se houver criancas, combine regras de interacao.",
      },
      {
        heading: "Monte uma base segura",
        body:
          "Cama, agua, comida, brinquedos, banheiro e local de descanso devem ficar acessiveis. Para gatos, a caixa de areia precisa estar em local tranquilo.",
      },
    ],
    sources: [
      {
        label: "ASPCA - Adoption Tips",
        url: "https://www.aspca.org/adopt-pet/adoption-tips",
      },
      {
        label: "ASPCA - General Cat Care",
        url: "https://www.aspca.org/pet-care/cat-care/general-cat-care",
      },
    ],
  },
];
