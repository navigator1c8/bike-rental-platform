
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

// Временные данные для детальной страницы товара
const bikesData = {
  1: {
    id: 1,
    name: 'Горный велосипед XC Pro',
    price: 1500,
    rating: 4.5,
    reviewCount: 28,
    description: 'Горный велосипед XC Pro — идеальный выбор для любителей бездорожья и активного отдыха. Оснащен прочной алюминиевой рамой, амортизационной вилкой и надежными дисковыми тормозами.',
    features: [
      'Алюминиевая рама',
      'Передняя амортизационная вилка 100 мм',
      'Гидравлические дисковые тормоза',
      '27 скоростей',
      'Размеры рамы: S, M, L, XL',
      'Вес: 13.5 кг'
    ],
    specs: {
      'Рама': 'Алюминиевый сплав 6061',
      'Вилка': 'SR Suntour XCM, ход 100 мм',
      'Переключатель': 'Shimano Deore, 9 скоростей',
      'Тормоза': 'Shimano MT200, гидравлические дисковые',
      'Колеса': '29 дюймов',
      'Покрышки': 'Maxxis Ardent 29×2.25',
      'Седло': 'WTB Volt Sport',
      'Вес': '13.5 кг'
    },
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1622&q=80'
    ],
    rentalOptions: [
      { period: '1 час', price: 150 },
      { period: '3 часа', price: 400 },
      { period: '1 день', price: 750 },
      { period: '1 неделя', price: 4000 }
    ],
    inStock: true,
    relatedProducts: [2, 3, 5]
  },
  2: {
    id: 2,
    name: 'Городской велосипед City Cruiser',
    price: 800,
    rating: 4.2,
    reviewCount: 15,
    inStock: true,
    images: ['https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80']
  },
  3: {
    id: 3,
    name: 'Шоссейный велосипед Road Master',
    price: 2200,
    rating: 4.8,
    reviewCount: 32,
    inStock: true,
    images: ['https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80']
  },
  5: {
    id: 5,
    name: 'Электровелосипед E-Rider',
    price: 3000,
    rating: 4.7,
    reviewCount: 20,
    inStock: false,
    images: ['https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80']
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const bikeId = id ? parseInt(id) : 1;
  const bike = bikesData[bikeId as keyof typeof bikesData] || bikesData[1];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    const rentalOption = bike.rentalOptions?.[selectedPeriod];
    const period = rentalOption?.period || '1 день';
    alert(`Добавлено в корзину: ${bike.name}, период: ${period}, количество: ${quantity}`);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Изображения продукта */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden bg-white h-80 md:h-96 flex items-center justify-center">
              <img 
                src={bike.images[selectedImage]} 
                alt={bike.name} 
                className="object-contain h-full w-full"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {bike.images?.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-20 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`${bike.name} view ${index + 1}`} 
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Информация о продукте */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{bike.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Icon 
                    key={i}
                    name="Star" 
                    className={`h-5 w-5 ${i < Math.floor(bike.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill={i < Math.floor(bike.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="text-sm ml-2">{bike.rating} ({bike.reviewCount} отзывов)</span>
            </div>
            
            <div className="mb-6">
              <div className={`inline-flex items-center py-1 px-2.5 rounded-full text-xs font-medium ${bike.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {bike.inStock ? 'В наличии' : 'Нет в наличии'}
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{bike.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold mb-2">Особенности:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {bike.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold mb-4">Варианты аренды:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {bike.rentalOptions?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPeriod(index)}
                    className={`p-3 border rounded-md text-center transition-colors ${selectedPeriod === index ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="font-medium">{option.period}</div>
                    <div className="text-lg font-bold">{option.price} ₽</div>
                  </button>
                ))}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Icon name="Minus" className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={increaseQuantity}
                  disabled={quantity >= 10}
                >
                  <Icon name="Plus" className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                className="flex-1" 
                onClick={addToCart} 
                disabled={!bike.inStock}
              >
                <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                Добавить в корзину
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <Tabs defaultValue="specs">
            <TabsList>
              <TabsTrigger value="specs">Характеристики</TabsTrigger>
              <TabsTrigger value="delivery">Доставка и самовывоз</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(bike.specs || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{key}:</span>
                        <span className="text-gray-600">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="delivery">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-4">Доставка и самовывоз</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium flex items-center mb-2">
                        <Icon name="Truck" className="mr-2 h-5 w-5 text-primary" />
                        Доставка
                      </h4>
                      <p className="text-gray-700">
                        Мы доставим велосипед в любую точку города в течение 24 часов. 
                        Стоимость доставки составляет 300 ₽. При аренде от 3 дней — доставка бесплатная.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center mb-2">
                        <Icon name="Store" className="mr-2 h-5 w-5 text-primary" />
                        Самовывоз
                      </h4>
                      <p className="text-gray-700">
                        Вы можете забрать велосипед самостоятельно из любого нашего пункта проката. 
                        Самовывоз доступен в часы работы пунктов.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center mb-2">
                        <Icon name="ShieldCheck" className="mr-2 h-5 w-5 text-primary" />
                        Залог
                      </h4>
                      <p className="text-gray-700">
                        При аренде велосипеда требуется залог в размере 3000 ₽ или документ, удостоверяющий личность.
                        Залог возвращается после возврата велосипеда в исправном состоянии.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Отзывы клиентов</h3>
                    <Button>Оставить отзыв</Button>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      {
                        name: 'Иван Петров',
                        rating: 5,
                        date: '25 апреля 2025',
                        content: 'Отличный велосипед! Арендовал на выходные для поездки в парк. Всё работало идеально, переключение скоростей плавное, тормоза надежные. Очень доволен и обязательно арендую снова.'
                      },
                      {
                        name: 'Анна Сидорова',
                        rating: 4,
                        date: '20 апреля 2025',
                        content: 'Хороший велосипед для своей цены. Проехала около 30 км без проблем. Седло немного жестковато, но в целом опыт положительный.'
                      },
                      {
                        name: 'Дмитрий Иванов',
                        rating: 5,
                        date: '15 апреля 2025',
                        content: 'Супер! Велосипед в отличном состоянии, всё смазано и настроено. Спасибо за отличный сервис и своевременную доставку.'
                      }
                    ].map((review, index) => (
                      <div key={index} className="pb-4 border-b last:border-0">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{review.name}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i}
                              name="Star" 
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill={i < review.rating ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Похожие товары */}
        {bike.relatedProducts && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Похожие велосипеды</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bike.relatedProducts.map(id => {
                const relatedBike = bikesData[id as keyof typeof bikesData];
                if (!relatedBike) return null;
                
                return (
                  <Card key={id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relatedBike.images[0]} 
                        alt={relatedBike.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold truncate">{relatedBike.name}</h3>
                      <div className="flex items-center text-sm mt-1 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i}
                              name="Star" 
                              className={`h-4 w-4 ${i < Math.floor(relatedBike.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill={i < Math.floor(relatedBike.rating) ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                        <span className="ml-1">({relatedBike.reviewCount})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">{relatedBike.price} ₽/день</span>
                        <Button variant="outline" size="sm">
                          Подробнее
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
