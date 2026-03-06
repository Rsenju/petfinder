import { motion } from 'framer-motion';
import { MapPin, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PetCard({ pet, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="card overflow-hidden group"
    >
      {/* Imagem */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
        />
        
        {/* Overlay com ações */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-lg"
            >
              <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors" />
            </motion.button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-1 text-white text-sm">
              <Eye className="w-4 h-4" />
              <span>{pet.views} visualizações</span>
            </div>
          </div>
        </div>

        {/* Badge de ONG */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-full">
            {pet.ong}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
            {pet.name}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{pet.age}</span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-3">{pet.breed}</p>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <MapPin className="w-4 h-4" />
          {pet.location}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pet.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ✅ CORRIGIDO: /pets/ em vez de /pet/ */}
        <Link
          to={`/pets/${pet.id}`}
          className="block w-full text-center py-2.5 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-200"
        >
          Quero adotar
        </Link>
      </div>
    </motion.div>
  );
}