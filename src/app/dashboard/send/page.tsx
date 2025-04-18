"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "react-hot-toast";

export default function SendFlashUSDT() {
  const router = useRouter();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // If not authenticated, redirect to login
          router.push('/login');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const sendFUSDT = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) {
      toast.error("Please enter recipient address and amount");
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amountNum > user.bandwidth) {
      toast.error(`Insufficient bandwidth. You need ${amountNum} but have ${user.bandwidth}`);
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/send-fusdt", {
        method: "POST",
        body: JSON.stringify({ to: recipient, amount }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Flash USDT sent successfully!");
        // Update local user data with remaining bandwidth
        setUser({
          ...user,
          bandwidth: data.remainingBandwidth
        });

        // Clear form
        setRecipient("");
        setAmount("");
      } else {
        toast.error("Failed to send Flash USDT: " + data.error);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Error sending Flash USDT: " + err.message);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white">
      {/* Navigation bar */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">F</span>
            </div>
            <span className="font-bold text-xl">FlashUSDT</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-zinc-800/50 text-green-500 border-green-500/50">
              {user?.bandwidth || 0} Bandwidth
            </Badge>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6 max-w-3xl">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Send Flash USDT</h1>
        </div>

        {/* Bandwidth indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-400">Your Bandwidth</span>
            <span className="text-sm font-medium">{user?.bandwidth || 0} units</span>
          </div>
          <Progress
            value={(user?.bandwidth / 1000) * 100}
            className="h-2 bg-zinc-800"
          />
        </div>

        {/* Low bandwidth warning */}
        {user?.bandwidth < 50 && (
          <Alert className="mb-6 bg-amber-950/50 border-amber-800 text-amber-300">
            <AlertDescription>
              Your bandwidth is running low.
              <Button variant="link" className="p-0 h-auto text-amber-400 pl-2" onClick={() => router.push('/dashboard/buy')}>
                Buy more bandwidth
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Card className="bg-zinc-900/50 border-white/10 mb-6">
          <form onSubmit={sendFUSDT}>
            <CardHeader>
              <CardTitle>Send Flash USDT</CardTitle>
              <CardDescription className="text-zinc-400">
                Each 1 FUSDT sent requires 1 bandwidth
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (FUSDT)</Label>
                <Input
                  id="amount"
                  placeholder="100"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
                <p className="text-xs text-zinc-500">
                  This will use {parseFloat(amount) || 0} bandwidth units
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-green-500 text-black hover:bg-green-600"
                disabled={sending || !user || (user?.bandwidth < parseFloat(amount))}
              >
                {sending ? "Sending..." : "Send Flash USDT"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="bg-zinc-900/30 border border-white/5 rounded-lg p-4">
          <h3 className="font-medium mb-2">About Flash USDT</h3>
          <p className="text-sm text-zinc-400 mb-3">
            Flash USDT - All Rights Reserved
          </p>
          <div className="text-xs text-zinc-500">
            Each 1 FUSDT sent requires 1 bandwidth.
            
          </div>
        </div>
      </div>
    </div>
  );
}
