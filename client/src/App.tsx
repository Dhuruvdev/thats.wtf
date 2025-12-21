import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GenZHeader } from "@/components/GenZHeader";
import { useUser } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import VerifyEmail from "@/pages/VerifyEmail";
import Profile from "@/pages/Profile";
import Lab from "@/pages/Lab";
import Templates from "@/pages/Templates";
import Analytics from "@/pages/Analytics";
import CardNavDemo from "@/pages/CardNavDemo";
import AccountOverview from "@/pages/AccountOverview";

function ProtectedRoute({ component: Component }: any) {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <VerifyEmail />;
  }

  return <Component />;
}

function Router() {
  const { data: user, isLoading } = useUser();

  return (
    <Switch>
      <Route path="/login" component={Auth} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route path="/u/:username" component={Profile} />
      <Route path="/">
        {!isLoading && !user ? <Home /> : <ProtectedRoute component={() => <div className="min-h-screen bg-background flex items-center justify-center">Dashboard</div>} />}
      </Route>
      <Route path="/~" component={AccountOverview} />
      <Route path="/lab" component={Lab} />
      <Route path="/templates" component={Templates} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/cardnav-demo" component={CardNavDemo} />
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
