import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Loader2, TrendingUp, Eye, Mouse, Link as LinkIcon } from "lucide-react";

const MOCK_CHART_DATA = [
  { date: "Jan 1", views: 120, clicks: 40 },
  { date: "Jan 2", views: 240, clicks: 140 },
  { date: "Jan 3", views: 220, clicks: 100 },
  { date: "Jan 4", views: 290, clicks: 130 },
  { date: "Jan 5", views: 200, clicks: 80 },
  { date: "Jan 6", views: 250, clicks: 150 },
  { date: "Jan 7", views: 210, clicks: 110 }
];

const MOCK_LINKS_DATA = [
  { name: "Twitter", value: 35 },
  { name: "GitHub", value: 25 },
  { name: "Portfolio", value: 20 },
  { name: "Discord", value: 20 }
];

const COLORS = ["#7c3aed", "#2563eb", "#059669", "#d97706"];

export default function Analytics() {
  const { data: user, isLoading } = useUser();
  const [, setLocation] = useLocation();

  if (!isLoading && !user) {
    setLocation("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />

      <main className="pt-24 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track your profile performance, views, and link clicks.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                    Total Views
                  </div>
                  <div className="text-2xl font-bold text-white">{user?.views.toLocaleString()}</div>
                </div>
                <Eye className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                    Total Clicks
                  </div>
                  <div className="text-2xl font-bold text-white">{user?.clicks.toLocaleString() || "0"}</div>
                </div>
                <Mouse className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                    CTR
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {user?.views > 0 ? (((user?.clicks || 0) / user.views) * 100).toFixed(1) : "0"}%
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                    Links
                  </div>
                  <div className="text-2xl font-bold text-white">0</div>
                </div>
                <LinkIcon className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="links">Top Links</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Views Chart */}
            <Card className="bg-card/50 border-white/5">
              <CardHeader>
                <CardTitle>Views Over Time</CardTitle>
                <CardDescription>Daily profile views for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={MOCK_CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip 
                      contentStyle={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Line type="monotone" dataKey="views" stroke="#7c3aed" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Clicks Chart */}
            <Card className="bg-card/50 border-white/5">
              <CardHeader>
                <CardTitle>Link Clicks Over Time</CardTitle>
                <CardDescription>Total clicks on your links per day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={MOCK_CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip 
                      contentStyle={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Bar dataKey="clicks" fill="#7c3aed" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Links Tab */}
          <TabsContent value="links">
            <Card className="bg-card/50 border-white/5">
              <CardHeader>
                <CardTitle>Top Performing Links</CardTitle>
                <CardDescription>Your most clicked links</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={MOCK_LINKS_DATA} cx="50%" cy="50%" labelLine={false} label={{ fill: "#fff" }} outerRadius={80} fill="#8884d8" dataKey="value">
                        {MOCK_LINKS_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                        labelStyle={{ color: "#fff" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    {MOCK_LINKS_DATA.map((link, i) => (
                      <div key={i} className="p-4 rounded-lg bg-background/50 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-white">{link.name}</span>
                          <span className="text-sm font-bold text-primary">{link.value}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2 transition-all"
                            style={{ width: `${link.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
