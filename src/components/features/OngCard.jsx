import React from 'react';
import { MapPin, Phone, Mail, Heart, ExternalLink } from 'lucide-react';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';


export function OngCard({ 
  ong, 
  onViewDetails, 
  onContact, 
  onFavorite,
  isFavorite = false,
  className = '' 
}) {
  const { 
    id, 
    nome, 
    logo, 
    descricao, 
    cidade, 
    estado, 
    telefone, 
    email, 
    petsCount,
    avaliacao 
  } = ong;

  return (
    <Card hover className={`h-full flex flex-col ${className}`}>
      <CardBody className="flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={logo || '/placeholder-ong.png'}
              alt={nome}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            />
            <div>
              <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{nome}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                {cidade}, {estado}
              </div>
            </div>
          </div>
          {onFavorite && (
            <button
              onClick={() => onFavorite(id)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart 
                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
              />
            </button>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {descricao}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="info" size="sm">
            {petsCount} pets disponíveis
          </Badge>
          {avaliacao && (
            <Badge variant="success" size="sm">
              ⭐ {avaliacao.toFixed(1)}
            </Badge>
          )}
        </div>

        <div className="space-y-2 text-sm">
          {telefone && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              {telefone}
            </div>
          )}
          {email && (
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              {email}
            </div>
          )}
        </div>
      </CardBody>

      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onViewDetails(ong)}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Ver Detalhes
        </Button>
        {onContact && (
          <Button 
            variant="primary" 
            className="flex-1"
            onClick={() => onContact(ong)}
          >
            Contato
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default OngCard;