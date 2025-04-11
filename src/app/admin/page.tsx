import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";

export default function AdminPanel() {
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
            <Badge className="ml-2 bg-red-500 hover:bg-red-600">Admin</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <div className="relative">
              <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-sm font-medium">A</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
        <p className="text-zinc-400 mb-8">Manage users, bandwidth, and system settings</p>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 text-gray-400 bg-zinc-900/50">
            <TabsTrigger className="text-gray-400" value="users">Users</TabsTrigger>
            <TabsTrigger className="text-gray-400" value="bandwidth">Bandwidth</TabsTrigger>
            <TabsTrigger className="text-gray-400" value="flash">Flash Settings</TabsTrigger>
            <TabsTrigger className="text-gray-400" value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-zinc-900/50 text-white border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <Button className="bg-green-500 text-black hover:bg-green-600">
                  <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14"/>
                    <path d="M5 12h14"/>
                  </svg>
                  Add User
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Input placeholder="Search users..." className="bg-zinc-800 border-zinc-700" />
                  <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                    <svg className="mr-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Filter
                  </Button>
                </div>

                <div className="rounded-md border border-zinc-800">
                  <table className="min-w-full divide-y divide-zinc-800">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Bandwidth</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {[
                        { id: 1, name: "John Doe", email: "john@example.com", plan: "Pro", bandwidth: "340/500", status: "Active" },
                        { id: 2, name: "Jane Smith", email: "jane@example.com", plan: "Basic", bandwidth: "76/100", status: "Active" },
                        { id: 3, name: "Bob Johnson", email: "bob@example.com", plan: "Unlimited", bandwidth: "Unlimited", status: "Active" },
                        { id: 4, name: "Alice Brown", email: "alice@example.com", plan: "Pro", bandwidth: "121/500", status: "Suspended" },
                        { id: 5, name: "Tom Wilson", email: "tom@example.com", plan: "Basic", bandwidth: "12/100", status: "Active" },
                      ].map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center mr-3">
                                <span className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</span>
                              </div>
                              {user.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.plan}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.bandwidth}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Badge className={`${
                              user.status === "Active" ? "bg-green-500/20 text-green-400" :
                              "bg-red-500/20 text-red-400"
                            }`}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-xs">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-xs text-red-400 hover:text-red-300 hover:border-red-800">
                                Suspend
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-zinc-400">Showing 5 of 24 users</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-xs">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-xs bg-zinc-800">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-xs">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-xs">
                      3
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-xs">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bandwidth">
            <Card className="bg-zinc-900/50 border-white/10 mb-6">
              <CardHeader>
                <CardTitle>Bandwidth Plans</CardTitle>
                <CardDescription>Manage bandwidth plans and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { name: "Basic", price: "$9.99", bandwidth: "100 units" },
                    { name: "Pro", price: "$24.99", bandwidth: "500 units" },
                    { name: "Unlimited", price: "$49.99", bandwidth: "Unlimited" }
                  ].map((plan, i) => (
                    <Card key={i} className="border border-white/10 bg-zinc-900/30">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{plan.name}</CardTitle>
                          <Button variant="ghost" size="sm" className="h-8 text-xs">
                            Edit
                          </Button>
                        </div>
                        <CardDescription className="text-zinc-400">
                          {plan.bandwidth}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold mb-4">{plan.price}</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-zinc-400">Active users:</span>
                          <span className="text-sm">{i === 0 ? 128 : i === 1 ? 243 : 58}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-400">Revenue:</span>
                          <span className="text-sm text-green-500">${i === 0 ? "1,278.72" : i === 1 ? "6,072.57" : "2,899.42"}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Custom Bandwidth Allocation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="user-email">User Email</Label>
                        <Input id="user-email" placeholder="user@example.com" className="bg-zinc-800 border-zinc-700" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bandwidth">Bandwidth Amount</Label>
                        <div className="flex gap-4">
                          <Input id="bandwidth" placeholder="0" className="bg-zinc-800 border-zinc-700" />
                          <Button className="bg-green-500 text-black hover:bg-green-600">
                            Allocate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Bandwidth Usage Statistics</h3>
                    <div className="h-[300px] border border-zinc-800 rounded-md p-4">
                      <div className="h-full flex items-center justify-center">
                        <p className="text-zinc-500">Bandwidth usage graph will appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flash">
            <Card className="bg-zinc-900/50 border-white/10">
              <CardHeader>
                <CardTitle>Flash USDT Settings</CardTitle>
                <CardDescription>Configure how Flash USDT works across the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Global Flash/Real Split Configuration</h3>
                  <p className="text-sm text-zinc-400">
                    Control the percentage of Flash vs Real USDT that is sent in transactions system-wide.
                    Users cannot see or modify this split - to them all tokens appear the same.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="global-split">Default Flash Split</Label>
                        <span className="text-lg font-medium">70%</span>
                      </div>
                      <Input
                        id="global-split"
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="70"
                        className="[&::-webkit-slider-thumb]:bg-green-500"
                      />
                      <div className="flex justify-between text-sm text-zinc-400">
                        <span>0% Flash</span>
                        <span>100% Flash</span>
                      </div>

                      <div className="pt-2">
                        <p className="text-sm text-zinc-400 mb-2">
                          When a user sends 100 USDT, they will receive:
                        </p>
                        <div className="bg-zinc-800 p-4 rounded-md">
                          <div className="flex justify-between">
                            <span>Real USDT:</span>
                            <span className="text-green-500">30 USDT</span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span>Flash USDT:</span>
                            <span className="text-violet-400">70 USDT</span>
                          </div>
                          <div className="mt-2 h-2 w-full bg-zinc-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-violet-500" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Plan-Specific Flash Ratios</h4>
                      <div className="space-y-4">
                        {[
                          { plan: "Basic Plan", ratio: 80 },
                          { plan: "Pro Plan", ratio: 70 },
                          { plan: "Unlimited Plan", ratio: 50 }
                        ].map((plan, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>{plan.plan}</Label>
                              <span>{plan.ratio}% Flash</span>
                            </div>
                            <Input
                              type="range"
                              min="0"
                              max="100"
                              defaultValue={plan.ratio}
                              className="[&::-webkit-slider-thumb]:bg-green-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <h3 className="text-lg font-medium mb-4">Flash Token Expiration Settings</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="default-expiry">Default Expiry Period</Label>
                        <Select defaultValue="90">
                          <SelectTrigger id="default-expiry" className="bg-zinc-800 border-zinc-700">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="180">180 days</SelectItem>
                            <SelectItem value="365">365 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="min-expiry">Minimum Expiry Period</Label>
                        <Select defaultValue="7">
                          <SelectTrigger id="min-expiry" className="bg-zinc-800 border-zinc-700">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="1">1 day</SelectItem>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="max-expiry">Maximum Expiry Period</Label>
                        <Select defaultValue="365">
                          <SelectTrigger id="max-expiry" className="bg-zinc-800 border-zinc-700">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="180">180 days</SelectItem>
                            <SelectItem value="365">365 days</SelectItem>
                            <SelectItem value="730">730 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Fade-out Animation</Label>
                          <Switch defaultChecked />
                        </div>
                        <p className="text-sm text-zinc-400">
                          Enable visual fade-out of flash tokens when they expire
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Send Expiry Notifications</Label>
                          <Switch defaultChecked />
                        </div>
                        <p className="text-sm text-zinc-400">
                          Notify users before their flash tokens expire
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Notification Timing</Label>
                        <div className="flex gap-2">
                          {["1 day", "3 days", "7 days", "14 days"].map((duration, i) => (
                            <Button
                              key={i}
                              variant="outline"
                              size="sm"
                              className={`h-8 border-zinc-700 text-xs ${i === 2 ? "bg-green-500/20" : ""}`}
                            >
                              {duration}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="bg-green-500 text-black hover:bg-green-600">
                  Save Flash Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="bg-zinc-900/50 border-white/10">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Maintenance Mode</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Maintenance Mode</p>
                        <p className="text-sm text-zinc-400">
                          Takes the system offline for all non-admin users
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label htmlFor="maintenance-message">Maintenance Message</Label>
                      <textarea
                        id="maintenance-message"
                        className="w-full min-h-[100px] bg-zinc-800 border border-zinc-700 rounded-md p-3 text-white"
                        placeholder="Enter message to display during maintenance..."
                        defaultValue="We're currently performing scheduled maintenance. Please check back later."
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Server Status:</span>
                        <Badge className="bg-green-500/20 text-green-400">Operational</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Database Status:</span>
                        <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Last Backup:</span>
                        <span className="text-sm">2023-05-15 03:21 UTC</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Response Time:</span>
                        <span className="text-sm">124ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Active Users:</span>
                        <span className="text-sm">437</span>
                      </div>
                    </div>

                    <div className="pt-4">
                    <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800">
                        View System Logs
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800">
                  <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-red-950/20 border border-red-900/30 rounded-md p-4">
                        <h4 className="font-medium text-red-400 mb-2">Reset All Flash Tokens</h4>
                        <p className="text-sm text-zinc-400 mb-4">
                          This will immediately expire all flash tokens across the platform. This action cannot be undone.
                        </p>
                        <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                          Reset All Flash Tokens
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-red-950/20 border border-red-900/30 rounded-md p-4">
                        <h4 className="font-medium text-red-400 mb-2">Database Maintenance</h4>
                        <p className="text-sm text-zinc-400 mb-4">
                          Run database cleanup operations or restore from backup.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-zinc-700">
                            Cleanup
                          </Button>
                          <Button variant="outline" size="sm" className="border-zinc-700">
                            Backup
                          </Button>
                          <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                            Restore
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-xs text-center text-zinc-500 mt-8">
          FlashUSDT Admin Panel • Version 1.0.2 • This is a demo app. Flash USDT is not real cryptocurrency.
        </div>
      </div>
    </div>
  );
}
