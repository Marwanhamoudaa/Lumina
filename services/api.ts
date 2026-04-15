import { ICategory } from "../src/interfaces/Icategory";
import { IProduct } from "../src/interfaces/IProduct";
import { ResponseType } from "../Types/IProductResponse";

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ecommerce.routemisr.com/api";

class ApiServices {
    async getAllProducts():Promise<IProduct[]>{
        const res = await fetch(`${API_BASE_URL}/v1/products` , {
            cache : "force-cache" , 
            next : {
                revalidate : 60*5
            }
        })
        const data: ResponseType<IProduct> = await res.json()
        return data.data  
    }
    async getProductbyId(productID:string){
        const res = await fetch(`${API_BASE_URL}/v1/products/${productID}` , {
            cache : "force-cache", 
            next : {
                revalidate : 60*5
            }
        })
        const data = await res.json()
        return data.data  
    }
    async getAllCategories(): Promise<ICategory[]>{
        const res = await fetch(`${API_BASE_URL}/v1/categories` , {
            cache : "force-cache"
        })
        const data = await res.json()
        return data.data
    }



}




const apiServices = new ApiServices()
export default apiServices ; 