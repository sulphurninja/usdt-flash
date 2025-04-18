"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

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

  const openWhatsApp = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = "1234567890";
    const message = `Hi, I'm interested in topping up my bandwidth for Flash USDT. My account email is: ${user?.email}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (loading) {
    return (
      <div className="bg-[#0F0F0F] min-h-screen text-white flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
           <img src="/logo.png" className="h-12"/>
            <span className="font-bold text-xl">FlashUSDT</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-zinc-800/50 text-green-500 border-green-500/50">
              {user?.bandwidth || 0} Bandwidth
            </Badge>
            <div className="relative">
              <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </span>
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
            <p className="text-zinc-400">Welcome back, {user?.firstName} {user?.lastName}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" className="border-zinc-700 text-black hover:bg-zinc-800" onClick={openWhatsApp}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-zinc-900/50 text-white border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Bandwidth</CardTitle>
              <CardDescription className="text-zinc-400">Your Flash USDT sending capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{user?.bandwidth || 0} units</div>
              <div className="text-sm text-zinc-400 mb-2">
                {user?.bandwidth < 50 ?
                  "Low bandwidth level - please top up soon" :
                  user?.bandwidth < 200 ?
                    "Moderate bandwidth level" :
                    "Good bandwidth level"}
              </div>
              <Progress
                value={(user?.bandwidth / 1000) * 100}
                className="h-2 bg-zinc-800"
              />
              <Button
                variant="link"
                className="mt-2 p-0 h-auto text-green-500"
                onClick={openWhatsApp}
              >
                Contact us to purchase more bandwidth →
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 text-white border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Your Invite Code</CardTitle>
              <CardDescription className="text-zinc-400">Share with friends for bonus bandwidth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-zinc-800/80 p-3 rounded-md font-mono text-lg text-center mb-3">
                {user?.inviteCode || "No invite code available"}
              </div>
              <div className="text-sm text-zinc-400">
                Share your invite code and get 50 bonus bandwidth for each new user who signs up
              </div>
              <Button
                variant="outline"
                className="w-full mt-3 border-zinc-700 hover:bg-zinc-800"
                onClick={() => {
                  navigator.clipboard.writeText(user?.inviteCode || "");
                  toast.success("Invite code copied to clipboard");
                }}
              >
                Copy Invite Code
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8 bg-zinc-900/50">
            <TabsTrigger className="text-gray-400" value="transactions">Transactions</TabsTrigger>
            <TabsTrigger className="text-gray-400" value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions">
            <Card className="bg-zinc-900/50 text-white border-white/10">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Transaction History</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {user?.transactions && user.transactions.length > 0 ? (
                  <div className="rounded-md border border-zinc-800">
                    <table className="min-w-full divide-y divide-zinc-800">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Address/Details</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800">
                        {user.transactions.map((tx: any, i: number) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Date(tx.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {tx.recipient || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {tx.amount} {tx.type === 'purchase' ? 'Bandwidth' : 'FUSDT'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {tx.hash ? (
                                <a
                                  href={`https://etherscan.io/tx/${tx.hash}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-green-500 hover:underline"
                                >
                                  View on Explorer
                                </a>
                              ) : (
                                <Badge className="bg-zinc-500/20 text-zinc-400">
                                  Completed
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10 text-zinc-500">
                    <p>No transactions found. Start by sending some Flash USDT!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="bg-zinc-900/50 text-white border-white/10">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Account Information</h3>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-800/30 rounded-md">
                    <div>
                      <p className="text-sm text-zinc-400">Name</p>
                      <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Account Type</p>
                      <p className="font-medium capitalize">{user?.role || "User"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Member Since</p>
                      <p className="font-medium">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Connected Wallet</h3>
                  {user?.walletAddress ? (
                    <div className="p-4 bg-zinc-800/30 rounded-md">
                      <p className="font-mono text-sm break-all">{user.walletAddress}</p>
                      <Button variant="link" className="p-0 h-auto text-green-500 mt-2">
                        Disconnect Wallet
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 bg-zinc-800/30 rounded-md flex flex-col items-center justify-center">
                      <p className="text-zinc-400 mb-2">No wallet connected</p>
                      <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.5 12H12M17.5 12H12M12 12V6.5M12 12V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Connect Wallet
                      </Button>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-500/20 hover:bg-red-500/10"
                    onClick={() => {
                      // Handle logout
                      fetch('/api/auth/logout', { method: 'POST' })
                        .then(() => {
                          router.push('/login');
                        })
                        .catch(err => {
                          console.error('Logout error:', err);
                        });
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
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
