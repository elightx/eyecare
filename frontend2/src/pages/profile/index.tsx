import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import tokenAtom from '@/store/token'
import { useAtom } from 'jotai'
import { PenSquare } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Profile() {
  const [name, setName] = useState('')
  const [nameEnabler, setNameEnabler] = useState(false)
  const [phone, setPhone] = useState('')
  const [phoneEnabler, setPhoneEnabler] = useState(false)
  const [address, setAddress] = useState('')
  const [addressEnabler, setAddressEnabler] = useState(false)

  const [token, setToken] = useAtom(tokenAtom)

  useEffect(() => {
    fetch('/api/user/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setName(res.name)
        setPhone(res.phone)
        setAddress(res.address)
      })
  }, [])

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full items-center">
        <Card className="flex p-8 w-1/2 flex-col gap-10 items-center mt-10 rounded-xl border-primary">
          <div className="text-3xl text-primary font-bold flex w-full justify-center">
            PROFILE
          </div>
          <Separator />
          <form className="grid grid-cols-[2fr_6fr_1fr] items-center justify-center w-full">
            <Label htmlFor="name" className="text-xl">
              NAME:{' '}
            </Label>
            <Input
              id="name"
              className="border-primary rounded-xl"
              disabled={!nameEnabler}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              type="submit"
              className={`flex items-center justify-end h-full ml-5 rounded border ${
                nameEnabler ? '' : 'bg-inherit'
              }`}
              onClick={(e) => {
                e.preventDefault()
                setNameEnabler(!nameEnabler)
                fetch('/api/user/setName', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: name,
                }).then(() => setToken(token))
              }}
            >
              <PenSquare className="" />
            </Button>
          </form>
          <form className="grid grid-cols-[2fr_6fr_1fr] items-center justify-center w-full">
            <Label htmlFor="phone" className="text-xl">
              PHONE:{' '}
            </Label>
            <Input
              id="phone"
              className="border-primary rounded-xl"
              disabled={!phoneEnabler}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              type="submit"
              className={`flex items-center justify-end h-full ml-5 rounded border ${
                phoneEnabler ? '' : 'bg-inherit'
              }`}
              onClick={(e) => {
                e.preventDefault()
                setPhoneEnabler(!phoneEnabler)
                fetch('/api/user/setPhone', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: phone,
                })
              }}
            >
              <PenSquare className="" />
            </Button>
          </form>
          <form className="grid grid-cols-[2fr_6fr_1fr] items-center justify-center w-full">
            <Label htmlFor="address" className="text-xl">
              ADDRESS:{' '}
            </Label>
            <Input
              id="address"
              className="border-primary rounded-xl"
              disabled={!addressEnabler}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              type="submit"
              className={`flex items-center justify-end h-full ml-5 rounded border ${
                addressEnabler ? '' : 'bg-inherit'
              }`}
              onClick={(e) => {
                e.preventDefault()
                setAddressEnabler(!addressEnabler)
                fetch('/api/user/setAddress', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: address,
                })
              }}
            >
              <PenSquare className="" />
            </Button>
          </form>
        </Card>
      </div>
    </>
  )
}
