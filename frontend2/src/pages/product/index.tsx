import Navbar from '@/components/Navbar'
import Wishlist from '@/components/Wishlist'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ToastAction } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'
import { Lens, Product } from '@/lib/types'
import tokenAtom from '@/store/token'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import wretch from 'wretch'

export default function ProductPage() {
  const { id } = useParams()
  const [isValid, setIsValid] = useState<boolean>(true)
  const [wishlist, setWishlist] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`/api/shop/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => {
        if (res.status != 200) setIsValid(false)
        return res.json()
      })
      .then(setProduct)
    
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
  }, [id])

  const [product, setProduct] = useState<Product>()
  const [lenses, setLenses] = useState<Lens[]>()
  // const [quantity, setQuantity] = useState<number>(1)
  const [lensId, setLensId] = useState<string>('')
  const [token] = useAtom(tokenAtom)
  const { toast } = useToast()

  const addToCart = async (id: string, lensId?: string) => {
    wretch(`/api/cart/add`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        productId: id,
        quantity: 1,
        lensId: lensId,
      }),
    })
      .post()
      .forbidden(() => {
        navigate('/login')
      })
      .res(() => {
        toast({
          title: 'Added to Cart',
          description: 'Product added to cart successfully',
          action: (
            <ToastAction
              altText="View Cart"
              onClick={() => navigate('/cart')}
              className="hover:bg-primary"
            >
              View Cart
            </ToastAction>
          ),
        })
      })
  }

  const sheetOpenRef = useRef<HTMLButtonElement>(null)
  const sheetCloseRef = useRef<HTMLButtonElement>(null)

  const drawSheet = async () => {
    fetch(`/api/shop/lenses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(setLenses)
      .then(() => {
        sheetOpenRef.current?.click()
      })
  }
  return isValid ? (
    <>
      <Toaster />
      <Navbar />
      <br />
      <br />
      <div className="grid grid-cols-[5fr_0.8fr_3.9fr] px-10 gap-x-10">
        <div className='relative'>
          <Wishlist productId={product?.id as string} selected={wishlist.includes(product?.id as string)} onClick={() => {
            console.log(wishlist, product)
            if (!product?.id) return;
            if (wishlist.includes(product?.id)) {
              setWishlist(
                wishlist.filter((item) => item != product?.id),
              )
            } else {
              setWishlist([...wishlist, product?.id])
            }
          }} />
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full aspect-square rounded-3xl"
        />
        </div>
        <div className="flex justify-center">
          <Separator orientation="vertical" />
        </div>
        <div className="flex flex-col">
          <div className="text-2xl">{product?.description}</div>
          <br />
          <br />
          <div className="text-2xl text-primary">
            ₹ {product?.price.toFixed(2)}
          </div>
          <br />
          {/* Add Review */}
          <Button
            onClick={() => {
              if (product?.productType !== 'GLASSES')
                addToCart(product?.id as string)
              else drawSheet()
            }}
          >
            ADD TO CART
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="hidden" ref={sheetOpenRef} />
            </SheetTrigger>
            <SheetContent className="w-[1000px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>CHOOSE YOUR LENS</SheetTitle>
                <SheetDescription>
                  <div className="flex justify-between w-full">
                    <span>NET PRICE:</span>
                    <span className="text-primary">
                      ₹ {product?.price} + Lens Price
                    </span>
                  </div>
                </SheetDescription>
              </SheetHeader>
              {lenses?.map((lens) => (
                <Card className="my-4">
                  <CardHeader>
                    <CardTitle>{lens.name}</CardTitle>
                    <CardDescription>{lens.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary">₹ {lens.price}</p>
                  </CardContent>
                  <CardFooter>
                    <p>
                      <Button onClick={() => {
                        setLensId(lens.id)
                        addToCart(product?.id as string, lens.id)
                        sheetCloseRef.current?.click()
                      }}>ADD TO CART</Button>
                    </p>
                  </CardFooter>
                </Card>
              ))}
              <SheetClose asChild>
                <Button className='hidden' ref={sheetCloseRef}/>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/shop" replace />
  )
}
