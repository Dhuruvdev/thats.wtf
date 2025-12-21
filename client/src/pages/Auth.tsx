import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin, useRegister } from "@/hooks/use-auth";
import { insertUserSchema } from "@shared/schema";
import { useLocation } from "wouter";
import { useState } from "react";
import { LoginWizard } from "@/components/LoginWizard";
import { PacManIntro } from "@/components/PacManIntro";

const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [, setLocation] = useLocation();
  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  const { mutateAsync: register, isPending: isRegisterPending } = useRegister();
  const isPending = isLoginPending || isRegisterPending;

  const form = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        await login({ username: data.username, password: data.password });
        setShowIntro(true);
        setTimeout(() => setLocation("/lab"), 1500);
      } else {
        await register({ username: data.username, password: data.password });
        setIsLogin(true);
        form.reset();
      }
    } catch (error) {
      form.setError("root", { 
        message: (error as Error).message 
      });
    }
  };

  if (showIntro && (isLoginPending || isRegisterPending)) {
    return <PacManIntro />;
  }

  return (
    <LoginWizard
      isLogin={isLogin}
      onSubmit={onSubmit}
      isPending={isPending}
      error={form.formState.errors.root?.message}
      onToggleMode={() => {
        setIsLogin(!isLogin);
        form.reset();
      }}
    />
  );
}
