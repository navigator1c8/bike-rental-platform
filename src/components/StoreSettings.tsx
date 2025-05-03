
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";

interface StoreSettingsProps {
  onSave?: (settings: any) => void;
}

const StoreSettings = ({ onSave }: StoreSettingsProps) => {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "ВелоПрокат",
    legalName: "ООО ВелоПрокат",
    phone: "+7 (495) 123-45-67",
    email: "info@velorent.ru",
    address: "Москва, ул. Велосипедная, 42",
    workingHours: "Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00",
    currency: "RUB",
    timezone: "Europe/Moscow",
    language: "ru-RU"
  });

  const [paymentSettings, setPaymentSettings] = useState({
    acceptCash: true,
    acceptCards: true,
    acceptOnline: true,
    depositRequired: true,
    depositAmount: "2000",
    cardProcessingFee: "0",
    cardProcessor: "Банк Вело",
    showPricesWithTax: true,
    taxRate: "20"
  });

  const [rentalSettings, setRentalSettings] = useState({
    minRentalTime: "1",
    maxRentalTime: "14",
    rentalTimeUnit: "day",
    advanceBookingLimit: "30",
    cancellationTime: "24",
    cancellationFee: "10",
    lateFee: "20",
    damageFee: "full",
    allowEarlyReturn: true,
    refundForEarlyReturn: true,
    requireIDVerification: true,
    allowMultipleRentals: true,
    maxRentalsPerUser: "3"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    sendBookingConfirmation: true,
    sendRentalReminders: true,
    sendReturnReminders: true,
    sendReviewRequests: true,
    sendPromotionalEmails: false,
    adminNotifyNewBookings: true,
    adminNotifyReturns: true,
    adminNotifyLateReturns: true,
    smsNotifications: false
  });

  const handleGeneralSettingsChange = (field: string, value: string | boolean) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentSettingsChange = (field: string, value: string | boolean) => {
    setPaymentSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleRentalSettingsChange = (field: string, value: string | boolean) => {
    setRentalSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationSettingsChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = () => {
    const settings = {
      general: generalSettings,
      payment: paymentSettings,
      rental: rentalSettings,
      notification: notificationSettings
    };
    
    if (onSave) {
      onSave(settings);
    } else {
      // В демо просто показываем уведомление
      alert("Настройки успешно сохранены");
    }
  };

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="general">Общие</TabsTrigger>
          <TabsTrigger value="payment">Оплата</TabsTrigger>
          <TabsTrigger value="rental">Аренда</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          <TabsTrigger value="backup">Резервное копирование</TabsTrigger>
        </TabsList>
      </div>
      
      {/* Общие настройки */}
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>Общие настройки</CardTitle>
            <CardDescription>Основная информация о вашем магазине проката</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="storeName">Название магазина</Label>
                <Input 
                  id="storeName" 
                  value={generalSettings.storeName} 
                  onChange={(e) => handleGeneralSettingsChange('storeName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="legalName">Юридическое название</Label>
                <Input 
                  id="legalName" 
                  value={generalSettings.legalName} 
                  onChange={(e) => handleGeneralSettingsChange('legalName', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input 
                  id="phone" 
                  value={generalSettings.phone} 
                  onChange={(e) => handleGeneralSettingsChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  value={generalSettings.email} 
                  onChange={(e) => handleGeneralSettingsChange('email', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Адрес</Label>
              <Input 
                id="address" 
                value={generalSettings.address} 
                onChange={(e) => handleGeneralSettingsChange('address', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workingHours">Часы работы</Label>
              <Input 
                id="workingHours" 
                value={generalSettings.workingHours} 
                onChange={(e) => handleGeneralSettingsChange('workingHours', e.target.value)}
              />
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Валюта</Label>
                <Select 
                  value={generalSettings.currency} 
                  onValueChange={(value) => handleGeneralSettingsChange('currency', value)}
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
              <div className="space-y-2">
                <Label htmlFor="timezone">Часовой пояс</Label>
                <Select 
                  value={generalSettings.timezone} 
                  onValueChange={(value) => handleGeneralSettingsChange('timezone', value)}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Выберите часовой пояс" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Moscow">Москва (UTC+3)</SelectItem>
                    <SelectItem value="Europe/Kaliningrad">Калининград (UTC+2)</SelectItem>
                    <SelectItem value="Asia/Yekaterinburg">Екатеринбург (UTC+5)</SelectItem>
                    <SelectItem value="Asia/Novosibirsk">Новосибирск (UTC+7)</SelectItem>
                    <SelectItem value="Asia/Vladivostok">Владивосток (UTC+10)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Язык по умолчанию</Label>
                <Select 
                  value={generalSettings.language} 
                  onValueChange={(value) => handleGeneralSettingsChange('language', value)}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Выберите язык" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru-RU">Русский</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Дополнительно</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode" className="text-base">Режим обслуживания</Label>
                  <p className="text-sm text-muted-foreground">Закрыть сайт для посещения клиентами</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cookie-consent" className="text-base">Согласие на cookies</Label>
                  <p className="text-sm text-muted-foreground">Показывать уведомление о сборе cookies</p>
                </div>
                <Switch id="cookie-consent" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="display-tax" className="text-base">Отображать налоги</Label>
                  <p className="text-sm text-muted-foreground">Показывать сумму налога отдельно</p>
                </div>
                <Switch id="display-tax" defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Отмена</Button>
            <Button onClick={handleSaveSettings}>Сохранить настройки</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Настройки оплаты */}
      <TabsContent value="payment">
        <Card>
          <CardHeader>
            <CardTitle>Настройки оплаты</CardTitle>
            <CardDescription>Управление методами оплаты и финансовыми параметрами</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Методы оплаты</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="accept-cash" className="text-base">Наличные</Label>
                  <p className="text-sm text-muted-foreground">Принимать оплату наличными</p>
                </div>
                <Switch 
                  id="accept-cash" 
                  checked={paymentSettings.acceptCash} 
                  onCheckedChange={(value) => handlePaymentSettingsChange('acceptCash', value)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="accept-cards" className="text-base">Банковские карты</Label>
                  <p className="text-sm text-muted-foreground">Принимать оплату картами</p>
                </div>
                <Switch 
                  id="accept-cards" 
                  checked={paymentSettings.acceptCards} 
                  onCheckedChange={(value) => handlePaymentSettingsChange('acceptCards', value)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="accept-online" className="text-base">Онлайн-платежи</Label>
                  <p className="text-sm text-muted-foreground">Принимать онлайн-платежи (ЮКасса, СБП и т.д.)</p>
                </div>
                <Switch 
                  id="accept-online" 
                  checked={paymentSettings.acceptOnline} 
                  onCheckedChange={(value) => handlePaymentSettingsChange('acceptOnline', value)} 
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Залог</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="deposit-required" className="text-base">Требовать залог</Label>
                  <p className="text-sm text-muted-foreground">Запрашивать залог при аренде</p>
                </div>
                <Switch 
                  id="deposit-required" 
                  checked={paymentSettings.depositRequired} 
                  onCheckedChange={(value) => handlePaymentSettingsChange('depositRequired', value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deposit-amount">Сумма залога (₽)</Label>
                <Input 
                  id="deposit-amount" 
                  type="number" 
                  value={paymentSettings.depositAmount} 
                  onChange={(e) => handlePaymentSettingsChange('depositAmount', e.target.value)}
                  disabled={!paymentSettings.depositRequired}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Налоги и комиссии</h3>
              
              <div className="space-y-2">
                <Label htmlFor="card-processing-fee">Комиссия за обработку карт (%)</Label>
                <Input 
                  id="card-processing-fee" 
                  type="number" 
                  value={paymentSettings.cardProcessingFee} 
                  onChange={(e) => handlePaymentSettingsChange('cardProcessingFee', e.target.value)}
                  disabled={!paymentSettings.acceptCards}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="card-processor">Обработчик платежей</Label>
                <Input 
                  id="card-processor" 
                  value={paymentSettings.cardProcessor} 
                  onChange={(e) => handlePaymentSettingsChange('cardProcessor', e.target.value)}
                  disabled={!paymentSettings.acceptCards && !paymentSettings.acceptOnline}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-prices-with-tax" className="text-base">Отображать цены с НДС</Label>
                  <p className="text-sm text-muted-foreground">Включать налог в отображаемую цену</p>
                </div>
                <Switch 
                  id="show-prices-with-tax" 
                  checked={paymentSettings.showPricesWithTax} 
                  onCheckedChange={(value) => handlePaymentSettingsChange('showPricesWithTax', value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tax-rate">Ставка НДС (%)</Label>
                <Input 
                  id="tax-rate" 
                  type="number" 
                  value={paymentSettings.taxRate} 
                  onChange={(e) => handlePaymentSettingsChange('taxRate', e.target.value)}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Интеграции платежных систем</h3>
              
              <div className="border rounded-md p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Icon name="CreditCard" className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">ЮKassa</p>
                      <p className="text-xs text-muted-foreground">Платежная система от Яндекса</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Настроить</Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Icon name="Wallet" className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">СБП (Система Быстрых Платежей)</p>
                      <p className="text-xs text-muted-foreground">Платежи по QR-коду</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Настроить</Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Icon name="CircleDollarSign" className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">Stripe</p>
                      <p className="text-xs text-muted-foreground">Международные платежи</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Настроить</Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Отмена</Button>
            <Button onClick={handleSaveSettings}>Сохранить настройки</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Настройки аренды */}
      <TabsContent value="rental">
        <Card>
          <CardHeader>
            <CardTitle>Настройки аренды</CardTitle>
            <CardDescription>Настройка параметров аренды и правил бронирования</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Сроки аренды</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="min-rental-time">Минимальное время аренды</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="min-rental-time" 
                      type="number" 
                      value={rentalSettings.minRentalTime} 
                      onChange={(e) => handleRentalSettingsChange('minRentalTime', e.target.value)}
                      className="w-24"
                    />
                    <Select 
                      value={rentalSettings.rentalTimeUnit} 
                      onValueChange={(value) => handleRentalSettingsChange('rentalTimeUnit', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Единица" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hour">Час</SelectItem>
                        <SelectItem value="day">День</SelectItem>
                        <SelectItem value="week">Неделя</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-rental-time">Максимальное время аренды</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="max-rental-time" 
                      type="number" 
                      value={rentalSettings.maxRentalTime} 
                      onChange={(e) => handleRentalSettingsChange('maxRentalTime', e.target.value)}
                      className="w-24"
                    />
                    <Select 
                      value={rentalSettings.rentalTimeUnit} 
                      onValueChange={(value) => handleRentalSettingsChange('rentalTimeUnit', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Единица" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hour">Час</SelectItem>
                        <SelectItem value="day">День</SelectItem>
                        <SelectItem value="week">Неделя</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="advance-booking-limit">Предварительное бронирование (дней)</Label>
                <Input 
                  id="advance-booking-limit" 
                  type="number" 
                  value={rentalSettings.advanceBookingLimit} 
                  onChange={(e) => handleRentalSettingsChange('advanceBookingLimit', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Максимальное количество дней для предварительного бронирования</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Отмена и штрафы</h3>
              
              <div className="space-y-2">
                <Label htmlFor="cancellation-time">Время бесплатной отмены (часов)</Label>
                <Input 
                  id="cancellation-time" 
                  type="number" 
                  value={rentalSettings.cancellationTime} 
                  onChange={(e) => handleRentalSettingsChange('cancellationTime', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">За сколько часов до начала аренды можно отменить без штрафа</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cancellation-fee">Штраф за позднюю отмену (%)</Label>
                <Input 
                  id="cancellation-fee" 
                  type="number" 
                  value={rentalSettings.cancellationFee} 
                  onChange={(e) => handleRentalSettingsChange('cancellationFee', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Процент от стоимости аренды в случае поздней отмены</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="late-fee">Штраф за просрочку (%)</Label>
                <Input 
                  id="late-fee" 
                  type="number" 
                  value={rentalSettings.lateFee} 
                  onChange={(e) => handleRentalSettingsChange('lateFee', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Процент от стоимости аренды за каждый день просрочки</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="damage-fee">Плата за повреждение</Label>
                <RadioGroup value={rentalSettings.damageFee} onValueChange={(value) => handleRentalSettingsChange('damageFee', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="damage-fixed" />
                    <Label htmlFor="damage-fixed">Фиксированная сумма</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="damage-percentage" />
                    <Label htmlFor="damage-percentage">Процент от стоимости товара</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="damage-full" />
                    <Label htmlFor="damage-full">Полная стоимость товара</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Дополнительные настройки</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allow-early-return" className="text-base">Досрочный возврат</Label>
                  <p className="text-sm text-muted-foreground">Разрешить возврат товара раньше срока</p>
                </div>
                <Switch 
                  id="allow-early-return" 
                  checked={rentalSettings.allowEarlyReturn} 
                  onCheckedChange={(value) => handleRentalSettingsChange('allowEarlyReturn', value)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="refund-for-early-return" className="text-base">Возврат средств при досрочном возврате</Label>
                  <p className="text-sm text-muted-foreground">Возвращать деньги за неиспользованные дни</p>
                </div>
                <Switch 
                  id="refund-for-early-return" 
                  checked={rentalSettings.refundForEarlyReturn} 
                  onCheckedChange={(value) => handleRentalSettingsChange('refundForEarlyReturn', value)} 
                  disabled={!rentalSettings.allowEarlyReturn}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="require-id-verification" className="text-base">Проверка документов</Label>
                  <p className="text-sm text-muted-foreground">Требовать подтверждение личности при аренде</p>
                </div>
                <Switch 
                  id="require-id-verification" 
                  checked={rentalSettings.requireIDVerification} 
                  onCheckedChange={(value) => handleRentalSettingsChange('requireIDVerification', value)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allow-multiple-rentals" className="text-base">Множественная аренда</Label>
                  <p className="text-sm text-muted-foreground">Разрешить клиенту арендовать несколько товаров одновременно</p>
                </div>
                <Switch 
                  id="allow-multiple-rentals" 
                  checked={rentalSettings.allowMultipleRentals} 
                  onCheckedChange={(value) => handleRentalSettingsChange('allowMultipleRentals', value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-rentals-per-user">Максимум товаров на пользователя</Label>
                <Input 
                  id="max-rentals-per-user" 
                  type="number" 
                  value={rentalSettings.maxRentalsPerUser} 
                  onChange={(e) => handleRentalSettingsChange('maxRentalsPerUser', e.target.value)}
                  disabled={!rentalSettings.allowMultipleRentals}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Отмена</Button>
            <Button onClick={handleSaveSettings}>Сохранить настройки</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Настройки уведомлений */}
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Настройки уведомлений</CardTitle>
            <CardDescription>Управление уведомлениями для клиентов и администраторов</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Уведомления клиентов</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="send-booking-confirmation" className="text-base">Подтверждение бронирования</Label>
                  <p className="text-sm text-muted-foreground">Отправлять уведомление при успешном бронировании</p>
                </div>
                <Switch 
                  id="send-booking-confirmation" 
                  checked={notificationSettings.sendBookingConfirmation} 
                  onCheckedChange={(value) => handleNotificationSettingsChange('sendBookingConfirmation', value)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="send-rental-reminders" className="text-base">Напоминания об аренде</Label>
                  <p className="text-sm text-muted-foreground">Отправлять напоминание о начале аренды</p>
                </div>
                <Switch 
                  id="send-rental-reminders" 
                  checked={notificationSettings.sendRentalReminders} 
                  onCheckedChange={(value) => handleNotificationSettingsChange('sendRentalReminders', value)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="send-return-reminders" className="text-base">Напоминания о возврате</Label>
                  <p className="text-sm text-muted-foreground">Отправлять напоминание о необходимости возврата</p>
                </div>
                <Switch 
                  id="send-return-reminders" 
                  checked={notificationSettings.sendReturnReminders} 
                  onCheckedChange={(value) => handleNotificationSettingsChange('sendReturnReminders', value)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="send-review-requests" className="text-base">Запросы отзывов</Label>
                  <p className="text-sm text-muted-foreground">Отправлять запрос оставить отзыв после аренды</p>
                </div>
                <Switch 
                  id="send-review-requests" 
                  checked={notificationSettings.sendReviewRequests} 
                  onCheckedChange={(value) => handleNotificationSettingsChange('sendReviewRequests', value)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="send-promotional-emails" className="text-base">Рекламные рассылки</Label>
                  <p className="text-sm text-muted-foreground">Отправлять информацию о скидках и акциях</p>
                </div>
                <Switch 
                  id="send-promotional-emails" 
                  checked={notificationSettings.sendPromotionalEmails} 
                  onCheckedChange={(value) => handleNotificationSettingsChange('sendPromotionalEmails', value)} 
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Уведомления администраторов</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="admin-notify-new-bookings" className="text-base">Новые бронирования</Label>
                  <p className="text-sm text-muted-foreground">Уведомлять о новых бронированиях</p>
                </div>
                <Switch 
                  id="admin-notify-new-bookings" 
                  checked={notificationSettings.adminNotifyNewBookings} 
                  onCheckedChange={(value) => handleNotificationSettingsChange('adminNotifyNewBookings', value)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="admin-notify-returns" className="text-base">Возвраты товаров</Label>
                  <p className="text-sm text-muted-foreground">Уведомлять о возвратах товаров</p>
                </div>
                <Switch 
                  id="admin-notify-returns" 
                  checked={notificationSettings.adminNotifyReturns} 
                  onCheckedChange={(value) => handleNotificationSettingsChange('adminNotifyReturns', value)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="admin-notify-late-returns" className="text-base">Просроченные возвраты</Label>
                  <p className="text-sm text-muted-foreground">Уведомлять о просроченных возвратах</p>
                </div>
                <Switch 
                  id="admin-notify-late-returns" 
                  checked={notificationSettings.adminNotifyLateReturns} 
                  onCheckedChange={(value) => handleNotificationSettingsChange('adminNotifyLateReturns', value)} 
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Каналы уведомлений</h3>
              
              <div className="space-y-2">
                <Label>Email для уведомлений администратора</Label>
                <Input placeholder="admin@velorent.ru" defaultValue="admin@velorent.ru" />
              </div>
              
              <div className="space-y-2">
                <Label>Дополнительные email-адреса (через запятую)</Label>
                <Input placeholder="manager@velorent.ru, support@velorent.ru" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications" className="text-base">SMS-уведомления</Label>
                  <p className="text-sm text-muted-foreground">Отправлять уведомления через SMS</p>
                </div>
                <Switch 
                  id="sms-notifications" 
                  checked={notificationSettings.smsNotifications} 
                  onCheckedChange={(value) => handleNotificationSettingsChange('smsNotifications', value)} 
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Шаблоны уведомлений</h3>
              
              <div className="space-y-2">
                <Label>Шаблон подтверждения бронирования</Label>
                <Textarea 
                  placeholder="Шаблон письма..." 
                  defaultValue="Уважаемый {customer_name}, ваше бронирование #{booking_id} подтверждено. Дата начала аренды: {start_date}, дата окончания: {end_date}. С уважением, команда ВелоПрокат."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Шаблон напоминания о возврате</Label>
                <Textarea 
                  placeholder="Шаблон письма..." 
                  defaultValue="Уважаемый {customer_name}, напоминаем, что срок аренды #{booking_id} заканчивается {end_date}. Пожалуйста, не забудьте вернуть велосипед в указанное время. С уважением, команда ВелоПрокат."
                  rows={3}
                />
              </div>
              
              <Button variant="outline" size="sm">
                <Icon name="FileText" className="mr-2 h-4 w-4" />
                Посмотреть все шаблоны
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Отмена</Button>
            <Button onClick={handleSaveSettings}>Сохранить настройки</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Настройки интеграций */}
      <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>Интеграции</CardTitle>
            <CardDescription>Управление интеграциями с внешними сервисами</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Аналитика и отслеживание</h3>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Icon name="LineChart" className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Google Analytics</h4>
                      <p className="text-sm text-muted-foreground">Аналитика посещений и конверсий</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="ga-tracking-id">Идентификатор отслеживания</Label>
                  <Input id="ga-tracking-id" placeholder="G-XXXXXXXXXX" defaultValue="G-ABC123XYZ" />
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <Icon name="Activity" className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Яндекс.Метрика</h4>
                      <p className="text-sm text-muted-foreground">Российская система веб-аналитики</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="ym-tracking-id">Номер счетчика</Label>
                  <Input id="ym-tracking-id" placeholder="XXXXXXXX" defaultValue="87654321" />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">CRM и маркетинг</h3>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Icon name="Mail" className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">MailChimp</h4>
                      <p className="text-sm text-muted-foreground">Email-маркетинг и автоматизация</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Подключить
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Icon name="MessageSquare" className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">amoCRM</h4>
                      <p className="text-sm text-muted-foreground">Управление клиентами и сделками</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Социальные сети и отзывы</h3>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Icon name="Star" className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Яндекс.Бизнес</h4>
                      <p className="text-sm text-muted-foreground">Управление отзывами и рейтингом</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Подключить
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Icon name="MessageCircle" className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">ВКонтакте</h4>
                      <p className="text-sm text-muted-foreground">Интеграция с сообществом</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="vk-group-id">ID группы</Label>
                  <Input id="vk-group-id" placeholder="club000000000" defaultValue="club123456789" />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">API и разработка</h3>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Icon name="Code" className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">API ключи</h4>
                      <p className="text-sm text-muted-foreground">Ключи для внешних интеграций</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Управление
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-cyan-100 p-2 rounded-full">
                      <Icon name="Webhook" className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Webhooks</h4>
                      <p className="text-sm text-muted-foreground">Настройка webhooks для событий</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Настроить
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Отмена</Button>
            <Button onClick={handleSaveSettings}>Сохранить настройки</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      {/* Настройки резервного копирования */}
      <TabsContent value="backup">
        <Card>
          <CardHeader>
            <CardTitle>Резервное копирование</CardTitle>
            <CardDescription>Управление резервными копиями данных</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Icon name="Info" className="h-4 w-4" />
              <AlertDescription>
                Регулярное резервное копирование поможет вам избежать потери данных в случае технических проблем.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Автоматическое резервное копирование</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-backup" className="text-base">Включить автоматическое резервное копирование</Label>
                  <p className="text-sm text-muted-foreground">Автоматически создавать резервные копии по расписанию</p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Частота резервного копирования</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Выберите частоту" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Каждый час</SelectItem>
                    <SelectItem value="daily">Ежедневно</SelectItem>
                    <SelectItem value="weekly">Еженедельно</SelectItem>
                    <SelectItem value="monthly">Ежемесячно</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-retention">Хранить резервные копии</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="backup-retention">
                    <SelectValue placeholder="Выберите период хранения" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 дней</SelectItem>
                    <SelectItem value="14">14 дней</SelectItem>
                    <SelectItem value="30">30 дней</SelectItem>
                    <SelectItem value="90">90 дней</SelectItem>
                    <SelectItem value="365">1 год</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Ручное резервное копирование</h3>
                <Button>
                  <Icon name="Download" className="mr-2 h-4 w-4" />
                  Создать резервную копию
                </Button>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата создания</TableHead>
                      <TableHead>Размер</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { date: '2025-05-02 08:00', size: '42.5 МБ', type: 'Автоматический', status: 'Успешно' },
                      { date: '2025-05-01 08:00', size: '41.8 МБ', type: 'Автоматический', status: 'Успешно' },
                      { date: '2025-04-30 14:32', size: '41.2 МБ', type: 'Ручной', status: 'Успешно' },
                      { date: '2025-04-30 08:00', size: '41.1 МБ', type: 'Автоматический', status: 'Успешно' },
                      { date: '2025-04-29 08:00', size: '40.5 МБ', type: 'Автоматический', status: 'Успешно' }
                    ].map((backup, index) => (
                      <TableRow key={index}>
                        <TableCell>{backup.date}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>{backup.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            {backup.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm">
                            <Icon name="Download" className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="RotateCcw" className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Trash" className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Настройки хранения</h3>
              
              <div className="space-y-2">
                <Label htmlFor="storage-location">Место хранения резервных копий</Label>
                <Select defaultValue="local">
                  <SelectTrigger id="storage-location">
                    <SelectValue placeholder="Выберите место хранения" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Локальный сервер</SelectItem>
                    <SelectItem value="cloud">Облачное хранилище</SelectItem>
                    <SelectItem value="external">Внешний FTP-сервер</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-content">Содержимое резервной копии</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="backup-database" defaultChecked />
                    <label htmlFor="backup-database" className="text-sm">База данных</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="backup-uploads" defaultChecked />
                    <label htmlFor="backup-uploads" className="text-sm">Загруженные файлы</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="backup-settings" defaultChecked />
                    <label htmlFor="backup-settings" className="text-sm">Настройки системы</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="backup-logs" />
                    <label htmlFor="backup-logs" className="text-sm">Логи и статистика</label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="encryption">Шифрование резервных копий</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="encryption" defaultChecked />
                  <label htmlFor="encryption" className="text-sm">Включить шифрование</label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Отмена</Button>
            <Button onClick={handleSaveSettings}>Сохранить настройки</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default StoreSettings;
