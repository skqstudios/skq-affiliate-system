"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Trash, CheckCircle, Clock, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AFFILIATE, CAPTIONS, SCHEDULED_POSTS } from "@/lib/data";

interface Post {
  id: number;
  platform: string;
  caption: string;
  scheduledFor: string;
  status: "scheduled" | "posted";
}

const platformColors: Record<string, string> = {
  YouTube: "bg-red-500/20 text-red-300 border-red-500/20",
  Instagram: "bg-pink-500/20 text-pink-300 border-pink-500/20",
  TikTok: "bg-cyan-500/20 text-cyan-300 border-cyan-500/20",
};

export default function SchedulerPage() {
  const [posts, setPosts] = useState<Post[]>(SCHEDULED_POSTS as Post[]);
  const [platform, setPlatform] = useState("");
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const addPost = () => {
    if (!platform || !caption || !date || !time) return;
    const newPost: Post = {
      id: Date.now(),
      platform,
      caption,
      scheduledFor: `${date} ${time}`,
      status: "scheduled",
    };
    setPosts((prev) => [newPost, ...prev]);
    setCaption("");
    setDate("");
    setTime("");
  };

  const removePost = (id: number) => setPosts((prev) => prev.filter((p) => p.id !== id));

  const markPosted = (id: number) =>
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "posted" } : p)));

  const copyCaption = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadTemplate = (platform: string) => {
    const map: Record<string, { id: string; text: string }[]> = {
      YouTube: CAPTIONS.youtube,
      Instagram: CAPTIONS.instagram,
      TikTok: CAPTIONS.tiktok,
    };
    const list = map[platform];
    if (list) setCaption(list[Math.floor(Math.random() * list.length)].text);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Post Scheduler</h1>
        <p className="text-zinc-400 mt-1">Queue posts with your affiliate link auto-embedded in every caption</p>
      </div>

      {/* Add Post Form */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-400" />
            Schedule New Post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-zinc-400 text-xs">Platform</Label>
              <Select value={platform} onValueChange={(v) => { setPlatform(v); loadTemplate(v); }}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-400 text-xs">Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="bg-white/5 border-white/10 text-white" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-400 text-xs">Time</Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)}
                className="bg-white/5 border-white/10 text-white" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-zinc-400 text-xs">Caption</Label>
              {platform && (
                <Button size="sm" variant="ghost" onClick={() => loadTemplate(platform)}
                  className="text-purple-400 hover:text-purple-300 text-xs h-6 px-2">
                  Load {platform} template
                </Button>
              )}
            </div>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={`Write your caption... (will include ${AFFILIATE.link} and code ${AFFILIATE.promoCode})`}
              className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 min-h-[120px] resize-none"
            />
          </div>

          <Button onClick={addPost} disabled={!platform || !caption || !date || !time}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold w-full">
            <Calendar className="mr-2 w-4 h-4" />
            Schedule Post
          </Button>
        </CardContent>
      </Card>

      {/* Queue */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <Clock className="w-5 h-5 text-zinc-400" />
          <h2 className="text-xl font-bold text-white">Post Queue</h2>
          <Badge className="bg-white/10 text-zinc-300 border-white/10">
            {posts.filter((p) => p.status === "scheduled").length} pending
          </Badge>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 20 }}>
                <Card className={`border-white/10 ${post.status === "posted" ? "bg-green-500/5 border-green-500/20" : "bg-white/5"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge className={platformColors[post.platform] || "bg-white/10 text-white"}>
                            {post.platform}
                          </Badge>
                          <span className="text-zinc-400 text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.scheduledFor}
                          </span>
                          {post.status === "posted" && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/20">
                              <CheckCircle className="w-3 h-3 mr-1" /> Posted
                            </Badge>
                          )}
                        </div>
                        <p className="text-zinc-300 text-sm line-clamp-3 whitespace-pre-line">{post.caption}</p>
                      </div>
                      <div className="flex flex-col gap-1.5 shrink-0">
                        <Button size="sm" variant="ghost" onClick={() => copyCaption(post.id, post.caption)}
                          className="bg-white/5 hover:bg-white/10 text-white h-8 w-8 p-0">
                          {copied === post.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </Button>
                        {post.status === "scheduled" && (
                          <Button size="sm" variant="ghost" onClick={() => markPosted(post.id)}
                            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 h-8 w-8 p-0">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => removePost(post.id)}
                          className="bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 h-8 w-8 p-0">
                          <Trash className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {posts.length === 0 && (
            <div className="text-center py-16 text-zinc-500">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No posts scheduled yet. Add your first post above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
