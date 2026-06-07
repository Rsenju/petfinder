export const BLOG_CATEGORIES = [
  ["adocao", "Adoção"],
  ["saude", "Saúde preventiva"],
  ["comportamento", "Comportamento"],
  ["nutricao", "Nutrição"],
  ["higiene", "Higiene"],
  ["bem-estar", "Bem-estar"],
];

export const BLOG_ARTICLES = [
  {
    id: "primeiros-dias-adocao",
    title: "Primeiros dias depois da adoção: como preparar uma chegada tranquila",
    category: "adocao",
    readTime: "6 min",
    featured: true,
    summary:
      "A chegada ao novo lar deve ser calma, previsível e sem excesso de estímulos. O pet precisa de tempo para entender cheiros, sons, pessoas e rotina.",
    keyTakeaways: [
      "Prepare um espaço seguro antes de buscar o pet.",
      "Evite visitas, passeios longos e apresentações intensas no primeiro momento.",
      "Crie rotina simples para alimentação, descanso e banheiro.",
    ],
    sections: [
      {
        heading: "Comece pequeno",
        body:
          "Muitos pets adotados chegam cansados ou inseguros. Em vez de liberar a casa inteira, ofereca um cômodo inicial com água, comida, caminha, brinquedo e, no caso dos gatos, caixa de areia. A ASPCA orienta que alguns animais precisam de mais tempo para se sentir confortáveis em um novo ambiente.",
      },
      {
        heading: "Rotina vale mais que entusiasmo",
        body:
          "Nos primeiros dias, mantenha horários previsíveis. Falar baixo, evitar broncas e reduzir novidades ajuda o pet a associar a casa a segurança. Se houver outros animais, faca apresentações graduais e supervisionadas.",
      },
      {
        heading: "Quando procurar ajuda",
        body:
          "Procure veterinário ou profissional de comportamento se houver apatia persistente, agressividade intensa, falta de apetite, vomitos, diarreia, fuga recorrente ou medo extremo.",
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
    title: "Vacinação de cães e gatos: o que e essencial saber",
    category: "saude",
    readTime: "7 min",
    featured: true,
    summary:
      "Vacinas reduzem risco de doenças graves, mas o protocolo ideal depende de espécie, idade, histórico e exposição. A antirrábica tambem tem relevancia pública.",
    keyTakeaways: [
      "Vacina não e igual para todo pet: estilo de vida importa.",
      "Filhotes, adultos e idosos precisam de planos diferentes.",
      "A antirrábica deve ser mantida em dia conforme regra local e orientação veterinaria.",
    ],
    sections: [
      {
        heading: "Vacinas essenciais e vacinas por risco",
        body:
          "Guias veterinarios como os da AAHA diferenciam vacinas essenciais e vacinas indicadas conforme risco. Um animal que frequenta banho e tosa, hotel, rua ou ambientes com muitos pets pode ter necessidades diferentes de um animal estritamente indoor.",
      },
      {
        heading: "Não copie o protocolo de outro animal",
        body:
          "Idade, estado de saúde, histórico vacinal, gravidez, uso de medicamentos e exposição ambiental alteram a decisão. Por isso, o calendário deve ser definido com veterinário.",
      },
      {
        heading: "Sinais de alerta",
        body:
          "Após vacinas, reacoes leves podem acontecer. Procure atendimento se houver inchaco facial, dificuldade para respirar, vomitos repetidos, fraqueza intensa ou piora rapida.",
      },
    ],
    sources: [
      {
        label: "AAHA - Pet Vaccination",
        url: "https://www.aaha.org/resources/pet-vaccination/",
      },
      {
        label: "SMS Salvador - Vacina antirrábica",
        url: "https://saude.salvador.ba.gov.br/vacina-antirrabica-para-caes-e-gatos/",
      },
    ],
  },
  {
    id: "alimentacao-segura",
    title: "Alimentação segura: como escolher comida sem cair em modismos",
    category: "nutricao",
    readTime: "7 min",
    featured: true,
    summary:
      "Boa alimentação combina qualidade, adequacao ao pet e acompanhamento. Rotulo bonito não substitui avaliação nutricional.",
    keyTakeaways: [
      "Escolha alimento adequado para espécie, idade e condição corporal.",
      "Mudancas de dieta devem ser graduais.",
      "Dietas caseiras ou cruas exigem orientação veterinaria especializada.",
    ],
    sections: [
      {
        heading: "Avaliacao nutricional faz parte da consulta",
        body:
          "As diretrizes da WSAVA e da AAHA reforcam que nutrição deve ser avaliada de forma rotineira, considerando peso, condição corporal, histórico alimentar, petiscos e ambiente.",
      },
      {
        heading: "Troca de alimento precisa de transicao",
        body:
          "Mudancas bruscas podem causar desconforto gastrointestinal. Quando não ha emergencia medica, faca transicao gradual e observe fezes, apetite, coceira, vomitos e energia.",
      },
      {
        heading: "Cuidado com receitas sem formulacao",
        body:
          "Comida caseira pode ser uma opção em casos especificos, mas precisa de formulacao completa. Deficiencias nutricionais podem aparecer lentamente e prejudicar saúde.",
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
    title: "Ansiedade por separacao: sinais, prevenção e quando pedir ajuda",
    category: "comportamento",
    readTime: "8 min",
    featured: false,
    summary:
      "Ansiedade por separacao não e birra. Pode envolver sofrimento real e precisa de manejo cuidadoso, sem punicao.",
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
          "Se o pet se machuca, tenta fugir, baba, treme ou entra em panico, procure veterinário, comportamentalista qualificado ou especialista em comportamento veterinário.",
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
    title: "Higiene e saúde oral: por que boca tambem e saúde",
    category: "higiene",
    readTime: "5 min",
    featured: false,
    summary:
      "Dentes, gengiva e mau halito merecem atenção. Saúde oral ruim pode causar dor, perda dentaria e queda de qualidade de vida.",
    keyTakeaways: [
      "Acostume o pet ao toque na boca aos poucos.",
      "Use produtos veterinarios, nunca pasta dental humana.",
      "Mau halito forte, sangramento ou dor exigem veterinário.",
    ],
    sections: [
      {
        heading: "Comece com adaptação",
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
          "Tartaro, dor, mobilidade dentaria e gengiva inflamada precisam de avaliação veterinaria. Procedimentos dentarios devem ser feitos com segurança e orientação profissional.",
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
    title: "Socializacao sem pressa: apresentando pessoas, cães e gatos",
    category: "comportamento",
    readTime: "6 min",
    featured: false,
    summary:
      "Socializacao não e jogar o pet em qualquer ambiente. O objetivo e criar experiencias positivas e controladas.",
    keyTakeaways: [
      "Apresentacoes devem ser graduais e supervisionadas.",
      "Respeite sinais de medo, fuga e desconforto.",
      "Evite parques e aglomeracoes logo após a adoção.",
    ],
    sections: [
      {
        heading: "Observe linguagem corporal",
        body:
          "Rabo baixo, corpo rigido, rosnado, orelhas para tras, tentativa de fuga e bocejos repetidos podem indicar estresse. Interrompa antes de escalar.",
      },
      {
        heading: "Use distância a favor",
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
    title: "Castração responsável: beneficios, limites e decisão veterinaria",
    category: "saude",
    readTime: "6 min",
    featured: false,
    summary:
      "Castração ajuda no controle populacional e pode trazer beneficios de saúde, mas idade e momento devem ser avaliados individualmente.",
    keyTakeaways: [
      "Não existe uma única idade ideal para todos os animais.",
      "Converse sobre riscos, beneficios, porte, espécie e histórico.",
      "Programas publicos podem exigir vacina antirrábica atualizada.",
    ],
    sections: [
      {
        heading: "Controle populacional e saúde",
        body:
          "Castração reduz nascimento indesejado e pode prevenir problemas reprodutivos. A decisão deve considerar espécie, porte, idade, doenças previas e contexto do tutor.",
      },
      {
        heading: "Programas publicos tem regras",
        body:
          "Serviços públicos costumam exigir documentos e vacina antirrábica recente. Em Salvador, a informação oficial de castração cita RG, cartão SUS e cartão de vacina antirrábica.",
      },
      {
        heading: "Recuperacao exige cuidado",
        body:
          "Após cirurgia, siga orientação sobre colar, repouso, limpeza, medicação e retorno. Não medique por conta propria.",
      },
    ],
    sources: [
      {
        label: "AVMA - Spay/Neuter Brochure",
        url: "https://ebusiness.avma.org/files/productdownloads/spay_neuter_brochure.pdf",
      },
      {
        label: "SMS Salvador - Castração gratuita",
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
      "Não precisa ser caro: rotina e criatividade ajudam muito.",
      "Cães precisam cheirar e se movimentar; gatos precisam escalar e arranhar.",
      "Seguranca vem antes de brinquedo bonito.",
    ],
    sections: [
      {
        heading: "Para cães",
        body:
          "Passeios com cheiros, brinquedos recheaveis, treino curto, busca controlada e descanso ajudam a reduzir tedio. Ajuste intensidade a idade e saúde.",
      },
      {
        heading: "Para gatos",
        body:
          "Arranhadores, prateleiras, esconderijos, brincadeiras de caca com varinha e janelas teladas enriquecem a rotina indoor.",
      },
      {
        heading: "Evite excesso",
        body:
          "Pet tambem precisa dormir. Se o animal fica mais irritado, ofegante ou obsessivo, reduza estímulos e procure orientação.",
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
    title: "Saúde preventiva: consultas antes do problema aparecer",
    category: "saude",
    readTime: "5 min",
    featured: false,
    summary:
      "Prevenir e acompanhar peso, boca, pele, vacinas, parasitas, comportamento e mudancas sutis antes que virem urgencia.",
    keyTakeaways: [
      "Frequencia de consulta deve ser individual.",
      "Filhotes, idosos e pets com doenças precisam de mais acompanhamento.",
      "Mudancas pequenas de rotina podem sinalizar problema.",
    ],
    sections: [
      {
        heading: "Consulta não e so vacina",
        body:
          "A avaliação preventiva inclui peso, condição corporal, boca, pele, ouvidos, comportamento, dieta, parasitas e histórico. AAHA/AVMA destacam a importancia de cuidado preventivo individualizado.",
      },
      {
        heading: "Observe sinais discretos",
        body:
          "Beber mais água, perder peso, se esconder, mancar, dormir demais, coceira intensa ou mudar apetite sao motivos para investigar.",
      },
      {
        heading: "Leve informações",
        body:
          "Fotos, videos, lista de alimentos, medicamentos, vacinas e datas ajudam o veterinário a entender o quadro real.",
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
    title: "Casa segura para cães e gatos: checklist antes de adotar",
    category: "bem-estar",
    readTime: "5 min",
    featured: false,
    summary:
      "Uma casa preparada reduz fugas, acidentes e estresse. O preparo deve acontecer antes do pet chegar.",
    keyTakeaways: [
      "Gatos precisam de telas e rotas seguras.",
      "Produtos toxicos, fios e lixo devem ficar fora de alcance.",
      "Defina espaço de descanso longe de excesso de movimento.",
    ],
    sections: [
      {
        heading: "Controle acesso",
        body:
          "Portas, janelas, sacadas, portoes e frestas sao pontos críticos. Gatos devem viver em ambiente telado e cães recem-adotados precisam de supervisao em saidas.",
      },
      {
        heading: "Retire riscos previsíveis",
        body:
          "Guarde produtos de limpeza, medicamentos, plantas toxicas, objetos cortantes, fios soltos e alimentos perigosos. Se houver criancas, combine regras de interacao.",
      },
      {
        heading: "Monte uma base segura",
        body:
          "Cama, água, comida, brinquedos, banheiro e local de descanso devem ficar acessiveis. Para gatos, a caixa de areia precisa estar em local tranquilo.",
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
