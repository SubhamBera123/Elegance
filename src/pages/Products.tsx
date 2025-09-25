import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { products, categories, sizes, colors } from '@/data/products';
import { Product, FilterOptions, SortOption } from '@/types';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') ? [searchParams.get('category')!] : [],
    priceRange: [0, 500],
    sizes: [],
    colors: [],
    inStock: false
  });

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }
      
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Size filter
      if (filters.sizes.length > 0 && !filters.sizes.some(size => product.sizes.includes(size))) {
        return false;
      }
      
      // Color filter
      if (filters.colors.length > 0 && !filters.colors.some(color => product.colors.includes(color))) {
        return false;
      }
      
      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }
      
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // newest
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return filtered;
  }, [filters, sortBy]);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'category' | 'sizes' | 'colors', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categories.filter(cat => cat !== 'All').map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.category.includes(category)}
                onCheckedChange={() => toggleArrayFilter('category', category)}
              />
              <label htmlFor={category} className="text-sm">{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value)}
            max={500}
            step={10}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="font-semibold mb-3">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map(size => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={size}
                checked={filters.sizes.includes(size)}
                onCheckedChange={() => toggleArrayFilter('sizes', size)}
              />
              <label htmlFor={size} className="text-sm">{size}</label>
            </div>
          ))}
        </div>
      </div>

      {/* In Stock Filter */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={filters.inStock}
            onCheckedChange={(checked) => updateFilter('inStock', checked)}
          />
          <label htmlFor="inStock" className="text-sm">In Stock Only</label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Dresses</h1>
          <p className="text-muted-foreground">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Sort */}
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </h2>
              <FilterContent />
            </CardContent>
          </Card>
        </div>

        {/* Products Grid/List */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          )}

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No products found matching your filters.</p>
              <Button onClick={() => setFilters({
                category: [],
                priceRange: [0, 500],
                sizes: [],
                colors: [],
                inStock: false
              })}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <Card className="group hover-lift shadow-card">
    <div className="relative overflow-hidden rounded-t-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-4 left-4 space-y-2">
        {product.isNew && (
          <Badge className="bg-primary text-primary-foreground">New</Badge>
        )}
        {product.isSale && (
          <Badge className="bg-destructive text-destructive-foreground">Sale</Badge>
        )}
        {!product.inStock && (
          <Badge variant="secondary">Out of Stock</Badge>
        )}
      </div>
    </div>
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
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
        <Button asChild disabled={!product.inStock}>
          <Link to={`/product/${product.id}`}>
            {product.inStock ? 'View Details' : 'Out of Stock'}
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const ProductListItem: React.FC<{ product: Product }> = ({ product }) => (
  <Card className="hover-lift shadow-card">
    <CardContent className="p-6">
      <div className="flex gap-6">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="absolute top-2 left-2 space-y-1">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground text-xs">New</Badge>
            )}
            {product.isSale && (
              <Badge className="bg-destructive text-destructive-foreground text-xs">Sale</Badge>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
          <p className="text-sm mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
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
                ({product.reviews} reviews)
              </span>
            </div>
            
            <Button asChild disabled={!product.inStock}>
              <Link to={`/product/${product.id}`}>
                {product.inStock ? 'View Details' : 'Out of Stock'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Products;