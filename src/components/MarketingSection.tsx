
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface PromoCode {
  id: number;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minOrder: number;
  usageLimit: number;
  usageCount: number;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "scheduled";
}

interface Campaign {
  id: number;
  name: string;
  type: "email" | "push" | "banner";
  status: "draft" | "scheduled" | "active" | "completed";
  target: string;
  audience: number;
  openRate?: number;
  clickRate?: number;
  conversions?: number;
  startDate: string;
  endDate?: string;
}

const promoCodes: PromoCode[] = [
  { 
    id: 1, 
    code: "ВЕСНА2025", 
    discount: 15, 
    type: "percentage",
    minOrder: 1000,
    usageLimit: 100,
    usageCount: 45,
    startDate: "2025-03-01",
    endDate: "2025-05-31",
    status: "active"
  },
  { 
    id: 2, 
    code: "ЛЕТО500", 
    discount: 500, 
    type: "fixed",
    minOrder: 2000,
    usageLimit: 50,
    usageCount: 0,
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    status: "scheduled"
  },
  { 
    id: 3, 
    code: "FRIENDS20", 
    discount: 20, 
    type: "percentage",
    minOrder: 0,
    usageLimit: 200,
    usageCount: 87,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active"
  },
  { 
    id: 4, 
    code: "ЗИМА2024", 
    discount: 10, 
    type: "percentage",
    minOrder: 1500,
    usageLimit: 100,
    usageCount: 100,
    startDate: "2024-12-01",
    endDate: "2025-02-28",
    status: "expired"
  }
];

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Весенняя распродажа",
    type: "email",
    status: "active",
    target: "Все клиенты",
    audience: 1245,
    openRate: 32.5,
    clickRate: 12.8,
    conversions: 45,
    startDate: "2025-03-15",
    endDate: "2025-04-15"
  },
  {
    id: 2,
    name: "Новая коллекция велосипедов",
    type: "banner",
    status: "active",
    target: "Все посетители",
    audience: 5720,
    clickRate: 4.2,
    conversions: 38,
    startDate: "2025-04-01"
  },
  {
    id: 3,
    name: "Скидки для постоянных клиентов",
    type: "email",
    status: "scheduled",
    target: "Клиенты с 3+ заказами",
    audience: 437,
    startDate: "2025-05-10",
    endDate: "2025-05-20"
  },
  {
    id: 4,
    name: "Напоминание о брошенных корзинах",
    type: "push",
    status: "draft",
    target: "Клиенты с незавершенными заказами",
    audience: 0,
    startDate: ""
  },
  {
    id: 5,
    name: "Зимняя акция 2024",
    type: "email",
    status: "completed",
    target: "Все клиенты",
    audience: 1105,
    openRate: 28.7,
    clickRate: 9.5,
    conversions: 31,
    startDate: "2025-01-10",
    endDate: "2025-02-10"
  }
];

