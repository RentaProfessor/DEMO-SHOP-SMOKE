import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-16">
        <div id="home">
          <Hero />
        </div>
        <div id="categories">
          <Categories />
        </div>
        <div id="featured">
          <FeaturedProducts />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="contact">
          <Footer />
        </div>
      </div>
    </main>
  );
} 