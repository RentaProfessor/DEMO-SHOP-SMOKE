'use client';

import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

  const quickLinks = [
    { name: 'About Us', scrollTarget: 'about' },
    { name: 'Products', scrollTarget: 'categories' },
    { name: 'Featured', scrollTarget: 'featured' },
    { name: 'Home', scrollTarget: 'home' },
  ];

  const categories = [
    { name: 'All Categories', scrollTarget: 'categories' },
    { name: 'Featured Products', scrollTarget: 'featured' },
    { name: 'About Us', scrollTarget: 'about' },
    { name: 'Contact Info', scrollTarget: 'contact' },
  ];

  const legal = [
    { name: 'Privacy Policy' },
    { name: 'Terms of Service' },
    { name: 'Age Verification' },
    { name: 'Return Policy' },
  ];

  return (
    <footer className="bg-primary-950 border-t border-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-display font-bold gradient-text mb-4">
                Demo Smoke
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Your premier destination for quality smoking accessories and premium products. 
                Serving the community with integrity and excellence.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-accent-400" />
                <span className="text-sm">123 Main Street, Your City, State 12345</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-accent-400" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="h-4 w-4 text-accent-400" />
                <span className="text-sm">Mon-Sat: 10AM-9PM</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-accent-400" />
                <span className="text-sm">info@demosmoke.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-gray-100 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => smoothScrollTo(link.scrollTarget)}
                    className="text-gray-400 hover:text-accent-400 transition-colors duration-200 text-sm text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-gray-100 mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <button
                    onClick={() => smoothScrollTo(category.scrollTarget)}
                    className="text-gray-400 hover:text-accent-400 transition-colors duration-200 text-sm text-left"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-6">
            <div>
              <h4 className="font-display font-semibold text-gray-100 mb-6">Legal</h4>
              <ul className="space-y-3">
                {legal.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => alert(`${item.name} page would open here`)}
                      className="text-gray-400 hover:text-accent-400 transition-colors duration-200 text-sm text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-display font-semibold text-gray-100 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-2 bg-primary-800 hover:bg-accent-600 rounded-lg transition-colors duration-200"
                >
                  <Facebook className="h-4 w-4 text-gray-300" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-primary-800 hover:bg-accent-600 rounded-lg transition-colors duration-200"
                >
                  <Instagram className="h-4 w-4 text-gray-300" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-primary-800 hover:bg-accent-600 rounded-lg transition-colors duration-200"
                >
                  <Twitter className="h-4 w-4 text-gray-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Age Disclaimer & Copyright */}
        <div className="border-t border-primary-800 mt-12 pt-8 space-y-4">
          <div className="bg-accent-950/30 border border-accent-800/50 rounded-lg p-4">
            <p className="text-accent-300 text-sm text-center">
              <strong>Age Verification Required:</strong> You must be 21 years or older to purchase tobacco products. 
              Valid ID required for all purchases. We card anyone who appears under 30.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} Demo Smoke. All rights reserved.</p>
            <p>Designed for demonstration purposes only.</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 