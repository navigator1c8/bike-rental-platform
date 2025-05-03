
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  inStock: number;
  reserved: number;
  available: number;
  location: string;
  lastUpdated: string;
  status: "active" | "lowStock" | "outOfStock";
}

const inventoryData: InventoryItem[] = [
  {
    id: 1,
    name: "Горный велосипед XC Pro",
    sku: "MTB-XC-001",
    category: "mountain",
    inStock: 12,
    reserved: 2,
    available: 10,
    location: "Склад A, Секция 3",
    lastUpdated: "2025-05-01",
    status: "active"
  },
  {
    id: 2,
    name: "Городской велосипед City Cruiser",
    sku: "CTB-CC-002",
    category: "city",
    inStock: 8,
    reserved: 3,
    available: 5,
    location: "Склад A, Секция 1",
    lastUpdated: "2025-04-29",
    status: "active"
  },
  {
    id: 3,
    name: "Шоссейный велосипед Road Master",
    sku: "RDB-RM-003",
    category: "road",
    inStock: 5,
    reserved: 3,
    available: 2,
    location: "Склад B, Секция 2",
    lastUpdated: "2025-05-02",
    status: "lowStock"
  },
  {
    id: 4,
    name: "Детский велосипед Kids Fun",
    sku: "KDB-KF-004",
    category: "kids",
    inStock: 15,
    reserved: 0,
    available: 15,
    location: "Склад A, Секция 4",
    lastUpdated: "2025-04-25",
    status: "active"
  },
  {
    id: 5,
    name: "Электровелосипед E-Rider",
    sku: "EBK-ER-005",
    category: "electric",
    inStock: 3,
    reserved: 2,
    available: 1,
    location: "Склад B, Секция 1",
    lastUpdated: "2025-05-01",
    status: "lowStock"
  },
  {
    id: 6,
    name: "Складной велосипед Folder Plus",
    sku: "FLD-FP-006",
    category: "folding",
    inStock: 0,
    reserved: 0,
    available: 0,
    location: "Склад C, Секция 2",
    lastUpdated: "2025-04-30",
    status: "outOfStock"
  }
];

const warehouseLocations = [
  { id: "A1", name: "Склад A, Секция 1" },
  { id: "A2", name: "Склад A, Секция 2" },
  { id: "A3", name: "Склад A, Секция 3" },
  { id: "A4", name: "Склад A, Секция 4" },
  { id: "B1", name: "Склад B, Секция 1" },
  { id: "B2", name: "Склад B, Секция 2" },
  { id: "C1", name: "Склад C, Секция 1" },
  { id: "C2", name: "Склад C, Секция 2" }
];

interface StockAdjustmentProps {
  itemId: number;
  itemName: string;
  currentStock: number;
}

const StockAdjustmentDialog = ({ itemId, itemName, currentStock }: StockAdjustmentProps) => {
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove" | "set">("add");
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");
  const [location, setLocation] = useState("");
  
  const handleSubmit = () => {
    // В реальном приложении здесь был бы API-запрос
    alert(`Корректировка запасов для ${itemName} (демо)`);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Icon name="Edit" className="h-4 w-4 mr-2" />
          Корректировка
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Корректировка запасов</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Товар</Label>
            <div className="font-medium">{itemName}</div>
            <div className="text-sm text-muted-foreground">Текущее количество: {currentStock}</div>
          </div>
          
          <div className="space-y-2">
            <Label>Тип корректировки</Label>
            <Tabs 
              defaultValue="add" 
              className="w-full" 
              value={adjustmentType}
              onValueChange={(v) => setAdjustmentType(v as "add" | "remove" | "set")}
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="add">Добавить</TabsTrigger>
                <TabsTrigger value="remove">Списать</TabsTrigger>
                <TabsTrigger value="set">Установить</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Количество</Label>
            <Input 
              id="quantity" 
              type="number" 
              min={1} 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Местоположение</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Выберите местоположение" />
              </SelectTrigger>
              <SelectContent>
                {warehouseLocations.map(loc => (
                  <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Причина корректировки</Label>
            <Input 
              id="reason" 
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              placeholder="Например: инвентаризация, повреждение товара и т.д." 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="mr-2">Отмена</Button>
          <Button onClick={handleSubmit}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  
  const filteredItems = inventoryData.filter(item => {
    // Применяем фильтр по статусу
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    
    // Применяем фильтр по местоположению
    if (locationFilter !== "all" && !item.location.includes(locationFilter)) return false;
    
    // Применяем поиск
    return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.sku.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const handleMoveItem = (itemId: number) => {
    // В реальном приложении здесь был бы диалог перемещения
    alert(`Перемещение товара ID: ${itemId} (демо)`);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Управление складом</CardTitle>
            <CardDescription>Отслеживание запасов и управление товарами на складе</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="FileDown" className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
            <Button size="sm">
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Добавить товар
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-col sm:flex-row space-y-2 sm:space-y-0">
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Input 
                placeholder="Поиск по названию или SKU..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="active">В наличии</SelectItem>
                  <SelectItem value="lowStock">Мало на складе</SelectItem>
                  <SelectItem value="outOfStock">Нет в наличии</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Местоположение" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все склады</SelectItem>
                  <SelectItem value="Склад A">Склад A</SelectItem>
                  <SelectItem value="Склад B">Склад B</SelectItem>
                  <SelectItem value="Склад C">Склад C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Низкий запас:</span>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100">
                {inventoryData.filter(item => item.status === "lowStock").length} товаров
              </Badge>
              <span className="text-sm text-muted-foreground whitespace-nowrap">Нет в наличии:</span>
              <Badge variant="outline" className="bg-red-50 text-red-800 hover:bg-red-100">
                {inventoryData.filter(item => item.status === "outOfStock").length} товаров
              </Badge>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead className="text-center">Всего</TableHead>
                <TableHead className="text-center">Зарезервировано</TableHead>
                <TableHead className="text-center">Доступно</TableHead>
                <TableHead>Местоположение</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {item.category === "mountain" ? "Горный" :
                       item.category === "city" ? "Городской" :
                       item.category === "road" ? "Шоссейный" :
                       item.category === "kids" ? "Детский" :
                       item.category === "electric" ? "Электрический" :
                       item.category === "folding" ? "Складной" : item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{item.inStock}</TableCell>
                  <TableCell className="text-center">{item.reserved}</TableCell>
                  <TableCell className="text-center">
                    <span className={
                      item.available === 0 ? "text-red-600 font-semibold" :
                      item.available <= 3 ? "text-yellow-600 font-semibold" :
                      "font-semibold"
                    }>
                      {item.available}
                    </span>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        item.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                        item.status === "lowStock" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                        "bg-red-100 text-red-800 hover:bg-red-200"
                      }
                    >
                      {item.status === "active" ? "В наличии" :
                       item.status === "lowStock" ? "Мало на складе" :
                       "Нет в наличии"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <StockAdjustmentDialog 
                        itemId={item.id} 
                        itemName={item.name} 
                        currentStock={item.inStock} 
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleMoveItem(item.id)}
                      >
                        <Icon name="MoveHorizontal" className="h-4 w-4 mr-2" />
                        Переместить
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Показано {filteredItems.length} из {inventoryData.length} товаров
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                <Icon name="ChevronLeft" className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="px-3">1</Button>
              <Button variant="outline" size="sm">
                <Icon name="ChevronRight" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryManagement;
