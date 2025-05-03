
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F', '#FFBB28', '#FF8042'];

// Данные для финансовых отчетов
const monthlyRevenueData = [
  { month: 'Янв', revenue: 30000, expenses: 18000, profit: 12000 },
  { month: 'Фев', revenue: 42000, expenses: 25000, profit: 17000 },
  { month: 'Мар', revenue: 55000, expenses: 32000, profit: 23000 },
  { month: 'Апр', revenue: 72000, expenses: 42000, profit: 30000 },
  { month: 'Май', revenue: 90000, expenses: 51000, profit: 39000 },
  { month: 'Июн', revenue: 125000, expenses: 68000, profit: 57000 }
];

const quarterlyRevenueData = [
  { quarter: 'Q1 2024', revenue: 127000, expenses: 75000, profit: 52000 },
  { quarter: 'Q2 2024', revenue: 287000, expenses: 161000, profit: 126000 },
  { quarter: 'Q3 2024', revenue: 315000, expenses: 178000, profit: 137000 },
  { quarter: 'Q4 2024', revenue: 392000, expenses: 210000, profit: 182000 },
  { quarter: 'Q1 2025', revenue: 414000, expenses: 221000, profit: 193000 }
];

const expensesByCategoryData = [
  { name: 'Закупка товаров', value: 42 },
  { name: 'Аренда помещений', value: 18 },
  { name: 'Зарплата', value: 25 },
  { name: 'Маркетинг', value: 8 },
  { name: 'Логистика', value: 5 },
  { name: 'Прочее', value: 2 }
];

// Данные для отчетов по продажам
const topSellingProducts = [
  { id: 1, name: 'Горный велосипед XC Pro', sales: 35, revenue: 52500 },
  { id: 2, name: 'Электровелосипед E-Rider', sales: 28, revenue: 84000 },
  { id: 3, name: 'Городской велосипед City Cruiser', sales: 25, revenue: 20000 },
  { id: 4, name: 'Шоссейный велосипед Road Master', sales: 20, revenue: 44000 },
  { id: 5, name: 'Детский велосипед Kids Fun', sales: 18, revenue: 6300 }
];

const salesByRegionData = [
  { name: 'Москва', value: 45 },
  { name: 'Санкт-Петербург', value: 25 },
  { name: 'Екатеринбург', value: 10 },
  { name: 'Казань', value: 8 },
  { name: 'Новосибирск', value: 7 },
  { name: 'Другие', value: 5 }
];

const salesByTimeData = [
  { name: '8:00', sales: 5 },
  { name: '10:00', sales: 12 },
  { name: '12:00', sales: 25 },
  { name: '14:00', sales: 30 },
  { name: '16:00', sales: 28 },
  { name: '18:00', sales: 40 },
  { name: '20:00', sales: 22 },
  { name: '22:00', sales: 12 }
];

const customerLoyaltyData = [
  { category: 'Новые клиенты', value: 35 },
  { category: '2-5 покупок', value: 40 },
  { category: '6-10 покупок', value: 15 },
  { category: '>10 покупок', value: 10 }
];

// Данные для отчетов по инвентарю
const inventoryTurnoverData = [
  { month: 'Янв', turnover: 2.1 },
  { month: 'Фев', turnover: 2.3 },
  { month: 'Мар', turnover: 2.6 },
  { month: 'Апр', turnover: 3.2 },
  { month: 'Май', turnover: 3.5 },
  { month: 'Июн', turnover: 3.8 }
];

const inventoryStatusData = [
  { name: 'В наличии', value: 65 },
  { name: 'Зарезервировано', value: 15 },
  { name: 'Низкий запас', value: 12 },
  { name: 'Нет в наличии', value: 8 }
];

const topRentedProductsData = [
  { name: 'Горный велосипед XC Pro', frequency: 85 },
  { name: 'Городской велосипед City Cruiser', frequency: 72 },
  { name: 'Электровелосипед E-Rider', frequency: 58 },
  { name: 'Шоссейный велосипед Road Master', frequency: 45 },
  { name: 'Детский велосипед Kids Fun', frequency: 30 }
];

