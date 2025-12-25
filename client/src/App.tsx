import { Switch, Route, useLocation } from "wouter";
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
import Pricing from "@/pages/Pricing";
import Blog from "@/pages/Blog";
import About from "@/pages/About";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Loading from "@/pages/Loading";
import ProfileCardDemo from "@/pages/ProfileCardDemo";
import LabRedesign from "@/pages/LabRedesign";

import LoadingPage from "@/components/LoadingPage";

function ProtectedRoute({ component: Component }: any) {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <VerifyEmail />;
  }

  return <Component />;
}

function Router() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Switch>
      <Route path="/login" component={Auth} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route path="/u/:username" component={Profile} />
      <Route path="/">
        {!isLoading && !user ? <Home /> : <AccountOverview />}
      </Route>
      <Route path="/~" component={AccountOverview} />
      <Route path="/lab" component={LabRedesign} />
      <Route path="/lab-old" component={Lab} />
      <Route path="/templates" component={Templates} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/cardnav-demo" component={CardNavDemo} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/loading" component={Loading} />
      <Route path="/profile-card" component={ProfileCardDemo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAuthPage = location === "/login";
  const isCardNavDemoPage = location === "/cardnav-demo";
  const isHomePage = location === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
