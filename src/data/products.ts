import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Elegant Rose Evening Dress',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://picsum.photos/id/1011/800/600',
    images: [
      'https://picsum.photos/id/1011/800/600',
      'https://picsum.photos/id/1012/800/600',
      'https://picsum.photos/id/1013/800/600'
    ],
    description: 'A stunning evening dress perfect for special occasions. Made from luxurious silk with intricate beadwork and a flowing silhouette that flatters every figure.',
    category: 'Evening',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Rose Pink', 'Navy Blue', 'Black', 'Burgundy'],
    inStock: true,
    isNew: true,
    isSale: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Classic Little Black Dress',
    price: 189.99,
    image: 'https://picsum.photos/id/1014/800/600',
    images: [
      'https://picsum.photos/id/1014/800/600',
      'https://picsum.photos/id/1015/800/600',
      'https://picsum.photos/id/1016/800/600'
    ],
    description: 'The timeless little black dress that every woman needs. Versatile, elegant, and perfect for any occasion from cocktail parties to business dinners.',
    category: 'Cocktail',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy Blue'],
    inStock: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    name: 'Floral Summer Midi Dress',
    price: 129.99,
    image: 'https://picsum.photos/id/1018/800/600',
    images: [
      'https://picsum.photos/id/1018/800/600',
      'https://picsum.photos/id/1019/800/600',
      'https://picsum.photos/id/1020/800/600'
    ],
    description: 'A beautiful floral midi dress perfect for summer days. Features a comfortable fit, breathable fabric, and a cheerful print that brightens any day.',
    category: 'Casual',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Floral Print', 'Blue Floral', 'Pink Floral'],
    inStock: true,
    isNew: true,
    rating: 4.6,
    reviews: 156
  },
  {
    id: '4',
    name: 'Bohemian Maxi Dress',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://picsum.photos/id/1021/800/600',
    images: [
      'https://picsum.photos/id/1021/800/600',
      'https://picsum.photos/id/1022/800/600',
      'https://picsum.photos/id/1023/800/600'
    ],
    description: 'Free-spirited bohemian maxi dress with flowing sleeves and intricate embroidery. Perfect for festivals, beach days, or casual elegant occasions.',
    category: 'Casual',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Cream', 'Rust Orange', 'Sage Green'],
    inStock: true,
    isSale: true,
    rating: 4.7,
    reviews: 73
  },
  {
    id: '5',
    name: 'Professional Pencil Dress',
    price: 169.99,
    image: 'https://picsum.photos/id/1024/800/600',
    images: [
      'https://picsum.photos/id/1024/800/600',
      'https://picsum.photos/id/1025/800/600',
      'https://picsum.photos/id/1026/800/600'
    ],
    description: 'Sophisticated pencil dress designed for the modern professional woman. Tailored fit with premium fabric that maintains its shape throughout the day.',
    category: 'Professional',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Black', 'Charcoal Gray', 'Wine Red'],
    inStock: true,
    rating: 4.5,
    reviews: 67
  },
  {
    id: '6',
    name: 'Romantic Lace A-Line Dress',
    price: 249.99,
    image: 'https://picsum.photos/id/1027/800/600',
    images: [
      'https://picsum.photos/id/1027/800/600',
      'https://picsum.photos/id/1028/800/600',
      'https://picsum.photos/id/1029/800/600'
    ],
    description: 'Romantic A-line dress featuring delicate lace details and a flattering silhouette. Perfect for weddings, date nights, or special celebrations.',
    category: 'Evening',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush Pink', 'Ivory', 'Dusty Blue', 'Lavender'],
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviews: 92
  },
  {
    id: '7',
    name: 'Vintage Inspired Swing Dress',
    price: 139.99,
    originalPrice: 179.99,
    image: 'https://picsum.photos/id/1030/800/600',
    images: [
      'https://picsum.photos/id/1030/800/600',
      'https://picsum.photos/id/1031/800/600',
      'https://picsum.photos/id/1032/800/600'
    ],
    description: 'Charming vintage-inspired swing dress with a full skirt and fitted bodice. Brings back the elegance of the 1950s with modern comfort.',
    category: 'Vintage',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cherry Red', 'Royal Blue', 'Emerald Green', 'Black'],
    inStock: true,
    isSale: true,
    rating: 4.6,
    reviews: 108
  },
  {
    id: '8',
    name: 'Sequined Party Dress',
    price: 229.99,
    image: 'https://picsum.photos/id/1033/800/600',
    images: [
      'https://picsum.photos/id/1033/800/600',
      'https://picsum.photos/id/1034/800/600',
      'https://picsum.photos/id/1035/800/600'
    ],
    description: 'Dazzling sequined party dress that catches the light beautifully. Perfect for parties, celebrations, and nights when you want to shine.',
    category: 'Party',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Gold', 'Silver', 'Rose Gold', 'Black'],
    inStock: false,
    rating: 4.7,
    reviews: 45
  }
];

export const categories = [
  'All',
  'Evening',
  'Cocktail',
  'Casual',
  'Professional',
  'Vintage',
  'Party'
];

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const colors = [
  'Black',
  'Navy Blue',
  'Rose Pink',
  'Burgundy',
  'White',
  'Cream',
  'Rust Orange',
  'Sage Green',
  'Charcoal Gray',
  'Wine Red',
  'Blush Pink',
  'Ivory',
  'Dusty Blue',
  'Lavender',
  'Cherry Red',
  'Royal Blue',
  'Emerald Green',
  'Gold',
  'Silver',
  'Rose Gold'
];