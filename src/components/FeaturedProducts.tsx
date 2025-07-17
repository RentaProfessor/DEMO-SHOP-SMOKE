'use client';

import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { featuredProducts } from '@/data/products';

export default function FeaturedProducts() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <section className="py-20 bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-100 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hand-picked premium products from our collection
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="card group overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-lg mb-4 bg-primary-800">
                <div className="aspect-square w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/placeholder/300/300';
                    }}
                  />
                </div>
                
                {/* Quick view button */}
                <button className="absolute bottom-2 right-2 bg-accent-600 text-white p-2 rounded-full">
                  <Eye className="h-4 w-4 text-white" />
                </button>
                
                {/* Featured badge */}
                <div className="absolute top-4 left-4 bg-accent-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Featured
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-100 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                  {product.description}
                </p>
                
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-xs text-gray-400 ml-2">(4.8)</span>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold text-accent-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-primary text-lg px-8 py-4">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
} 