// type Props = {}

import Logo from '@/assets/eye-svgrepo-com.svg'
import tokenAtom from '@/store/token'
import { useAtom } from 'jotai'
import {
  LucideHeart,
  LucideLogOut,
  LucideShoppingBag,
  LucideUser2,
  ShoppingCart,
} from 'lucide-react'
import { Separator } from './ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import wretch from 'wretch'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export default function Navbar() {
  const [token, setToken] = useAtom(tokenAtom)
  const sheetOpenRef = useRef<HTMLButtonElement>(null)
  const [name, setName] = useState<string>('')
  useEffect(() => {
    wretch('/api/user/get', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .get()
      .forbidden(() => {
        localStorage.removeItem('token')
        setToken('')
      })
      .badRequest(() => {
        localStorage.removeItem('token')
        setToken('')
      })
      .json((res) => {
        setName(res.name)
      })
  }, [])

  return (
    <div className="sticky top-0 backdrop-blur-md z-50">
      <div className="flex justify-between px-10">
        <Link to="/">
          <div className="flex items-center">
            <img src={Logo} alt="Chokher Alo" className="h-16 w-16" />
            <div className="text-red-500 text-primary font-extrabold text-xl">
              EYECARE
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-5">
          <Link to="/">
            <div className="hover:text-primary transition ease-in-out font-semibold">
              HOME
            </div>
          </Link>
          {/* <Link to="/aboutus">
            <div className="hover:text-primary transition ease-in-out font-semibold">
              ABOUT US
            </div>
          </Link>
          <Link to="/doctors">
            <div className="hover:text-primary transition ease-in-out font-semibold">
              OUR DOCTORS
            </div>
          </Link>
          <Link to="/schedule">
            <div className="hover:text-primary transition ease-in-out font-semibold">
              OUR SCHEDULE
            </div>
          </Link> */}
          <Link to="/shop">
            <div className="hover:text-primary transition ease-in-out font-semibold">
              COLLECTION
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          {token ? (
            <div className="flex items-center gap-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/wishlist">
                      <LucideHeart className="h-6 w-6 hover:text-primary transition ease-in-out" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>WISHLIST</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/cart">
                      <LucideShoppingBag className="h-6 w-6 hover:text-primary transition ease-in-out" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>CART</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={() => sheetOpenRef.current?.click()}>
                      <LucideUser2 className="h-6 w-6 hover:text-primary transition ease-in-out" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>PROFILE</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        localStorage.removeItem('token')
                        setToken('')
                        window.location.href = '/login'
                      }}
                    >
                      <LucideLogOut className="h-6 w-6 hover:text-primary transition ease-in-out" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LOGOUT</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link to="/login">LOGIN</Link>
              <Link to="/signup">SIGNUP</Link>
            </div>
          )}
        </div>
      </div>
      <Separator />
      <Sheet>
        <SheetTrigger asChild>
          <button ref={sheetOpenRef} />
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>WELCOME, <span className='uppercase'>{name}</span></SheetTitle>
            <Separator />
            <Link
              to="/cart"
              className="flex gap-12 hover:text-primary transition ease-in-out font-semibold w-full"
            >
              <ShoppingCart />
              CART
            </Link>
            <Separator />
            <Link
              to="/wishlist"
              className="flex gap-12 hover:text-primary transition ease-in-out font-semibold w-full"
            >
              <LucideHeart />
              WISHLIST
            </Link>
            <Separator />
            <Link
              to="/profile"
              className="flex gap-12 hover:text-primary transition ease-in-out font-semibold w-full"
            >
              <LucideUser2 />
              PROFILE
            </Link>
            <Separator />
            <Link
              to="/orders"
              className="flex gap-12 hover:text-primary transition ease-in-out font-semibold w-full"
            >
              <LucideShoppingBag />
              ORDERS
            </Link>
            <Separator />
            <button
              onClick={() => {
                localStorage.removeItem('token')
                setToken('')
                window.location.href = '/login'
              }}
              className="flex gap-12 hover:text-primary transition ease-in-out font-semibold w-full"
            >
              <LucideLogOut />
              LOGOUT
            </button>
            <Separator />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
