
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">О нашей компании</h1>
          
          {/* Hero Section */}
          <div className="relative rounded-xl overflow-hidden mb-12 h-80 md:h-96">
            <img 
              src="https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
              alt="Наша команда" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Мы любим велосипеды</h2>
                <p className="text-white/90">Наша миссия — сделать велосипедные прогулки доступными для всех</p>
              </div>
            </div>
          </div>
          
          {/* Our Story */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Наша история</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg leading-relaxed mb-4">
                  Компания "ВелоПрокат" была основана в 2015 году группой энтузиастов велоспорта, которые мечтали сделать активный отдых на велосипедах доступным для всех жителей и гостей города.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Мы начали с небольшого гаража и десятка велосипедов, а сегодня наш парк насчитывает более 200 современных велосипедов различных типов и брендов, а наши пункты проката расположены в самых удобных местах города.
                </p>
                <p className="text-lg leading-relaxed">
                  За годы работы мы помогли тысячам людей открыть для себя радость велопрогулок, организовали сотни групповых заездов и экскурсий, а также внесли свой вклад в развитие велоинфраструктуры города.
                </p>
              </div>
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1526723038553-7c01bdf63dc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Основание компании" 
                  className="rounded-lg w-full h-64 object-cover"
                />
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 text-purple-800 p-3 rounded-full">
                    <Icon name="Calendar" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Основаны в 2015 году</p>
                    <p className="text-sm text-muted-foreground">10 лет на рынке</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <Separator className="my-12" />
          
          {/* Our Values */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Наши ценности</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <div className="h-3 bg-green-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
                    <Icon name="Leaf" className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Экологичность</h3>
                  <p className="text-muted-foreground">
                    Мы продвигаем велосипеды как экологически чистый вид транспорта, который не загрязняет окружающую среду.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-3 bg-blue-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                    <Icon name="Shield" className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Безопасность</h3>
                  <p className="text-muted-foreground">
                    Мы предоставляем только исправные велосипеды и необходимую защиту, регулярно проверяем техническое состояние нашего парка.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-3 bg-orange-500"></div>
                <CardContent className="pt-6">
                  <div className="bg-orange-100 p-3 rounded-full w-fit mb-4">
                    <Icon name="Users" className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Доступность</h3>
                  <p className="text-muted-foreground">
                    Мы стремимся сделать велопрокат доступным для людей с любым бюджетом, предлагая гибкие тарифы и акции.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Team */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Наша команда</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Алексей Смирнов',
                  position: 'Основатель и директор',
                  photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                },
                {
                  name: 'Елена Петрова',
                  position: 'Менеджер по аренде',
                  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
                },
                {
                  name: 'Дмитрий Козлов',
                  position: 'Главный механик',
                  photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1534&q=80'
                },
              ].map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-64">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="text-center py-4">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-muted-foreground">{member.position}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Statistics */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Мы в цифрах</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: '200+', label: 'Велосипедов', icon: 'Bike' },
                { number: '15,000+', label: 'Довольных клиентов', icon: 'Users' },
                { number: '5', label: 'Точек проката', icon: 'MapPin' },
                { number: '10', label: 'Лет на рынке', icon: 'Calendar' },
              ].map((stat, index) => (
                <Card key={index}>
                  <CardContent className="text-center py-6">
                    <Icon name={stat.icon} className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-3xl font-bold">{stat.number}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
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

export default About;
