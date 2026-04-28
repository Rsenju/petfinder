import { 
    Scissors, 
    Stethoscope, 
    Hotel, 
    ShoppingBag, 
    GraduationCap,
    Heart
  } from 'lucide-react';
  
  const services = [
    {
      id: 1,
      title: "Banho e Tosa",
      description: "Higiene completa para seu pet com profissionais qualificados.",
      icon: Scissors,
      color: "bg-blue-500/20 text-blue-400"
    },
    {
      id: 2,
      title: "Veterinário",
      description: "Atendimento veterinário especializado e emergencial.",
      icon: Stethoscope,
      color: "bg-green-500/20 text-green-400"
    },
    {
      id: 3,
      title: "Hotel Pet",
      description: "Hospedagem confortável e segura quando você viajar.",
      icon: Hotel,
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      id: 4,
      title: "Pet Shop",
      description: "Rações, acessórios, brinquedos e tudo para seu pet.",
      icon: ShoppingBag,
      color: "bg-orange-500/20 text-orange-400"
    },
    {
      id: 5,
      title: "Adestramento",
      description: "Treinamento profissional para cães de todas as idades.",
      icon: GraduationCap,
      color: "bg-yellow-500/20 text-yellow-400"
    },
    {
      id: 6,
      title: "Adoção Responsável",
      description: "Encontre seu novo melhor amigo conosco.",
      icon: Heart,
      color: "bg-red-500/20 text-red-400"
    }
  ];
  
  export default function Servicos() {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Nossos Serviços
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tudo o que você precisa para cuidar bem do seu pet em um só lugar
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-xl text-center group"
              >
                <div className={`w-20 h-20 rounded-2xl ${service.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-400">{service.description}</p>
                <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Saiba mais
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }