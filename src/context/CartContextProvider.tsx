"use client"

import { getUserCart } from '@/app/shop/cartAction'
import { getUserWishList } from '@/app/wishlist/wishListActions'
import { Cart, CartProduct } from '@/interfaces/cart.type'
import { IProduct } from '@/interfaces/IProduct'
import React, { createContext, ReactNode, useEffect, useState } from 'react'


export const cartContext = createContext({})
export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [numberOfCartItem, setnumberOfCartItem] = useState(0)
    const [totalPrice, settotalPrice] = useState(0)
    const [cartId, setcartId] = useState() as any
    const [cartProducts, setCartProducts] = useState<CartProduct [] | null>(null)
    



    const [wishlistData, setWishlistData] = useState<IProduct[]>([]);
        const [numberOfWishList, setnumberOfWishList] = useState(0)

    async function getCart() {
        try {
            const data = await getUserCart()

            if (data?.status !== "success" || !data?.data) {
                setnumberOfCartItem(0)
                setCartProducts([])
                settotalPrice(0)
                setcartId(undefined)
                return
            }

            setnumberOfCartItem(data.numOfCartItems ?? 0)
            setCartProducts(data.data.products ?? [])
            settotalPrice(data.data.totalCartPrice ?? 0)
            setcartId(data.cartId)
        } catch {
            setnumberOfCartItem(0)
            setCartProducts([])
            settotalPrice(0)
            setcartId(undefined)
        }
    }
    async function getWishlist() {
       const wishlistData = await getUserWishList()
       setnumberOfWishList(wishlistData.data.length)
       setWishlistData(wishlistData.data)
    }

    useEffect(() => {
        getCart()
        getWishlist()
    }, [])
    

    return (
        <cartContext.Provider value={{numberOfWishList,setnumberOfWishList, wishlistData , setWishlistData, numberOfCartItem,setCartProducts,setcartId, settotalPrice ,cartId,totalPrice, cartProducts, setnumberOfCartItem, refreshCart: getCart, refreshWishlist: getWishlist }}>
            {children}
        </cartContext.Provider>
    )
}
