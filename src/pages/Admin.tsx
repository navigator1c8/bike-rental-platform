
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import OrderDetailsDialog from '@/components/OrderDetailsDialog';
import InventoryManagement from '@/components/InventoryManagement';
import MarketingSection from '@/components/MarketingSection';
import ReportsSection from '@/components/ReportsSection';
import StaffManagement from '@/components/StaffManagement';
import StoreSettings from '@/components/StoreSettings';

// Временные данные
const bikes = [
  { id: 1, name: 'Горный велосипед XC Pro', stock: 12, price: 1500, category: 'mountain' },
  { id: 2, name: 'Городской велосипед City Cruiser', stock: 8, price: 800, category: 'city' },
  { id: 3, name: 'Шоссейный велосипед Road Master', stock: 5, price: 2200, category: 'road' },
  { id: 4, name: 'Детский велосипед Kids Fun', stock: 15, price: 350, category: 'kids' },
  { id: 5, name: 'Электровелосипед E-Rider', stock: 3, price: 3000, category: 'electric' }
];

const orders = [
  { id: 1001, customer: 'Иван Петров', date: '2025-04-25', items: 2, total: 2300, status: 'pending' },
  { id: 1002, customer: 'Анна Сидорова', date: '2025-04-26', items: 1, total: 3000, status: 'completed' },
  { id: 1003, customer: 'Петр Иванов', date: '2025-04-27', items: 3, total: 1950, status: 'pending' },
  { id: 1004, customer: 'Елена Смирнова', date: '2025-04-28', items: 1, total: 800, status: 'cancelled' }
];

const orderItems = [
  { id: 1, product: 'Горный велосипед XC Pro', quantity: 1, price: 1500, rentalPeriod: '1 день' },
  { id: 2, product: 'Детский велосипед Kids Fun', quantity: 1, price: 350, rentalPeriod: '2 дня' },
  { id: 3, product: 'Шлем защитный', quantity: 2, price: 200, rentalPeriod: '1 день' },
];

const users = [
  { id: 1, name: 'Иван Петров', email: 'ivan@example.com', role: 'user', orders: 5, lastActive: '2025-05-01' },
  { id: 2, name: 'Анна Сидорова', email: 'anna@example.com', role: 'user', orders: 3, lastActive: '2025-04-28' },
  { id: 3, name: 'Алексей Смирнов', email: 'alexey@example.com', role: 'admin', orders: 0, lastActive: '2025-05-02' },
  { id: 4, name: 'Екатерина Иванова', email: 'ekaterina@example.com', role: 'user', orders: 12, lastActive: '2025-05-01' },
  { id: 5, name: 'Дмитрий Козлов', email: 'dmitry@example.com', role: 'manager', orders: 0, lastActive: '2025-04-25' }
];

const dashboard = {
  totalBikes: 43,
  totalRented: 15,
  totalOrders: 28,
  revenue: 125000,
  pendingOrders: 5,
  totalUsers: 150
};

const salesData = [
  { month: 'Янв', revenue: 30000, orders: 20 },
  { month: 'Фев', revenue: 42000, orders: 28 },
  { month: 'Мар', revenue: 55000, orders: 35 },
  { month: 'Апр', revenue: 72000, orders: 45 },
  { month: 'Май', revenue: 90000, orders: 52 },
  { month: 'Июн', revenue: 125000, orders: 65 }
];

