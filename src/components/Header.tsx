'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, User, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Cart from './Cart';
import SearchResults from './SearchResults';
import AccountMenu from './AccountMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();
  const accountRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', href: '/', scrollTarget: 'home' },
    { name: 'Categories', href: '#categories', scrollTarget: 'categories' },
    { name: 'Featured', href: '#featured', scrollTarget: 'featured' },
    { name: 'About', href: '#about', scrollTarget: 'about' },
    { name: 'Contact', href: '#contact', scrollTarget: 'contact' },
  ];

  // Close account menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Simple smooth scroll function
  const smoothScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu
    
    if (item.scrollTarget) {
      smoothScrollTo(item.scrollTarget);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(true);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() && e.target.value.length > 2) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-primary-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 mr-8">
              <button 
                onClick={() => smoothScrollTo('home')}
                className="text-2xl font-display font-bold gradient-text cursor-pointer"
              >
                Demo Smoke
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-gray-300 hover:text-accent-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-xs mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full pl-10 pr-4 py-2 bg-primary-800/50 border border-primary-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </form>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Contact Info */}
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-300 hover:text-accent-400 transition-colors duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cart.itemCount}
                  </span>
                )}
              </button>

              {/* Account */}
              <div ref={accountRef} className="relative">
                <button 
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="p-2 text-gray-300 hover:text-accent-400 transition-colors duration-200"
                >
                  <User className="h-6 w-6" />
                </button>
                <AccountMenu 
                  isOpen={isAccountMenuOpen} 
                  onClose={() => setIsAccountMenuOpen(false)} 
                />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-accent-400 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full pl-10 pr-4 py-2 bg-primary-800/50 border border-primary-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </form>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-900/95 backdrop-blur-sm border-t border-primary-800">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(e, item)}
                  className="block w-full text-left text-gray-300 hover:text-accent-400 transition-colors duration-200 font-medium py-2"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-primary-800">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Search Results */}
      <SearchResults 
        query={searchQuery}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
} 