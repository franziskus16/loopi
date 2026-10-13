/** Fields the product list asks the API for. */
export interface ProductSummary {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
}

export interface Product extends ProductSummary {
  description: string;
  stock: number;
  brand?: string;
  sku: string;
  availabilityStatus: string;
  shippingInformation: string;
  returnPolicy: string;
  reviews: Review[];
  images: string[];
}
