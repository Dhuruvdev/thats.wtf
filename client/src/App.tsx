import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GenZHeader } from "@/components/GenZHeader";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Lab from "@/pages/Lab";
import Templates from "@/pages/Templates";
import Analytics from "@/pages/Analytics";
import CardNavDemo from "@/pages/CardNavDemo";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/lab" component={Lab} />
      <Route path="/templates" component={Templates} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/cardnav-demo" component={CardNavDemo} />
      <Route path="/u/:username" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GenZHeader />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
