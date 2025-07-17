'use client';

import { X, ShoppingCart, Star } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface SearchResultsProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchResults({ query, isOpen, onClose }: SearchResultsProps) {
  const { addToCart } = useCart();

  if (!isOpen || !query.trim()) return null;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm">
      <div className="absolute top-20 left-0 right-0 mx-4 max-w-4xl lg:mx-auto">
        <div className="bg-primary-900 rounded-2xl shadow-xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-primary-800">
            <h2 className="text-xl font-display font-semibold text-gray-100">
              Search Results for "{query}"
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Results */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-gray-400 mb-6">
                  Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="card p-4 overflow-hidden"
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
                        
                        {/* Badges */}
                        {product.inStock && (
                          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                            In Stock
                          </div>
                        )}
                        {product.featured && (
                          <div className="absolute top-2 right-2 bg-accent-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                            Featured
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-100 line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                          <span className="text-xs text-gray-400 ml-1">(4.8)</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-lg font-bold text-accent-400">
                            ${product.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className="flex items-center gap-1 bg-accent-600 hover:bg-accent-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors duration-200"
                          >
                            <ShoppingCart className="h-3 w-3" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  No products found for "{query}"
                </div>
                <p className="text-gray-500 text-sm">
                  Try searching for vapes, glass, accessories, papers, lighters, or CBD
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 