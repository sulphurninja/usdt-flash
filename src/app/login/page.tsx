import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] p-4">
      <Card className="w-full max-w-md border-white/10 bg-zinc-900/50">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">F</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-white">Sign in to FlashUSDT</CardTitle>
          <CardDescription className="text-center text-zinc-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input id="email" placeholder="name@example.com" type="email" className="bg-zinc-800 border-zinc-700" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Link href="/forgot-password" className="text-sm text-green-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" className="bg-zinc-800 border-zinc-700" />
          </div>
          <Link href='/dashboard'>
            <Button className="w-full bg-green-500 text-black hover:bg-green-600">
              Sign In
            </Button>
          </Link>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full border-zinc-700 text-black hover:bg-zinc-800">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 12H12M17.5 12H12M12 12V6.5M12 12V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Connect Wallet
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-green-500 hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-center text-xs text-zinc-600">
            This is a demo app. Flash USDT is not real cryptocurrency.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
