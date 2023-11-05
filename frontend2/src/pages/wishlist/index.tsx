import Navbar from '@/components/Navbar'
import Wishlist from '@/components/Wishlist'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { Product } from '@/lib/types'
import tokenAtom from '@/store/token'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export default function WishlistPage() {
  const [token] = useAtom(tokenAtom)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/wishlist/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setWishlist(res.map((item: { productId: string }) => item.productId))
      })
  }, [token])

  function getProductData(id: string): Promise<Product> {
    return fetch(`/api/shop/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    }).then((res) => res.json() as Promise<Product>)
  }

  useEffect(() => {
    Promise.all(
      wishlist.map((id) => {
        return getProductData(id)
      }),
    ).then((res) => setProducts(res))
  }, [wishlist])

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center mt-8">
        {products.map(({ id, name, description, image }) => {
          return (
            <Card className="w-1/2 border-primary rounded-xl my-4 p-4" key={id}>
              <CardTitle className="text-2xl">{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
              <CardContent className="flex justify-between">
                <img src={image} className='w-[50%]'/>
                <div className='relative'>
                <Wishlist
                  selected={true}
                  productId={id}
                  onClick={() =>
                    setProducts(products.filter((product) => product.id !== id))
                  }
                />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
