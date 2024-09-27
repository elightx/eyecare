import Navbar from '@/components/Navbar'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import tokenAtom from '@/store/token'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export default function Orders() {
  const [orders, setOrders] = useState<
    { id: string; address: string; createdAt: string; amount: number }[]
  >([])
  const [token] = useAtom(tokenAtom)
  useEffect(() => {
    fetch('/api/order/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setOrders)
  }, [token])
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mx-8">
        <div className="text-primary text-3xl font-bold">ORDERS</div>
        <Separator />
        <>
          {orders.map((order) => (
            <Card className="my-8 w-1/2 rounded border-primary py-6">
              <CardContent className="">
                <div>
                  AMOUNT: <span className="text-primary mx-8">{(order.amount/ 100).toFixed(2)}</span>
                </div>
                <div>
                  TIME: <span className="text-primary mx-8">{new Date(order.createdAt).toString()}</span>
                </div>
                <div>
                  ADDRESS: <span className="text-primary mx-8">{order.address}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      </div>
    </>
  )
}
