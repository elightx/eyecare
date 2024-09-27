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
import tokenAtom from '@/store/token'
import { useAtom, useSetAtom } from 'jotai'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import wretch from 'wretch'

export default function Login() {
  const [err, setErr] = useState<boolean>(false)
  const [_, setToken] = useAtom(tokenAtom)

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = (e.target as HTMLFormElement)[0] as HTMLInputElement
    const password = (e.target as HTMLFormElement)[1] as HTMLInputElement
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
      .forbidden(() => setErr(true))
      .json((res) => {
        localStorage.setItem('token', res.token)
        setToken(res.token)
        window.location.href = '/'
      })
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-20">
        <Card className="p-8 rounded-xl w-[50%] border-primary">
          <CardTitle className="flex justify-center text-primary">
            LOGIN
          </CardTitle>
          <CardDescription className="flex justify-center">
            Login to the Portal
          </CardDescription>
          <CardContent className="mt-8">
            <form onSubmit={login}>
              {err && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Your Email or Password is incorrect. Try again, or{' '}
                    <Link to="/signup" className="underline">
                      sign up
                    </Link>{' '}
                    if you dont have an account.
                  </AlertDescription>
                </Alert>
              )}
              <Input
                placeholder="Email"
                type="email"
                className="my-4 border-primary rounded-xl"
              />
              <Input
                placeholder="Password"
                type="password"
                className="border-primary rounded-xl"
              />
              <div className="flex justify-between items-center mt-8">
                <Link to="/signup" className="text-primary underline">
                  Create an account
                </Link>
                <Button type="submit" className="">
                  LOGIN
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
