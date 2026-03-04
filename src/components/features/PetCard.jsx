import { MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PetCard({ pet }) {
  return (
    <div className="card overflow-hidden group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full 
                         hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors group/heart">
          <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/heart:text-red-500" />
        </button>
        <div className="absolute bottom-4 left-4 flex gap-2">
          {pet.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-xs font-medium 
                                     text-gray-700 dark:text-gray-300 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
            {pet.name}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{pet.age}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">{pet.breed}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <MapPin className="w-4 h-4" />
          {pet.location}
        </div>
        
        <Link 
          to={`/pet/${pet.id}`}
          className="block w-full text-center py-2.5 border-2 border-primary-600 text-primary-600 
                   dark:border-primary-400 dark:text-primary-400 rounded-lg font-medium
                   hover:bg-primary-600 hover:text-white dark:hover:bg-primary-400 dark:hover:text-gray-900
                   transition-colors"
        >
          Quero adotar
        </Link>
      </div>
    </div>
  );
}