import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Sun, Moon, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Dresses', href: '/products' },
    { name: 'New Arrivals', href: '/products?filter=new' },
    { name: 'Sale', href: '/products?filter=sale' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-bold text-primary-foreground">E</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Elegance</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="relative"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {/* Favorites */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/favorites">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          {/* User Account */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          {/* Shopping Cart */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t bg-background/95 backdrop-blur">
          <div className="container py-4">
            <Input
              type="search"
              placeholder="Search for dresses..."
              className="max-w-md mx-auto"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};