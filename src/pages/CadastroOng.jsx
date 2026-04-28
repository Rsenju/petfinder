import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, Upload, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { useOngs } from '../hooks/useOngs';

export function CadastroOng() {
  const navigate = useNavigate();
  const { createOng, loading } = useOngs();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    descricao: '',
    website: '',
    logo: null,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.nome.trim()) newErrors.nome = 'Nome da ONG é obrigatório';
      if (!formData.cnpj.trim()) newErrors.cnpj = 'CNPJ é obrigatório';
      if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
      if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    }
    
    if (currentStep === 2) {
      if (!formData.endereco.trim()) newErrors.endereco = 'Endereço é obrigatório';
      if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória';
      if (!formData.estado.trim()) newErrors.estado = 'Estado é obrigatório';
      if (!formData.cep.trim()) newErrors.cep = 'CEP é obrigatório';
    }
    
    if (currentStep === 3) {
      if (!formData.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
      if (formData.descricao.length < 50) newErrors.descricao = 'Descrição deve ter pelo menos 50 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpa erro do campo quando usuário digita
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    try {
      const ongData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          ongData.append(key, formData[key]);
        }
      });

      await createOng(ongData);
      setSuccess(true);
      setTimeout(() => navigate('/ongs'), 3000);
    } catch (err) {
      setErrors({ submit: err.message || 'Erro ao cadastrar ONG' });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados da ONG</h3>
            <Input
              label="Nome da ONG"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              error={errors.nome}
              icon={Building2}
              placeholder="Ex: Amigos dos Animais"
            />
            <Input
              label="CNPJ"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              error={errors.cnpj}
              placeholder="00.000.000/0000-00"
            />
            <Input
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              placeholder="contato@ong.com.br"
            />
            <Input
              label="Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              error={errors.telefone}
              icon={Phone}
              placeholder="(11) 99999-9999"
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço</h3>
            <Input
              label="Endereço"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              error={errors.endereco}
              icon={MapPin}
              placeholder="Rua, número, bairro"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                error={errors.cidade}
              />
              <Input
                label="Estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                error={errors.estado}
                placeholder="SP"
              />
            </div>
            <Input
              label="CEP"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              error={errors.cep}
              placeholder="00000-000"
            />
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre a ONG</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={4}
                className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  errors.descricao ? 'border-red-500' : ''
                }`}
                placeholder="Conte sobre o trabalho da sua ONG, história, missão..."
              />
              {errors.descricao && (
                <p className="mt-1 text-sm text-red-600">{errors.descricao}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.descricao.length} caracteres (mínimo 50)
              </p>
            </div>
            
            <Input
              label="Website (opcional)"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://www.suaong.org"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo da ONG
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload de arquivo</span>
                      <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG até 5MB</p>
                  {formData.logo && (
                    <p className="text-sm text-green-600">
                      ✓ {formData.logo.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardBody className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Cadastro Realizado!
            </h2>
            <p className="text-gray-600 mb-6">
              Sua ONG foi cadastrada com sucesso. Redirecionando...
            </p>
            <Button onClick={() => navigate('/ongs')} variant="primary" className="w-full">
              Ver ONGs
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">
            Cadastre sua ONG
          </h1>
          <p className="mt-2 text-gray-600">
            Junte-se à comunidade PetFinder e ajude pets a encontrarem um lar
          </p>
        </div>

        {/* Progresso */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-24 h-1 mx-2 ${
                    s < step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Dados</span>
            <span>Endereço</span>
            <span>Sobre</span>
          </div>
        </div>

        <Card>
          <CardBody className="p-6">
            <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}>
              {renderStep()}
              
              {errors.submit && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {errors.submit}
                </div>
              )}

              <div className="mt-6 flex gap-3">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleNext}
                    className="flex-1"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={loading}
                    className="flex-1"
                  >
                    Finalizar Cadastro
                  </Button>
                )}
              </div>
            </form>
          </CardBody>
        </Card>

        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}

export default CadastroOng;