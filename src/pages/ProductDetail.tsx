import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild>
          <Link to="/products">Browse All Products</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to choose a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        description: "You need to choose a color before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/products">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div>
          <div className="relative mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
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
          
          {/* Image Thumbnails */}
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.isSale && (
              <Badge className="bg-destructive text-destructive-foreground">
                Save ${product.originalPrice! - product.price}
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Size</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map(size => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Color</label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map(color => (
                  <SelectItem key={color} value={color}>{color}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mb-8">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Features */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm">Free shipping on orders over $200</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-sm">30-day return policy</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Category:</span> {product.category}
                  </div>
                  <div>
                    <span className="font-medium">Available Sizes:</span> {product.sizes.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Available Colors:</span> {product.colors.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Material:</span> Premium Cotton Blend
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="care" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Care Instructions</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Machine wash cold with like colors</li>
                  <li>• Do not bleach</li>
                  <li>• Tumble dry low heat</li>
                  <li>• Iron on low heat if needed</li>
                  <li>• Dry clean for best results</li>
                  <li>• Store on hangers to maintain shape</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating} out of 5</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <p className="text-muted-foreground">
                  Reviews and ratings would be displayed here in a real application.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover-lift shadow-card">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {relatedProduct.isSale && (
                    <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                      Sale
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold">${relatedProduct.price}</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          ${relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/product/${relatedProduct.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;