
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface OrderItem {
  id: number;
  product: string;
  quantity: number;
  price: number;
  rentalPeriod: string;
}

interface OrderDetailsProps {
  orderId: number;
  customer: string;
  date: string;
  status: string;
  items: OrderItem[];
  total: number;
  address?: string;
  phone?: string;
  email?: string;
  paymentMethod?: string;
  deliveryMethod?: string;
  comment?: string;
}

const OrderDetailsDialog = ({ 
  orderId, 
  customer, 
  date, 
  status, 
  items, 
  total,
  address = "ул. Пушкина, д. 10, кв. 5, г. Москва",
  phone = "+7 (999) 123-45-67",
  email = "customer@example.com",
  paymentMethod = "Банковская карта",
  deliveryMethod = "Доставка",
  comment = ""
}: OrderDetailsProps) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [adminComment, setAdminComment] = useState("");

  const handleStatusChange = (value: string) => {
    setCurrentStatus(value);
    // В реальном приложении здесь был бы API-запрос для обновления статуса
  };

  const handleSave = () => {
    // В реальном приложении здесь была бы логика сохранения изменений
    alert("Изменения сохранены (демо)");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon name="Eye" className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Заказ #{orderId}</DialogTitle>
            <Badge 
              className={`
                ${currentStatus === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                  currentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 
                  'bg-red-100 text-red-800 hover:bg-red-200'}`}
            >
              {currentStatus === 'completed' ? 'Выполнен' : 
               currentStatus === 'pending' ? 'В обработке' : 'Отменен'}
            </Badge>
          </div>
          <DialogDescription>
            Оформлен {date} | Клиент: {customer}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Информация о клиенте</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Имя:</span> {customer}</p>
              <p><span className="text-muted-foreground">Телефон:</span> {phone}</p>
              <p><span className="text-muted-foreground">Email:</span> {email}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Информация о доставке</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Способ доставки:</span> {deliveryMethod}</p>
              <p><span className="text-muted-foreground">Адрес:</span> {address}</p>
              <p><span className="text-muted-foreground">Способ оплаты:</span> {paymentMethod}</p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="text-sm font-medium mb-4">Товары в заказе</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Товар</TableHead>
                <TableHead>Период аренды</TableHead>
                <TableHead className="text-right">Кол-во</TableHead>
                <TableHead className="text-right">Цена</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.rentalPeriod}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.price} ₽</TableCell>
                  <TableCell className="text-right">{item.price * item.quantity} ₽</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end mt-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground mr-8">Подытог:</span>
              <span>{total - 300} ₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground mr-8">Доставка:</span>
              <span>300 ₽</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="mr-8">Итого:</span>
              <span>{total} ₽</span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Комментарий клиента</h3>
              <div className="p-3 bg-slate-50 rounded-md text-sm min-h-20">
                {comment || "Комментарий отсутствует"}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Комментарий администратора</h3>
              <Textarea 
                placeholder="Добавьте комментарий к заказу..."
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Изменить статус</h3>
              <Select value={currentStatus} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">В обработке</SelectItem>
                  <SelectItem value="processing">Комплектуется</SelectItem>
                  <SelectItem value="shipped">Передан в доставку</SelectItem>
                  <SelectItem value="completed">Выполнен</SelectItem>
                  <SelectItem value="cancelled">Отменен</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Трек-номер доставки</h3>
              <div className="flex space-x-2">
                <Textarea 
                  placeholder="Введите трек-номер..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <div className="flex space-x-2 w-full justify-between">
            <div>
              <Button variant="outline" className="mr-2">
                <Icon name="Printer" className="mr-2 h-4 w-4" />
                Печать
              </Button>
              <Button variant="outline">
                <Icon name="Send" className="mr-2 h-4 w-4" />
                Отправить клиенту
              </Button>
            </div>
            <div>
              <Button variant="outline" className="mr-2">Отмена</Button>
              <Button onClick={handleSave}>Сохранить изменения</Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
