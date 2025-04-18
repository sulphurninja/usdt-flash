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
  // Add these state variables to your component
  const [bnbBalance, setBnbBalance] = useState<string | null>(null);
  const [usdtBalance, setUsdtBalance] = useState<string | null>(null);
  const [checkingBalance, setCheckingBalance] = useState(false);


  const checkBalances = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      toast.error("No wallet found");
      return;
    }

    setCheckingBalance(true);
    try {
      // Request account access
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts"
      });
      const account = accounts[0];

      // Check if we need to switch to BSC
      const chainId = await (window as any).ethereum.request({ method: "eth_chainId" });
      if (chainId !== "0x38") {
        toast.loading("Please switch to Binance Smart Chain to see balances");
        setBnbBalance(null);
        setUsdtBalance(null);
        return;
      }

      // Create provider and get balances
      const provider = new ethers.BrowserProvider((window as any).ethereum);

      // Get BNB balance
      const bnbBal = await provider.getBalance(account);
      const bnbFormatted = parseFloat(ethers.formatEther(bnbBal)).toFixed(4);
      setBnbBalance(bnbFormatted);

      // Get USDT balance
      const usdtContract = new ethers.Contract(
        "0x55d398326f99059fF775485246999027B3197955",
        ["function balanceOf(address) view returns (uint256)", "function decimals() view returns (uint8)"],
        provider
      );

      const decimals = await usdtContract.decimals();
      const usdtBal = await usdtContract.balanceOf(account);
      const usdtFormatted = parseFloat(ethers.formatUnits(usdtBal, decimals)).toFixed(2);
      setUsdtBalance(usdtFormatted);

      toast.success("Balances updated");
    } catch (error: any) {
      console.error("Error checking balances:", error);
      toast.error("Failed to check balances");
      setBnbBalance(null);
      setUsdtBalance(null);
    } finally {
      setCheckingBalance(false);
    }
  };

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

  // ... existing code ...

  // ... existing code ...


  // ... existing code ...

  // ... existing code ...

  const sendRealUSDT = async () => {
    if (!recipient || !usdtAmount) {
      toast.error("Enter recipient address and USDT amount");
      return;
    }

    // Validate recipient address
    if (!ethers.isAddress(recipient)) {
      toast.error("Invalid recipient address format");
      return;
    }

    setSendingReal(true);
    try {
      // Check if wallet is installed
      if (typeof window === "undefined" || !(window as any).ethereum) {
        toast.error("No wallet found (MetaMask or Trust Wallet extension)");
        return;
      }

      // Define BSC configuration up front
      const BSC_CHAIN_ID = "0x38"; // 56 in decimal
      const BSC_USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // BEP-20 USDT

      // Step 1: Request account access
      console.log("Requesting accounts...");
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts"
      });
      const account = accounts[0];
      console.log("Connected account:", account);
      toast.success("Wallet connected");

      // Step 2: Check and switch to BSC network
      console.log("Checking network...");
      const chainId = await (window as any).ethereum.request({
        method: "eth_chainId"
      });
      console.log("Current chainId:", chainId);

      if (chainId !== BSC_CHAIN_ID) {
        toast.success("Switching to Binance Smart Chain network...");
        console.log("Need to switch to BSC...");
        try {
          // Try to switch to BSC
          await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BSC_CHAIN_ID }],
          });
          console.log("Network switched to BSC");
          toast.success("Switched to Binance Smart Chain");
        } catch (switchError: any) {
          console.log("Switch error:", switchError);
          // If BSC hasn't been added to the wallet yet, add it
          if (switchError.code === 4902) {
            toast.success("Adding Binance Smart Chain to your wallet...");
            try {
              await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: BSC_CHAIN_ID,
                  chainName: 'Binance Smart Chain',
                  nativeCurrency: {
                    name: 'BNB',
                    symbol: 'BNB',
                    decimals: 18
                  },
                  rpcUrls: ['https://bsc-dataseed.binance.org/'],
                  blockExplorerUrls: ['https://bscscan.com']
                }],
              });
              console.log("BSC network added");
              toast.success("Binance Smart Chain added to your wallet");
            } catch (addError) {
              console.error("Failed to add BSC network:", addError);
              toast.error("Failed to add Binance Smart Chain to your wallet");
              return;
            }
          } else {
            toast.error("Please manually switch to Binance Smart Chain in your wallet");
            return;
          }
        }

        // Verify chain switch was successful
        const newChainId = await (window as any).ethereum.request({
          method: "eth_chainId"
        });
        console.log("New chainId after switch:", newChainId);

        if (newChainId !== BSC_CHAIN_ID) {
          toast.error("Failed to switch to Binance Smart Chain network");
          return;
        }
      }

      // Step 3: Create Web3Provider and connect to BSC
      console.log("Creating provider for BSC...");
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      console.log("Signer address:", signerAddress);

      // Step 4: Create contract instance for BSC USDT
      console.log("Creating contract instance for BSC USDT...");
      const USDT_ABI = [
        "function transfer(address to, uint256 value) public returns (bool)",
        "function decimals() view returns (uint8)",
        "function balanceOf(address owner) view returns (uint256)",
        "function symbol() view returns (string)",
        "function name() view returns (string)"
      ];

      const usdtContract = new ethers.Contract(
        BSC_USDT_ADDRESS,
        USDT_ABI,
        signer
      );

      // Step 5: Verify contract and get token info
      console.log("Verifying token contract...");
      let tokenSymbol, tokenName;
      try {
        tokenSymbol = await usdtContract.symbol();
        tokenName = await usdtContract.name();
        console.log("Token info:", tokenName, tokenSymbol);

        toast.success(`Connected to ${tokenName} (${tokenSymbol})`);
      } catch (error) {
        console.error("Error checking token symbol:", error);
        toast.error("Error connecting to USDT contract. Make sure you're on BSC network.");
        return;
      }

      // Step 6: Check BNB balance for gas
      toast.success("Checking BNB balance for gas fees...");
      const bnbBalance = await provider.getBalance(signerAddress);
      const bnbBalanceFormatted = ethers.formatEther(bnbBalance);
      console.log("BNB balance:", bnbBalanceFormatted);

      const minBnbForGas = ethers.parseEther("0.005"); // 0.005 BNB should be enough for gas
      if (bnbBalance < minBnbForGas) {
        toast.error(`Insufficient BNB for gas fees. You have ${bnbBalanceFormatted} BNB, but you need at least 0.005 BNB for transaction fees.`);
        return;
      }

      // Step 7: Check user's USDT balance
      console.log("Checking USDT balance...");
      try {
        const decimals = await usdtContract.decimals();
        console.log("Token decimals:", decimals);

        const balance = await usdtContract.balanceOf(signerAddress);
        const formattedBalance = ethers.formatUnits(balance, decimals);
        console.log("USDT balance:", formattedBalance);

        // Format balance with 2 decimal places for display
        const displayBalance = Number(formattedBalance).toFixed(2);
        toast.success(`Your ${tokenSymbol} balance: ${displayBalance}`);

        const parsedAmount = ethers.parseUnits(usdtAmount, decimals);
        console.log("Amount to send (in wei):", parsedAmount.toString());

        if (balance < parsedAmount) {
          // Calculate how much more USDT the user needs
          const needed = ethers.formatUnits(parsedAmount - balance, decimals);
          const neededFormatted = Number(needed).toFixed(2);

          // Show specific error message about insufficient balance
          toast.error(
            `Insufficient ${tokenSymbol} balance. You have ${displayBalance} ${tokenSymbol} but you're trying to send ${usdtAmount} ${tokenSymbol}. You need ${neededFormatted} more ${tokenSymbol}.`
          );
          return;
        }

        // Step 8: Send transaction
        toast.success("Preparing transaction...");
        console.log("Recipient:", recipient);
        console.log("Amount:", usdtAmount, tokenSymbol);

        // Try to estimate gas first to catch potential errors
        try {
          const gasEstimate = await usdtContract.transfer.estimateGas(recipient, parsedAmount);
          console.log("Estimated gas:", gasEstimate.toString());
        } catch (gasError: any) {
          console.error("Gas estimation failed:", gasError);

          // More informative error based on the specific error
          if (gasError.message.includes("execution reverted")) {
            toast.error("Transaction would fail. Check if your balance is sufficient and recipient address is valid.");
          } else {
            toast.error(`Gas estimation failed: ${gasError.message}`);
          }
          return;
        }

        toast.success("Sending transaction... Please confirm in your wallet");
        const tx = await usdtContract.transfer(recipient, parsedAmount);
        console.log("Transaction sent:", tx.hash);
        toast.success(`Transaction submitted! Hash: ${tx.hash.slice(0, 10)}...`);

        // Step 9: Wait for confirmation
        toast.success("Waiting for blockchain confirmation...");
        console.log("Waiting for confirmation...");
        const receipt = await tx.wait();
        console.log("Transaction confirmed:", receipt);

        toast.success(`Success! ${usdtAmount} ${tokenSymbol} sent to ${recipient.slice(0, 6)}...${recipient.slice(-4)}`);
        toast.success(
          <div>
            View on BSCScan: <a href={`https://bscscan.com/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="underline">
              {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
            </a>
          </div>,
          { duration: 10000 }
        );

        // Clear form
        setRecipient("");
        setUsdtAmount("");
      } catch (error: any) {
        console.error("USDT operation failed:", error);

        // Handle specific balance errors that might occur during transaction
        if (error.message.includes("insufficient funds")) {
          toast.error("Insufficient funds. Check your BNB balance for gas fees.");
        } else if (error.message.includes("exceeds balance")) {
          toast.error(`Your ${tokenSymbol} balance is too low for this transaction.`);
        } else if (error.message.includes("user rejected")) {
          toast.error("Transaction was rejected in your wallet");
        } else {
          toast.error(`Transaction failed: ${error.message}`);
        }
      }
    } catch (error: any) {
      console.error("Overall process failed:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setSendingReal(false);
    }
  };


  // ... existing code ...

  // ... existing code ...
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
           <img  src="/logo.png" className="h-12"/>
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
              {/* Balance Display Section */}
              <div className="rounded-md border border-zinc-800 bg-zinc-800/30 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-zinc-300 font-medium">Your Balances</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={checkBalances}
                    disabled={checkingBalance}
                    className="h-8 text-xs"
                  >
                    {checkingBalance ? "Checking..." : "Refresh"}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-md bg-zinc-800 flex flex-col">
                    <span className="text-zinc-400 text-xs mb-1">BNB (for gas fees)</span>
                    {bnbBalance ? (
                      <span className="text-yellow-400 font-medium">{bnbBalance} BNB</span>
                    ) : (
                      <span className="text-zinc-500 italic text-sm">Click refresh</span>
                    )}
                  </div>

                  <div className="p-3 rounded-md bg-zinc-800 flex flex-col">
                    <span className="text-zinc-400 text-xs mb-1">USDT (BEP-20)</span>
                    {usdtBalance ? (
                      <span className="text-green-400 font-medium">{usdtBalance} USDT</span>
                    ) : (
                      <span className="text-zinc-500 italic text-sm">Click refresh</span>
                    )}
                  </div>
                </div>

                {(bnbBalance && parseFloat(bnbBalance) < 0.005) && (
                  <div className="mt-3 p-2 bg-red-900/20 border border-red-800/30 rounded text-red-400 text-xs">
                    Warning: Low BNB balance. You need at least 0.005 BNB for gas fees.
                  </div>
                )}
              </div>
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
