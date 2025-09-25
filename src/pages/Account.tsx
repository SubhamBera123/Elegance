import React from 'react';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const Account = () => {
  // Mock user data - in a real app this would come from authentication
  const user = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    joinDate: 'March 2024',
    totalOrders: 12,
    totalSpent: 1299.99
  };

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: 2
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 189.99,
      items: 1
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 429.99,
      items: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  return (
    <div className="container px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">Member since {user.joinDate}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{user.totalOrders}</div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <span className="text-2xl">💝</span>
              <div className="text-2xl font-bold mt-2">${user.totalSpent}</div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">23</div>
              <p className="text-sm text-muted-foreground">Favorite Items</p>
            </CardContent>
          </Card>
        </div>

        {/* Account Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items} {order.items === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <p className="p-2 border rounded-lg bg-muted">Jane</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <p className="p-2 border rounded-lg bg-muted">Doe</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <p className="p-2 border rounded-lg bg-muted">{user.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <p className="p-2 border rounded-lg bg-muted">+1 (555) 123-4567</p>
                  </div>
                </div>
                <Button>Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Favorite Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  You haven't added any items to your favorites yet.
                  <br />
                  Start browsing and click the heart icon on products you love!
                </p>
                <div className="text-center">
                  <Button variant="outline">Browse Products</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Email notifications</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Order updates</span>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Promotional emails</span>
                      <Button variant="outline" size="sm">Disabled</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Privacy</h3>
                  <div className="space-y-3">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Download My Data</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;