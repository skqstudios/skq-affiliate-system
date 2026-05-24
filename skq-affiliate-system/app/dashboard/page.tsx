"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, MousePointer, DollarSign, Users, Copy, Check, ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { AFFILIATE, MOCK_STATS, CHART_DATA } from "@/lib/data";

const stats = [
  { label: "Total Clicks", value: MOCK_STATS.totalClicks.toLocaleString(), icon: MousePointer, color: "text-blue-400", bg: "bg-blue-500/10", trend: "+24%" },
  { label: "Conversions", value: MOCK_STATS.conversions.toString(), icon: Users, color: "text-green-400", bg: "bg-green-500/10", trend: "+8%" },
  { label: "Est. Earnings", value: `$${MOCK_STATS.estimatedEarnings}`, icon: DollarSign, color: "text-yellow-400", bg: "bg-yellow-500/10", trend: "+31%" },
  { label: "Conv. Rate", value: `${MOCK_STATS.conversionRate}%`, icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10", trend: "+0.4%" },
];

export default function DashboardPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Affiliate Dashboard</h1>
        <p className="text-zinc-400 mt-1">Track your performance for <span className="text-purple-400">{AFFILIATE.link}</span></p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">{s.trend}</Badge>
                </div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-zinc-400 text-sm mt-0.5">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-lg">Clicks This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="day" stroke="#71717a" tick={{ fill: "#71717a", fontSize: 12 }} />
              <YAxis stroke="#71717a" tick={{ fill: "#71717a", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px", color: "#fff" }}
              />
              <Area type="monotone" dataKey="clicks" stroke="#9333ea" fill="url(#clickGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Copy */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-base">Quick Share Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Affiliate Link", value: AFFILIATE.fullLink, key: "link" },
              { label: "Promo Code", value: AFFILIATE.promoCode, key: "code" },
              { label: "Short Bio Link", value: `${AFFILIATE.fullLink} - Use code ${AFFILIATE.promoCode}`, key: "bio" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                <div className="overflow-hidden">
                  <p className="text-zinc-400 text-xs">{item.label}</p>
                  <p className="text-white text-sm font-mono truncate">{item.value}</p>
                </div>
                <Button size="sm" variant="ghost" className="ml-2 shrink-0 text-white hover:bg-white/10"
                  onClick={() => copy(item.value, item.key)}>
                  {copied === item.key ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-base">Platform Connections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "YouTube", status: "Not Connected", color: "text-red-400", bg: "bg-red-500/10" },
              { name: "Instagram", status: "Not Connected", color: "text-pink-400", bg: "bg-pink-500/10" },
              { name: "TikTok", status: "Not Connected", color: "text-cyan-400", bg: "bg-cyan-500/10" },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${p.bg} flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${p.color}`}>{p.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{p.name}</p>
                    <p className={`text-xs ${p.color}`}>{p.status}</p>
                  </div>
                </div>
                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white text-xs h-7">
                  Connect
                </Button>
              </div>
            ))}
            <p className="text-zinc-500 text-xs pt-1">
              Go to <span className="text-purple-400">Settings → Integrations</span> to connect your accounts for auto-posting.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">Share your affiliate link now</p>
          <p className="text-zinc-400 text-sm">{AFFILIATE.fullLink} · Code: {AFFILIATE.promoCode}</p>
        </div>
        <a href={AFFILIATE.fullLink} target="_blank" rel="noopener noreferrer">
          <Button className="bg-purple-600 hover:bg-purple-500 text-white">
            Open Link <ExternalLink className="ml-2 w-3.5 h-3.5" />
          </Button>
        </a>
      </div>
    </div>
  );
}
