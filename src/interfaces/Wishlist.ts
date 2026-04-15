import { IProduct } from "./IProduct";

export interface WishlistResponse<T = any> {
    status: string;
    count: number;
    data: IProduct[];
  }