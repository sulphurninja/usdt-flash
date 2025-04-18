"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [bandwidthAmount, setBandwidthAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [fusdtAmount, setFusdtAmount] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [sendingReal, setSendingReal] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/user/me');
        if (response.ok) {
          const data = await response.json();
          if (data.user.role !== 'admin') {
            // Not an admin, redirect to dashboard
            router.push('/dashboard');
            return;
          }
          setAdmin(data.user);
          fetchUsers();
        } else {
          // If not authenticated, redirect to login
          router.push('/login');
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error loading users");
    }
  };

  const sendFUSDT = async () => {
    if (!recipient || !fusdtAmount) {
      toast.error("Enter recipient and fUSDT amount");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/send-fusdt", {
        method: "POST",
        body: JSON.stringify({ to: recipient, amount: fusdtAmount }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.success) {
        toast.success("fUSDT sent successfully!");
        setRecipient("");
        setFusdtAmount("");
      } else {
        toast.error("fUSDT failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending fUSDT");
    } finally {
      setSending(false);
    }
  };

  const sendRealUSDT = async () => {
    if (!recipient || !usdtAmount) {
      toast.error("Enter recipient address and USDT amount");
      return;
    }

    setSendingReal(true);
    try {
      // Check if wallet is installed
      if (typeof window === "undefined" || !(window as any).ethereum) {
        toast.error("No wallet found (MetaMask or Trust Wallet extension)");
        return;
      }

      // Request account access
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      // Initialize provider and signer
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      // USDT contract on Ethereum mainnet
      const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      const USDT_ABI = [
        "function transfer(address to, uint256 value) public returns (bool)",
        "function decimals() view returns (uint8)"
      ];

      const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);

      // Convert amount to smallest unit based on decimals
      const decimals = await usdtContract.decimals();
      const parsedAmount = ethers.parseUnits(usdtAmount, decimals);

      // Send the transfer transaction
      const tx = await usdtContract.transfer(recipient, parsedAmount);
      toast.success("Transaction submitted!");

      // Wait for confirmation
      await tx.wait();
      toast.success(`Real USDT sent! Tx Hash: ${tx.hash}`);

      // Clear form fields
      setRecipient("");
      setUsdtAmount("");
    } catch (error: any) {
      console.error("Transfer error:", error);
      toast.error("USDT transfer failed: " + error.message);
    } finally {
      setSendingReal(false);
    }
  };

  const addBandwidth = async () => {
    if (!selectedUser || !bandwidthAmount) {
      toast.error("Select a user and enter bandwidth amount");
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}/bandwidth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(bandwidthAmount),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Added ${bandwidthAmount} bandwidth to ${selectedUser.email}`);

        // Update the user in the local state
        setUsers(users.map(user =>
          user.id === selectedUser.id
            ? { ...user, bandwidth: user.bandwidth + parseInt(bandwidthAmount) }
            : user
        ));

        setSelectedUser({
          ...selectedUser,
          bandwidth: selectedUser.bandwidth + parseInt(bandwidthAmount)
        });

        setBandwidthAmount("");
      } else {
        toast.error(data.message || "Failed to add bandwidth");
      }
    } catch (error) {
      console.error("Error adding bandwidth:", error);
      toast.error("An error occurred while adding bandwidth");
    }
  };

  const filteredUsers = searchEmail
    ? users.filter(user => user.email.toLowerCase().includes(searchEmail.toLowerCase()))
    : users;

  if (loading) {
    return <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">Loading...</div>;
  }

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
            <Badge variant="outline" className="bg-zinc-800/50 text-red-400 border-red-700/50">
              Admin Panel
            </Badge>
            <div className="relative">
              <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                  <span className="text-sm font-medium">A</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs defaultValue="users">
          <TabsList className="bg-zinc-800/50 mb-6 gap-4">
            <TabsTrigger className="text-gray-400" value="users">Users</TabsTrigger>
            <TabsTrigger className="text-gray-400" value="send">Send FUSDT</TabsTrigger>
            <TabsTrigger className="text-gray-400" value="send-real">Send Real USDT</TabsTrigger>
            <TabsTrigger className="text-gray-400" value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-zinc-900/50 border-white/10">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription className="text-zinc-400">
                  Manage users and their bandwidth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label htmlFor="searchEmail">Search by Email</Label>
                  <Input
                    id="searchEmail"
                    placeholder="Enter email..."
                    className="bg-zinc-800 border-zinc-700 mt-1"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                  />
                </div>

                <div className="border rounded-md border-zinc-800 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-zinc-800/50 border-zinc-800">
                        <TableHead className="text-zinc-400">Name</TableHead>
                        <TableHead className="text-zinc-400">Email</TableHead>
                        <TableHead className="text-zinc-400">Bandwidth</TableHead>
                        <TableHead className="text-zinc-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-zinc-500">
                            No users found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id} className="hover:bg-zinc-800/50 border-zinc-800">
                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-zinc-800 border-green-500/30 text-green-500">
                                {user.bandwidth}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedUser(user)}
                              >
                                Manage
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {selectedUser && (
              <Card className="bg-zinc-900/50 border-white/10">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedUser.firstName} {selectedUser.lastName}</CardTitle>
                      <CardDescription className="text-zinc-400">
                        {selectedUser.email}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedUser(null)}
                    >
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <Label>Current Bandwidth</Label>
                      <span className="text-green-500 font-medium">{selectedUser.bandwidth}</span>
                    </div>
                    <Progress value={(selectedUser.bandwidth / 1000) * 100} className="h-2 bg-zinc-800" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="addBandwidth">Add Bandwidth</Label>
                      <Input
                        id="addBandwidth"
                        type="number"
                        placeholder="100"
                        className="bg-zinc-800 border-zinc-700 mt-1"
                        value={bandwidthAmount}
                        onChange={(e) => setBandwidthAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        className="w-full bg-green-500 text-black hover:bg-green-600"
                        onClick={addBandwidth}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="send">
            <Card className="bg-zinc-900/50 text-white border-white/10 mb-6">
              <CardHeader>
                <CardTitle>Send Flash USDT from Admin Wallet</CardTitle>
                <CardDescription className="text-zinc-400">
                  Send FUSDT directly without using bandwidth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label>Recipient</Label>
                <Input
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
                <Label>Amount (FUSDT)</Label>
                <Input
                  placeholder="1000"
                  value={fusdtAmount}
                  onChange={(e) => setFusdtAmount(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-green-500 text-black hover:bg-green-600"
                  onClick={sendFUSDT}
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send FUSDT"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="send-real">
            <Card className="bg-zinc-900/50 text-white border-white/10 mb-6">
              <CardHeader>
                <CardTitle>Send Real USDT from Connected Wallet</CardTitle>
                <CardDescription className="text-zinc-400">
                  Send actual USDT using your connected MetaMask or Trust Wallet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label>Recipient Address</Label>
                <Input
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
                <Label>Amount (Real USDT)</Label>
                <Input
                  placeholder="100"
                  value={usdtAmount}
                  onChange={(e) => setUsdtAmount(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
                <div className="p-3 bg-yellow-900/20 border border-yellow-800/30 rounded-md text-yellow-300 text-sm">
                  <p>Warning: This will send real USDT from your connected wallet. Make sure you have sufficient balance.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-blue-500 text-white hover:bg-blue-600"
                  onClick={sendRealUSDT}
                  disabled={sendingReal}
                >
                  {sendingReal ? "Sending..." : "Send Real USDT"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card className="bg-zinc-900/50 border-white/10">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription className="text-zinc-400">
                  View all FUSDT transactions across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-zinc-500 py-4">
                  Transaction data will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
