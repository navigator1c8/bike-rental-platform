
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export interface BikeProps {
  id: number;
  name: string;
  type: string;
  image: string;
  pricePerHour: number;
  available: boolean;
}

const BikeCard = ({ id, name, type, image, pricePerHour, available }: BikeProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${id}`}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">{name}</h3>
        </Link>
        <p className="text-gray-600 mb-2 text-sm">{type}</p>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-lg font-bold text-primary">{pricePerHour} ₽/час</span>
            <span className={`ml-2 px-2 py-0.5 rounded text-xs ${available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {available ? 'Доступен' : 'Нет в наличии'}
            </span>
          </div>
          <Button size="sm" disabled={!available}>
            <ShoppingCart className="h-4 w-4 mr-1" />
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
