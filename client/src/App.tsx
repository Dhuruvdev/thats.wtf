import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProfileProvider } from "@/context/ProfileContext";
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
import ProfilePage from "@/pages/ProfilePage";

import LoadingPage from "@/components/LoadingPage";

function ProtectedRoute({ component: Component }: any) {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Auth />;
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
      <Route path="/register" component={Auth} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route path="/user" component={ProfilePage} />
      <Route path="/~">
        <ProtectedRoute component={AccountOverview} />
      </Route>
      <Route path="/lab">
        <ProtectedRoute component={LabRedesign} />
      </Route>
      <Route path="/templates" component={Templates} />
      <Route path="/analytics">
        <ProtectedRoute component={Analytics} />
      </Route>
      <Route path="/pricing" component={Pricing} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/:username" component={Profile} />
      <Route path="/">
        {user ? <LabRedesign /> : <Home />}
      </Route>
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
      <ProfileProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ProfileProvider>
    </QueryClientProvider>
  );
}

export default App;
