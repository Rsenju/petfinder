import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Heart } from 'lucide-react';

export default function PetCard({ pet, index = 0, layout = 'grid' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-xl group ${
        layout === 'list' ? 'flex flex-row' : ''
      }`}
    >
      {/* Imagem */}
      <div className={`relative overflow-hidden ${
        layout === 'list' ? 'w-48 h-48' : 'aspect-[4/3]'
      }`}>
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badge ONG */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-slate-900/90 text-xs font-medium rounded-full text-white">
            {pet.ong || pet.ongName || "ONG Parceira"}
          </span>
        </div>

        {/* Botão favorito */}
        <button className="absolute top-3 right-3 p-2 bg-slate-900/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20">
          <Heart className="w-5 h-5 text-white hover:text-red-400" />
        </button>
      </div>

      {/* Conteúdo */}
      <div className={`p-5 flex flex-col ${layout === 'list' ? 'flex-1 justify-center' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {pet.name}
          </h3>
          <span className="text-sm text-slate-400">{pet.age}</span>
        </div>

        <p className="text-slate-400 mb-2">{pet.breed}</p>

        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <MapPin className="w-4 h-4" />
          {pet.location}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pet.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {layout === 'list' && pet.description && (
          <p className="text-slate-400 text-sm mb-4 line-clamp-2">
            {pet.description}
          </p>
        )}

        {/* Link corrigido para /pet/:id */}
        <Link
          to={`/pet/${pet.id}`}
          className={`block text-center py-2.5 border-2 border-blue-500 text-blue-400 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-all ${
            layout === 'list' ? 'mt-auto w-fit px-6' : 'w-full'
          }`}
        >
          Quero adotar
        </Link>
      </div>
    </motion.div>
  );
}