'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CategoryPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const slug = params.slug as string;
  
  // Map URL slugs to product categories
  const categoryMap: Record<string, string> = {
    'vapes': 'vapes',
    'glass': 'glass',
    'accessories': 'accessories',
    'papers': 'papers',
    'lighters': 'lighters',
    'cbd': 'CBD'
  };
  
  const category = categoryMap[slug];
  const categoryProducts = products.filter(product => product.category === category);
  
  const categoryNames: Record<string, string> = {
    'vapes': 'Vapes & E-Cigarettes',
    'glass': 'Glass & Water Pipes',
    'accessories': 'Accessories',
    'papers': 'Papers & Wraps',
    'lighters': 'Lighters',
    'cbd': 'CBD Products'
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-primary-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-gray-100 mb-4">
            Category Not Found
          </h1>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-950">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-accent-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-100">{categoryNames[slug]}</span>
          </div>

          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>

          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-100 mb-4">
              {categoryNames[slug]}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Browse our premium selection of {categoryNames[slug].toLowerCase()}
            </p>
            <div className="mt-4 text-accent-400 font-medium">
              {categoryProducts.length} products available
            </div>
          </div>

          {/* Products Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product, index) => (
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
                          target.src = `https://via.placeholder.com/400x400/1e293b/64748b?text=${encodeURIComponent(product.name)}`;
                        }}
                      />
                    </div>
                    
                    {/* In Stock Badge */}
                    {product.inStock && (
                      <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                        In Stock
                      </div>
                    )}
                    
                    {/* Featured Badge */}
                    {product.featured && (
                      <div className="absolute top-4 right-4 bg-accent-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-100 line-clamp-2 group-hover:text-accent-400 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                      <span className="text-xs text-gray-400 ml-2">(4.8)</span>
                    </div>
                    
                    {/* Specifications */}
                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                      <div className="text-xs text-gray-500">
                        {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span>{key}:</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-bold text-accent-400">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="flex items-center gap-2 bg-accent-600 hover:bg-accent-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg mb-4">
                No products available in this category yet.
              </div>
              <Link href="/" className="btn-primary">
                Browse Other Categories
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 