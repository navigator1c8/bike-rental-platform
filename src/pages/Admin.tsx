
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

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

const dashboard = {
  totalBikes: 43,
  totalRented: 15,
  totalOrders: 28,
  revenue: 125000,
  pendingOrders: 5
};

const Admin = () => {
  const [newBike, setNewBike] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBike(prev => ({ ...prev, [name]: value }));
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
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="add">Добавить товар</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Недавняя активность</CardTitle>
                <CardDescription>
                  Последние 5 действий в системе
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
                </div>
              </CardContent>
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
                  <Input placeholder="Поиск..." className="max-w-sm" />
                  <Button>
                    <Icon name="Plus" className="mr-2 h-4 w-4" />
                    Добавить
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
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
                        <TableCell className="font-medium">{bike.id}</TableCell>
                        <TableCell>{bike.name}</TableCell>
                        <TableCell>{bike.category}</TableCell>
                        <TableCell className="text-right">{bike.price}</TableCell>
                        <TableCell className="text-right">{bike.stock}</TableCell>
                        <TableCell className="text-right">
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
                    {orders.map((order) => (
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
                      <Input 
                        id="category" 
                        name="category" 
                        value={newBike.category} 
                        onChange={handleInputChange} 
                        placeholder="Например: mountain, city, road" 
                        required 
                      />
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
