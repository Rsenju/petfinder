import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PawPrint, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
  { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
  { id: 'pets', label: 'Meus Pets', icon: PawPrint },
  { id: 'adoptions', label: 'Adoções', icon: Users },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export function OngDashboard({ ongData, children }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab ongData={ongData} />;
      case 'pets':
        return <PetsTab ongData={ongData} />;
      case 'adoptions':
        return <AdoptionsTab ongData={ongData} />;
      case 'settings':
        return <SettingsTab ongData={ongData} />;
      default:
        return <OverviewTab ongData={ongData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img 
              src={ongData?.logo || '/placeholder-ong.png'} 
              alt={ongData?.nome}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white line-clamp-1">{ongData?.nome}</h2>
              <Badge variant="success" size="sm">ONG Verificada</Badge>
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
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <img 
              src={ongData?.logo || '/placeholder-ong.png'} 
              alt={ongData?.nome}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-bold text-gray-900 dark:text-white">{ongData?.nome}</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-1 bg-white dark:bg-gray-800">
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
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 mt-4"
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
    { label: 'Pets Cadastrados', value: ongData?.petsCount || 0, icon: PawPrint, color: 'blue' },
    { label: 'Adoções Realizadas', value: ongData?.adoptionsCount || 0, icon: Users, color: 'green' },
    { label: 'Visualizações/Mês', value: ongData?.monthlyViews || 0, icon: TrendingUp, color: 'purple' },
    { label: 'Solicitações Pendentes', value: ongData?.pendingRequests || 0, icon: Calendar, color: 'yellow' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Visão Geral</h1>
        <p className="text-gray-600 dark:text-gray-400">Acompanhe o desempenho da sua ONG</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardBody className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Atividades Recentes</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">Nenhuma atividade recente</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Próximas Interações</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">Nenhuma interação agendada</p>
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meus Pets</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie os pets disponíveis para adoção</p>
        </div>
        <Button variant="primary">Cadastrar Novo Pet</Button>
      </div>
      {/* Lista de pets seria renderizada aqui */}
    </div>
  );
}

function AdoptionsTab({ ongData }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Adoções</h1>
        <p className="text-gray-600 dark:text-gray-400">Acompanhe o processo de adoção</p>
      </div>
      {/* Lista de adoções seria renderizada aqui */}
    </div>
  );
}

function SettingsTab({ ongData }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h1>
        <p className="text-gray-600 dark:text-gray-400">Gerencie as informações da sua ONG</p>
      </div>
      {/* Formulário de configurações seria renderizado aqui */}
    </div>
  );
}