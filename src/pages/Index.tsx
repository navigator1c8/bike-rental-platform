
import { Layout } from '@/components/Layout';
import { BikeCard, BikeProps } from '@/components/BikeCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  // Пример данных о велосипедах для главной страницы
  const featuredBikes: BikeProps[] = [
    {
      id: 1,
      name: 'Горный велосипед GT',
      type: 'Горный',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800',
      pricePerHour: 300,
      available: true
    },
    {
      id: 2,
      name: 'Шоссейный велосипед Cube',
      type: 'Шоссейный',
      image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=800',
      pricePerHour: 350,
      available: true
    },
    {
      id: 3,
      name: 'Городской велосипед Trek',
      type: 'Городской',
      image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800',
      pricePerHour: 250,
      available: false
    },
  ];

  return (
    <Layout>
      {/* Hero секция */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1200")' }}>
          <div className="container mx-auto px-4 h-full flex items-center relative z-20">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Прокат велосипедов для активного отдыха</h1>
              <p className="text-lg mb-8">Широкий выбор велосипедов для любых маршрутов и приключений. Доступные цены и отличный сервис.</p>
              <div className="flex gap-4">
                <Button asChild size="lg" className="text-base">
                  <Link to="/catalog">Выбрать велосипед</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black text-base">
                  <Link to="/about">О нас</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Типы велосипедов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
              <img src="https://images.unsplash.com/photo-1596073419667-9d77d59f033f?q=80&w=600" alt="Горные велосипеды" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Горные велосипеды</h3>
                <p className="text-gray-600 mb-4">Для любителей бездорожья и горных троп</p>
                <Button asChild variant="outline">
                  <Link to="/catalog">Посмотреть</Link>
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
              <img src="https://images.unsplash.com/photo-1571333250630-f0369550a953?q=80&w=600" alt="Городские велосипеды" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Городские велосипеды</h3>
                <p className="text-gray-600 mb-4">Комфортный транспорт для городских прогулок</p>
                <Button asChild variant="outline">
                  <Link to="/catalog">Посмотреть</Link>
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
              <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600" alt="Шоссейные велосипеды" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Шоссейные велосипеды</h3>
                <p className="text-gray-600 mb-4">Для скоростной езды по асфальтированным дорогам</p>
                <Button asChild variant="outline">
                  <Link to="/catalog">Посмотреть</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Популярные велосипеды */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Популярные велосипеды</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Самые востребованные модели для комфортного передвижения по городу и активного отдыха</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBikes.map(bike => (
              <BikeCard key={bike.id} {...bike} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/catalog">Смотреть все велосипеды</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Качественные велосипеды</h3>
              <p className="text-primary-foreground/90">Наши велосипеды регулярно проходят техническое обслуживание</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Гибкие условия аренды</h3>
              <p className="text-primary-foreground/90">Аренда на час, день или неделю – выбирайте то, что удобно вам</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-primary-foreground/90">Мы доставим велосипед в любую точку города за час</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы к новым приключениям?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Забронируйте велосипед прямо сейчас и отправляйтесь на прогулку по городу или в захватывающее путешествие!</p>
          <Button asChild size="lg">
            <Link to="/catalog">Забронировать велосипед</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
