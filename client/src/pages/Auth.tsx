import { useLogin, useRegister } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { LoginWizard } from "@/components/LoginWizard";
import LoadingPage from "@/components/LoadingPage";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [, setLocation] = useLocation();
  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  const { mutateAsync: register, isPending: isRegisterPending } = useRegister();
  const { toast } = useToast();

  if (user) {
    window.location.href = "/lab";
    return null;
  }

  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        // The field is labeled "Email" but the backend accepts both
        await login({ username: data.username, password: data.password });
        window.location.href = "/lab";
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
