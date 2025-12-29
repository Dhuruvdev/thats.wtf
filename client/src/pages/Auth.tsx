import { useLogin, useRegister, useUser } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { LoginWizard } from "@/components/LoginWizard";
import LoadingPage from "@/components/LoadingPage";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function Auth() {
  const { data: user, isLoading } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [, setLocation] = useLocation();
  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  const { mutateAsync: register, isPending: isRegisterPending } = useRegister();
  const { toast } = useToast();

  // Auto-login: redirect if user exists
  useEffect(() => {
    if (user && !isLoading) {
      setLocation("/lab");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (user) {
    return null;
  }

  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        await login({ username: data.username, password: data.password });
        setLocation("/lab");
      } else {
        await register({ username: data.username, email: data.email, password: data.password });
        toast({
          title: "Registration successful",
          description: "Please sign in with your new account.",
        });
        setIsLogin(true);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      });
      throw error;
    }
  };

  if (isLoginPending || isRegisterPending) {
    return <LoadingPage />;
  }

  return (
    <LoginWizard
      isLogin={isLogin}
      onSubmit={onSubmit}
      isPending={isLoginPending || isRegisterPending}
      onToggleMode={() => setIsLogin(!isLogin)}
    />
  );
}
