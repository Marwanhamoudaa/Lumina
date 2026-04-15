// Root Response
export interface CartResponse {
    status: string;
    message: string;
    numOfCartItems: number;
    cartId: string;
    data: Cart;
  }
  
  // Cart
  export interface Cart {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
  }
  
  // Cart Product
  export interface CartProduct {
    count: number;
    _id: string;
    product: Product;
    price: number;
  }
  
  // Product
  export interface Product {
    subcategory: SubCategory[];
    _id: string;
    title: string;
    slug: string;
    quantity: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    id: string;
  }
  
  // SubCategory
  export interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }
  
  // Category
  export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  // Brand
  export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }