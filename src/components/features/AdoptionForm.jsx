
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Home, 
  Users, 
  Heart, 
  PawPrint, 
  Briefcase, 
  AlertCircle,
  Plus,
  Trash2,
  Info
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility para classes do tailwind
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Schema de validação Zod
const petSchema = z.object({
  type: z.enum(['dog', 'cat', 'other']),
  quantity: z.number().min(1),
  name: z.string().optional(),
  hasDisease: z.boolean(),
  diseaseDescription: z.string().optional(),
  isAggressive: z.boolean(),
});

const adoptionFormSchema = z.object({
  // Etapa 1: Dados Pessoais
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  age: z.number().min(18, 'Você deve ter pelo menos 18 anos'),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  phone: z.string().regex(/^\\(\\d{2}\\) \\d{5}-\\d{4}$/, 'Formato: (00) 00000-0000'),
  email: z.string().email('Email inválido'),
  
  // Etapa 2: Informações da Casa
  hasScreens: z.boolean(),
  hasWindows: z.boolean(),
  hasStreetAccess: z.boolean(),
  hasSpace: z.boolean(),
  spaceDescription: z.string().optional(),
  
  // Etapa 3: Família
  hasChildren: z.boolean(),
  childrenCount: z.number().optional(),
  childrenAges: z.string().optional(),
  hasElderly: z.boolean(),
  elderlyCondition: z.string().optional(),
  hasAllergies: z.boolean(),
  allergyDetails: z.string().optional(),
  
  // Etapa 4: Outros Animais
  hasOtherPets: z.boolean(),
  otherPets: z.array(petSchema).optional(),
  
  // Etapa 5: Rotina
  aloneTime: z.string().min(1, 'Informe o tempo'),
  whereWhenAlone: z.string().min(5, 'Descreva onde o animal ficará'),
  travelCaretaker: z.string().min(3, 'Informe quem cuidará'),
  workType: z.enum(['presencial', 'hibrido', 'remoto']),
  
  // Etapa 6: Pet Escolhido
  petId: z.string().min(1, 'Selecione um pet'),
  petName: z.string().min(1, 'Nome do pet é obrigatório'),
  
  // Etapa 7: Compromissos
  lifetimeCommitment: z.boolean().refine(val => val === true, {
    message: 'Você deve aceitar o compromisso de vida toda'
  }),
  financialAwareness: z.boolean().refine(val => val === true, {
    message: 'Você deve estar ciente das despesas'
  }),
  previousAdoption: z.boolean(),
  previousAdoptionDetails: z.string().optional(),
  
  // Etapa 8: Termo
  responsibilityTerm: z.boolean().refine(val => val === true, {
    message: 'Você deve aceitar o termo de responsabilidade'
  }),
});

const STEPS = [
  { id: 1, title: 'Dados Pessoais', icon: Users },
  { id: 2, title: 'Sua Casa', icon: Home },
  { id: 3, title: 'Família', icon: Heart },
  { id: 4, title: 'Outros Pets', icon: PawPrint },
  { id: 5, title: 'Rotina', icon: Briefcase },
  { id: 6, title: 'Pet Escolhido', icon: PawPrint },
  { id: 7, title: 'Compromissos', icon: Heart },
  { id: 8, title: 'Finalização', icon: Check },
];

const LIFE_EXPECTANCY = {
  dog: '10-13 anos (média)',
  cat: '12-18 anos (média)',
};

const COSTS_ESTIMATE = {
  dog: {
    monthly: 'R$ 150-400',
    vet: 'R$ 200-800/ano',
    emergency: 'R$ 500-3000',
  },
  cat: {
    monthly: 'R$ 100-300',
    vet: 'R$ 150-600/ano',
    emergency: 'R$ 400-2500',
  },
};

