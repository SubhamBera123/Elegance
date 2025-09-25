import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, MapPin, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, itemCount, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const shipping = total > 200 ? 0 : shippingMethod === 'express' ? 25 : 15;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Order placed successfully!",
      description: "You will receive a confirmation email shortly.",
    });

    clearCart();
    navigate('/account?tab=orders');
    setIsProcessing(false);
  };

  if (items.length === 0) {
    return (
      <div className="container px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart before checking out.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your order for {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>
        <Button variant="ghost" asChild>
          <Link to="/cart">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main Street" required />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" required />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                      <SelectItem value="fl">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" placeholder="10001" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <Truck className="h-5 w-5 mr-2" />
                <CardTitle>Shipping Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="standard" id="standard" />
                    <div className="flex-1">
                      <Label htmlFor="standard" className="font-medium">Standard Shipping</Label>
                      <p className="text-sm text-muted-foreground">5-7 business days</p>
                    </div>
                    <span className="font-medium">{total > 200 ? 'Free' : '$15.00'}</span>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="express" id="express" />
                    <div className="flex-1">
                      <Label htmlFor="express" className="font-medium">Express Shipping</Label>
                      <p className="text-sm text-muted-foreground">2-3 business days</p>
                    </div>
                    <span className="font-medium">$25.00</span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <CreditCard className="h-5 w-5 mr-2" />
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'credit-card' && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" required />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox id="billing-same" defaultChecked />
                  <Label htmlFor="billing-same" className="text-sm">
                    Billing address same as shipping address
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-card sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size}, Color: {item.color}
                        </p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
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
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full" 
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>

                <div className="text-center space-y-2 pt-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is safe and secure
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;