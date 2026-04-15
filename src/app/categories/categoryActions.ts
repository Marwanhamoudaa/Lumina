"use server"

import { CategoryResponse } from "@/interfaces/Icategory"

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ecommerce.routemisr.com/api";



export async function getSpecificCategory (CategoryId : string) {
    const res = await fetch(`${API_BASE_URL}/v1/categories/${CategoryId}` , {
        cache : "force-cache" , 
    })
    const finalRes : CategoryResponse = await res.json ()
    return finalRes
    
}


export async function getCategoryProducts(categoryId: string) {
    const res = await fetch(
        `${API_BASE_URL}/v1/products?category=${categoryId}`,
        {
            cache: "force-cache",
            next: {
                revalidate: 60 * 5
            }
        }
    );

    const data = await res.json();
    return data.data;
}