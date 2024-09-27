import Navbar from '@/components/Navbar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import tokenAtom from '@/store/token'
import { useAtom, useSetAtom } from 'jotai'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Link, redirect } from 'react-router-dom'
import wretch from 'wretch'

export default function Login() {
  const [err, setErr] = useState<boolean>(false)
  const [_, setToken] = useAtom(tokenAtom)

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = (e.target as HTMLFormElement)[0] as HTMLInputElement
    const email = (e.target as HTMLFormElement)[1] as HTMLInputElement
    const password = (e.target as HTMLFormElement)[2] as HTMLInputElement
    const phone = (e.target as HTMLFormElement)[3] as HTMLInputElement
    const address = (e.target as HTMLFormElement)[4] as HTMLInputElement
    wretch('/api/auth/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        passwd: password.value,
        phone: phone.value,
        address: address.value,
      }),
    })
      .post()
      .forbidden(() => setErr(true))
      .badRequest(() => setErr(true))
      .res(() => {
        wretch('/api/auth/signin', {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.value,
            passwd: password.value,
          }),
        })
          .post()
          .json((res) => {
            localStorage.setItem('token', res.token)
            setToken(res.token)
            window.location.href = '/'
          })
      })
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-20">
        <Card className="p-8 rounded-xl w-[50%] border-primary">
          <CardTitle className="flex justify-center text-primary">
            SIGNUP
          </CardTitle>
          <CardDescription className="flex justify-center">
            Sign up for the Portal
          </CardDescription>
          <CardContent className="mt-8">
            <form onSubmit={login}>
              {err && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Email already in use</AlertDescription>
                </Alert>
              )}
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                type="text"
                className="mt-2 mb-4 border-primary rounded-xl"
                required={true}
              />
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                className="mt-2 mb-4 border-primary rounded-xl"
                required={true}
              />
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                className="mt-2 mb-4 border-primary rounded-xl"
                required={true}
              />
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Phone"
                type="text"
                className="mt-2 mb-4 border-primary rounded-xl"
                required={true}
                pattern="[0-9]{10}"
              />
              <Label htmlFor="address">Adress</Label>
              <Input
                id="address"
                placeholder="Adress"
                type="text"
                className="mt-2 mb-4 border-primary rounded-xl"
                required={true}
              />
              <div className="flex justify-between items-center mt-8">
                <div>
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary underline">
                    Sign In
                  </Link>
                </div>
                <Button type="submit" className="">
                  SIGN UP
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
