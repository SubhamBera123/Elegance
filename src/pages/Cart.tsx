import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const shipping = total > 200 ? 0 : 15;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <Button variant="ghost" asChild>
          <Link to="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.productId}-${item.size}-${item.color}`} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.product.category}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.productId, item.size, item.color)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Size:</span> {item.size}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Color:</span> {item.color}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">${item.product.price} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Clear Cart */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={clearCart} className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="shadow-card sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add ${(200 - total).toFixed(2)} more for free shipping!
                </p>
              )}
              
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              
              <Button asChild size="lg" className="w-full">
                <Link to="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
              
              {/* Security Badges */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>🔒</span>
                  <span>Secure SSL encrypted checkout</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>📦</span>
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>⚡</span>
                  <span>Fast 2-day shipping available</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;