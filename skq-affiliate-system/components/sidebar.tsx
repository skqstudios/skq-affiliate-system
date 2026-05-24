"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  BarChart3,
  FileText,
  Calendar,
  ExternalLink,
  Copy,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { AFFILIATE } from "@/lib/data";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/scripts", label: "Scripts & Captions", icon: FileText },
  { href: "/scheduler", label: "Post Scheduler", icon: Calendar },
];

export function Sidebar() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(AFFILIATE.promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-64 border-r bg-black/95 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">SKQ Studios</p>
            <p className="text-white/40 text-xs">Affiliate System</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
              pathname === item.href
                ? "bg-purple-600 text-white font-medium"
                : "text-white/60 hover:text-white hover:bg-white/10"
            )}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Promo Code Block */}
      <div className="p-4 border-t border-white/10">
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl p-4 space-y-3">
          <p className="text-white/60 text-xs font-medium uppercase tracking-wider">
            Your Promo Code
          </p>
          <div className="flex items-center justify-between">
            <span className="text-white font-mono font-bold text-lg tracking-widest">
              {AFFILIATE.promoCode}
            </span>
            <button
              onClick={copyCode}
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          {copied && (
            <p className="text-green-400 text-xs">✓ Copied to clipboard!</p>
          )}
          <a
            href={AFFILIATE.fullLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-xs transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            {AFFILIATE.link}
          </a>
        </div>
      </div>
    </aside>
  );
}
