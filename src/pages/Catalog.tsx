

import { useState } from 'react';
import Layout from '@/components/Layout';
import BikeCard, { BikeProps } from '@/components/BikeCard';
import { Input } from '@/components/ui/input';

import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

// Временные данные для каталога
const bikes = [
  {
    id: 1,
    name: 'Горный велосипед XC Pro',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'mountain',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Городской велосипед City Cruiser',
    price: 800,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'city',
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Шоссейный велосипед Road Master',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'road',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Детский велосипед Kids Fun',
    price: 350,
    image: 'https://images.unsplash.com/photo-1595432541891-a481aaf53b5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'kids',
    rating: 4.0,
  },
  {
    id: 5,
    name: 'Электровелосипед E-Rider',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'electric',
    rating: 4.7,
  },
  {
    id: 6,
    name: 'Складной велосипед Folding Pro',
    price: 900,
    image: 'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'folding',
    rating: 4.3,
  },
];

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { id: 'mountain', label: 'Горные' },
    { id: 'city', label: 'Городские' },
    { id: 'road', label: 'Шоссейные' },
    { id: 'kids', label: 'Детские' },
    { id: 'electric', label: 'Электрические' },
    { id: 'folding', label: 'Складные' },
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const filteredBikes = bikes.filter(bike => {
    const matchesSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = bike.price >= priceRange[0] && bike.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(bike.category);
    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Каталог велосипедов</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Фильтры */}
          <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Фильтры</h2>
            
            <div className="mb-6">
              <Label htmlFor="search" className="mb-2 block">Поиск по названию</Label>
              <div className="relative">
                <Input 
                  id="search"
                  placeholder="Поиск..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Icon name="Search" className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <Label className="mb-2 block">Цена (₽)</Label>
              <div className="space-y-4">
                <Slider 
                  value={priceRange} 
                  min={0} 
                  max={5000} 
                  step={100} 
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between text-sm">
                  <span>{priceRange[0]} ₽</span>
                  <span>{priceRange[1]} ₽</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">Категории</Label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={category.id} 
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <Label htmlFor={category.id} className="ml-2 cursor-pointer">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Список велосипедов */}
          <div className="lg:w-3/4">
            {filteredBikes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBikes.map((bike) => (
                  <BikeCard key={bike.id} bike={bike} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="SearchX" className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">Не найдено велосипедов</h3>
                <p className="text-gray-500 mt-2">Попробуйте изменить параметры фильтрации</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
