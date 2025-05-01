
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь была бы отправка данных на сервер
    alert('Сообщение отправлено! (демо)');
    setFormData({ name: '', email: '', message: '' });
  };

  const locations = [
    {
      id: 'center',
      name: 'Центральный офис',
      address: 'ул. Велосипедная, 123, Москва',
      phone: '+7 (495) 123-45-67',
      email: 'info@velorent.ru',
      hours: 'Пн-Пт: 9:00 - 20:00, Сб-Вс: 10:00 - 18:00',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.397087762238!2d37.62491491581782!3d55.753896180451424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1651232822267!5m2!1sru!2sru'
    },
    {
      id: 'park',
      name: 'Пункт проката в парке',
      address: 'Центральный парк, павильон 5, Москва',
      phone: '+7 (495) 987-65-43',
      email: 'park@velorent.ru',
      hours: 'Ежедневно: 8:00 - 22:00',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.397087762238!2d37.62491491581782!3d55.753896180451424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1651232822267!5m2!1sru!2sru'
    },
    {
      id: 'riverside',
      name: 'Пункт проката на набережной',
      address: 'Пушкинская набережная, 10, Москва',
      phone: '+7 (495) 765-43-21',
      email: 'river@velorent.ru',
      hours: 'Ежедневно: 10:00 - 21:00',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.397087762238!2d37.62491491581782!3d55.753896180451424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1651232822267!5m2!1sru!2sru'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Контакты</h1>
        
        <div className="max-w-5xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">Свяжитесь с нами</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Если у вас есть вопросы о наших услугах или вы хотите забронировать велосипед, 
              не стесняйтесь связаться с нами любым удобным способом.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {/* Contact Information */}
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Наши контакты</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Icon name="Phone" className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      <p className="text-muted-foreground">+7 (495) 987-65-43</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Icon name="Mail" className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@velorent.ru</p>
                      <p className="text-muted-foreground">support@velorent.ru</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Icon name="Clock" className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Время работы</p>
                      <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00</p>
                      <p className="text-muted-foreground">Сб-Вс: 10:00 - 18:00</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">Мы в соцсетях</h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon">
                      <Icon name="Facebook" className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Instagram" className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Twitter" className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Youtube" className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Form */}
            <Card className="lg:col-span-3">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Отправить сообщение</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="Иван Петров" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="example@mail.ru" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      placeholder="Ваше сообщение..." 
                      rows={5} 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Отправить</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Locations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Наши пункты проката</h2>
            <Tabs defaultValue={locations[0].id} className="w-full">
              <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
                {locations.map(location => (
                  <TabsTrigger key={location.id} value={location.id} className="whitespace-nowrap">
                    {location.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {locations.map(location => (
                <TabsContent key={location.id} value={location.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">{location.name}</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="mr-3 mt-1">
                              <Icon name="MapPin" className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Адрес</p>
                              <p className="text-muted-foreground">{location.address}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mr-3 mt-1">
                              <Icon name="Phone" className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Телефон</p>
                              <p className="text-muted-foreground">{location.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mr-3 mt-1">
                              <Icon name="Mail" className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-muted-foreground">{location.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mr-3 mt-1">
                              <Icon name="Clock" className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Время работы</p>
                              <p className="text-muted-foreground">{location.hours}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="h-64 md:h-auto rounded-lg overflow-hidden">
                      <iframe 
                        src={location.map} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Карта ${location.name}`}
                      ></iframe>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>
          
          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Часто задаваемые вопросы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: 'Какие документы нужны для аренды велосипеда?',
                  answer: 'Для аренды велосипеда необходим паспорт или водительское удостоверение. В некоторых случаях может потребоваться залог.'
                },
                {
                  question: 'Можно ли арендовать велосипед на длительный срок?',
                  answer: 'Да, мы предлагаем специальные тарифы для долгосрочной аренды от 1 недели до нескольких месяцев.'
                },
                {
                  question: 'Что делать, если велосипед сломался во время аренды?',
                  answer: 'В случае поломки велосипеда свяжитесь с нами по телефону. Мы организуем замену велосипеда или техническую помощь в кратчайшие сроки.'
                },
                {
                  question: 'Предоставляете ли вы шлемы и другое защитное снаряжение?',
                  answer: 'Да, мы предоставляем шлемы, замки и другое снаряжение бесплатно при аренде велосипеда.'
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
