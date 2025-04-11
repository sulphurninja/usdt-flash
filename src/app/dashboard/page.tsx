import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-zinc-400">Manage your Flash USDT and bandwidth</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" className="border-zinc-700 text-black hover:bg-zinc-800">
              <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14"/>
                <path d="M5 12h14"/>
              </svg>
              Top Up Bandwidth
            </Button>
            <Link href='/dashboard/send'>
            <Button className="bg-green-500 text-black hover:bg-green-600">
              <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="m6 9 6 6 6-6"/>
              </svg>
              Send Flash USDT
            </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-900/50 text-white border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
              <CardDescription className="text-zinc-400">Your USDT holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">1,420.69 USDT</div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Flash:
                  <span className="text-violet-400 ml-1">70%</span>
                </span>
                <span className="text-zinc-400">Real:
                  <span className="text-green-500 ml-1">30%</span>
                </span>
              </div>
              <div className="mt-2 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-green-500" style={{ width: '100%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 text-white border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Bandwidth</CardTitle>
              <CardDescription className="text-zinc-400">Remaining credits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">83 units</div>
              <div className="text-sm text-zinc-400 mb-2">Pro Plan (500 units)</div>
              <Progress value={17} className="h-2 bg-zinc-800"  />
              <Button variant="link" className="mt-2 p-0 h-auto text-green-500">
                Purchase more bandwidth →
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 text-white border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              <CardDescription className="text-zinc-400">Last 3 transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { address: "0x1a2...3f4", amount: "+250", type: "Received", time: "2h ago" },
                  { address: "0x5b6...7d8", amount: "-120", type: "Sent", time: "5h ago" },
                  { address: "0x9e0...1f2", amount: "-50", type: "Expired", time: "1d ago" }
                ].map((tx, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium">{tx.address}</div>
                      <div className="text-zinc-500">{tx.time}</div>
                    </div>
                    <div className={`font-medium ${
                      tx.type === "Received" ? "text-green-500" :
                      tx.type === "Expired" ? "text-zinc-500" : "text-violet-400"
                    }`}>
                      {tx.amount} USDT
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 p-0 h-auto text-green-500">
                View all transactions →
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-zinc-900/50">
            <TabsTrigger  className="text-gray-400"  value="transactions">Transactions</TabsTrigger>
            <TabsTrigger className="text-gray-400"  value="analytics">Analytics</TabsTrigger>
            <TabsTrigger  className="text-gray-400" value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions">
            <Card className="bg-zinc-900/50 text-white border-white/10">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Transaction History</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-black border-zinc-700 text-xs">
                      All Transactions
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-black border-zinc-700 text-xs">
                      Flash Only
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-black border-zinc-700 text-xs">
                      Expired
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-zinc-800">
                  <table className="min-w-full divide-y divide-zinc-800">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Flash %</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {[
                        { date: "2023-05-15", address: "0x1a2b3c4d5e6f...", amount: "250", flash: "100%", status: "Active" },
                        { date: "2023-05-14", address: "0x6a7b8c9d0e1f...", amount: "120", flash: "70%", status: "Active" },
                        { date: "2023-05-10", address: "0x2a3b4c5d6e7f...", amount: "50", flash: "100%", status: "Expired" },
                        { date: "2023-05-01", address: "0x8a9b0c1d2e3f...", amount: "300", flash: "0%", status: "Complete" },
                        { date: "2023-04-28", address: "0x4a5b6c7d8e9f...", amount: "75", flash: "50%", status: "Expired" },
                      ].map((tx, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.address}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.amount} USDT</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.flash}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Badge className={`${
                              tx.status === "Active" ? "bg-green-500/20 text-green-400" :
                              tx.status === "Expired" ? "bg-zinc-500/20 text-zinc-400" :
                              "bg-blue-500/20 text-blue-400"
                            }`}>
                              {tx.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card className="bg-zinc-900/50 text-white border-white/10">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Track your Flash USDT usage and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border border-dashed border-zinc-800 rounded-md">
                  <p className="text-zinc-500">Analytics visualization will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="bg-zinc-900/50 text-white border-white/10">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Default Flash Split</h3>
                  <p className="text-sm text-zinc-400">Set your default flash vs real USDT ratio for new transactions</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">0%</span>
                    <div className="relative flex-1 h-2 bg-zinc-800 rounded-full">
                      <div className="absolute h-full w-[70%] bg-gradient-to-r from-violet-500 to-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm">100%</span>
                    <span className="text-sm font-medium ml-2">70%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Default Expiry Period</h3>
                  <p className="text-sm text-zinc-400">Set how long your flash tokens will last by default</p>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-xs">30 days</Button>
                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-xs bg-green-500/20">90 days</Button>
                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-xs">180 days</Button>
                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-xs">Custom</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <p className="text-sm text-zinc-400">Manage when you receive alerts about your flash tokens</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Transaction confirmations</label>
                      <div className="h-6 w-11 bg-green-500 rounded-full relative">
                        <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Expiry warnings (7 days before)</label>
                      <div className="h-6 w-11 bg-green-500 rounded-full relative">
                        <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Low bandwidth alerts</label>
                      <div className="h-6 w-11 bg-green-500 rounded-full relative">
                        <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="bg-green-500 text-black hover:bg-green-600 mt-4">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-xs text-center text-zinc-500 mt-8">
          This is a demo app. Flash USDT is not real cryptocurrency.
        </div>
      </div>
    </div>
  );
}