const categoryData = [
  { category: 'Горные', value: 35 },
  { category: 'Городские', value: 25 },
  { category: 'Шоссейные', value: 15 },
  { category: 'Детские', value: 10 },
  { category: 'Электрические', value: 15 }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

const pieData = [
  { name: 'Летний сезон', value: 45 },
  { name: 'Весенний сезон', value: 25 },
  { name: 'Осенний сезон', value: 20 },
  { name: 'Зимний сезон', value: 10 },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showSystemAlert, setShowSystemAlert] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Аватар пользователя-администратора
  const AdminAvatar = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Avatar>
            <AvatarFallback>АС</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Алексей Смирнов</DropdownMenuLabel>
        <DropdownMenuItem>
          <Icon name="UserCog" className="mr-2 h-4 w-4" />
          Настройки профиля
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="HelpCircle" className="mr-2 h-4 w-4" />
          Справка
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="LogOut" className="mr-2 h-4 w-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const filteredOrders = orders.filter(order => {
    if (selectedStatus !== 'all' && order.status !== selectedStatus) return false;
    return order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
           order.id.toString().includes(searchTerm);
  });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 lg:hidden" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name="Menu" className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Панель администратора</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="HelpCircle" className="mr-2 h-4 w-4" />
                Справка
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Bell" className="mr-2 h-4 w-4" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground hidden md:inline-block">admin@velorent.ru</span>
              <AdminAvatar />
            </div>
          </div>
        </div>

        {showSystemAlert && (
          <Alert className="mb-6">
            <Icon name="Info" className="h-4 w-4" />
            <AlertTitle>Обновление системы</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              <span>Система обновлена до версии 2.5.0. Добавлены новые разделы: "Отчеты", "Персонал" и расширены настройки магазина.</span>
              <Button variant="ghost" size="sm" onClick={() => setShowSystemAlert(false)}>
                <Icon name="X" className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex">
          {/* Боковая панель навигации - видима на больших экранах или при развертывании на маленьких */}
          <div className={`${isExpanded ? 'block' : 'hidden'} lg:block mr-6 w-64 shrink-0`}>
            <Card className="sticky top-4">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {[
                    { icon: 'LayoutDashboard', label: 'Дашборд', value: 'dashboard' },
                    { icon: 'Bike', label: 'Товары', value: 'products' },
                    { icon: 'Warehouse', label: 'Склад', value: 'inventory' },
                    { icon: 'ShoppingCart', label: 'Заказы', value: 'orders' },
                    { icon: 'Users', label: 'Пользователи', value: 'users' },
                    { icon: 'UserCog', label: 'Персонал', value: 'staff' },
                    { icon: 'LineChart', label: 'Отчеты', value: 'reports' },
                    { icon: 'BadgePercent', label: 'Маркетинг', value: 'marketing' },
                    { icon: 'BarChart', label: 'Аналитика', value: 'analytics' },
                    { icon: 'Settings', label: 'Настройки', value: 'settings' },
                    { icon: 'Plus', label: 'Добавить товар', value: 'add' },
                  ].map((item) => (
                    <Button 
                      key={item.value}
                      variant={activeTab === item.value ? 'default' : 'ghost'} 
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab(item.value);
                        setIsExpanded(false);
                      }}
                    >
                      <Icon name={item.icon} className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Статус системы</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Сервер:</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                        <span className="text-xs">Онлайн</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">База данных:</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                        <span className="text-xs">Онлайн</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Платежи:</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                        <span className="text-xs">Активны</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Последнее резервное копирование</h4>
                    <p className="text-xs text-muted-foreground">3 мая 2025, 08:00</p>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Icon name="ExternalLink" className="mr-2 h-4 w-4" />
                    Перейти на сайт
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Основное содержимое */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="lg:hidden">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
                  <TabsTrigger value="orders">Заказы</TabsTrigger>
                  <TabsTrigger value="products">Товары</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="dashboard">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Всего велосипедов</CardTitle>
                      <Icon name="Bike" className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboard.totalBikes}</div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                          {dashboard.totalRented} в аренде
                        </p>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+5%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Заказы</CardTitle>
                      <Icon name="ShoppingCart" className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboard.totalOrders}</div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                          {dashboard.pendingOrders} ожидают обработки
                        </p>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+12%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Выручка</CardTitle>
                      <Icon name="Banknote" className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboard.revenue.toLocaleString()} ₽</div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                          За последний месяц
                        </p>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+18%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
                      <Icon name="Users" className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboard.totalUsers}</div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                          +12 новых в этом месяце
                        </p>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+8%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Продажи за 6 месяцев</CardTitle>
                      <CardDescription>Выручка и количество заказов</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={salesData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                            <Tooltip />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="revenue" name="Выручка (₽)" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line yAxisId="right" type="monotone" dataKey="orders" name="Заказы" stroke="#82ca9d" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Распределение по категориям</CardTitle>
                      <CardDescription>Количество велосипедов по категориям</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={categoryData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Количество" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Недавняя активность</CardTitle>
                      <CardDescription>
                        Последние действия в системе
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="mr-4 bg-green-100 p-2 rounded-full">
                            <Icon name="CheckCircle" className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Заказ #1002 выполнен</p>
                            <p className="text-xs text-muted-foreground">2 часа назад</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 bg-blue-100 p-2 rounded-full">
                            <Icon name="Plus" className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Добавлен новый велосипед</p>
                            <p className="text-xs text-muted-foreground">5 часов назад</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 bg-yellow-100 p-2 rounded-full">
                            <Icon name="AlertCircle" className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Новый заказ #1003</p>
                            <p className="text-xs text-muted-foreground">10 часов назад</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 bg-purple-100 p-2 rounded-full">
                            <Icon name="UserPlus" className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Новый пользователь зарегистрирован</p>
                            <p className="text-xs text-muted-foreground">1 день назад</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 bg-red-100 p-2 rounded-full">
                            <Icon name="X" className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Заказ #999 отменен</p>
                            <p className="text-xs text-muted-foreground">2 дня назад</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Просмотреть всю активность
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Сезонность проката</CardTitle>
                      <CardDescription>Распределение заказов по сезонам</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[240px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Задачи на сегодня</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="task1" />
                          <label htmlFor="task1" className="text-sm">Обработать новые заказы (5)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="task2" />
                          <label htmlFor="task2" className="text-sm">Обновить статусы доставки</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="task3" />
                          <label htmlFor="task3" className="text-sm">Пополнить запасы на складе</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="task4" />
                          <label htmlFor="task4" className="text-sm">Подготовить отчет за месяц</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="task5" checked />
                          <label htmlFor="task5" className="text-sm line-through text-muted-foreground">Запустить маркетинговую кампанию</label>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        <Icon name="Plus" className="mr-2 h-4 w-4" />
                        Добавить задачу
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Товары с низким запасом</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {bikes
                          .filter(bike => bike.stock <= 5)
                          .map(bike => (
                            <div key={bike.id} className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">{bike.name}</p>
                                <p className="text-xs text-muted-foreground">ID: {bike.id} | Категория: {bike.category}</p>
                              </div>
                              <Badge 
                                className={bike.stock <= 3 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}
                              >
                                {bike.stock} шт.
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('inventory')}>
                        Управление складом
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Заказы, ожидающие обработки</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {orders
                          .filter(order => order.status === 'pending')
                          .map(order => (
                            <div key={order.id} className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium">Заказ #{order.id}</p>
                                <p className="text-xs text-muted-foreground">{order.customer} | {order.date}</p>
                              </div>
                              <Badge className="bg-yellow-100 text-yellow-800">
                                {order.total} ₽
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('orders')}>
                        Все заказы
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="products">
                <Card>
                  <CardHeader>
                    <CardTitle>Управление велосипедами</CardTitle>
                    <CardDescription>
                      Всего в наличии: {bikes.reduce((sum, bike) => sum + bike.stock, 0)} велосипедов
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <div className="flex space-x-2 w-full max-w-md">
                        <Input 
                          placeholder="Поиск..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Select>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Категория" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все категории</SelectItem>
                            <SelectItem value="mountain">Горные</SelectItem>
                            <SelectItem value="city">Городские</SelectItem>
                            <SelectItem value="road">Шоссейные</SelectItem>
                            <SelectItem value="kids">Детские</SelectItem>
                            <SelectItem value="electric">Электрические</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline">
                          <Icon name="FileDown" className="mr-2 h-4 w-4" />
                          Экспорт
                        </Button>
                        <Button onClick={() => setActiveTab('add')}>
                          <Icon name="Plus" className="mr-2 h-4 w-4" />
                          Добавить
                        </Button>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">
                            <Checkbox />
                          </TableHead>
                          <TableHead>ID</TableHead>
                          <TableHead>Название</TableHead>
                          <TableHead>Категория</TableHead>
                          <TableHead className="text-right">Цена (₽)</TableHead>
                          <TableHead className="text-right">В наличии</TableHead>
                          <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bikes.map((bike) => (
                          <TableRow key={bike.id}>
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell className="font-medium">{bike.id}</TableCell>
                            <TableCell>{bike.name}</TableCell>
                            <TableCell>
                              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800">
                                {bike.category}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{bike.price}</TableCell>
                            <TableCell className="text-right">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${bike.stock > 5 ? 'bg-green-100 text-green-800' : bike.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                {bike.stock}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Icon name="Eye" className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Icon name="Pencil" className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Icon name="MoreHorizontal" className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Icon name="Copy" className="mr-2 h-4 w-4" />
                                    Дублировать
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Icon name="Archive" className="mr-2 h-4 w-4" />
                                    Архивировать
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Icon name="Trash" className="mr-2 h-4 w-4" />
                                    Удалить
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground">
                        Показано 5 из 43 велосипедов
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" disabled>
                          <Icon name="ChevronLeft" className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="px-3">1</Button>
                        <Button variant="outline" size="sm" className="px-3">2</Button>
                        <Button variant="outline" size="sm" className="px-3">3</Button>
                        <Button variant="outline" size="sm">
                          <Icon name="ChevronRight" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory">
                <InventoryManagement />
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Управление заказами</CardTitle>
                    <CardDescription>
                      Всего заказов: {orders.length}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <div className="flex space-x-2 w-full max-w-md">
                        <Input 
                          placeholder="Поиск по клиенту или номеру заказа..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Статус" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все статусы</SelectItem>
                            <SelectItem value="pending">В обработке</SelectItem>
                            <SelectItem value="completed">Выполнен</SelectItem>
                            <SelectItem value="cancelled">Отменен</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline">
                        <Icon name="FileDown" className="mr-2 h-4 w-4" />
                        Экспорт
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>№ заказа</TableHead>
                          <TableHead>Клиент</TableHead>
                          <TableHead>Дата</TableHead>
                          <TableHead className="text-right">Количество</TableHead>
                          <TableHead className="text-right">Сумма (₽)</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell className="text-right">{order.items}</TableCell>
                            <TableCell className="text-right">{order.total}</TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold 
                                ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'}`}>
                                {order.status === 'completed' ? 'Выполнен' : 
                                  order.status === 'pending' ? 'В обработке' : 'Отменен'}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <OrderDetailsDialog 
                                orderId={order.id}
                                customer={order.customer}
                                date={order.date}
                                status={order.status}
                                items={orderItems}
                                total={order.total}
                              />
                              <Button variant="ghost" size="icon">
                                <Icon name="Printer" className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Icon name="MoreHorizontal" className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Icon name="Check" className="mr-2 h-4 w-4" />
                                    Пометить как выполненный
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Icon name="Send" className="mr-2 h-4 w-4" />
                                    Отправить уведомление
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Icon name="XCircle" className="mr-2 h-4 w-4" />
                                    Отменить заказ
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>Управление пользователями</CardTitle>
                    <CardDescription>
                      Всего пользователей: {users.length}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <div className="flex space-x-2 w-full max-w-md">
                        <Input 
                          placeholder="Поиск по имени или email..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Select>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Роль" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все роли</SelectItem>
                            <SelectItem value="admin">Администратор</SelectItem>
                            <SelectItem value="manager">Менеджер</SelectItem>
                            <SelectItem value="user">Пользователь</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline">
                          <Icon name="FileDown" className="mr-2 h-4 w-4" />
                          Экспорт
                        </Button>
                        <Button>
                          <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                          Добавить
                        </Button>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Имя</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Роль</TableHead>
                          <TableHead className="text-right">Заказы</TableHead>
                          <TableHead>Последняя активность</TableHead>
                          <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold 
                                ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                                  user.role === 'manager' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-green-100 text-green-800'}`}>
                                {user.role === 'admin' ? 'Администратор' : 
                                  user.role === 'manager' ? 'Менеджер' : 'Пользователь'}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{user.orders}</TableCell>
                            <TableCell>{user.lastActive}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Icon name="UserCog" className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Icon name="MessageSquare" className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Icon name="MoreHorizontal" className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Icon name="ShieldAlert" className="mr-2 h-4 w-4" />
                                    Изменить роль
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Icon name="Ban" className="mr-2 h-4 w-4" />
                                    Заблокировать
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Icon name="RefreshCcw" className="mr-2 h-4 w-4" />
                                    Сбросить пароль
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="staff">
                <StaffManagement />
              </TabsContent>

              <TabsContent value="marketing">
                <MarketingSection />
              </TabsContent>

              <TabsContent value="reports">
                <ReportsSection />
              </TabsContent>

              <TabsContent value="analytics">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Аналитика продаж</CardTitle>
                    <CardDescription>
                      Детальные данные о продажах за последние 6 месяцев
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={salesData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="revenue" name="Выручка (₽)" stroke="#8884d8" activeDot={{ r: 8 }} />
                          <Line yAxisId="right" type="monotone" dataKey="orders" name="Заказы" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Распределение по категориям</CardTitle>
                      <CardDescription>
                        Популярность различных категорий велосипедов
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={categoryData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Количество" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Ключевые показатели</CardTitle>
                      <CardDescription>
                        Основные метрики эффективности
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Конверсия посетителей в клиенты</span>
                            <span className="text-sm font-bold">12.5%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: '12.5%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Среднее время аренды</span>
                            <span className="text-sm font-bold">2.3 дня</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: '46%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Средняя стоимость заказа</span>
                            <span className="text-sm font-bold">1,850 ₽</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Повторные клиенты</span>
                            <span className="text-sm font-bold">42%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: '42%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Топ клиенты</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: 'Екатерина Иванова', orders: 12, total: 22500 },
                          { name: 'Иван Петров', orders: 8, total: 15000 },
                          { name: 'Мария Смирнова', orders: 7, total: 13200 },
                          { name: 'Алексей Козлов', orders: 6, total: 11800 },
                        ].map((client, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                <Icon name="User" className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{client.name}</p>
                                <p className="text-xs text-muted-foreground">{client.orders} заказов</p>
                              </div>
                            </div>
                            <p className="font-semibold">{client.total} ₽</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Популярные модели</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: 'Горный велосипед XC Pro', rentals: 34, revenue: 51000 },
                          { name: 'Электровелосипед E-Rider', rentals: 25, revenue: 75000 },
                          { name: 'Городской велосипед City Cruiser', rentals: 22, revenue: 17600 },
                          { name: 'Шоссейный велосипед Road Master', rentals: 18, revenue: 39600 },
                        ].map((model, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                <Icon name="Bike" className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{model.name}</p>
                                <p className="text-xs text-muted-foreground">{model.rentals} аренд</p>
                              </div>
                            </div>
                            <p className="font-semibold">{model.revenue} ₽</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Источники клиентов</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { source: 'Органический поиск', percentage: 42 },
                          { source: 'Прямые заходы', percentage: 28 },
                          { source: 'Социальные сети', percentage: 18 },
                          { source: 'Реферальные ссылки', percentage: 12 },
                        ].map((source, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{source.source}</span>
                              <span className="text-sm font-bold">{source.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${source.percentage}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <StoreSettings />
              </TabsContent>

              <TabsContent value="add">
                <Card>
                  <CardHeader>
                    <CardTitle>Добавить новый велосипед</CardTitle>
                    <CardDescription>
                      Заполните форму для добавления нового велосипеда в каталог
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Название</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            placeholder="Например: Горный велосипед XC Pro" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Категория</Label>
                          <Select>
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mountain">Горный</SelectItem>
                              <SelectItem value="city">Городской</SelectItem>
                              <SelectItem value="road">Шоссейный</SelectItem>
                              <SelectItem value="kids">Детский</SelectItem>
                              <SelectItem value="electric">Электрический</SelectItem>
                              <SelectItem value="folding">Складной</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Цена (₽)</Label>
                          <Input 
                            id="price" 
                            name="price" 
                            type="number" 
                            placeholder="1500" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stock">Количество</Label>
                          <Input 
                            id="stock" 
                            name="stock" 
                            type="number" 
                            placeholder="10" 
                            required 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image">URL изображения</Label>
                        <div className="flex space-x-2">
                          <Input 
                            id="image" 
                            name="image" 
                            placeholder="https://example.com/image.jpg" 
                          />
                          <Button variant="outline" type="button" className="whitespace-nowrap">Загрузить файл</Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Поддерживаемые форматы: JPG, PNG, WEBP. Максимальный размер: 2MB</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Описание</Label>
                        <Textarea 
                          id="description" 
                          name="description" 
                          placeholder="Подробное описание велосипеда..." 
                          rows={5} 
                        />
                      </div>

                      <Separator />

                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline">Отмена</Button>
                        <Button type="submit">Добавить велосипед</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
