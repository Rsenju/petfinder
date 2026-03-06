import { useState } from 'react';
import { AdoptionForm } from './AdoptionForm';
import { AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

// Exemplo de uso do formulário de adoção
export function ExampleUsage() {
  const [showForm, setShowForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  // Dados do pet selecionado (viriam do contexto/props)
  const selectedPet = {
    id: 'pet-123',
    name: 'Luna',
    type: 'dog', // 'dog' ou 'cat'
  };

  const handleSubmit = (data) => {
    console.log('Dados do formulário:', data);

    // Simular envio para API
    setTimeout(() => {
      setSubmitStatus('success');
      setShowForm(false);

      // Reset após 3 segundos
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          PetFinder - Formulário de Adoção
        </h1>

        {/* Botão para abrir formulário */}
        {!showForm && submitStatus === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
              <div className="w-32 h-32 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-4xl">🐕</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedPet.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                ID: {selectedPet.id} • {selectedPet.type === 'dog' ? 'Cachorro' : 'Gato'}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Quero Adotar
              </button>
            </div>
          </motion.div>
        )}

        {/* Formulário */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <AdoptionForm
                petId={selectedPet.id}
                petName={selectedPet.name}
                petType={selectedPet.type}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mensagem de sucesso */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600 dark:text-green-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Pedido Enviado!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sua solicitação de adoção foi recebida. A ONG entrará em contato em até 48h.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ExampleUsage;