// Компонент для отображения финансовых отчетов
const FinancialReports = () => {
  const [period, setPeriod] = useState('monthly');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Помесячно</SelectItem>
              <SelectItem value="quarterly">Поквартально</SelectItem>
              <SelectItem value="yearly">За год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Icon name="Calendar" className="mr-2 h-4 w-4" />
            Выбрать даты
          </Button>
        </div>
        <Button variant="outline">
          <Icon name="FileDown" className="mr-2 h-4 w-4" />
          Экспорт в Excel
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Обзор доходов и расходов</CardTitle>
          <CardDescription>
            {period === 'monthly' ? 'Помесячная динамика за последние 6 месяцев' : 
             period === 'quarterly' ? 'Поквартальная динамика за последние 5 кварталов' : 
             'Годовая динамика'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={period === 'monthly' ? monthlyRevenueData : quarterlyRevenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff8042" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff8042" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={period === 'monthly' ? 'month' : 'quarter'} />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()} ₽`} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Доходы" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  name="Расходы" 
                  stroke="#ff8042" 
                  fillOpacity={1} 
                  fill="url(#colorExpenses)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  name="Прибыль" 
                  stroke="#82ca9d" 
                  fillOpacity={1} 
                  fill="url(#colorProfit)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Структура расходов</CardTitle>
            <CardDescription>Распределение расходов по категориям</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expensesByCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Финансовые показатели</CardTitle>
            <CardDescription>Ключевые финансовые метрики</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: 'Общий доход', value: '414,000 ₽', change: '+12%', positive: true },
                { name: 'Общие расходы', value: '221,000 ₽', change: '+8%', positive: false },
                { name: 'Чистая прибыль', value: '193,000 ₽', change: '+18%', positive: true },
                { name: 'Рентабельность', value: '46.6%', change: '+2.4%', positive: true },
                { name: 'Средний чек', value: '2,580 ₽', change: '+5%', positive: true }
              ].map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{metric.value}</span>
                    <span className={`text-xs ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Подробный финансовый отчет
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

// Компонент для отображения отчетов по продажам
const SalesReports = () => {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="quarter">Квартал</SelectItem>
              <SelectItem value="year">Год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Icon name="Calendar" className="mr-2 h-4 w-4" />
            Выбрать даты
          </Button>
        </div>
        <Button variant="outline">
          <Icon name="FileDown" className="mr-2 h-4 w-4" />
          Экспорт в Excel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Топ продаваемых товаров</CardTitle>
            <CardDescription>По количеству проданных единиц</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topSellingProducts}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip formatter={(value, name) => [value, name === 'sales' ? 'Продажи (шт.)' : 'Выручка (₽)']} />
                  <Legend />
                  <Bar dataKey="sales" name="Количество продаж" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Продажи по регионам</CardTitle>
            <CardDescription>Распределение продаж по географии</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByRegionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {salesByRegionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Продажи по времени суток</CardTitle>
            <CardDescription>Распределение заказов в течение дня</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesByTimeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} заказов`} />
                  <Legend />
                  <Line type="monotone" dataKey="sales" name="Количество заказов" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Лояльность клиентов</CardTitle>
            <CardDescription>Распределение клиентов по частоте покупок</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={customerLoyaltyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="value" name="Доля клиентов" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Детализация по товарам</CardTitle>
          <CardDescription>Подробная информация о продажах товаров</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead className="text-right">Количество</TableHead>
                <TableHead className="text-right">Выручка</TableHead>
                <TableHead className="text-right">Ср. стоимость</TableHead>
                <TableHead className="text-right">Доля в продажах</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSellingProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-right">{product.sales}</TableCell>
                  <TableCell className="text-right">{product.revenue.toLocaleString()} ₽</TableCell>
                  <TableCell className="text-right">{(product.revenue / product.sales).toLocaleString()} ₽</TableCell>
                  <TableCell className="text-right">
                    {((product.sales / topSellingProducts.reduce((acc, curr) => acc + curr.sales, 0)) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Компонент для отображения отчетов по инвентарю
const InventoryReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Select defaultValue="all">
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
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Склад" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все склады</SelectItem>
              <SelectItem value="warehouse-a">Склад A</SelectItem>
              <SelectItem value="warehouse-b">Склад B</SelectItem>
              <SelectItem value="warehouse-c">Склад C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Icon name="FileDown" className="mr-2 h-4 w-4" />
          Экспорт в Excel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Общее количество товаров</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">48 уникальных моделей</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Общая стоимость запасов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245,000 ₽</div>
            <p className="text-xs text-muted-foreground">Средняя стоимость: 6,658 ₽</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Оборачиваемость запасов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8</div>
            <p className="text-xs text-muted-foreground">+12% по сравнению с прошлым периодом</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Оборачиваемость запасов</CardTitle>
            <CardDescription>Показатель за 6 месяцев</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={inventoryTurnoverData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="turnover" name="Оборачиваемость" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Статус инвентаря</CardTitle>
            <CardDescription>Распределение товаров по статусам</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {inventoryStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Частота аренды</CardTitle>
          <CardDescription>Наиболее часто арендуемые модели</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topRentedProductsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="frequency" name="Частота аренды" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Товары с низким запасом</CardTitle>
          <CardDescription>Требуется пополнение запасов</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead className="text-right">В наличии</TableHead>
                <TableHead className="text-right">Минимальный запас</TableHead>
                <TableHead className="text-right">Необходимо заказать</TableHead>
                <TableHead className="text-right">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: 'Электровелосипед E-Rider', category: 'Электрические', stock: 3, minStock: 5, toOrder: 2, status: 'low' },
                { name: 'Шоссейный велосипед Road Master', category: 'Шоссейные', stock: 2, minStock: 5, toOrder: 3, status: 'low' },
                { name: 'Складной велосипед Folder Plus', category: 'Складные', stock: 0, minStock: 3, toOrder: 3, status: 'out' },
                { name: 'Горный велосипед Trail Blazer', category: 'Горные', stock: 1, minStock: 5, toOrder: 4, status: 'low' },
                { name: 'Городской велосипед Urban Ride', category: 'Городские', stock: 2, minStock: 5, toOrder: 3, status: 'low' }
              ].map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">{item.stock}</TableCell>
                  <TableCell className="text-right">{item.minStock}</TableCell>
                  <TableCell className="text-right">{item.toOrder}</TableCell>
                  <TableCell className="text-right">
                    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      item.status === 'out' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status === 'out' ? 'Нет в наличии' : 'Мало на складе'}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
            Сформировать заказ поставщику
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Компонент для отображения маркетинговых отчетов
const MarketingReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Select defaultValue="month">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Неделя</SelectItem>
            <SelectItem value="month">Месяц</SelectItem>
            <SelectItem value="quarter">Квартал</SelectItem>
            <SelectItem value="year">Год</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Icon name="FileDown" className="mr-2 h-4 w-4" />
          Экспорт в Excel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8%</div>
            <div className="flex items-center mt-1">
              <Icon name="TrendingUp" className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+0.5% по сравнению с прошлым месяцем</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CTR рекламы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <div className="flex items-center mt-1">
              <Icon name="TrendingUp" className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+0.3% по сравнению с прошлым месяцем</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ROI маркетинговых кампаний</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">275%</div>
            <div className="flex items-center mt-1">
              <Icon name="TrendingUp" className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+15% по сравнению с прошлым месяцем</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Эффективность маркетинговых каналов</CardTitle>
            <CardDescription>Сравнение каналов по конверсии</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Поисковая реклама', value: 4.2 },
                    { name: 'Email-рассылки', value: 3.5 },
                    { name: 'Социальные сети', value: 2.8 },
                    { name: 'Баннерная реклама', value: 1.6 },
                    { name: 'Реферальная программа', value: 5.3 }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="value" name="Конверсия" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Использование промокодов</CardTitle>
            <CardDescription>Статистика использования промокодов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { date: '01.05', used: 12 },
                    { date: '05.05', used: 15 },
                    { date: '10.05', used: 21 },
                    { date: '15.05', used: 18 },
                    { date: '20.05', used: 25 },
                    { date: '25.05', used: 22 },
                    { date: '30.05', used: 28 }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="used" name="Использовано промокодов" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Эффективность кампаний</CardTitle>
          <CardDescription>Сравнение результатов маркетинговых кампаний</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Кампания</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead className="text-right">Охват</TableHead>
                <TableHead className="text-right">Открытия</TableHead>
                <TableHead className="text-right">Клики</TableHead>
                <TableHead className="text-right">Конверсии</TableHead>
                <TableHead className="text-right">ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: 'Весенняя распродажа', type: 'Email', reach: 1245, opens: '32.5%', clicks: '12.8%', conversions: 45, roi: '320%' },
                { name: 'Новая коллекция', type: 'Баннер', reach: 5720, opens: '-', clicks: '4.2%', conversions: 38, roi: '215%' },
                { name: 'Скидки для постоянных', type: 'Email', reach: 437, opens: '47.2%', clicks: '21.5%', conversions: 32, roi: '425%' },
                { name: 'Промокод в соцсетях', type: 'Социальные сети', reach: 3200, opens: '-', clicks: '5.7%', conversions: 25, roi: '180%' },
                { name: 'Баннеры на тематических сайтах', type: 'Баннер', reach: 2800, opens: '-', clicks: '3.1%', conversions: 18, roi: '145%' }
              ].map((campaign, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.type}</TableCell>
                  <TableCell className="text-right">{campaign.reach.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.opens}</TableCell>
                  <TableCell className="text-right">{campaign.clicks}</TableCell>
                  <TableCell className="text-right">{campaign.conversions}</TableCell>
                  <TableCell className="text-right">{campaign.roi}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Основной компонент
const ReportsSection = () => {
  return (
    <Tabs defaultValue="financial">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="financial">Финансы</TabsTrigger>
          <TabsTrigger value="sales">Продажи</TabsTrigger>
          <TabsTrigger value="inventory">Инвентарь</TabsTrigger>
          <TabsTrigger value="marketing">Маркетинг</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="financial">
        <FinancialReports />
      </TabsContent>
      
      <TabsContent value="sales">
        <SalesReports />
      </TabsContent>
      
      <TabsContent value="inventory">
        <InventoryReports />
      </TabsContent>
      
      <TabsContent value="marketing">
        <MarketingReports />
      </TabsContent>
    </Tabs>
  );
};

export default ReportsSection;
