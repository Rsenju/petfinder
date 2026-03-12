import React, { useState } from "react";
import {
  LayoutDashboard,
  PawPrint,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { useAuth } from "../hooks/useAuth";

const menuItems = [
  { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
  { id: "pets", label: "Meus Pets", icon: PawPrint },
  { id: "adoptions", label: "Adoções", icon: Users },
  { id: "settings", label: "Configurações", icon: Settings },
];

export function OngDashboard({ ongData, children }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab ongData={ongData} />;
      case "pets":
        return <PetsTab ongData={ongData} />;
      case "adoptions":
        return <AdoptionsTab ongData={ongData} />;
      case "settings":
        return <SettingsTab ongData={ongData} />;
      default:
        return <OverviewTab ongData={ongData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 bg-slate-800 border-r border-slate-700 flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <img
              src={ongData?.logo || "/placeholder-ong.png"}
              alt={ongData?.nome}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-white line-clamp-1">
                {ongData?.nome}
              </h2>
              <Badge variant="success" size="sm">
                ONG Verificada
              </Badge>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-500/20 text-blue-400 font-medium"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/20"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-800 border-b border-slate-700 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <img
              src={ongData?.logo || "/placeholder-ong.png"}
              alt={ongData?.nome}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-bold text-white">
              {ongData?.nome}
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-700"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="border-t border-slate-700 p-4 space-y-1 bg-slate-800">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                    activeTab === item.id
                      ? "bg-blue-500/20 text-blue-400 font-medium"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 mt-4"
              onClick={logout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sair
            </Button>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 md:p-8 p-4 mt-16 md:mt-0 overflow-auto">
        {children || renderContent()}
      </main>
    </div>
  );
}

// Sub-componentes do Dashboard
function OverviewTab({ ongData }) {
  const stats = [
    {
      label: "Pets Cadastrados",
      value: ongData?.petsCount || 0,
      icon: PawPrint,
      color: "blue",
    },
    {
      label: "Adoções Realizadas",
      value: ongData?.adoptionsCount || 0,
      icon: Users,
      color: "green",
    },
    {
      label: "Visualizações/Mês",
      value: ongData?.monthlyViews || 0,
      icon: TrendingUp,
      color: "purple",
    },
    {
      label: "Solicitações Pendentes",
      value: ongData?.pendingRequests || 0,
      icon: Calendar,
      color: "yellow",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    purple: "bg-purple-500/20 text-purple-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Visão Geral
        </h1>
        <p className="text-slate-400">
          Acompanhe o desempenho da sua ONG
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardBody className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-bold text-lg text-white">
              Atividades Recentes
            </h3>
          </CardHeader>
          <CardBody>
            <p className="text-slate-400 text-center py-8">
              Nenhuma atividade recente
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-bold text-lg text-white">
              Próximas Interações
            </h3>
          </CardHeader>
          <CardBody>
            <p className="text-slate-400 text-center py-8">
              Nenhuma interação agendada
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function PetsTab({ ongData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Meus Pets
          </h1>
          <p className="text-slate-400">
            Gerencie os pets disponíveis para adoção
          </p>
        </div>
        <Button variant="primary">Cadastrar Novo Pet</Button>
      </div>
    </div>
  );
}

function AdoptionsTab({ ongData }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Adoções
        </h1>
        <p className="text-slate-400">
          Acompanhe o processo de adoção
        </p>
      </div>
    </div>
  );
}

function SettingsTab({ ongData }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Configurações
        </h1>
        <p className="text-slate-400">
          Gerencie as informações da sua ONG
        </p>
      </div>
    </div>
  );
}