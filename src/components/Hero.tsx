'use client';

import { ArrowDown, Star, Shield, Truck } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById('categories');
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

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent-950/30 border border-accent-800/50 rounded-full px-6 py-2 text-accent-300">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Premium Quality Guaranteed</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-100">
              Welcome to{' '}
              <span className="gradient-text">Demo Smoke</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your premier destination for quality vapes, glass, accessories, and more. 
              Experience excellence in every product.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-gray-400 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent-400" />
              <span>Premium Products</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent-400" />
              <span>Verified Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-accent-400" />
              <span>Fast Pickup</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <button 
              onClick={scrollToProducts}
              className="w-full sm:w-auto btn-primary text-lg px-8 py-4"
            >
              Shop Now
            </button>
            <button className="w-full sm:w-auto btn-secondary text-lg px-8 py-4">
              Learn More
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12">
            <button 
              onClick={scrollToProducts}
              className="text-gray-400 hover:text-accent-400 transition-colors duration-300 animate-bounce"
            >
              <ArrowDown className="h-8 w-8 mx-auto" />
            </button>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-950 to-transparent" />
    </section>
  );
} 