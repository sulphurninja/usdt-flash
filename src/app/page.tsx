import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">F</span>
            </div>
            <span className="font-bold text-xl">FlashUSDT</span>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <Link href="#features" className="hover:text-green-400 transition">Features</Link>
            <Link href="#pricing" className="hover:text-green-400 transition">Pricing</Link>
            <Link href="#docs" className="hover:text-green-400 transition">Docs</Link>
            <Button asChild variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-green-500 text-black hover:bg-green-600">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
          <Button variant="ghost" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 flex flex-col items-center text-center gap-6">
        <Badge className="bg-violet-700/20 text-violet-400 hover:bg-violet-700/30 px-4 py-1"> Demo</Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          <span className="text-green-500">Simulate.</span> <span className="text-violet-400">Send.</span> <span className="text-white">Disappear.</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Experience the future of token simulation with FlashUSDT. Create temporary tokens that expire after a set duration. Perfect for educational purposes and testing scenarios.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button asChild size="lg" className="bg-green-500 text-black hover:bg-green-600">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link className="text-black" href="#how-it-works">Learn More</Link>
          </Button>
        </div>
        <div className="relative w-full max-w-4xl mt-8 h-[300px] md:h-[400px] bg-gradient-to-br from-green-500/10 to-violet-500/10 rounded-lg border border-white/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-zinc-500">Dashboard Preview</p>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-2">This is a demo app. Flash USDT is not real cryptocurrency.</p>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-black/30 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">How Flash USDT Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Purchase Bandwidth",
                description: "Buy bandwidth credits that function like gas to generate and send flash tokens.",
                icon: "💳"
              },
              {
                title: "Create Flash Tokens",
                description: "Generate temporary USDT tokens that automatically expire after your chosen duration.",
                icon: "⚡"
              },
              {
                title: "Send & Monitor",
                description: "Send tokens to any wallet address and track their status until expiration.",
                icon: "📊"
              }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900/50 border border-white/10 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-violet-500/20 rounded-full flex items-center justify-center text-xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">Bandwidth Plans</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
            Purchase bandwidth to generate and send Flash USDT. Choose the plan that fits your simulation needs.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "$9.99",
                bandwidth: "100 units",
                features: ["Up to 100 USDT transactions", "30-day expiry tokens", "Basic analytics"]
              },
              {
                name: "Pro",
                price: "$24.99",
                bandwidth: "500 units",
                features: ["Up to 500 USDT transactions", "Custom expiry duration", "Advanced analytics", "Priority support"]
              },
              {
                name: "Unlimited",
                price: "$49.99",
                bandwidth: "Unlimited",
                features: ["Unlimited transactions", "Custom expiry durations", "Full analytics suite", "24/7 priority support", "Custom flash/real ratio"]
              }
            ].map((plan, i) => (
              <Card key={i} className={`border ${i === 1 ? 'border-green-500/50 bg-gradient-to-b from-green-950/20 to-black' : 'border-white/10 bg-zinc-900/30'}`}>
                <CardHeader>
                  <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-zinc-400">
                    {plan.bandwidth} bandwidth
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl text-white font-bold mb-6">{plan.price}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <svg className="text-green-500" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={i === 1 ? "w-full bg-green-500 text-black hover:bg-green-600" : "w-full"}>
                    Choose Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-10 mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">FlashUSDT</h3>
              <p className="text-zinc-400 text-sm">
                Educational platform for simulating USDT transactions with expiring tokens.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-zinc-400 hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white">API</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white">Tutorials</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-zinc-400 hover:text-white">About</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-zinc-400 hover:text-white">Support</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white">Sales</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">
              © 2023 FlashUSDT. All rights reserved.
            </p>
            <p className="text-zinc-500 text-sm">
              This is a demo app. Flash USDT is not real cryptocurrency.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
