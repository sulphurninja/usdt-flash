"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    inviteCode: "",
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error("You must agree to the terms of service");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        router.push('/login');
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] p-4">
      <Card className="w-full max-w-md border-white/10 bg-zinc-900/50">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">F</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-white">Create an account</CardTitle>
          <CardDescription className="text-center text-zinc-400">
            Enter your information to get started with FlashUSDT
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">First name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className="bg-zinc-800 border-zinc-700"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className="bg-zinc-800 border-zinc-700"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                className="bg-zinc-800 border-zinc-700"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                className="bg-zinc-800 border-zinc-700"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
            <div className="space-y-2">
  <Label htmlFor="inviteCode" className="text-white">Invite Code (Optional)</Label>
  <Input
    id="inviteCode"
    placeholder="Enter invite code"
    className="bg-zinc-800 border-zinc-700"
    value={formData.inviteCode || ""}
    onChange={(e) => setFormData(prev => ({ ...prev, inviteCode: e.target.value }))}
  />
  <p className="text-xs text-zinc-500">
    Use an invite code to get bonus bandwidth
  </p>
</div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="terms"
                className="text-sm text-zinc-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="#" className="text-green-500 hover:underline">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-green-500 hover:underline">
                  privacy policy
                </Link>
              </label>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-500 text-black hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

          </CardContent>
        </form>
        <CardFooter>
          <div className="text-center w-full text-sm text-zinc-500">
            Already have an account?{" "}
            <Link href="/login" className="text-green-500 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
