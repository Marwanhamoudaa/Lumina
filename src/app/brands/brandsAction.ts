"use server"

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ecommerce.routemisr.com/api";


export async function getAllBrands() {
    const res = await fetch(`${API_BASE_URL}/v1/brands`, {
        cache: "force-cache"
    })
    const finalRes = await res.json()
    return finalRes

}



export async function getSpecificBrand(BrandId: string) {

    const res = await fetch(`${API_BASE_URL}/v1/brands/${BrandId}`, {
        cache: "force-cache"
    })
    const finalRes = await res.json()

    return finalRes
}


export async function getBrandProducts(brandId: string) {
    const res = await fetch(
        `${API_BASE_URL}/v1/products?brand=${brandId}`,
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