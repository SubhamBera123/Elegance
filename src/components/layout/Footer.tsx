import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <span className="text-sm font-bold text-primary-foreground">E</span>
              </div>
              <span className="text-xl font-bold">Elegance</span>
            </Link>
            <p className="text-sm text-secondary-foreground/80">
              Discover the perfect dress for every occasion. From elegant evening wear to casual day dresses, we curate the finest collection for the modern woman.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-primary transition-colors">All Dresses</Link></li>
              <li><Link to="/products?filter=new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/products?filter=sale" className="hover:text-primary transition-colors">Sale</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/size-guide" className="hover:text-primary transition-colors">Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@elegance.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>New York, NY 10001</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Subscribe to our newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background text-foreground"
                />
                <Button variant="default" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center text-sm">
          <p>&copy; 2024 Elegance. All rights reserved. Made with love for fashion enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
};