import { 
    Scale, 
    ShieldAlert, 
    Phone, 
    Building2, 
    FileText, 
    Syringe, 
    Scissors, 
    HeartHandshake,
    AlertCircle,
    CheckCircle
  } from 'lucide-react';
  
  const services = [
    {
      id: 1,
      title: "Denunciar maus-tratos",
      description: "Faça denúncias anônimas ou identificadas sobre maus-tratos a animais.",
      icon: ShieldAlert,
      action: "Denunciar agora",
      color: "bg-red-500/20 text-red-300",
      phone: "0800 61 8080",
      org: "IBAMA"
    },
    {
      id: 2,
      title: "Campanhas de vacinação",
      description: "Calendário de vacinação gratuita para cães e gatos em Salvador.",
      icon: Syringe,
      action: "Ver calendário",
      color: "bg-green-500/20 text-green-300"
    },
    {
      id: 3,
      title: "Castração gratuita",
      description: "Programas de castração gratuita ou subsidiada na região.",
      icon: Scissors,
      action: "Saiba mais",
      color: "bg-blue-500/20 text-blue-300"
    },
    {
      id: 4,
      title: "Programas de adoção",
      description: "Incentivos e apoio governamental para adoção responsável.",
      icon: HeartHandshake,
      action: "Conhecer",
      color: "bg-purple-500/20 text-purple-300"
    }
  ];
  
  const laws = [
    {
      title: "Lei de Crimes Ambientais (Lei 9.605/98)",
      description: "Tipifica como crime a prática de abuso, maus-tratos, ferir ou mutilar animais silvestres, domésticos ou domesticados.",
      penalty: "Pena de 3 meses a 1 ano de detenção, além de multa."
    },
    {
      title: "Lei 14.064/2020",
      description: "Aumenta a pena para maus-tratos contra cães e gatos.",
      penalty: "Pena de 2 a 5 anos de reclusão, multa e proibição de guarda."
    },
    {
      title: "Constituição Federal",
      description: "O Brasil é signatário de tratados internacionais que protegem os animais.",
      penalty: "Proteção constitucional da fauna."
    }
  ];
  
  const contacts = [
    { name: "IBAMA", phone: "0800 61 8080", description: "Denúncias ambientais" },
    { name: "Polícia Civil - DEAM", phone: "(71) 3116-3400", description: "Delegacia Especial de Atendimento à Mulher e Animais" },
    { name: "Prefeitura de Salvador", phone: "156", description: "Serviços municipais" },
    { name: "Lauro de Freitas", phone: "(71) 3288-8000", description: "Assistência animal" }
  ];
  
  export default function Government() {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Direitos dos Animais
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Informações sobre leis de proteção animal e canais de denúncia em Salvador e Lauro de Freitas
          </p>
        </div>
  
        {/* Cards de serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map(service => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all text-center"
              >
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                  {service.action}
                </button>
                {service.phone && (
                  <p className="mt-3 text-sm text-slate-500">
                    📞 {service.phone}
                  </p>
                )}
              </div>
            );
          })}
        </div>
  
        {/* Seção de leis */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Scale className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold font-display">Leis de Proteção Animal</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {laws.map((law, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold mb-3 text-blue-400">{law.title}</h3>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">{law.description}</p>
                <div className="flex items-start gap-2 text-sm text-slate-400 bg-slate-900/50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>{law.penalty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Contatos */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold font-display">Canais de Denúncia</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-900/50 rounded-xl p-4">
                <div>
                  <h4 className="font-bold">{contact.name}</h4>
                  <p className="text-slate-400 text-sm">{contact.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-400">{contact.phone}</span>
                </div>
              </div>
            ))}
          </div>
  
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-200">
              <strong>Importante:</strong> Em caso de emergência com animal em risco de vida, 
              procure a polícia mais próxima ou ligue 190. A denúncia pode ser feita anonimamente.
            </div>
          </div>
        </div>
  
        {/* Como denunciar */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-400" />
            Como fazer uma denúncia
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              "Documente o caso (fotos/vídeos se possível)",
              "Anote o endereço e descrição detalhada",
              "Ligue para um dos canais de atendimento",
              "Acompanhe o protocolo da denúncia"
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-3 bg-slate-800 rounded-xl p-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }