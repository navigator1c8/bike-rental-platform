
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';

// Временные данные для корзины
const initialCartItems = [
  {
    id: 1,
    name: 'Горный велосипед XC Pro',
    price: 750,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    quantity: 1,
    rentalPeriod: '1 день'
  },
  {
    id: 3,
    name: 'Шоссейный велосипед Road Master',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    quantity: 1,
    rentalPeriod: '1 день'
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setCartItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = deliveryMethod === 'delivery' ? 300 : 0;
  const discount = promoCode === 'BIKE2025' ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryCost - discount;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь была бы отправка заказа на сервер
    alert('Заказ оформлен! (демо)');
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Корзина</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Список товаров в корзине */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.id}`} className="text-lg font-semibold hover:text-primary">
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.rentalPeriod}</p>
                          <div className="flex items-center mt-2">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <Icon name="Minus" className="h-3 w-3" />
                            </button>
                            <span className="mx-3">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                              disabled={item.quantity >= 10}
                            >
                              <Icon name="Plus" className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{item.price} ₽</p>
                          <p className="text-sm text-muted-foreground">
                            {item.price * item.quantity} ₽ (всего)
                          </p>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-sm text-red-500 hover:text-red-700 mt-2"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
                    <Link to="/catalog" className="flex items-center text-primary hover:underline">
                      <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                      Продолжить покупки
                    </Link>
                    <Button 
                      variant="outline" 
                      className="mt-4 sm:mt-0"
                      onClick={() => setCartItems([])}
                    >
                      Очистить корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Форма заказа */}
              <form onSubmit={handleSubmitOrder} className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Информация о заказе</h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={customerInfo.name} 
                            onChange={handleInputChange} 
                            placeholder="Иван Петров" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            value={customerInfo.phone} 
                            onChange={handleInputChange} 
                            placeholder="+7 (999) 123-45-67" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={customerInfo.email} 
                          onChange={handleInputChange} 
                          placeholder="example@mail.ru" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Способ получения</Label>
                        <RadioGroup 
                          value={deliveryMethod} 
                          onValueChange={setDeliveryMethod}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="delivery" id="delivery" />
                            <Label htmlFor="delivery" className="cursor-pointer">
                              Доставка (300 ₽)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pickup" id="pickup" />
                            <Label htmlFor="pickup" className="cursor-pointer">
                              Самовывоз (бесплатно)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {deliveryMethod === 'delivery' && (
                        <div className="space-y-2">
                          <Label htmlFor="address">Адрес доставки</Label>
                          <Input 
                            id="address" 
                            name="address" 
                            value={customerInfo.address} 
                            onChange={handleInputChange} 
                            placeholder="Город, улица, дом, квартира" 
                            required 
                          />
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="comment">Комментарий к заказу</Label>
                        <Textarea 
                          id="comment" 
                          name="comment" 
                          value={customerInfo.comment} 
                          onChange={handleInputChange} 
                          placeholder="Дополнительная информация к заказу..." 
                          rows={3} 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              
                {/* Кнопка оформления заказа будет отображаться только на мобильных устройствах */}
                <div className="mt-6 lg:hidden">
                  <Button className="w-full" type="submit">
                    Оформить заказ
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Сводка заказа */}
            <div className="lg:sticky lg:top-20 h-fit">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Сводка заказа</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт.)</span>
                      <span>{subtotal} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доставка</span>
                      <span>{deliveryCost > 0 ? `${deliveryCost} ₽` : 'Бесплатно'}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Скидка</span>
                        <span>-{discount} ₽</span>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Итого</span>
                      <span>{total} ₽</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Input 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)} 
                        placeholder="Промокод" 
                      />
                      <Button variant="outline" type="button">
                        Применить
                      </Button>
                    </div>
                    
                    {promoCode === 'BIKE2025' && (
                      <div className="text-green-600 text-sm">
                        Промокод применен. Скидка 10%.
                      </div>
                    )}
                    
                    <Button className="w-full" type="submit" form="order-form">
                      Оформить заказ
                    </Button>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      Нажимая кнопку, вы соглашаетесь с условиями аренды и политикой конфиденциальности
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
              <Icon name="ShoppingCart" className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Ваша корзина пуста</h2>
            <p className="text-muted-foreground mb-6">Похоже, вы еще не добавили ни одного велосипеда в корзину.</p>
            <Button asChild size="lg">
              <Link to="/catalog">Перейти к выбору велосипедов</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
