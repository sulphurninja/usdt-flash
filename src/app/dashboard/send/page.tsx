import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function SendFlashUSDT() {
  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">F</span>
            </div>
            <span className="font-bold text-xl">FlashUSDT</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-zinc-800/50 text-zinc-400 border-zinc-700">
              Demo Mode
            </Badge>
            <div className="relative">
              <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <svg className="mr-1 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Send USDT</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card className="bg-zinc-900/50 text-white border-white/10">
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
                <CardDescription>Configure your USDT transaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input
                    id="recipient"
                    placeholder="0x..."
                    className="bg-zinc-800 border-zinc-700"
                  />
                  <p className="text-xs text-zinc-500">Enter the wallet address of the recipient</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USDT)</Label>
                  <div className="flex gap-4">
                    <Input
                      id="amount"
                      placeholder="0.00"
                      className="bg-zinc-800 border-zinc-700"
                    />
                    <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                      Max
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiry">Transaction Expiry</Label>
                  <Select>
                    <SelectTrigger id="expiry" className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="custom">Custom period</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-zinc-500">Transaction will be valid for this time period</p>
                </div>

                <div className="space-y-2">
                  <Label>Transaction Notes (Optional)</Label>
                  <textarea
                    className="w-full min-h-[100px] bg-zinc-800 border border-zinc-700 rounded-md p-3 text-white"
                    placeholder="Add a note to the recipient..."
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="w-full p-4 bg-zinc-800/50 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-zinc-400">Amount to Send</span>
                    <span>100 USDT</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-zinc-400">Expiry Date</span>
                    <span>July 15, 2023 (90 days)</span>
                  </div>
                  <div className="border-t border-zinc-700 my-2 pt-2 flex justify-between font-medium">
                    <span>Bandwidth Cost</span>
                    <span className="text-green-500">12 units</span>
                  </div>
                </div>
                <Button className="w-full bg-green-500 text-black hover:bg-green-600">
                  Send Transaction
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="bg-zinc-900/50 text-white border-white/10 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-4">1,420.69 USDT</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Available:</span>
                    <span>1,420.69 USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">After transaction:</span>
                    <span>1,320.69 USDT</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 text-white border-white/10 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Bandwidth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">83 units</div>
                <div className="text-sm text-zinc-400 mb-2">Pro Plan (500 units)</div>
                <Progress value={17} className="h-2 bg-zinc-800" />
                <div className="mt-4 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Required:</span>
                    <span>12 units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Remaining after:</span>
                    <span>71 units</span>
                  </div>
                </div>
                <Button variant="link" className="p-0 h-auto text-green-500 mt-2">
                  Top up bandwidth →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 text-white border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Recipients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { address: "0x1a2...3f4", name: "Personal Wallet" },
                    { address: "0x5b6...7d8", name: "Exchange" },
                    { address: "0x9e0...1f2", name: "Test Account" }
                  ].map((recipient, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="w-full justify-between text-black border-zinc-700 hover:bg-zinc-800"
                    >
                      <span>{recipient.name}</span>
                      <span className="text-zinc-500">{recipient.address}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-xs text-center text-zinc-500 mt-8">
          This is a demo app. Flash USDT is not real cryptocurrency.
        </div>
      </div>
    </div>
  );
}
