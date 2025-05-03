
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface StaffMember {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: "active" | "vacation" | "sick" | "inactive";
  startDate: string;
  avatar?: string;
}

interface ScheduleEntry {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  shift: "morning" | "day" | "evening" | "off";
  hours: number;
  location: string;
}

const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "Александр Иванов",
    position: "Старший менеджер",
    department: "Продажи",
    email: "a.ivanov@velorent.ru",
    phone: "+7 (999) 123-45-67",
    status: "active",
    startDate: "2023-05-15"
  },
  {
    id: 2,
    name: "Екатерина Смирнова",
    position: "Менеджер по работе с клиентами",
    department: "Клиентский сервис",
    email: "e.smirnova@velorent.ru",
    phone: "+7 (999) 234-56-78",
    status: "active",
    startDate: "2023-07-20"
  },
  {
    id: 3,
    name: "Дмитрий Петров",
    position: "Техник",
    department: "Сервис",
    email: "d.petrov@velorent.ru",
    phone: "+7 (999) 345-67-89",
    status: "vacation",
    startDate: "2023-03-10"
  },
  {
    id: 4,
    name: "Анна Козлова",
    position: "Администратор",
    department: "Администрация",
    email: "a.kozlova@velorent.ru",
    phone: "+7 (999) 456-78-90",
    status: "active",
    startDate: "2022-11-05"
  },
  {
    id: 5,
    name: "Максим Соколов",
    position: "Курьер",
    department: "Логистика",
    email: "m.sokolov@velorent.ru",
    phone: "+7 (999) 567-89-01",
    status: "sick",
    startDate: "2024-01-15"
  },
  {
    id: 6,
    name: "Ольга Новикова",
    position: "Маркетолог",
    department: "Маркетинг",
    email: "o.novikova@velorent.ru",
    phone: "+7 (999) 678-90-12",
    status: "inactive",
    startDate: "2023-08-01"
  }
];

const scheduleData: ScheduleEntry[] = [
  { id: 1, employeeId: 1, employeeName: "Александр Иванов", date: "2025-05-03", shift: "day", hours: 8, location: "Главный офис" },
  { id: 2, employeeId: 2, employeeName: "Екатерина Смирнова", date: "2025-05-03", shift: "day", hours: 8, location: "Главный офис" },
  { id: 3, employeeId: 3, employeeName: "Дмитрий Петров", date: "2025-05-03", shift: "off", hours: 0, location: "" },
  { id: 4, employeeId: 4, employeeName: "Анна Козлова", date: "2025-05-03", shift: "morning", hours: 5, location: "Торговый центр" },
  { id: 5, employeeId: 5, employeeName: "Максим Соколов", date: "2025-05-03", shift: "off", hours: 0, location: "" },
  { id: 6, employeeId: 6, employeeName: "Ольга Новикова", date: "2025-05-03", shift: "day", hours: 8, location: "Удаленно" },
  
  { id: 7, employeeId: 1, employeeName: "Александр Иванов", date: "2025-05-04", shift: "day", hours: 8, location: "Главный офис" },
  { id: 8, employeeId: 2, employeeName: "Екатерина Смирнова", date: "2025-05-04", shift: "off", hours: 0, location: "" },
  { id: 9, employeeId: 3, employeeName: "Дмитрий Петров", date: "2025-05-04", shift: "off", hours: 0, location: "" },
  { id: 10, employeeId: 4, employeeName: "Анна Козлова", date: "2025-05-04", shift: "day", hours: 8, location: "Торговый центр" },
  { id: 11, employeeId: 5, employeeName: "Максим Соколов", date: "2025-05-04", shift: "off", hours: 0, location: "" },
  { id: 12, employeeId: 6, employeeName: "Ольга Новикова", date: "2025-05-04", shift: "day", hours: 4, location: "Удаленно" }
];

