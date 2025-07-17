'use client';

import { Shield, Clock, Award, Users, MapPin, Phone } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All products are thoroughly tested and verified for quality and authenticity.'
    },
    {
      icon: Clock,
      title: 'Fast Pickup',
      description: 'Quick and convenient pickup service with flexible scheduling options.'
    },
    {
      icon: Award,
      title: 'Premium Brands',
      description: 'We carry only the most trusted and recognized brands in the industry.'
    },
    {
      icon: Users,
      title: 'Expert Staff',
      description: 'Knowledgeable team ready to help you find the perfect products.'
    }
  ];

  return (
    <section className="py-20 bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-100 mb-6">
                About Demo Smoke
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Demo Smoke is your premier destination for quality smoking accessories and premium products. 
                We've been serving the community with integrity, quality, and exceptional customer service.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our commitment to excellence ensures that every product meets the highest standards. 
                From novice users to connoisseurs, we provide products and guidance for all experience levels.
              </p>
            </div>

            {/* Store Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-display font-semibold text-gray-100 mb-4">
                Visit Our Store
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="h-5 w-5 text-accent-400" />
                  <span>123 Main Street, Your City, State 12345</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="h-5 w-5 text-accent-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="h-5 w-5 text-accent-400" />
                  <span>Mon-Sat: 10AM-9PM, Sun: 12PM-6PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="card p-6 text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex p-4 bg-accent-600 rounded-xl mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
            Ready to Shop Premium Products?
          </h3>
          <p className="text-accent-100 text-lg mb-8 max-w-2xl mx-auto">
            Browse our extensive catalog of premium smoking accessories and find exactly what you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-accent-700 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              Browse Products
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-accent-700 font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 