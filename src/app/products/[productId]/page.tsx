import ProductDetails from "@/components/Product/productDetails/ProductDetails";
import apiServices from "../../../../services/api"
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params

    const productData = await apiServices.getProductbyId(productId)
    if (!productData?._id) {
        notFound();
    }

    return(
    <>
    
    <ProductDetails product = {productData}/>
    
    </>
    )
} 