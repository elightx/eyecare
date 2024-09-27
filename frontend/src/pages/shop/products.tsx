import Navbar from '@/components/Navbar'
import Wishlist from '@/components/Wishlist'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Product } from '@/lib/types'
import tokenAtom from '@/store/token'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Products() {
  let { category } = useParams()
  category = category?.toUpperCase()

  if (
    category != 'SUNGLASSES' &&
    category != 'GLASSES' &&
    category != 'CONTACTS'
  )
    throw new Error('Invalid category')

  const [token] = useAtom(tokenAtom)

  const [brandFilterOptions, setBrandFilterOptions] = useState<string[]>([])
  const [colorFilterOptions, setColorFilterOptions] = useState<string[]>([])

  const [brandFilters, setBrandFilters] = useState<string[]>([])
  const [colorFilters, setColorFilters] = useState<string[]>([])

  const [products, setProducts] = useState<Product[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [limit, setLimit] = useState<number>(9)

  useEffect(() => {
    fetch(`/api/shop/options`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
      }),
    })
      .then((res) => res.json())
      .then(({ brand, color }) => {
        setBrandFilterOptions(brand)
        setColorFilterOptions(color)
      })
  }, [])

  useEffect(() => {
    fetch(`/api/wishlist/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) =>
        res
          .json()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((res) => res.map((item: any) => item.productId)),
      )
      .then(setWishlist)
  }, [token, products])

  useEffect(() => {
    fetch(`/api/shop/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        brand: brandFilters,
        color: colorFilters,
        limit: limit,
      }),
    })
      .then((res) => res.json())
      .then(setProducts)
  }, [brandFilters, category, colorFilters, limit])

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="grid grid-cols-[3fr_0.1fr_6.9fr]">
        <div className="flex flex-col px-10">
          <div className="text-2xl">FILTER</div>
          <Separator />
          <br />
          <br />
          <div className="text-xl">BRANDS</div>
          <br />
          {brandFilterOptions.map((brand) => (
            <div key={brand} className="flex flex-row items-center gap-4">
              <Checkbox
                onCheckedChange={(checked) => {
                  if (checked) {
                    setBrandFilters([...brandFilters, brand])
                  } else {
                    setBrandFilters(brandFilters.filter((b) => b != brand))
                  }
                }}
                id={brand}
              />
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
          <br />
          <br />
          <div className="text-xl">COLORS</div>
          <br />
          {colorFilterOptions.map((color) => (
            <div key={color} className="flex flex-row items-center gap-4">
              <Checkbox
                onCheckedChange={(checked) => {
                  if (checked) {
                    setColorFilters([...colorFilters, color])
                  } else {
                    setColorFilters(colorFilters.filter((c) => c != color))
                  }
                }}
                id={color}
              />
              <label htmlFor={color}>{color}</label>
            </div>
          ))}
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col px-10">
          <div className="text-2xl mx-auto">PRODUCTS</div>
          <Separator />
          <br />
          <br />
          <div className="grid grid-cols-3 gap-x-12 gap-y-12">
            {products.map((product) => (
              <div className="relative hover:scale-105 transition ease-in-out">
                <Wishlist
                  selected={wishlist.includes(product.id)}
                  productId={product.id}
                  onClick={() => {
                    if (!product.id) return
                    if (wishlist.includes(product.id)) {
                      setWishlist(
                        wishlist.filter((item) => item != product.id),
                      )
                    } else {
                      setWishlist([...wishlist, product.id])
                    }
                  }}
                />
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="flex flex-col"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="bg-white w-full aspect-square rounded-2xl object-contain "
                  />
                  <div className="text-center text-xl">{product.name}</div>
                  <div className="text-xl text-right pr-2 pt-2 text-primary">
                    ₹ {product.price}
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <br />
          <br />
          <Button
            variant={'outline'}
            onClick={() => setLimit((lim) => (lim += 9))}
            className={limit > products.length ? 'hidden' : ''}
          >
            SHOW MORE
          </Button>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  )
}
