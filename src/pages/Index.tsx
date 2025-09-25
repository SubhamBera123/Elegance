import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import heroBanner from '@/assets/hero-banner.jpg';

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.filter(product => product.isNew).slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Discover Your Perfect
            <span className="block gradient-accent bg-clip-text text-transparent">
              Dress
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            From elegant evening wear to casual day dresses, find the perfect outfit for every occasion in our curated collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link to="/products?filter=new">
                New Arrivals
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Free Shipping</h3>
              <p className="text-muted-foreground">Free shipping on all orders over $200</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Quality Guarantee</h3>
              <p className="text-muted-foreground">30-day money back guarantee</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Customer Love</h3>
              <p className="text-muted-foreground">Rated 4.8/5 by thousands of customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the latest additions to our collection. Fresh styles that embody modern elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {newArrivals.map((product) => (
              <Card key={product.id} className="group hover-lift shadow-card">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    New
                  </Badge>
                  {product.isSale && (
                    <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                      Sale
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button asChild>
                      <Link to={`/product/${product.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/products?filter=new">
                View All New Arrivals <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect dress for any occasion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Evening', 'Casual', 'Professional', 'Party'].map((category) => (
              <Link
                key={category}
                to={`/products?category=${category.toLowerCase()}`}
                className="group"
              >
                <Card className="hover-lift shadow-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl">{category === 'Evening' ? '✨' : category === 'Casual' ? '🌸' : category === 'Professional' ? '💼' : '🎉'}</span>
                    </div>
                    <h3 className="text-lg font-semibold">{category}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground">
              Hand-picked favorites that our customers love
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover-lift shadow-card">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.isSale && (
                    <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                      Sale
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/product/${product.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
