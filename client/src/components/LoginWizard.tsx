import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

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
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      {/* Form Card */}
      <div className="w-full max-w-sm bg-background border border-white/10 rounded-3xl shadow-2xl relative z-10 p-8 space-y-6">
        
        {/* Icon */}
        <div className="flex justify-center pt-4">
          <img 
            src="/icon.png" 
            alt="Icon" 
            className="w-24 h-24 object-contain"
            data-testid="img-icon"
          />
        </div>

        {/* Logo (Register only) */}
        {!isLogin && (
          <div className="flex justify-center h-8">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-full object-contain"
              data-testid="img-logo"
            />
          </div>
        )}

        {/* Title */}
        <div className="text-center space-y-1">
          {isLogin ? (
            <>
              <h1 className="text-2xl font-bold text-white">
                Welcome Back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white">
                Create Your That's.WTF Account
              </h1>
            </>
          )}
        </div>

        {/* Form */}
        <Form {...formInstance}>
          <form onSubmit={formInstance.handleSubmit(handleSubmit)} className="space-y-5">
            
            {/* Email (Register only) */}
            {!isLogin && (
              <FormField
                control={formInstance.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Email"
                          {...field}
                          className="bg-secondary/70 border-white/10 focus:border-primary/50 rounded-lg pl-10 py-2.5"
                          data-testid="input-email"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Password (always shown, but different order for login vs register) */}
            {isLogin && (
              <FormField
                control={formInstance.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          placeholder="Username"
                          {...field}
                          className="bg-secondary/70 border-white/10 focus:border-primary/50 rounded-lg pl-10 py-2.5"
                          data-testid="input-username"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Password */}
            <FormField
              control={formInstance.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        className="bg-secondary/70 border-white/10 focus:border-primary/50 rounded-lg pl-10 pr-10 py-2.5"
                        data-testid="input-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-white transition-colors"
                        data-testid="button-toggle-password-visibility"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username (Register only) */}
            {!isLogin && (
              <FormField
                control={formInstance.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          placeholder="thats.wtf/"
                          {...field}
                          className="bg-secondary/70 border-white/10 focus:border-primary/50 rounded-lg pl-10 py-2.5"
                          data-testid="input-username"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <FormField
                control={formInstance.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          {...field}
                          className="bg-secondary/70 border-white/10 focus:border-primary/50 rounded-lg pl-10 pr-10 py-2.5"
                          data-testid="input-confirm-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-white transition-colors"
                          data-testid="button-toggle-confirm-visibility"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="rounded"
                        data-testid="checkbox-agree-terms"
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-muted-foreground font-normal cursor-pointer">
                      I agree to ToS & Privacy Policy
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
              className="w-full mt-6 bg-transparent border-2 border-white/30 hover:border-white/50 text-white rounded-lg h-auto py-3 font-semibold transition-all" 
              disabled={isPending}
              data-testid={isLogin ? "button-login" : "button-sign-up"}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                isLogin ? "Sign In" : "Sign Up"
              )}
            </Button>
          </form>
        </Form>

        {/* Toggle Mode */}
        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-white hover:text-primary font-semibold transition-colors"
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