export function AdoptionForm({ petId, petName, petType = 'dog', onSubmit, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCostDetails, setShowCostDetails] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(adoptionFormSchema),
    mode: 'onChange',
    defaultValues: {
      petId: petId || '',
      petName: petName || '',
      hasScreens: false,
      hasWindows: false,
      hasStreetAccess: false,
      hasSpace: false,
      hasChildren: false,
      hasElderly: false,
      hasAllergies: false,
      hasOtherPets: false,
      otherPets: [],
      lifetimeCommitment: false,
      financialAwareness: false,
      previousAdoption: false,
      responsibilityTerm: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'otherPets',
  });

  const watchHasOtherPets = watch('hasOtherPets');
  const watchHasChildren = watch('hasChildren');
  const watchHasElderly = watch('hasElderly');
  const watchHasAllergies = watch('hasAllergies');
  const watchHasSpace = watch('hasSpace');
  const watchPreviousAdoption = watch('previousAdoption');

  const validateStep = async () => {
    const fieldsToValidate = {
      1: ['fullName', 'age', 'neighborhood', 'city', 'phone', 'email'],
      2: ['hasScreens', 'hasWindows', 'hasStreetAccess', 'hasSpace'],
      3: ['hasChildren', 'hasElderly', 'hasAllergies'],
      4: ['hasOtherPets'],
      5: ['aloneTime', 'whereWhenAlone', 'travelCaretaker', 'workType'],
      6: ['petId', 'petName'],
      7: ['lifetimeCommitment', 'financialAwareness', 'previousAdoption'],
      8: ['responsibilityTerm'],
    };

    return await trigger(fieldsToValidate[currentStep]);
  };

  const nextStep = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < 8) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const addPet = () => {
    append({
      type: 'dog',
      quantity: 1,
      hasDisease: false,
      isAggressive: false,
    });
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
      {/* Header com Progresso */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Formulário de Adoção</h2>
        <div className="flex items-center justify-between mb-2 relative">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center flex-1 relative z-10">
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors",
                    isActive && "bg-white text-purple-600",
                    isCompleted && "bg-green-400 text-white",
                    !isActive && !isCompleted && "bg-white/20 text-white"
                  )}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                >
                  {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                </motion.div>
                <span className="text-xs hidden sm:block">{step.title}</span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-white/20 h-2 rounded-full mt-4">
          <motion.div
            className="bg-white h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 8) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
        <AnimatePresence mode="wait">
          {/* ETAPA 1: Dados Pessoais */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Dados Pessoais
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    {...register('fullName')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    placeholder="Seu nome completo"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Idade * (mínimo 18)
                  </label>
                  <input
                    type="number"
                    {...register('age', { valueAsNumber: true })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    placeholder="25"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bairro *
                  </label>
                  <input
                    {...register('neighborhood')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    placeholder="Seu bairro"
                  />
                  {errors.neighborhood && (
                    <p className="text-red-500 text-sm mt-1">{errors.neighborhood.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cidade *
                  </label>
                  <input
                    {...register('city')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    placeholder="Sua cidade"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Telefone *
                  </label>
                  <input
                    {...register('phone')}
                    onChange={(e) => setValue('phone', formatPhone(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    placeholder="(00) 00000-0000"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ETAPA 2: Informações da Casa */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Informações sobre sua Casa
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">A casa possui telas de proteção?</p>
                    <p className="text-sm text-gray-500">Telas nas janelas e portas para segurança do pet</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('hasScreens')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">A casa possui janelas?</p>
                    <p className="text-sm text-gray-500">Janelas que o pet possa acessar</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('hasWindows')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">A casa tem livre acesso à rua?</p>
                    <p className="text-sm text-gray-500">O pet pode sair facilmente para a rua</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('hasStreetAccess')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">O animal terá espaço próprio adequado?</p>
                    <p className="text-sm text-gray-500">Espaço compatível com o porte do animal</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('hasSpace')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                {watchHasSpace && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ml-4"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Descreva o espaço disponível
                    </label>
                    <textarea
                      {...register('spaceDescription')}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      placeholder="Ex: Casa com quintal de 50m², gradeado..."
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* ETAPA 3: Família */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Composição Familiar
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Possui crianças na residência?</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('hasChildren')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                {watchHasChildren && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ml-4 space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Quantidade
                        </label>
                        <input
                          type="number"
                          {...register('childrenCount', { valueAsNumber: true })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Idades
                        </label>
                        <input
                          {...register('childrenAges')}
                          placeholder="Ex: 3, 7, 10"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Possui idosos com enfermidade?</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('hasElderly')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                {watchHasElderly && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ml-4"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Qual enfermidade?
                    </label>
                    <input
                      {...register('elderlyCondition')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                      placeholder="Descreva a condição"
                    />
                  </motion.div>
                )}

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Alguém possui alergias?</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register('hasAllergies')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                {watchHasAllergies && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ml-4"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quais alergias?
                    </label>
                    <input
                      {...register('allergyDetails')}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                      placeholder="Descreva as alergias"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* ETAPA 4: Outros Animais */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Outros Animais
              </h3>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Possui outros animais?</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" {...register('hasOtherPets')} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {watchHasOtherPets && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">Animal {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo</label>
                          <select
                            {...register(`otherPets.${index}.type`)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                          >
                            <option value="dog">Cachorro</option>
                            <option value="cat">Gato</option>
                            <option value="other">Outro</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantidade</label>
                          <input
                            type="number"
                            {...register(`otherPets.${index}.quantity`, { valueAsNumber: true })}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome (opcional)</label>
                          <input
                            {...register(`otherPets.${index}.name`)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                          />
                        </div>

                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" {...register(`otherPets.${index}.hasDisease`)} className="rounded" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Tem doença</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" {...register(`otherPets.${index}.isAggressive`)} className="rounded" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">É agressivo</span>
                          </label>
                        </div>
                      </div>

                      {watch(`otherPets.${index}.hasDisease`) && (
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Qual doença?</label>
                          <input
                            {...register(`otherPets.${index}.diseaseDescription`)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                            placeholder="Descreva a condição de saúde"
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addPet}
                    className="flex items-center justify-center w-full py-2 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                  >
                    <Plus size={20} className="mr-2" />
                    Adicionar Animal
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ETAPA 5: Rotina */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Sua Rotina
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    O animal ficará sozinho por quanto tempo? *
                  </label>
                  <select
                    {...register('aloneTime')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="nunca">Nunca (alguém sempre em casa)</option>
                    <option value="1-2h">1-2 horas por dia</option>
                    <option value="3-4h">3-4 horas por dia</option>
                    <option value="5-6h">5-6 horas por dia</option>
                    <option value="7-8h">7-8 horas por dia</option>
                    <option value="mais8h">Mais de 8 horas por dia</option>
                  </select>
                  {errors.aloneTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.aloneTime.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Onde o animal ficará quando não estiver em casa? *
                  </label>
                  <textarea
                    {...register('whereWhenAlone')}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Ex: Dentro de casa, em um cômodo específico, quintal..."
                  />
                  {errors.whereWhenAlone && (
                    <p className="text-red-500 text-sm mt-1">{errors.whereWhenAlone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Se precisar viajar, quem cuidará do animal? *
                  </label>
                  <input
                    {...register('travelCaretaker')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Ex: Familiar, vizinho, hotel pet..."
                  />
                  {errors.travelCaretaker && (
                    <p className="text-red-500 text-sm mt-1">{errors.travelCaretaker.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de trabalho *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['presencial', 'hibrido', 'remoto'].map((type) => (
                      <label key={type} className="cursor-pointer">
                        <input
                          type="radio"
                          {...register('workType')}
                          value={type}
                          className="sr-only peer"
                        />
                        <div className="px-4 py-3 text-center rounded-lg border-2 border-gray-200 dark:border-gray-700 peer-checked:border-purple-600 peer-checked:bg-purple-50 dark:peer-checked:bg-purple-900/20 peer-checked:text-purple-700 dark:peer-checked:text-purple-300 transition-all capitalize">
                          {type === 'presencial' ? 'Presencial' : type === 'hibrido' ? 'Híbrido' : 'Remoto'}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.workType && (
                    <p className="text-red-500 text-sm mt-1">{errors.workType.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ETAPA 6: Pet Escolhido */}
          {currentStep === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Pet Escolhido
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ID do Animal *
                  </label>
                  <input
                    {...register('petId')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome do Animal *
                  </label>
                  <input
                    {...register('petName')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    readOnly
                  />
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-start space-x-3">
                  <Info className="text-purple-600 dark:text-purple-400 mt-0.5" size={20} />
                  <div>
                    <p className="font-medium text-purple-900 dark:text-purple-200">
                      Você está adotando: {petName}
                    </p>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                      Certifique-se de que este é o pet correto antes de continuar.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ETAPA 7: Compromissos */}
          {currentStep === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Compromissos Importantes
              </h3>

              <div className="space-y-4">
                {/* Compromisso de vida toda */}
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Heart className="text-amber-600 dark:text-amber-400 mt-1" size={24} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                        Compromisso de Vida Toda
                      </h4>
                      <p className="text-sm text-amber-800 dark:text-amber-300 mb-3">
                        Estou ciente de que a adoção é um compromisso para a vida toda do animal. 
                        Expectativa de vida: <strong>{LIFE_EXPECTANCY[petType]}</strong>.
                      </p>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register('lifetimeCommitment')}
                          className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-amber-900 dark:text-amber-200">
                          Sim, estou ciente e me comprometo
                        </span>
                      </label>
                      {errors.lifetimeCommitment && (
                        <p className="text-red-500 text-sm mt-1">{errors.lifetimeCommitment.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Consciência financeira */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="text-blue-600 dark:text-blue-400 mt-1" size={24} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                        Responsabilidade Financeira
                      </h4>
                      <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                        Estou ciente de que arcarei com despesas periódicas e imprevistos do pet.
                      </p>
                      
                      <button
                        type="button"
                        onClick={() => setShowCostDetails(!showCostDetails)}
                        className="text-sm text-blue-600 dark:text-blue-400 underline mb-3"
                      >
                        {showCostDetails ? 'Ocultar' : 'Ver'} estimativa de custos
                      </button>

                      {showCostDetails && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-3"
                        >
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Estimativa para {petType === 'dog' ? 'Cachorros' : 'Gatos'}:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Mensal: {COSTS_ESTIMATE[petType].monthly}</li>
                            <li>• Veterinário/anual: {COSTS_ESTIMATE[petType].vet}</li>
                            <li>• Emergências: {COSTS_ESTIMATE[petType].emergency}</li>
                          </ul>
                        </motion.div>
                      )}

                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register('financialAwareness')}
                          className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
                          Sim, estou ciente dos custos
                        </span>
                      </label>
                      {errors.financialAwareness && (
                        <p className="text-red-500 text-sm mt-1">{errors.financialAwareness.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Histórico de adoções */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Histórico de Adoções
                  </h4>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('previousAdoption')}
                        value="false"
                        checked={!watchPreviousAdoption}
                        onChange={() => setValue('previousAdoption', false)}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Nunca adotei/devolvi</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('previousAdoption')}
                        value="true"
                        checked={watchPreviousAdoption}
                        onChange={() => setValue('previousAdoption', true)}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Já adotei/devolvi antes</span>
                    </label>
                  </div>

                  {watchPreviousAdoption && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Por favor, explique a situação
                      </label>
                      <textarea
                        {...register('previousAdoptionDetails')}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        placeholder="Conte-nos o que aconteceu..."
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ETAPA 8: Finalização */}
          {currentStep === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Termo de Responsabilidade
              </h3>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                    <PawPrint className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-900 dark:text-purple-200 text-lg">
                      Declaração de Responsabilidade
                    </h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Leia atentamente antes de aceitar
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <p>
                    Declaro que todas as informações prestadas neste formulário são verdadeiras e 
                    completas, estando ciente de que a falsidade de qualquer informação pode resultar 
                    na reprovação da adoção.
                  </p>
                  <p>
                    Comprometo-me a cuidar do animal com <strong>amor, respeito e responsabilidade</strong>, 
                    proporcionando:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Alimentação adequada e água fresca sempre disponível</li>
                    <li>Acompanhamento veterinário regular</li>
                    <li>Vacinas e vermifugação em dia</li>
                    <li>Castração (se ainda não realizada)</li>
                    <li>Espaço seguro e confortável</li>
                    <li>Carinho e atenção diários</li>
                    <li>Não abandonar ou maltratar o animal</li>
                  </ul>
                  <p>
                    Estou ciente de que a ONG poderá fazer acompanhamento pós-adoção e que, 
                    em caso de descumprimento, medidas cabíveis poderão ser tomadas para 
                    garantir o bem-estar do animal.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-200 dark:border-purple-800">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('responsibilityTerm')}
                      className="w-5 h-5 mt-0.5 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium text-purple-900 dark:text-purple-200">
                      Li e aceito o termo de responsabilidade. Comprometo-me a cuidar do animal 
                      com amor e responsabilidade por toda a sua vida.
                    </span>
                  </label>
                  {errors.responsibilityTerm && (
                    <p className="text-red-500 text-sm mt-2">{errors.responsibilityTerm.message}</p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                  <Check className="text-green-600" size={20} />
                  <span className="font-medium">Quase lá! Revise suas informações antes de enviar.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navegação */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={currentStep === 1 ? onCancel : prevStep}
            className="flex items-center px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {currentStep === 1 ? 'Cancelar' : (
              <>
                <ChevronLeft size={20} className="mr-1" />
                Anterior
              </>
            )}
          </button>

          {currentStep < 8 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Próximo
              <ChevronRight size={20} className="ml-1" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center px-8 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              <Heart size={20} className="mr-2" />
              Enviar Pedido de Adoção
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AdoptionForm;