// Диалоговое окно для добавления/редактирования сотрудника
const StaffMemberDialog = ({ 
  member, 
  onSave 
}: { 
  member?: StaffMember, 
  onSave: (data: Partial<StaffMember>) => void 
}) => {
  const isEdit = !!member;
  const [formData, setFormData] = useState<Partial<StaffMember>>(
    member || {
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      status: "active",
      startDate: new Date().toISOString().split('T')[0]
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" size="icon">
            <Icon name="Pencil" className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Добавить сотрудника
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Редактировать сотрудника" : "Добавить нового сотрудника"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Измените информацию о сотруднике" : "Заполните информацию о новом сотруднике"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">ФИО</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Иванов Иван Иванович"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Должность</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Менеджер"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Отдел</Label>
              <Select 
                name="department" 
                value={formData.department} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Выберите отдел" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Продажи">Продажи</SelectItem>
                  <SelectItem value="Клиентский сервис">Клиентский сервис</SelectItem>
                  <SelectItem value="Сервис">Сервис</SelectItem>
                  <SelectItem value="Администрация">Администрация</SelectItem>
                  <SelectItem value="Логистика">Логистика</SelectItem>
                  <SelectItem value="Маркетинг">Маркетинг</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select 
                name="status" 
                value={formData.status} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as "active" | "vacation" | "sick" | "inactive" }))}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Активный</SelectItem>
                  <SelectItem value="vacation">Отпуск</SelectItem>
                  <SelectItem value="sick">Больничный</SelectItem>
                  <SelectItem value="inactive">Неактивный</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@velorent.ru"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="startDate">Дата начала работы</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="mr-2">
            Отмена
          </Button>
          <Button onClick={handleSubmit}>
            {isEdit ? "Сохранить изменения" : "Добавить сотрудника"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Диалоговое окно для просмотра профиля сотрудника
const StaffProfileDialog = ({ member }: { member: StaffMember }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const statusText = {
    active: "Активный",
    vacation: "В отпуске",
    sick: "На больничном",
    inactive: "Неактивный"
  };

  const statusColor = {
    active: "bg-green-100 text-green-800",
    vacation: "bg-blue-100 text-blue-800",
    sick: "bg-yellow-100 text-yellow-800",
    inactive: "bg-gray-100 text-gray-800"
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon name="Eye" className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Профиль сотрудника</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex flex-col items-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="text-2xl">{getInitials(member.name)}</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.position}</p>
            <Badge className={`mt-2 ${statusColor[member.status]}`}>{statusText[member.status]}</Badge>
            
            <div className="w-full mt-6 space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Mail" className="mr-2 h-4 w-4" />
                Отправить сообщение
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Phone" className="mr-2 h-4 w-4" />
                Позвонить
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Calendar" className="mr-2 h-4 w-4" />
                Расписание
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="info">
              <TabsList className="mb-4">
                <TabsTrigger value="info">Информация</TabsTrigger>
                <TabsTrigger value="schedule">Расписание</TabsTrigger>
                <TabsTrigger value="performance">Показатели</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Контактная информация</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Email:</span>
                        <span className="text-sm font-medium">{member.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Телефон:</span>
                        <span className="text-sm font-medium">{member.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Информация о работе</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Отдел:</span>
                        <span className="text-sm font-medium">{member.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Должность:</span>
                        <span className="text-sm font-medium">{member.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Дата начала работы:</span>
                        <span className="text-sm font-medium">{member.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Стаж работы:</span>
                        <span className="text-sm font-medium">
                          {Math.floor((new Date().getTime() - new Date(member.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} мес.
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Последние действия</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <div className="mr-2 bg-blue-100 p-1 rounded-full">
                          <Icon name="ClipboardCheck" className="h-3 w-3 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs">Обработал заказ #1002</p>
                          <p className="text-xs text-muted-foreground">2 часа назад</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 bg-green-100 p-1 rounded-full">
                          <Icon name="UserCheck" className="h-3 w-3 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs">Зарегистрировал нового клиента</p>
                          <p className="text-xs text-muted-foreground">Вчера, 15:30</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-2 bg-purple-100 p-1 rounded-full">
                          <Icon name="PhoneCall" className="h-3 w-3 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs">Провел консультацию по телефону</p>
                          <p className="text-xs text-muted-foreground">Вчера, 12:15</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Расписание на неделю</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Дата</TableHead>
                        <TableHead>Смена</TableHead>
                        <TableHead>Время</TableHead>
                        <TableHead>Место работы</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scheduleData
                        .filter(entry => entry.employeeId === member.id)
                        .map(entry => (
                          <TableRow key={entry.id}>
                            <TableCell>{entry.date}</TableCell>
                            <TableCell>
                              <Badge className={
                                entry.shift === 'morning' ? 'bg-yellow-100 text-yellow-800' :
                                entry.shift === 'day' ? 'bg-green-100 text-green-800' :
                                entry.shift === 'evening' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }>
                                {entry.shift === 'morning' ? 'Утро' :
                                 entry.shift === 'day' ? 'День' :
                                 entry.shift === 'evening' ? 'Вечер' :
                                 'Выходной'}
                              </Badge>
                            </TableCell>
                            <TableCell>{entry.hours > 0 ? `${entry.hours} часов` : '-'}</TableCell>
                            <TableCell>{entry.location || '-'}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="performance">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Ключевые показатели эффективности</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Выполнение плана продаж</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Удовлетворенность клиентов</span>
                        <span className="text-sm font-medium">4.8/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Время обработки заказов</span>
                        <span className="text-sm font-medium">Отлично</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Командная работа</span>
                        <span className="text-sm font-medium">Хорошо</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Последние отзывы клиентов</h4>
                    <div className="space-y-3">
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Иван П.</p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(i => (
                              <Icon key={i} name="Star" className={`h-4 w-4 ${i <= 5 ? 'text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm mt-1">Отличный сервис, быстро помогли с выбором велосипеда.</p>
                        <p className="text-xs text-muted-foreground mt-1">28 апреля 2025</p>
                      </div>
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Мария С.</p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(i => (
                              <Icon key={i} name="Star" className={`h-4 w-4 ${i <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm mt-1">Очень внимательный сотрудник, все объяснил и помог оформить заказ.</p>
                        <p className="text-xs text-muted-foreground mt-1">15 апреля 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Диалоговое окно для управления расписанием
const ScheduleDialog = ({ 
  onSave 
}: { 
  onSave: () => void 
}) => {
  const [currentDate, setCurrentDate] = useState("2025-05-03");
  const [view, setView] = useState<"day" | "week">("day");
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Icon name="Calendar" className="mr-2 h-4 w-4" />
          Управление расписанием
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Расписание сотрудников</DialogTitle>
          <DialogDescription>
            Управление рабочими сменами персонала
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center mt-4 mb-6">
          <div className="flex space-x-2 items-center">
            <Button variant="outline" size="icon">
              <Icon name="ChevronLeft" className="h-4 w-4" />
            </Button>
            <Input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="w-36"
            />
            <Button variant="outline" size="icon">
              <Icon name="ChevronRight" className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant={view === "day" ? "default" : "outline"} 
              size="sm"
              onClick={() => setView("day")}
            >
              День
            </Button>
            <Button 
              variant={view === "week" ? "default" : "outline"} 
              size="sm"
              onClick={() => setView("week")}
            >
              Неделя
            </Button>
          </div>
        </div>
        
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="w-40">Сотрудник</TableHead>
              {view === "day" ? (
                <TableHead>Смена {currentDate}</TableHead>
              ) : (
                <>
                  <TableHead>03.05</TableHead>
                  <TableHead>04.05</TableHead>
                  <TableHead>05.05</TableHead>
                  <TableHead>06.05</TableHead>
                  <TableHead>07.05</TableHead>
                  <TableHead>08.05</TableHead>
                  <TableHead>09.05</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{staff.name}</p>
                      <p className="text-xs text-muted-foreground">{staff.position}</p>
                    </div>
                  </div>
                </TableCell>
                
                {view === "day" ? (
                  <TableCell>
                    <Select defaultValue={scheduleData.find(s => s.employeeId === staff.id && s.date === currentDate)?.shift || "off"}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Выберите смену" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                            Утро
                          </div>
                        </SelectItem>
                        <SelectItem value="day">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            День
                          </div>
                        </SelectItem>
                        <SelectItem value="evening">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                            Вечер
                          </div>
                        </SelectItem>
                        <SelectItem value="off">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                            Выходной
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                ) : (
                  // Схематичное представление недели
                  Array.from({ length: 7 }).map((_, index) => (
                    <TableCell key={index} className="p-1 text-center">
                      <div className={`
                        h-8 rounded-md flex items-center justify-center text-xs font-medium
                        ${index % 2 === 0 ? 'bg-gray-100' : 'bg-green-100 text-green-800'}
                      `}>
                        {index % 2 === 0 ? '-' : '8ч'}
                      </div>
                    </TableCell>
                  ))
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">День</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Утро</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-xs">Вечер</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-xs">Выходной</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline">Экспорт</Button>
            <Button onClick={onSave}>Сохранить расписание</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Основной компонент управления персоналом
const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredStaff = staffMembers.filter(staff => {
    // Применяем фильтр по отделу
    if (departmentFilter !== "all" && staff.department !== departmentFilter) return false;
    
    // Применяем фильтр по статусу
    if (statusFilter !== "all" && staff.status !== statusFilter) return false;
    
    // Применяем поиск
    return staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           staff.position.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleStaffSave = (data: Partial<StaffMember>) => {
    // В реальном приложении здесь был бы API-запрос
    alert("Данные сотрудника сохранены (демо)");
  };

  const handleScheduleSave = () => {
    // В реальном приложении здесь был бы API-запрос
    alert("Расписание сохранено (демо)");
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Управление персоналом</CardTitle>
            <CardDescription>Всего сотрудников: {staffMembers.length}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <ScheduleDialog onSave={handleScheduleSave} />
            <StaffMemberDialog onSave={handleStaffSave} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-col sm:flex-row space-y-2 sm:space-y-0">
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Input 
                placeholder="Поиск по имени, должности или email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Отдел" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все отделы</SelectItem>
                  <SelectItem value="Продажи">Продажи</SelectItem>
                  <SelectItem value="Клиентский сервис">Клиентский сервис</SelectItem>
                  <SelectItem value="Сервис">Сервис</SelectItem>
                  <SelectItem value="Администрация">Администрация</SelectItem>
                  <SelectItem value="Логистика">Логистика</SelectItem>
                  <SelectItem value="Маркетинг">Маркетинг</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="vacation">В отпуске</SelectItem>
                  <SelectItem value="sick">На больничном</SelectItem>
                  <SelectItem value="inactive">Неактивные</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Сотрудник</TableHead>
                <TableHead>Должность</TableHead>
                <TableHead>Отдел</TableHead>
                <TableHead>Контакты</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={staff.avatar} />
                        <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{staff.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{staff.position}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs">
                        <Icon name="Mail" className="h-3 w-3 mr-1" />
                        {staff.email}
                      </div>
                      <div className="flex items-center text-xs">
                        <Icon name="Phone" className="h-3 w-3 mr-1" />
                        {staff.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        staff.status === "active" ? "bg-green-100 text-green-800" :
                        staff.status === "vacation" ? "bg-blue-100 text-blue-800" :
                        staff.status === "sick" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }
                    >
                      {staff.status === "active" ? "Активный" :
                       staff.status === "vacation" ? "В отпуске" :
                       staff.status === "sick" ? "На больничном" :
                       "Неактивный"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <StaffProfileDialog member={staff} />
                    <StaffMemberDialog member={staff} onSave={handleStaffSave} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Icon name="MoreHorizontal" className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Icon name="Mail" className="mr-2 h-4 w-4" />
                          Отправить сообщение
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Icon name="FileClock" className="mr-2 h-4 w-4" />
                          История работы
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Icon name="BadgePercent" className="mr-2 h-4 w-4" />
                          Назначить бонус
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffManagement;