const CreatePromoCodeDialog = () => {
  const [promoCode, setPromoCode] = useState({
    code: "",
    discount: "",
    type: "percentage",
    minOrder: "",
    usageLimit: "",
    startDate: "",
    endDate: ""
  });

  const handleSubmit = () => {
    // В реальном приложении здесь был бы API-запрос
    alert("Промокод создан (демо)");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Icon name="Plus" className="h-4 w-4 mr-2" />
          Создать промокод
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать новый промокод</DialogTitle>
          <DialogDescription>
            Настройте параметры промокода для маркетинговой акции
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Промокод</Label>
              <Input
                id="code"
                placeholder="Например: ЛЕТО2025"
                value={promoCode.code}
                onChange={(e) => setPromoCode({...promoCode, code: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">Используйте заглавные буквы и цифры без пробелов</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Тип скидки</Label>
              <Select 
                value={promoCode.type} 
                onValueChange={(value) => setPromoCode({...promoCode, type: value})}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Процент (%)</SelectItem>
                  <SelectItem value="fixed">Фиксированная сумма (₽)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Размер скидки</Label>
              <Input
                id="discount"
                type="number"
                placeholder={promoCode.type === "percentage" ? "15" : "500"}
                value={promoCode.discount}
                onChange={(e) => setPromoCode({...promoCode, discount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minOrder">Минимальная сумма заказа (₽)</Label>
              <Input
                id="minOrder"
                type="number"
                placeholder="0"
                value={promoCode.minOrder}
                onChange={(e) => setPromoCode({...promoCode, minOrder: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Дата начала</Label>
              <Input
                id="startDate"
                type="date"
                value={promoCode.startDate}
                onChange={(e) => setPromoCode({...promoCode, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Дата окончания</Label>
              <Input
                id="endDate"
                type="date"
                value={promoCode.endDate}
                onChange={(e) => setPromoCode({...promoCode, endDate: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="usageLimit">Лимит использования</Label>
            <Input
              id="usageLimit"
              type="number"
              placeholder="100"
              value={promoCode.usageLimit}
              onChange={(e) => setPromoCode({...promoCode, usageLimit: e.target.value})}
            />
            <p className="text-xs text-muted-foreground">0 = без ограничений</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="mr-2">Отмена</Button>
          <Button onClick={handleSubmit}>Создать</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CreateCampaignDialog = () => {
  const [campaign, setCampaign] = useState({
    name: "",
    type: "email",
    target: "",
    startDate: "",
    endDate: "",
    message: ""
  });

  const handleSubmit = () => {
    // В реальном приложении здесь был бы API-запрос
    alert("Кампания создана (демо)");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Icon name="Plus" className="h-4 w-4 mr-2" />
          Создать кампанию
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Создать новую кампанию</DialogTitle>
          <DialogDescription>
            Настройте параметры маркетинговой кампании
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название кампании</Label>
              <Input
                id="name"
                placeholder="Например: Летняя распродажа"
                value={campaign.name}
                onChange={(e) => setCampaign({...campaign, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Тип кампании</Label>
                <Select 
                  value={campaign.type} 
                  onValueChange={(value) => setCampaign({...campaign, type: value})}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email-рассылка</SelectItem>
                    <SelectItem value="push">Push-уведомления</SelectItem>
                    <SelectItem value="banner">Баннер на сайте</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Целевая аудитория</Label>
                <Select>
                  <SelectTrigger id="target">
                    <SelectValue placeholder="Выберите аудиторию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все клиенты</SelectItem>
                    <SelectItem value="new">Новые клиенты</SelectItem>
                    <SelectItem value="returning">Постоянные клиенты</SelectItem>
                    <SelectItem value="inactive">Неактивные клиенты</SelectItem>
                    <SelectItem value="abandoned">С брошенными корзинами</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Дата начала</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={campaign.startDate}
                  onChange={(e) => setCampaign({...campaign, startDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Дата окончания</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={campaign.endDate}
                  onChange={(e) => setCampaign({...campaign, endDate: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Необязательно для баннеров</p>
              </div>
            </div>
            
            {campaign.type === "email" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="subject">Тема письма</Label>
                  <Input
                    id="subject"
                    placeholder="Например: Скидки до 30% на весь ассортимент!"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea
                    id="message"
                    placeholder="Текст сообщения..."
                    rows={6}
                    value={campaign.message}
                    onChange={(e) => setCampaign({...campaign, message: e.target.value})}
                  />
                </div>
              </>
            )}
            
            {campaign.type === "banner" && (
              <>
                <div className="space-y-2">
                  <Label>Выберите шаблон баннера</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="aspect-[3/1] bg-gray-100 rounded flex items-center justify-center text-sm text-muted-foreground">
                        Верхний баннер
                      </div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="aspect-[3/1] bg-gray-100 rounded flex items-center justify-center text-sm text-muted-foreground">
                        Боковой баннер
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bannerImage">URL изображения</Label>
                  <Input id="bannerImage" placeholder="https://example.com/banner.jpg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bannerLink">Ссылка</Label>
                  <Input id="bannerLink" placeholder="https://example.com/promo" />
                </div>
              </>
            )}
            
            {campaign.type === "push" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pushTitle">Заголовок уведомления</Label>
                  <Input id="pushTitle" placeholder="Например: Скидки до 30%!" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pushMessage">Текст уведомления</Label>
                  <Input id="pushMessage" placeholder="Короткий текст уведомления..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pushLink">Ссылка</Label>
                  <Input id="pushLink" placeholder="https://example.com/promo" />
                </div>
              </>
            )}
            
            <div className="flex items-center space-x-2">
              <Switch id="schedule" />
              <Label htmlFor="schedule">Запланировать отправку</Label>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" className="mr-2">
            <Icon name="Save" className="h-4 w-4 mr-2" />
            Сохранить черновик
          </Button>
          <Button onClick={handleSubmit}>
            <Icon name="Send" className="h-4 w-4 mr-2" />
            Запустить кампанию
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MarketingSection = () => {
  return (
    <Tabs defaultValue="promo-codes">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="promo-codes">Промокоды</TabsTrigger>
          <TabsTrigger value="campaigns">Кампании</TabsTrigger>
          <TabsTrigger value="reports">Отчеты</TabsTrigger>
        </TabsList>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Icon name="FileDown" className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>
      
      <TabsContent value="promo-codes" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Управление промокодами</CardTitle>
              <CardDescription>Создание и отслеживание промокодов для маркетинговых акций</CardDescription>
            </div>
            <CreatePromoCodeDialog />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Промокод</TableHead>
                  <TableHead>Скидка</TableHead>
                  <TableHead>Мин. заказ</TableHead>
                  <TableHead>Период действия</TableHead>
                  <TableHead>Использовано</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promoCodes.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell className="font-medium">{promo.code}</TableCell>
                    <TableCell>
                      {promo.type === "percentage" ? `${promo.discount}%` : `${promo.discount} ₽`}
                    </TableCell>
                    <TableCell>{promo.minOrder > 0 ? `${promo.minOrder} ₽` : "—"}</TableCell>
                    <TableCell>
                      <div className="text-sm">{promo.startDate} — {promo.endDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{promo.usageCount} / {promo.usageLimit}</span>
                        <Progress className="h-1 mt-1" value={(promo.usageCount / promo.usageLimit) * 100} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          promo.status === "active" ? "bg-green-100 text-green-800" :
                          promo.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {promo.status === "active" ? "Активен" :
                         promo.status === "scheduled" ? "Запланирован" :
                         "Истек"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Copy" className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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
      
      <TabsContent value="campaigns" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Маркетинговые кампании</CardTitle>
              <CardDescription>Управление email-рассылками, push-уведомлениями и баннерами</CardDescription>
            </div>
            <CreateCampaignDialog />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Аудитория</TableHead>
                  <TableHead>Охват</TableHead>
                  <TableHead>Дата начала</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {campaign.type === "email" ? "Email" :
                         campaign.type === "push" ? "Push" :
                         "Баннер"}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.target}</TableCell>
                    <TableCell>{campaign.audience > 0 ? campaign.audience : "—"}</TableCell>
                    <TableCell>{campaign.startDate || "Не задана"}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          campaign.status === "active" ? "bg-green-100 text-green-800" :
                          campaign.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                          campaign.status === "draft" ? "bg-gray-100 text-gray-800" :
                          "bg-purple-100 text-purple-800"
                        }
                      >
                        {campaign.status === "active" ? "Активна" :
                         campaign.status === "scheduled" ? "Запланирована" :
                         campaign.status === "draft" ? "Черновик" :
                         "Завершена"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Icon name="BarChart" className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Copy" className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="reports" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Конверсия промокодов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.4%</div>
              <p className="text-xs text-muted-foreground">+2.1% по сравнению с прошлым месяцем</p>
              <div className="mt-4 h-10">
                <Progress value={15.4} className="h-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Средний чек с промокодом</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,580 ₽</div>
              <p className="text-xs text-muted-foreground">+15% по сравнению с обычными заказами</p>
              <div className="mt-4 h-10">
                <Progress value={65} className="h-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Открываемость email-рассылок</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32.5%</div>
              <p className="text-xs text-muted-foreground">-1.2% по сравнению с прошлым месяцем</p>
              <div className="mt-4 h-10">
                <Progress value={32.5} className="h-2" />
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
                {campaigns
                  .filter(c => c.status === "completed" || c.status === "active")
                  .map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        {campaign.type === "email" ? "Email" :
                         campaign.type === "push" ? "Push" :
                         "Баннер"}
                      </TableCell>
                      <TableCell className="text-right">{campaign.audience.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        {campaign.openRate ? `${campaign.openRate}%` : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {campaign.clickRate ? `${campaign.clickRate}%` : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {campaign.conversions || "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {campaign.conversions ? `${((campaign.conversions / campaign.audience) * 10000).toFixed(1)}%` : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Подробный отчет
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default MarketingSection;
