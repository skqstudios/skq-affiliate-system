"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VIDEO_SCRIPTS, CAPTIONS } from "@/lib/data";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button size="sm" variant="ghost" onClick={handleCopy}
      className="shrink-0 bg-white/10 hover:bg-white/20 text-white h-8 px-3">
      {copied ? <Check className="w-3.5 h-3.5 text-green-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
      <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
    </Button>
  );
}

function ScriptCard({ script }: { script: typeof VIDEO_SCRIPTS[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">{script.platform}</Badge>
              <Badge className="bg-zinc-700 text-zinc-300 border-zinc-600 text-xs">{script.duration}</Badge>
            </div>
            <h3 className="text-white font-semibold">{script.title}</h3>
            <p className="text-zinc-400 text-sm italic mt-1">"{script.hook}"</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <CopyButton text={script.script} />
            <Button size="sm" variant="ghost" onClick={() => setExpanded(!expanded)}
              className="bg-white/5 hover:bg-white/10 text-white h-8 w-8 p-0">
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </div>
        {expanded && (
          <ScrollArea className="h-64">
            <pre className="text-zinc-300 text-sm whitespace-pre-wrap font-mono bg-black/30 rounded-xl p-4">
              {script.script}
            </pre>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

function CaptionCard({ caption }: { caption: { id: string; text: string } }) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-zinc-300 text-sm whitespace-pre-line flex-1 leading-relaxed">{caption.text}</p>
          <CopyButton text={caption.text} />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ScriptsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Scripts & Captions</h1>
        <p className="text-zinc-400 mt-1">Ready-to-use content — all pre-loaded with your affiliate link and promo code <span className="text-purple-400 font-mono">GYFVHD7</span></p>
      </div>

      {/* Scripts */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <Video className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white">Video Scripts</h2>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">4 Scripts</Badge>
        </div>
        <div className="space-y-3">
          {VIDEO_SCRIPTS.map((s) => <ScriptCard key={s.id} script={s} />)}
        </div>
      </section>

      {/* Captions */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <Copy className="w-5 h-5 text-pink-400" />
          <h2 className="text-xl font-bold text-white">Caption Library</h2>
          <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">30 Captions</Badge>
        </div>

        <Tabs defaultValue="youtube">
          <TabsList className="bg-white/10 border border-white/10 mb-5">
            <TabsTrigger value="youtube" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-zinc-400">YouTube (10)</TabsTrigger>
            <TabsTrigger value="instagram" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-zinc-400">Instagram (10)</TabsTrigger>
            <TabsTrigger value="tiktok" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-zinc-400">TikTok (10)</TabsTrigger>
          </TabsList>

          <TabsContent value="youtube" className="space-y-3">
            {CAPTIONS.youtube.map((c) => <CaptionCard key={c.id} caption={c} />)}
          </TabsContent>
          <TabsContent value="instagram" className="space-y-3">
            {CAPTIONS.instagram.map((c) => <CaptionCard key={c.id} caption={c} />)}
          </TabsContent>
          <TabsContent value="tiktok" className="space-y-3">
            {CAPTIONS.tiktok.map((c) => <CaptionCard key={c.id} caption={c} />)}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
