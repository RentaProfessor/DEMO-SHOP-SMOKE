import { Product } from '@/types';

export const products: Product[] = [
  // Vapes
  {
    id: 'vape-001',
    name: 'Premium Disposable Vape - Blue Razz',
    description: 'High-quality disposable vape with premium blue raspberry flavor. Approximately 2000 puffs per device.',
    price: 24.99,
    category: 'vapes',
    image: '/images/Juicy_bar_Jb_5000_disposable_vape__02616.PNG',
    inStock: true,
    featured: true,
    specifications: {
      'Puff Count': '~2000',
      'Nicotine Strength': '50mg',
      'Battery': 'Built-in'
    }
  },
  {
    id: 'vape-002',
    name: 'Refillable Pod System',
    description: 'Sleek refillable pod system with adjustable airflow and long-lasting battery life.',
    price: 49.99,
    category: 'vapes',
    image: '/images/Refillable Vape.PNG',
    inStock: true,
    featured: true,
    specifications: {
      'Battery': '1200mAh',
      'Pod Capacity': '2ml',
      'Charging': 'USB-C'
    }
  },
  {
    id: 'vape-003',
    name: 'Box Mod Starter Kit',
    description: 'Professional-grade box mod with tank, perfect for experienced users.',
    price: 89.99,
    category: 'vapes',
    image: '/images/Box mod starter kit.PNG',
    inStock: true,
    specifications: {
      'Wattage': '5-80W',
      'Battery': 'Dual 18650',
      'Tank Capacity': '5ml'
    }
  },

  // Glass
  {
    id: 'glass-001',
    name: 'Handblown Glass Water Pipe - 12"',
    description: 'Beautiful handcrafted glass water pipe with intricate design and smooth draw.',
    price: 129.99,
    category: 'glass',
    image: '/images/Bong.PNG',
    inStock: true,
    featured: true,
    specifications: {
      'Height': '12 inches',
      'Material': 'Borosilicate Glass',
      'Joint Size': '14mm'
    }
  },
  {
    id: 'glass-002',
    name: 'Mini Bubbler - Compact Design',
    description: 'Portable mini bubbler perfect for on-the-go use. Fits comfortably in your hand.',
    price: 39.99,
    category: 'glass',
    image: '/images/Mini bubbler.Png',
    inStock: true,
    specifications: {
      'Height': '4 inches',
      'Material': 'Borosilicate Glass',
      'Type': 'Bubbler'
    }
  },
  {
    id: 'glass-003',
    name: 'Artistic Glass Spoon Pipe',
    description: 'Unique artistic glass spoon pipe with vibrant colors and comfortable grip.',
    price: 24.99,
    category: 'glass',
    image: '/images/Colorful handpipe.Png',
    inStock: true,
    specifications: {
      'Length': '4 inches',
      'Material': 'Hand-blown Glass',
      'Style': 'Spoon Pipe'
    }
  },

  // Accessories
  {
    id: 'acc-001',
    name: 'Premium Herb Grinder',
    description: 'Aircraft-grade aluminum grinder with sharp teeth and smooth operation.',
    price: 34.99,
    category: 'accessories',
    image: '/images/Metal-Grinder_7.png',
    inStock: true,
    featured: true,
    specifications: {
      'Material': 'Aircraft Aluminum',
      'Diameter': '2.5 inches',
      'Chambers': '4-piece'
    }
  },
  {
    id: 'acc-002',
    name: 'Glass Storage Jar Set',
    description: 'Airtight glass storage jars to keep your herbs fresh. Set of 3 different sizes.',
    price: 19.99,
    category: 'accessories',
    image: '/images/Weed storage jars.jpg',
    inStock: true,
    specifications: {
      'Material': 'UV-resistant Glass',
      'Sizes': 'Small, Medium, Large',
      'Features': 'Airtight Seal'
    }
  },

  // Papers & Wraps
  {
    id: 'paper-001',
    name: 'Organic Hemp Papers - King Size',
    description: 'Premium organic hemp rolling papers with natural gum. Slow burning and pure taste.',
    price: 3.99,
    category: 'papers',
    image: '/images/RAW rolling papers.png',
    inStock: true,
    specifications: {
      'Material': 'Organic Hemp',
      'Size': 'King Size',
      'Count': '32 papers'
    }
  },
  {
    id: 'paper-002',
    name: 'Natural Leaf Wraps',
    description: 'All-natural tobacco-free leaf wraps. Smooth burn and natural flavor.',
    price: 2.49,
    category: 'papers',
    image: '/images/Backwoods leaf wraps.jpg',
    inStock: true,
    specifications: {
      'Material': 'Natural Leaf',
      'Type': 'Tobacco-free',
      'Count': '2 wraps'
    }
  },

  // Lighters
  {
    id: 'lighter-001',
    name: 'Butane Torch Lighter',
    description: 'Reliable butane torch lighter with adjustable flame and refillable design.',
    price: 12.99,
    category: 'lighters',
    image: '/images/bic-slim-lighter-2340_2.jpg',
    inStock: true,
    specifications: {
      'Fuel': 'Butane',
      'Flame Type': 'Torch',
      'Features': 'Refillable, Adjustable'
    }
  },

  // CBD Products
  {
    id: 'cbd-001',
    name: 'CBD Tincture - 1000mg',
    description: 'High-quality full-spectrum CBD tincture. Third-party lab tested for purity.',
    price: 79.99,
    category: 'CBD',
    image: '/images/CBD tincature.jpg',
    inStock: true,
    featured: true,
    specifications: {
      'Strength': '1000mg CBD',
      'Type': 'Full Spectrum',
      'Size': '30ml bottle'
    }
  },
  {
    id: 'cbd-002',
    name: 'CBD Gummies - Mixed Berry',
    description: 'Delicious mixed berry CBD gummies. 25mg per gummy, 20 count bottle.',
    price: 49.99,
    category: 'CBD',
    image: '/images/CBD gummies.jpg',
    inStock: true,
    specifications: {
      'Strength': '25mg per gummy',
      'Count': '20 gummies',
      'Flavor': 'Mixed Berry'
    }
  }
];

export const featuredProducts = products.filter(product => product.featured);

export const getProductsByCategory = (category: string) => 
  products.filter(product => product.category === category); 