
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

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

const Admin = () => {
  const [newBike, setNewBike] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image: ''
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'ВелоПрокат',
    logo: '/logo-b.svg',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    defaultRentalPeriod: '1 день',
    currency: 'RUB',
    notificationEmail: 'info@velorent.ru'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBike(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (name: string, value: string | boolean) => {
    setSiteSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь была бы логика отправки данных на сервер
    alert('Велосипед добавлен (демо)');
    setNewBike({
      name: '',
      price: '',
      category: '',
      stock: '',
      description: '',
      image: ''
    });
  };

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
          <h1 className="text-3xl font-bold">Панель администратора</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="HelpCircle" className="mr-2 h-4 w-4" />
              Справка
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="LogOut" className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard">
          <TabsList className="grid grid-cols-7 mb-8">
            <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
            <TabsTrigger value="add">Добавить товар</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего велосипедов</CardTitle>
                  <Icon name="Bike" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboard.totalBikes}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboard.totalRented} в аренде
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Заказы</CardTitle>
                  <Icon name="ShoppingCart" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboard.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboard.pendingOrders} ожидают обработки
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Выручка</CardTitle>
                  <Icon name="Banknote" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboard.revenue.toLocaleString()} ₽</div>
                  <p className="text-xs text-muted-foreground">
                    За последний месяц
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
                  <Icon name="Users" className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboard.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    +12 новых в этом месяце
                  </p>
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

            <Card>
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
                    <Button>
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
                          <Button variant="ghost" size="icon">
                            <Icon name="Trash" className="h-4 w-4" />
                          </Button>
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
                          <Button variant="ghost" size="icon">
                            <Icon name="Eye" className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Icon name="Printer" className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Icon name="MoreHorizontal" className="h-4 w-4" />
                          </Button>
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
                          <Button variant="ghost" size="icon">
                            <Icon name="MoreHorizontal" className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
            <Card>
              <CardHeader>
                <CardTitle>Настройки сайта</CardTitle>
                <CardDescription>
                  Управление основными параметрами и функциональностью сайта
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Название сайта</Label>
                      <Input 
                        id="siteName" 
                        value={siteSettings.siteName} 
                        onChange={(e) => handleSettingsChange('siteName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logo">Логотип (URL)</Label>
                      <Input 
                        id="logo" 
                        value={siteSettings.logo} 
                        onChange={(e) => handleSettingsChange('logo', e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Общие настройки</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenanceMode" className="block">Режим обслуживания</Label>
                        <p className="text-sm text-muted-foreground">Временно закрыть сайт для посетителей</p>
                      </div>
                      <Switch 
                        id="maintenanceMode" 
                        checked={siteSettings.maintenanceMode} 
                        onCheckedChange={(value) => handleSettingsChange('maintenanceMode', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowRegistration" className="block">Регистрация пользователей</Label>
                        <p className="text-sm text-muted-foreground">Разрешить новым пользователям регистрироваться</p>
                      </div>
                      <Switch 
                        id="allowRegistration" 
                        checked={siteSettings.allowRegistration} 
                        onCheckedChange={(value) => handleSettingsChange('allowRegistration', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requireEmailVerification" className="block">Подтверждение Email</Label>
                        <p className="text-sm text-muted-foreground">Требовать подтверждение Email при регистрации</p>
                      </div>
                      <Switch 
                        id="requireEmailVerification" 
                        checked={siteSettings.requireEmailVerification} 
                        onCheckedChange={(value) => handleSettingsChange('requireEmailVerification', value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Настройки аренды</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="defaultRentalPeriod">Период аренды по умолчанию</Label>
                        <Select 
                          value={siteSettings.defaultRentalPeriod}
                          onValueChange={(value) => handleSettingsChange('defaultRentalPeriod', value)}
                        >
                          <SelectTrigger id="defaultRentalPeriod">
                            <SelectValue placeholder="Выберите период" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 час">1 час</SelectItem>
                            <SelectItem value="3 часа">3 часа</SelectItem>
                            <SelectItem value="1 день">1 день</SelectItem>
                            <SelectItem value="1 неделя">1 неделя</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Валюта</Label>
                        <Select 
                          value={siteSettings.currency}
                          onValueChange={(value) => handleSettingsChange('currency', value)}
                        >
                          <SelectTrigger id="currency">
                            <SelectValue placeholder="Выберите валюту" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="RUB">Российский рубль (₽)</SelectItem>
                            <SelectItem value="USD">Доллар США ($)</SelectItem>
                            <SelectItem value="EUR">Евро (€)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Уведомления</h3>
                    <div className="space-y-2">
                      <Label htmlFor="notificationEmail">Email для уведомлений</Label>
                      <Input 
                        id="notificationEmail" 
                        value={siteSettings.notificationEmail} 
                        onChange={(e) => handleSettingsChange('notificationEmail', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Уведомлять о:</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notifyNewOrders" defaultChecked />
                          <label htmlFor="notifyNewOrders" className="text-sm">Новых заказах</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notifyNewUsers" defaultChecked />
                          <label htmlFor="notifyNewUsers" className="text-sm">Новых пользователях</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notifyLowStock" defaultChecked />
                          <label htmlFor="notifyLowStock" className="text-sm">Низком запасе товаров</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notifyCancelledOrders" defaultChecked />
                          <label htmlFor="notifyCancelledOrders" className="text-sm">Отмененных заказах</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">Отменить</Button>
                <Button>Сохранить настройки</Button>
              </CardFooter>
            </Card>
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Название</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={newBike.name} 
                        onChange={handleInputChange} 
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
                        value={newBike.price} 
                        onChange={handleInputChange} 
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
                        value={newBike.stock} 
                        onChange={handleInputChange} 
                        placeholder="10" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">URL изображения</Label>
                    <Input 
                      id="image" 
                      name="image" 
                      value={newBike.image} 
                      onChange={handleInputChange} 
                      placeholder="https://example.com/image.jpg" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={newBike.description} 
                      onChange={handleInputChange} 
                      placeholder="Подробное описание велосипеда..." 
                      rows={5} 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Дополнительные характеристики</Label>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="featured" />
                          <label htmlFor="featured" className="text-sm">Рекомендуемый товар</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="new" />
                          <label htmlFor="new" className="text-sm">Новинка</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="discount" />
                          <label htmlFor="discount" className="text-sm">Со скидкой</label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Бренд</Label>
                      <Select>
                        <SelectTrigger id="brand">
                          <SelectValue placeholder="Выберите бренд" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trek">Trek</SelectItem>
                          <SelectItem value="giant">Giant</SelectItem>
                          <SelectItem value="specialized">Specialized</SelectItem>
                          <SelectItem value="cannondale">Cannondale</SelectItem>
                          <SelectItem value="merida">Merida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Размеры</Label>
                      <div className="flex flex-wrap gap-2">
                        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                          <div key={size} className="flex items-center space-x-1">
                            <Checkbox id={`size-${size}`} />
                            <label htmlFor={`size-${size}`} className="text-sm">{size}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button type="button" variant="outline" className="mr-2">Отмена</Button>
                    <Button type="submit">Добавить велосипед</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
