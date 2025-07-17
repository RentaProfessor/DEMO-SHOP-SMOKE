# Demo Smoke - Professional Smoke Shop Website

A modern, professional website for Demo Smoke shop built with Next.js, TypeScript, and Tailwind CSS. This website features age verification, product catalog, shopping cart, and checkout functionality.

## 🌟 Features

### Core Functionality
- **Age Verification**: 21+ age gate with birth date validation
- **Product Catalog**: Organized categories (Vapes, Glass, Accessories, Papers, Lighters, CBD)
- **Shopping Cart**: Add/remove items, quantity management, persistent storage
- **Checkout Process**: Multi-step checkout with customer info and pickup scheduling
- **Responsive Design**: Mobile-first design that works on all devices

### User Experience
- **Dark Theme**: Professional dark color scheme with orange accents
- **Smooth Animations**: Fade-in, slide-up, and hover effects
- **Professional UI**: Glass morphism effects, gradient text, modern components
- **Fast Performance**: Optimized images, lazy loading, efficient code splitting

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Modern React**: Hooks, context API, client-side state management
- **SEO Optimized**: Meta tags, semantic HTML, proper heading structure
- **Accessibility**: ARIA labels, keyboard navigation, screen reader friendly

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smoke-shop-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Usage

### Age Verification
- Users must verify they are 21+ before accessing the site
- Birth date validation with proper age calculation
- Session-based verification (persists until browser close)

### Shopping Experience
1. Browse products by category
2. View featured products on homepage
3. Add items to cart with quantity selection
4. Review cart with item management (add/remove/update quantities)
5. Proceed through checkout process:
   - Enter customer information
   - Select pickup time
   - Review and confirm order

### Navigation
- **Header**: Logo, navigation menu, search bar, cart icon
- **Categories**: Visual category cards with product counts
- **Products**: Featured products with ratings and quick add-to-cart
- **Footer**: Contact info, links, legal disclaimers

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14**: React framework with app router
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe JavaScript development

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable UI components
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Professional color palette

### State Management
- **React Context**: Global cart state management
- **Local Storage**: Cart persistence
- **Session Storage**: Age verification state

### Icons & Assets
- **Lucide React**: Beautiful, consistent icon set
- **Unsplash**: High-quality product placeholder images
- **Google Fonts**: Inter and Poppins typography

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Homepage component
├── components/            # React components
│   ├── AgeVerification.tsx # Age gate modal
│   ├── Header.tsx         # Site navigation
│   ├── Hero.tsx           # Homepage hero section
│   ├── Categories.tsx     # Product categories grid
│   ├── FeaturedProducts.tsx # Featured products section
│   ├── Cart.tsx           # Shopping cart sidebar
│   ├── Checkout.tsx       # Multi-step checkout process
│   ├── About.tsx          # About section
│   └── Footer.tsx         # Site footer
├── context/               # React context providers
│   └── CartContext.tsx    # Shopping cart state management
├── data/                  # Static data and mock content
│   └── products.ts        # Product catalog data
└── types/                 # TypeScript type definitions
    └── index.ts           # Shared type interfaces
```

## 🎨 Design System

### Colors
- **Primary**: Dark grays and blacks for backgrounds
- **Accent**: Orange/amber for highlights and CTAs
- **Text**: Light grays and whites for readability

### Typography
- **Display Font**: Poppins (headings, brand name)
- **Body Font**: Inter (paragraphs, UI text)

### Components
- **Cards**: Dark backgrounds with subtle borders
- **Buttons**: Primary (orange) and secondary (gray) variants
- **Forms**: Consistent input styling with icons
- **Animations**: Smooth transitions and hover effects

## 🔧 Customization

### Adding Products
Edit `src/data/products.ts` to add new products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 29.99,
  category: 'vapes', // or other category
  image: 'image-url',
  inStock: true,
  featured: true, // optional
  specifications: {
    'Spec Name': 'Spec Value'
  }
}
```

### Modifying Categories
Update the categories array in `src/components/Categories.tsx`

### Changing Branding
- Update company name in components (currently "Demo Smoke")
- Modify colors in `tailwind.config.js`
- Change fonts in `src/app/globals.css`

## 📄 Legal Compliance

This demo includes appropriate disclaimers for:
- Age verification requirements
- Legal notices in footer
- Tobacco product warnings
- Terms of service placeholders

**Note**: This is a demonstration website. Actual implementation would require:
- Real age verification system
- Payment processing integration
- Inventory management
- Legal compliance review
- Security auditing

## 🤝 Contributing

This is a demonstration project. For production use:
1. Implement real payment processing
2. Add user authentication
3. Create admin panel for product management
4. Add inventory tracking
5. Implement order management system
6. Add search functionality
7. Integrate with CMS for content management

## 📞 Support

For questions about this demo project, please refer to the code comments and documentation within the components.

---

**Disclaimer**: This website is for demonstration purposes only. All products, prices, and company information are fictional. Not intended for actual commercial use without proper legal compliance and payment integration. 