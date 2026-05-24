"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink, Zap, Video, Mic, Image, Calendar, TrendingUp, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AFFILIATE } from "@/lib/data";

const features = [
  { icon: Video, title: "AI Video Generation", desc: "Full cinematic videos from a single text prompt in under 60 seconds" },
  { icon: Mic, title: "Realistic Voiceover", desc: "Dozens of AI voice styles that match your content's tone perfectly" },
  { icon: Image, title: "Thumbnail Creator", desc: "High-CTR YouTube thumbnails generated automatically for every video" },
  { icon: Calendar, title: "Auto Captions", desc: "Word-timed captions burned into every video automatically" },
  { icon: TrendingUp, title: "Analytics Dashboard", desc: "Track your content performance across all platforms in one place" },
  { icon: Star, title: "Content Scheduler", desc: "Queue and auto-publish to YouTube, Instagram, and TikTok" },
];

export default function LandingPage() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const copy = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="relative overflow-hidden px-8 py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-zinc-950 to-pink-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-4">
              🚀 Exclusive Affiliate Partner
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Magica AI
              </span>
              <br />
              <span className="text-white">The Future of Content</span>
            </h1>
            <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto">
              Generate full AI videos, voiceovers, captions, and thumbnails in under 60 seconds.
              The tool 10,000+ creators trust to 10× their output.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <a href={AFFILIATE.fullLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-8 h-12 text-base">
                Start Free Trial
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          {/* Affiliate Links Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-3 pt-6"
          >
            {/* Link card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="text-left overflow-hidden">
                <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">Affiliate Link</p>
                <p className="text-white font-mono text-sm truncate">{AFFILIATE.link}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="shrink-0 bg-white/10 hover:bg-white/20 text-white"
                onClick={() => copy(AFFILIATE.fullLink, setCopiedLink)}
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>

            {/* Promo code card */}
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="text-left">
                <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">Promo Code</p>
                <p className="text-white font-mono font-bold text-xl tracking-widest">{AFFILIATE.promoCode}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="shrink-0 bg-white/10 hover:bg-white/20 text-white"
                onClick={() => copy(AFFILIATE.promoCode, setCopiedCode)}
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Everything Your Audience Needs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-500/40 hover:bg-white/[0.07] transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                <p className="text-zinc-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-8 pb-20">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-3xl p-10 text-center">
          <Zap className="w-10 h-10 text-purple-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Go Viral?</h2>
          <p className="text-zinc-400 mb-6">Join 10,000+ creators. Start free — no credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={AFFILIATE.fullLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-bold px-8">
                Try Free at {AFFILIATE.link}
              </Button>
            </a>
          </div>
          <p className="text-zinc-500 text-sm mt-4">Use code <span className="text-purple-400 font-mono font-bold">{AFFILIATE.promoCode}</span> at checkout for bonus credits</p>
        </div>
      </section>
    </div>
  );
}
