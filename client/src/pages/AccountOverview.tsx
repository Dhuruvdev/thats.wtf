import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit2, 
  Users, 
  Hash, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  Download,
  Github,
  Settings,
  Share2,
  HelpCircle,
  LogOut,
  Palette,
  Link as LinkIcon,
  Crown,
  ImagePlus,
  Grid,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";

export default function AccountOverview() {
  const [profileCompletion] = useState(20);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const sidebarItems = [
    { icon: BarChart3, label: "Overview", id: "overview" },
    { icon: BarChart3, label: "Analytics", id: "analytics" },
    { icon: Badge, label: "Badges", id: "badges" },
    { icon: Settings, label: "Settings", id: "settings" },
    { icon: Palette, label: "Customize", id: "customize" },
    { icon: LinkIcon, label: "Links", id: "links" },
    { icon: Crown, label: "Premium", id: "premium" },
    { icon: ImagePlus, label: "Image Host", id: "imagehost" },
    { icon: Grid, label: "Templates", id: "templates" },
  ];

  const accountCards = [
    {
      label: "Username",
      value: "dhuruv",
      subtext: "Change available now",
      icon: Edit2,
      color: "from-violet-600/20 to-violet-600/5"
    },
    {
      label: "Alias",
      value: "Unavailable",
      subtext: "Premium Only",
      icon: Users,
      color: "from-violet-600/20 to-violet-600/5"
    },
    {
      label: "UID",
      value: "1,247,941",
      subtext: "Joined after 100% of all users",
      icon: Hash,
      color: "from-violet-600/20 to-violet-600/5"
    },
    {
      label: "Profile Views",
      value: "0",
      subtext: "+0 views since last 7 days",
      icon: Eye,
      color: "from-violet-600/20 to-violet-600/5"
    }
  ];

  const completionTasks = [
    { title: "Upload An Avatar", done: true },
    { title: "Add A Description", done: false },
    { title: "Link Discord Account", done: false },
    { title: "Add Socials", done: false },
    { title: "Enable 2FA", done: false },
  ];

  const accountActions = [
    { label: "Change Username", icon: Edit2 },
    { label: "Change Display Name", icon: Users },
    { label: "Want more? Unlock as Premium", icon: Crown, highlight: true },
  ];

  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full bg-background">
        {/* Sidebar */}
        <Sidebar className="border-r border-white/5 bg-black/50 backdrop-blur-md">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs text-muted-foreground uppercase">
                that's.wtf
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton asChild>
                          <button className="flex items-center gap-2 text-white hover:text-primary transition-colors">
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Help & Actions */}
            <SidebarGroup className="mt-auto">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-2 px-2">
                    Have a question or need support?
                  </p>
                  <Button className="w-full justify-start bg-blue-600/20 hover:bg-blue-600/30 text-white border border-blue-600/30">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help Center
                  </Button>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 px-2">
                    Check out your page
                  </p>
                  <Button className="w-full justify-start bg-purple-600/20 hover:bg-purple-600/30 text-white border border-purple-600/30">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    My Page
                  </Button>
                </div>
                <Button className="w-full justify-start bg-purple-600/20 hover:bg-purple-600/30 text-white border border-purple-600/30">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Your Profile
                </Button>
              </div>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-white/5 bg-black/30 backdrop-blur-md px-8 py-4 flex items-center justify-between sticky top-0 z-40">
            <SidebarTrigger data-testid="button-sidebar-toggle" className="text-white" />
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">dhuruv</span>
              <Button size="sm" variant="outline">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 max-w-7xl">
              {/* Background Gradients */}
              <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[50%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px]" />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Header */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h1 className="text-4xl font-display font-black text-white mb-2">
                    Account Overview
                  </h1>
                  <p className="text-muted-foreground">Manage your profile and account settings</p>
                </motion.div>

                {/* Account Cards Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {accountCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                      <Card 
                        key={i}
                        className={`p-6 border-white/10 bg-gradient-to-br ${card.color}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <p className="text-xs font-semibold text-muted-foreground uppercase">{card.label}</p>
                          <Icon className="w-4 h-4 text-white/40" />
                        </div>
                        <h3 className="text-2xl font-display font-black text-white mb-1">
                          {card.value}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {card.subtext}
                        </p>
                      </Card>
                    );
                  })}
                </motion.div>

                {/* Account Statistics Section */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h2 className="text-2xl font-display font-black text-white mb-4">
                    Account Statistics
                  </h2>
                  
                  {/* Profile Completion */}
                  <Card className="p-6 border-white/10 bg-gradient-to-br from-violet-600/20 to-violet-600/5 mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-display font-black text-white mb-1">
                          Profile Completion
                        </h3>
                        <p className="text-sm text-muted-foreground">{profileCompletion}% completed</p>
                      </div>
                      <Badge variant="secondary">{profileCompletion}%</Badge>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-2 mb-6 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${profileCompletion}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>

                    {/* Completion Tasks */}
                    <div className="space-y-3">
                      {completionTasks.map((task, i) => (
                        <div key={i} className="flex items-center gap-3 group hover:bg-white/5 p-2 rounded-md transition-colors">
                          {task.done ? (
                            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={task.done ? "text-muted-foreground line-through" : "text-white"}>
                            {task.title}
                          </span>
                          {!task.done && (
                            <ChevronRightIcon className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                {/* Manage Account */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h2 className="text-2xl font-display font-black text-white mb-4">
                    Manage your account
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">Change your name, username and more.</p>
                  
                  <div className="space-y-3">
                    {accountActions.map((action, i) => (
                      <Button
                        key={i}
                        className={`w-full justify-start h-auto py-3 px-4 rounded-lg ${
                          action.highlight
                            ? "bg-purple-600/30 hover:bg-purple-600/40 border border-purple-600/30 text-white"
                            : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                        }`}
                        variant={action.highlight ? "default" : "outline"}
                      >
                        <action.icon className="w-4 h-4 mr-3" />
                        <span className="flex-1 text-left text-sm font-medium">{action.label}</span>
                        <ChevronRightIcon className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                </motion.div>

                {/* Connections */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h2 className="text-2xl font-display font-black text-white mb-4">
                    Connections
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">Link your Discord account to thats.wtf</p>
                  
                  <Button className="w-full bg-blue-600/30 hover:bg-blue-600/40 border border-blue-600/30 text-white justify-start">
                    <Github className="w-4 h-4 mr-3" />
                    <span className="flex-1 text-left">Connect Discord</span>
                    <ChevronRightIcon className="w-4 h-4" />
                  </Button>
                </motion.div>

                {/* Account Analytics */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl font-display font-black text-white mb-4">
                    Account Analytics
                    <Badge className="ml-2" variant="secondary">View More</Badge>
                  </h2>
                  
                  <Card className="p-8 border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
                    <h3 className="text-lg font-display font-bold text-white mb-4">
                      Profile Views in the last 7 days
                    </h3>
                    <div className="flex items-center justify-center h-48 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-muted-foreground">No data available yet</p>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}
