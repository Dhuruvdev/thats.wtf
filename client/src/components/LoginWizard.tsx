import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Eye, EyeOff, Zap } from "lucide-react";

const registerSchema = z.object({
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the Terms & Privacy Policy"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

interface LoginWizardProps {
  isLogin: boolean;
  onSubmit: (data: any) => Promise<void>;
  isPending: boolean;
  error?: string;
  onToggleMode: () => void;
}

export function LoginWizard({ isLogin, onSubmit, isPending, error, onToggleMode }: LoginWizardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formInstance = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: isLogin ? {
      username: "",
      password: "",
    } : {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
    } catch (error) {
      formInstance.setError("root", {
        message: (error as Error).message
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: "6s" }} />
      </div>

      {/* Form Card */}
      <div className="w-full max-w-sm bg-card/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl relative z-10 p-8 space-y-6">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Zap className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Sign in to your account" : "Join our community"}
          </p>
        </div>

        {/* Form */}
        <Form {...formInstance}>
          <form onSubmit={formInstance.handleSubmit(handleSubmit)} className="space-y-4">
            
            {/* Email (Register only) */}
            {!isLogin && (
              <FormField
                control={formInstance.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-white/80">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                        className="bg-secondary/50 border-white/5 focus:border-primary/50 rounded-lg"
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Username */}
            <FormField
              control={formInstance.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-white/80">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isLogin ? "Enter your username" : "Choose a username"}
                      {...field}
                      className="bg-secondary/50 border-white/5 focus:border-primary/50 rounded-lg"
                      data-testid="input-username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={formInstance.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-white/80">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        className="bg-secondary/50 border-white/5 focus:border-primary/50 rounded-lg pr-10"
                        data-testid="input-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                        data-testid="button-toggle-password-visibility"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <FormField
                control={formInstance.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-white/80">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          className="bg-secondary/50 border-white/5 focus:border-primary/50 rounded-lg pr-10"
                          data-testid="input-confirm-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                          data-testid="button-toggle-confirm-visibility"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Terms Checkbox (Register only) */}
            {!isLogin && (
              <FormField
                control={formInstance.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0 mt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="rounded-md"
                        data-testid="checkbox-agree-terms"
                      />
                    </FormControl>
                    <FormLabel className="text-xs text-muted-foreground font-normal cursor-pointer">
                      I agree to Terms & Privacy Policy
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Error Message */}
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20" data-testid="error-message">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-white rounded-lg h-auto py-3 font-semibold" 
              disabled={isPending}
              data-testid={isLogin ? "button-login" : "button-sign-up"}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </Button>
          </form>
        </Form>

        {/* Toggle Mode */}
        <div className="text-center pt-2 border-t border-white/5">
          <p className="text-xs text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
              data-testid="button-toggle-auth-mode"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
