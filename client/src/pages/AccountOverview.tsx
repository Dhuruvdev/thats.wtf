import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit2, 
  Users, 
  Eye, 
  CheckCircle, 
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
import { motion } from "framer-motion";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Link } from "wouter";
import LoadingPage from "@/components/LoadingPage";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AccountOverview() {
  const { data: user } = useUser();
  const logoutMutation = useLogout();
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
      <div className="flex min-h-screen w-full bg-[#050505] text-white font-inter selection:bg-primary/30 relative overflow-x-hidden">
        {/* Cinematic Background Layer */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <Sidebar variant="inset" className="border-r border-white/5 bg-black/40 backdrop-blur-xl z-50">
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
                      className={`h-11 px-4 rounded-xl transition-all duration-300 ${
                        item.active 
                        ? "bg-primary/15 text-primary border border-primary/20 shadow-[0_0_20px_rgba(155,88,255,0.2)]" 
                        : "hover:bg-white/5 text-muted-foreground hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <item.icon className={`w-4.5 h-4.5 ${item.active ? "text-primary" : ""}`} />
                        <span className="font-bold tracking-tight">{item.label}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-6 border-t border-white/5 space-y-4">
            <div className="px-4 py-5 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-primary/20 border border-primary/30">
                  <Crown className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-wider">Pro Access</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Unlock premium assets</p>
                </div>
              </div>
              <Button size="sm" className="w-full h-9 rounded-xl bg-primary hover:bg-primary/90 text-white font-black text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20">
                Upgrade Now
              </Button>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-11 px-4 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors group"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut className="w-4 h-4 mr-3 group-hover:rotate-12 transition-transform" />
              <span className="font-bold tracking-tight">Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0 bg-[#050505]/50 backdrop-blur-sm relative overflow-hidden z-10">
          <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-2xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2 sm:gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-white transition-colors" />
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <nav className="hidden lg:flex items-center gap-1 text-[11px] font-black uppercase tracking-widest">
                <span className="text-muted-foreground">Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30" />
                <span className="text-white">Overview</span>
              </nav>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Live</span>
              </div>
              <Button variant="outline" size="sm" className="h-9 sm:h-10 px-3 sm:px-5 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 gap-2 font-bold text-xs">
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Share</span>
              </Button>
              <Link href={`/u/${user.username}`}>
                <Button size="sm" className="h-9 sm:h-10 px-3 sm:px-5 rounded-xl bg-primary hover:bg-primary/90 gap-2 font-black shadow-[0_0_30px_rgba(155,88,255,0.3)] transition-all hover:scale-105 active:scale-95 text-xs">
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Preview</span>
                </Button>
              </Link>
            </div>
          </header>

          <main className="flex-1 relative">
            <div className="p-4 sm:p-8 lg:p-12 max-w-[1400px] mx-auto space-y-8 sm:space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                    <Sparkles className="w-3 h-3" />
                    Neural Dashboard
                  </div>
                  <h1 className="text-4xl sm:text-6xl lg:text-8xl font-display font-black tracking-tighter text-white leading-[0.85] lg:leading-[0.8]">
                    Welcome, <br />
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x text-glow">{user.username}</span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed font-medium">
                    You've earned <span className="text-white font-bold">{user.xp || 0} XP</span> and reached <span className="text-primary font-bold tracking-tight">Tier {user.level || 1}</span> status. Your digital reach is expanding.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-bold gap-3 transition-all">
                    <Edit2 className="w-4.5 h-4.5" /> Edit Profile
                  </Button>
                  <Button className="h-12 sm:h-14 px-6 sm:px-8 rounded-2xl bg-white text-black hover:bg-white/90 font-black gap-3 shadow-2xl transition-all hover:scale-105 active:scale-95">
                    <Plus className="w-4.5 h-4.5" /> Add Link
                  </Button>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {accountCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="group p-6 sm:p-8 border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-white/20 transition-all duration-500 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative h-full">
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8 sm:mb-10">
                          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/30 transition-all group-hover:scale-110">
                            <card.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-white transition-colors">
                            {card.label}
                          </div>
                        </div>
                        <div className="mt-auto space-y-2">
                          <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tighter leading-none">
                            {card.value}
                          </h3>
                          <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider group-hover:text-white/80 transition-colors">
                            {card.subtext}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="lg:col-span-2"
                >
                  <Card className="p-6 sm:p-10 border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] relative overflow-hidden group hover:border-white/10 transition-all duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 sm:mb-12">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-2 tracking-tight">Traffic Matrix</h2>
                        <p className="text-[10px] sm:text-sm text-muted-foreground font-bold uppercase tracking-widest">Real-time profile engagement</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-9 sm:h-10 px-6 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.2em]">
                        Export Matrix
                      </Button>
                    </div>
                    
                    <div className="h-[250px] sm:h-[320px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9b58ff" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#9b58ff" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            stroke="#ffffff20" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            dy={15}
                          />
                          <YAxis 
                            stroke="#ffffff20" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            dx={-15}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#000', 
                              border: '1px solid #222', 
                              borderRadius: '16px',
                              padding: '12px',
                              fontSize: '12px',
                              color: '#fff',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                            }}
                            itemStyle={{ color: '#9b58ff', fontWeight: 'bold' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="views" 
                            stroke="#9b58ff" 
                            strokeWidth={5}
                            fillOpacity={1} 
                            fill="url(#colorViews)" 
                            animationDuration={2000}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/5 flex items-center justify-between">
                      <div className="flex gap-12">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Unique</p>
                          <p className="text-2xl font-display font-black text-white">0</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Retention</p>
                          <p className="text-2xl font-display font-black text-white">0%</p>
                        </div>
                      </div>
                      <Link href="/analytics">
                        <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 font-black text-[10px] uppercase tracking-widest group">
                          Deep Analytics <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="p-6 sm:p-10 border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] flex flex-col h-full group hover:border-white/10 transition-all duration-500">
                    <div className="mb-10 sm:mb-12">
                      <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-2 tracking-tight">Missions</h2>
                      <p className="text-[10px] sm:text-sm text-muted-foreground font-bold uppercase tracking-widest">Gain +500 XP Rewards</p>
                    </div>

                    <div className="flex-1 space-y-4">
                      {completionTasks.map((task, i) => (
                        <div 
                          key={i} 
                          className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                            task.done 
                            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500/40" 
                            : "bg-white/5 border-white/10 hover:border-primary/40 hover:bg-primary/5 text-white"
                          }`}
                        >
                          <div className="flex items-center gap-4 sm:gap-5">
                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all ${
                              task.done 
                              ? "bg-emerald-500/10 border-emerald-500/30" 
                              : "bg-white/5 border-white/20 group-hover:border-primary/60 group-hover:scale-110"
                            }`}>
                              {task.done ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/40" />}
                            </div>
                            <span className={`text-xs sm:text-sm font-bold tracking-tight ${task.done ? "line-through opacity-50" : ""}`}>
                              {task.title}
                            </span>
                          </div>
                          {!task.done && <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1" />}
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4 sm:mb-5">
                          <p className="text-[10px] font-black text-white uppercase tracking-widest">Sync Level</p>
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest">Lvl {(user.level || 1) + 1}</p>
                        </div>
                        <div className="h-2 w-full sm:h-2.5 bg-black/40 rounded-full overflow-hidden mb-3 border border-white/5">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${((user.xp || 0) % 1000) / 10}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                        </div>
                        <p className="text-[9px] text-muted-foreground text-center font-black uppercase tracking-[0.2em]">
                          {1000 - ((user.xp || 0) % 1000)} XP to Next Sync
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
