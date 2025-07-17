'use client';

import Link from 'next/link';
import { Wind, Beaker, Wrench, Scroll, Flame, Leaf, ArrowRight } from 'lucide-react';

export default function Categories() {
  const categories = [
    {
      name: 'Vapes',
      icon: Wind,
      description: 'Premium vaporizers and e-cigarettes',
      count: '3 Products',
      href: '/category/vapes',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Glass',
      icon: Beaker,
      description: 'Handcrafted glass pieces and water pipes',
      count: '3 Products',
      href: '/category/glass',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      name: 'Accessories',
      icon: Wrench,
      description: 'Essential smoking accessories',
      count: '2 Products',
      href: '/category/accessories',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      name: 'Papers',
      icon: Scroll,
      description: 'Rolling papers and wraps',
      count: '2 Products',
      href: '/category/papers',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      name: 'Lighters',
      icon: Flame,
      description: 'Quality lighters and torch lighters',
      count: '1 Product',
      href: '/category/lighters',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      name: 'CBD',
      icon: Leaf,
      description: 'Premium CBD products and wellness',
      count: '2 Products',
      href: '/category/cbd',
      gradient: 'from-green-400 to-green-600'
    },
  ];

  return (
    <section className="py-20 bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-100 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our wide selection of premium products across all categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl card cursor-pointer block"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${category.gradient} mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-accent-400">
                    <span className="text-accent-400 transition-colors">
                      {category.name}
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
} 