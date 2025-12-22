import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit2, 
  Users, 
  Hash, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  LogOut,
  Palette,
  Link as LinkIcon,
  Crown,
  ImagePlus,
  Grid,
  BarChart3,
  Share2,
  ChevronRight,
  Plus,
  Zap,
  LayoutDashboard,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import LoadingPage from "@/components/LoadingPage";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AccountOverview() {
  const { data: user } = useUser();
  const logoutMutation = useLogout();
  const [location] = useLocation();
  const [profileCompletion] = useState(20);

  if (!user) return <LoadingPage />;

  const chartData = [
    { name: 'Mon', views: 0 },
    { name: 'Tue', views: 0 },
    { name: 'Wed', views: 0 },
    { name: 'Thu', views: 0 },
    { name: 'Fri', views: 0 },
    { name: 'Sat', views: 0 },
    { name: 'Sun', views: 0 },
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", id: "overview", active: true },
    { icon: BarChart3, label: "Analytics", id: "analytics" },
    { icon: Badge, label: "Badges", id: "badges" },
    { icon: Palette, label: "Customize", id: "customize" },
    { icon: LinkIcon, label: "Links", id: "links" },
    { icon: ImagePlus, label: "Image Host", id: "imagehost" },
    { icon: Grid, label: "Templates", id: "templates" },
    { icon: Crown, label: "Premium", id: "premium" },
  ];

  const accountCards = [
    {
      label: "Username",
      value: user.username,
      subtext: "Live on thats.wtf",
      icon: Edit2,
      color: "from-primary/20 to-primary/5"
    },
    {
      label: "Tier",
      value: user.isPro ? "Premium" : "Free",
      subtext: user.isPro ? "All features unlocked" : "Basic access",
      icon: Crown,
      color: "from-accent/20 to-accent/5"
    },
    {
      label: "Profile Views",
      value: (user.views || 0).toLocaleString(),
      subtext: "Lifetime visitors",
      icon: Eye,
      color: "from-emerald-500/20 to-emerald-500/5"
    },
    {
      label: "XP Level",
      value: `Lvl ${user.level || 1}`,
      subtext: `${user.xp || 0} total XP earned`,
      icon: Zap,
      color: "from-orange-500/20 to-orange-500/5"
    }
  ];

  const completionTasks = [
    { title: "Upload An Avatar", done: !!user.avatarUrl },
    { title: "Add A Description", done: !!user.bio },
    { title: "Link Discord Account", done: !!user.discordId },
    { title: "Add Socials", done: false },
  ];

  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-background": "0 0% 0%",
    "--sidebar-foreground": "240 5% 64.9%",
    "--sidebar-primary": "263.4 70% 50.4%",
    "--sidebar-border": "240 3.7% 15.9%",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full bg-[#050505] text-white overflow-hidden font-inter">
        <Sidebar variant="floating" className="border-r border-white/5 bg-black">
          <SidebarHeader className="p-6">
            <Link href="/" className="flex items-center gap-2 px-2">
              <span className="text-xl font-display font-black tracking-tighter">
                <span className="text-[#9b58ff]">thats</span>
                <span className="text-yellow-400">.</span>
                <span className="text-white">wtf</span>
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarGroup>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      isActive={item.active}
                      className={`h-11 px-4 rounded-xl transition-all duration-200 ${
                        item.active 
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(155,88,255,0.15)]" 
                        : "hover:bg-white/5 text-muted-foreground hover:text-white"
                      }`}
                    >
                      <button className="flex items-center gap-3 w-full">
                        <item.icon className={`w-4.5 h-4.5 ${item.active ? "text-primary" : ""}`} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-6 border-t border-white/5 space-y-4">
            <div className="px-2 py-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/5 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Crown className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Pro Access</p>
                  <p className="text-[10px] text-muted-foreground">Unlock custom domains</p>
                </div>
              </div>
              <Button size="sm" className="w-full h-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-[11px]">
                Upgrade Now
              </Button>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-10 px-4 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-xl"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut className="w-4 h-4 mr-3" />
              <span className="font-medium">Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0 bg-[#050505] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />
          
          <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white transition-colors" />
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <nav className="hidden sm:flex items-center gap-1 text-sm font-medium">
                <span className="text-muted-foreground">Dashboard</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                <span className="text-white">Overview</span>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">System Live</span>
              </div>
              <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 gap-2">
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Link href={`/u/${user.username}`}>
                <Button size="sm" className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 gap-2 shadow-[0_0_20px_rgba(155,88,255,0.3)]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </Button>
              </Link>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto relative">
            <div className="p-8 lg:p-12 max-w-[1400px] mx-auto space-y-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Sparkles className="w-3 h-3" />
                    Welcome Back
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-display font-black tracking-tight text-white mb-4">
                    Hey, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{user.username}</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-xl leading-relaxed font-medium">
                    Your digital presence is growing. You've earned <span className="text-white font-bold">{user.xp || 0} XP</span> this week and leveled up to <span className="text-primary font-bold">Tier {user.level || 1}</span>.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="h-12 px-6 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-bold gap-2">
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </Button>
                  <Button className="h-12 px-6 rounded-2xl bg-white text-black hover:bg-white/90 font-black gap-2">
                    <Plus className="w-4 h-4" /> Add Link
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {accountCards.map((card, i) => (
                  <Card 
                    key={i}
                    className="p-8 border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-white/20 transition-all duration-300 group rounded-[2rem] overflow-hidden relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                          <card.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-white transition-colors">
                          {card.label}
                        </div>
                      </div>
                      <div className="mt-auto">
                        <h3 className="text-3xl font-display font-black text-white mb-2 leading-none">
                          {card.value}
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium group-hover:text-white/70 transition-colors">
                          {card.subtext}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-8 border-white/5 bg-[#0a0a0a] rounded-[2.5rem] relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-2xl font-display font-black text-white mb-1">Traffic Activity</h2>
                      <p className="text-sm text-muted-foreground font-medium">Profile views over the last 7 days</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest">
                      Export CSV
                    </Button>
                  </div>
                  
                  <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9b58ff" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#9b58ff" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#ffffff30" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                          dy={10}
                        />
                        <YAxis 
                          stroke="#ffffff30" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                          dx={-10}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#111', 
                            border: '1px solid #333', 
                            borderRadius: '12px',
                            fontSize: '12px',
                            color: '#fff'
                          }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="views" 
                          stroke="#9b58ff" 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#colorViews)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex gap-8">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Unique Visitors</p>
                        <p className="text-xl font-display font-black text-white">0</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Avg. Time</p>
                        <p className="text-xl font-display font-black text-white">0s</p>
                      </div>
                    </div>
                    <Link href="/analytics">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 font-bold text-xs uppercase tracking-widest">
                        Full Analytics <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>

                <Card className="p-8 border-white/5 bg-[#0a0a0a] rounded-[2.5rem] flex flex-col">
                  <div className="mb-10">
                    <h2 className="text-2xl font-display font-black text-white mb-1">Quick Tasks</h2>
                    <p className="text-sm text-muted-foreground font-medium">Complete these to earn 500 XP</p>
                  </div>

                  <div className="flex-1 space-y-4">
                    {completionTasks.map((task, i) => (
                      <div 
                        key={i} 
                        className={`p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                          task.done 
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500/60" 
                          : "bg-white/5 border-white/5 hover:border-white/20 text-white"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                            task.done 
                            ? "bg-emerald-500/10 border-emerald-500/30" 
                            : "bg-white/5 border-white/10 group-hover:border-primary/50"
                          }`}>
                            {task.done ? <CheckCircle className="w-4 h-4" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/40" />}
                          </div>
                          <span className={`text-sm font-bold tracking-tight ${task.done ? "line-through" : ""}`}>
                            {task.title}
                          </span>
                        </div>
                        {!task.done && <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1" />}
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 p-6 rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-accent/5 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold text-white uppercase tracking-widest">Level Progress</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Lvl {(user.level || 1) + 1}</p>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((user.xp || 0) % 1000) / 10}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <p className="text-[9px] text-muted-foreground text-center font-bold uppercase tracking-wider">
                      {1000 - ((user.xp || 0) % 1000)} XP until next level
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
