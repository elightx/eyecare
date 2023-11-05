import Navbar from '@/components/Navbar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Lens, Product } from '@/lib/types'
import tokenAtom from '@/store/token'
import { AlertDialogAction } from '@radix-ui/react-alert-dialog'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useAtom } from 'jotai'
import {
  AlertCircle,
  Car,
  Minus,
  PenSquare,
  Plus,
  ShoppingCart,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import wretch from 'wretch'

export default function Cart() {
  const [cartItems, setCartItems] = useState<
    { id: string; product: Product; lens: Lens | null; quantity: number }[]
  >([])
  const [couponCode, setCouponCode] = useState<string>('')
  const [discount, setDiscount] = useState<{
    id: string
    percentage: number
    maxLimit: number
    code: string
  } | null>(null)
  const [total, setTotal] = useState<number>(0)
  const [token, setToken] = useAtom(tokenAtom)

  useEffect(() => {
    setTotal(
      cartItems
        .map(
          (cartItem) =>
            cartItem.quantity *
            (cartItem.product.price + (cartItem.lens?.price ?? 0)),
        )
        .reduce((a, b) => a + b, 0),
    )
  }, [cartItems])

  const [couponErr, setCouponErr] = useState<boolean>(false)

  const dialogOpenRef = useRef<HTMLButtonElement>(null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    // script.async = true
    document.body.appendChild(script)

    wretch('/api/cart/get', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .get()
      .forbidden(() => {})
      .json((res) => {
        setCartItems(res)
      })
  }, [])

  const increaseQuantity = (id: string) => {
    const quantity = cartItems.find((item) => item.id === id)!.quantity + 1
    wretch('/api/cart/quantity', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .post({ id, quantity })
      .forbidden(() => {})
      .badRequest(() => {})
      .res(() => {
        setCartItems(
          cartItems.map((item) => {
            if (item.id === id) {
              return { ...item, quantity }
            }
            return item
          }),
        )
      })
  }

  const checkout = async () => {
    const orderId = await wretch('/api/order/getId', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        discountId: discount?.id ?? null,
      }),
    })
      .post()
      .text()

    const options = {
      key: 'rzp_test_GCDkbLK31WzYXN',
      amount: Number.parseInt(
        (
          (total -
            (discount
              ? Math.min((discount.percentage * total) / 100, discount.maxLimit)
              : 0)) *
          100
        ).toFixed(0),
      ),
      currency: 'INR',
      name: 'EyeWear',
      image: 'http://localhost:5173/src/assets/eye-svgrepo-com.svg',
      order_id: orderId,
      handler: function (response: {
        razorpay_payment_id: string
        razorpay_order_id: string
        razorpay_signature: string
      }) {
        wretch('/api/order/verify', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        })
          .post()
          .text((res) => {
            if (res === 'SUCCESS') {
              alert('Payment Successful')
              window.location.href = '/'
            } else {
              console.log(res)
              alert('Something went wrong')
            }
          })
      },
      theme: {
        color: '#DC2626',
        backdrop_colour: '0A0A0A',
      },
    }
    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', function () {
      // alert(response.error.code)
      // alert(response.error.description)
      // alert(response.error.source)
      // alert(response.error.step)
      // alert(response.error.reason)
      // alert(response.error.metadata.order_id)
      // alert(response.error.metadata.payment_id)
      alert('Payment Failed')
    })

    rzp.open()
  }

  const decreaseQuantity = (id: string) => {
    const quantity = cartItems.find((item) => item.id === id)!.quantity - 1
    wretch('/api/cart/quantity', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .post({ id, quantity })
      .forbidden(() => {})
      .badRequest(() => {})
      .res(() => {
        setCartItems(
          cartItems
            .map((item) => {
              if (item.id === id) {
                return { ...item, quantity }
              }
              return item
            })
            .filter((item) => item.quantity > 0),
        )
      })
  }

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center mt-4">
        <span className="text-primary text-4xl mb-8">YOUR CART</span>
      </div>
      {cartItems.length ? (
        <>
          <div className="grid grid-cols-[1fr_1fr]">
            <div className="w-full h-[80vh] overflow-y-scroll scrollbar">
              <div className="text-2xl text-primary mx-8 sticky top-0 bg-background border-b">
                ITEMS IN CART:{' '}
              </div>
              {cartItems.map((cartItem) => (
                <>
                  {
                    <Card className="my-10 mx-8 rounded-xl p-4 border-primary">
                      <CardTitle className="mb-2">
                        {cartItem.product.name}
                      </CardTitle>
                      <CardDescription>
                        {cartItem.product.description}
                      </CardDescription>
                      <CardContent className="flex items-center justify-between">
                        <img
                          src={cartItem.product.image}
                          alt={cartItem.product.name}
                          className="w-1/4 h-1/4 rounded-xl mt-4"
                        />
                        {!cartItem.lens && (
                          <div className="flex flex-col justify-end gap-8">
                            <div className="flex items-center gap-4">
                              <span className="text-primary">Quantity:</span>
                              <div className="flex items-center">
                                <button
                                  className="border-secondary border rounded-l-xl px-2 py-1 hover:text-primary"
                                  onClick={() => decreaseQuantity(cartItem.id)}
                                >
                                  <Minus />
                                </button>
                                <div className="border-secondary border px-2 py-1">
                                  {cartItem.quantity}
                                </div>
                                <button
                                  className="border-secondary border rounded-r-xl px-2 py-1 hover:text-primary"
                                  onClick={() => increaseQuantity(cartItem.id)}
                                >
                                  <Plus />
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-primary">Price:</span>
                              <span className="">
                                ₹ {cartItem.product.price * cartItem.quantity}
                              </span>
                            </div>
                          </div>
                        )}
                        {cartItem.lens && (
                          <>
                            <Plus className="mx-8 w-1/12 h-1/6 text-primary" />
                            <Card className="p-4 rounded-xl">
                              <CardTitle className="my-4">
                                <span className="text-primary mb-4">
                                  Lens:{' '}
                                </span>
                                <span>{cartItem.lens.name}</span>
                              </CardTitle>
                              <CardDescription>
                                {cartItem.lens.description}
                              </CardDescription>
                            </Card>
                          </>
                        )}
                      </CardContent>
                      {cartItem.lens && (
                        <CardFooter>
                          <div className="flex justify-between gap-8 w-full">
                            <div className="flex items-center gap-4">
                              <span className="text-primary">Quantity:</span>
                              <div className="flex items-center">
                                <button
                                  className="border-secondary border rounded-l-xl px-2 py-1 hover:text-primary"
                                  onClick={() => decreaseQuantity(cartItem.id)}
                                >
                                  <Minus />
                                </button>
                                <div className="border-secondary border px-2 py-1">
                                  {cartItem.quantity}
                                </div>
                                <button
                                  className="border-secondary border rounded-r-xl px-2 py-1 hover:text-primary"
                                  onClick={() => increaseQuantity(cartItem.id)}
                                >
                                  <Plus />
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-primary">Price:</span>
                              <span className="">
                                ₹ {cartItem.product.price * cartItem.quantity} +
                                ₹ {cartItem.lens.price * cartItem.quantity}
                              </span>
                            </div>
                          </div>
                        </CardFooter>
                      )}
                    </Card>
                  }
                </>
              ))}
            </div>
            <div className="w-full scrollbar px-8">
              <div className="text-2xl text-primary sticky top-0 bg-background border-b mb-8">
                BILL:
              </div>

              {cartItems.map((cartItem) => (
                <>
                  <div className="my-8 grid grid-cols-[6fr_0.6fr_1fr] w-full justify-between items-baseline content-baseline gap-8 text-lg">
                    <div
                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                      title={
                        cartItem.product.name +
                        (cartItem.lens && `(with ${cartItem.lens.name})`)
                      }
                    >
                      {cartItem.product.name}{' '}
                      {cartItem.lens && `(with ${cartItem.lens.name})`}
                    </div>
                    <div className="text-primary flex items-baseline justify-end">
                      <X className="w-4 h-4" /> {cartItem.quantity}
                    </div>
                    <div className="text-primary flex justify-end">
                      <div className="">
                        {' '}
                        ₹{' '}
                        {(
                          cartItem.product.price * cartItem.quantity +
                          (cartItem.lens?.price ?? 0) * cartItem.quantity
                        ).toFixed(2)}{' '}
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <Separator />
              <div className="my-4 grid grid-cols-[6fr_0.6fr_2fr] w-full justify-between items-baseline content-baseline gap-8 text-lg">
                <div className="text-primary flex gap-4 items-center">
                  Discount{' '}
                  {discount
                    ? ` (Coupon: ${discount.code})`
                    : ' (No Coupon Applied)'}{' '}
                  <Button
                    className="rounded border bg-inherit"
                    onClick={() => {
                      dialogOpenRef.current?.click()
                    }}
                  >
                    <PenSquare />
                  </Button>
                </div>
                <div />
                <div className="text-primary flex justify-end items-end w-full">
                  <div className="whitespace-pre">
                    -{'    '}₹{' '}
                    {(discount
                      ? Math.min(
                          (discount.percentage * total) / 100,
                          discount.maxLimit,
                        )
                      : 0
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
              <Separator />
              <div className="my-4 grid grid-cols-[6fr_0.6fr_2fr] w-full justify-between items-baseline content-baseline gap-8 text-lg">
                <div className="text-primary">Subtotal</div>
                <div />
                <div className="text-primary flex justify-end">
                  <div className="">
                    ₹{' '}
                    {(
                      total -
                      (discount
                        ? Math.min(
                            (discount.percentage * total) / 100,
                            discount.maxLimit,
                          )
                        : 0)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex flex-end">
                <Button className="w-full tracking-widest" onClick={checkout}>
                  <ShoppingCart className="mx-8" /> PROCEED TO CHECKOUT
                </Button>
              </div>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button ref={dialogOpenRef} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="my-8 w-full flex justify-center">
                  ENTER COUPON CODE
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {couponErr && (
                    <Alert className="mb-8 rounded" variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>Invalid Coupon Code</AlertDescription>
                    </Alert>
                  )}
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel ref={dialogCloseRef}>
                  CLOSE
                </AlertDialogCancel>
                <Button
                  onClick={() => {
                    fetch('/api/order/getCoupon', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                      body: couponCode,
                    })
                      .then((res) => res.json())
                      .then(setDiscount)
                      .then(() => setCouponErr(false))
                      .then(() => dialogCloseRef.current?.click())
                      .catch(() => setCouponErr(true))
                  }}
                >
                  APPLY
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <div className="w-full h-[60vh] overflow-hidden flex flex-col items-center justify-center gap-10">
          <div className="text-5xl text-secondary">IT IS SO EMPTY HERE</div>
          <div className="text-5xl">CONSIDER FILLING UP?</div>
          <Link to="/shop">
            <Button>SHOP NOW</Button>
          </Link>
        </div>
      )}
    </>
  )
}
