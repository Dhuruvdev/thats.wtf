import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin, useRegister } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms & Privacy Policy",
  }),
}).refine((data) => data.password, {
  message: "Password is required",
  path: ["password"],
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();
  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  const { mutateAsync: register, isPending: isRegisterPending } = useRegister();

  const form = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        await login({ username: data.username, password: data.password });
        setLocation("/lab");
      } else {
        await register({ username: data.username, email: data.email, password: data.password });
        setLocation("/verify-email");
      }
    } catch (error) {
      form.setError("root", { message: (error as Error).message });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <Card className="relative w-full max-w-md border-white/10 bg-black/40 backdrop-blur-md p-8 rounded-2xl">
        {!isLogin && (
          <div className="flex justify-center mb-6">
            <img src="/icon.png" alt="That's.WTF" className="w-16 h-16" />
          </div>
        )}
        
        <h1 className="text-2xl font-bold text-white text-center mb-1">
          {isLogin ? "Sign In" : "Create a guns.lol account"}
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-8">
          {isLogin ? "Welcome back" : "Join the community"}
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                        <Input
                          type="email"
                          placeholder="Email"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground pl-10"
                          data-testid="input-email"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground pl-10 pr-10"
                        data-testid="input-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                        data-testid="button-toggle-password"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {!isLogin && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm">Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                        <div className="absolute left-10 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">guns.lol/</div>
                        <Input
                          placeholder="username"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground pl-24"
                          data-testid="input-username"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}

            {isLogin && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm">Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                        <Input
                          placeholder="username"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground pl-10"
                          data-testid="input-username"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}

            {!isLogin && (
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 mt-5">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-terms"
                        className="border-white/20"
                      />
                    </FormControl>
                    <FormLabel className="text-muted-foreground text-sm font-normal cursor-pointer">
                      I agree to ToS & Privacy Policy
                    </FormLabel>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}

            {form.formState.errors.root && (
              <div className="text-xs text-destructive bg-destructive/10 p-3 rounded border border-destructive/20">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoginPending || isRegisterPending}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-lg mt-6"
              data-testid={`button-${isLogin ? 'signin' : 'signup'}`}
            >
              {isLoginPending || isRegisterPending ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                form.reset();
              }}
              className="ml-1 text-primary hover:text-primary/80 font-semibold transition-colors"
              data-testid={`button-toggle-${isLogin ? 'signup' : 'signin'}`}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
