
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <img src="/logo-b.svg" alt="ВелоПрокат" className="h-8 w-auto" />
          ВелоПрокат
        </Link>

        {/* Десктопное меню */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/catalog" className="hover:text-primary-foreground/80 transition-colors">
            Каталог
          </Link>
          <Link to="/about" className="hover:text-primary-foreground/80 transition-colors">
            О нас
          </Link>
          <Link to="/contacts" className="hover:text-primary-foreground/80 transition-colors">
            Контакты
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="text-white hover:text-primary-foreground/80">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
        </div>

        {/* Мобильная кнопка меню */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Мобильное меню */}
      <div 
        className={cn(
          "fixed inset-0 bg-primary z-50 flex flex-col p-4 pt-16 transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-4 text-lg">
          <Link to="/" className="p-2 hover:bg-primary-foreground/10 rounded" onClick={toggleMenu}>
            Главная
          </Link>
          <Link to="/catalog" className="p-2 hover:bg-primary-foreground/10 rounded" onClick={toggleMenu}>
            Каталог
          </Link>
          <Link to="/about" className="p-2 hover:bg-primary-foreground/10 rounded" onClick={toggleMenu}>
            О нас
          </Link>
          <Link to="/contacts" className="p-2 hover:bg-primary-foreground/10 rounded" onClick={toggleMenu}>
            Контакты
          </Link>
          <Link to="/cart" className="p-2 hover:bg-primary-foreground/10 rounded flex items-center gap-2" onClick={toggleMenu}>
            Корзина <ShoppingCart className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
