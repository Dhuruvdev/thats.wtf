import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight, Check } from "lucide-react";

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens")
});

const passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const confirmPasswordSchema = z.object({
  confirmPassword: z.string(),
}).refine((data) => data.confirmPassword, {
  message: "Please confirm your password",
  path: ["confirmPassword"],
});

type WizardStep = "username" | "password" | "confirm" | "security";

interface LoginWizardProps {
  isLogin: boolean;
  onSubmit: (data: any) => Promise<void>;
  isPending: boolean;
  error?: string;
  onToggleMode: () => void;
}

export function LoginWizard({ isLogin, onSubmit, isPending, error, onToggleMode }: LoginWizardProps) {
  const [step, setStep] = useState<WizardStep>(isLogin ? "username" : "username");
  const [collectedData, setCollectedData] = useState<Record<string, any>>({});

  // Step 1: Username
  const usernameForm = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: collectedData.username || "" },
  });

  // Step 2: Password
  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: collectedData.password || "" },
  });

  // Step 3: Confirm (Register only)
  const confirmForm = useForm({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: { confirmPassword: "" },
  });

  const handleUsernameNext = async (data: any) => {
    setCollectedData({ ...collectedData, username: data.username });
    setStep("password");
  };

  const handlePasswordNext = async (data: any) => {
    setCollectedData({ ...collectedData, password: data.password });
    if (isLogin) {
      // Proceed to login
      await onSubmit({ username: collectedData.username, password: data.password });
    } else {
      // Go to confirmation step
      setStep("confirm");
    }
  };

  const handleConfirmSubmit = async (data: any) => {
    if (data.confirmPassword !== collectedData.password) {
      confirmForm.setError("confirmPassword", { message: "Passwords don't match" });
      return;
    }
    // Proceed to registration
    await onSubmit({
      username: collectedData.username,
      password: collectedData.password,
      confirmPassword: data.confirmPassword,
    });
  };

  const handleBack = () => {
    if (step === "password") {
      setStep("username");
    } else if (step === "confirm") {
      setStep("password");
    } else if (step === "security") {
      setStep(isLogin ? "password" : "confirm");
    }
  };

  const progress = {
    username: 25,
    password: isLogin ? 75 : 50,
    confirm: 75,
    security: 100,
  }[step];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: "6s" }} />
      </div>

      <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl relative z-10 animate-enter">
        {/* Progress bar */}
        <div className="h-1 bg-secondary/30">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-display font-bold text-2xl mb-2">
            W
          </div>
          <CardTitle className="text-2xl font-display font-bold">
            {step === "username"
              ? isLogin
                ? "Welcome Back"
                : "Create Your Identity"
              : step === "password"
                ? isLogin
                  ? "Enter Password"
                  : "Choose a Password"
                : "Confirm Password"}
          </CardTitle>
          <CardDescription>
            {step === "username"
              ? isLogin
                ? "Enter your username to access your lab"
                : "This will be your unique username at thats.wtf/username"
              : step === "password"
                ? "Keep it secure"
                : "Make sure it matches"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step indicators */}
          <div className="flex gap-2 justify-center">
            <div className={`w-2 h-2 rounded-full transition-all ${step === "username" ? "bg-primary w-8" : "bg-secondary/50"}`} />
            <div className={`w-2 h-2 rounded-full transition-all ${step === "password" ? "bg-primary w-8" : "bg-secondary/50"}`} />
            {!isLogin && (
              <div className={`w-2 h-2 rounded-full transition-all ${step === "confirm" ? "bg-primary w-8" : "bg-secondary/50"}`} />
            )}
          </div>

          {/* Username Step */}
          {step === "username" && (
            <Form {...usernameForm}>
              <form onSubmit={usernameForm.handleSubmit(handleUsernameNext)} className="space-y-4">
                <FormField
                  control={usernameForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="cyber_user"
                          {...field}
                          className="bg-secondary/50 border-white/5 focus:border-primary/50"
                          data-testid="input-username"
                          autoFocus
                        />
                      </FormControl>
                      <FormMessage />
                      {field.value && (
                        <div className="text-xs text-muted-foreground pt-1">
                          Your profile: thats.wtf/{field.value}
                        </div>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending} data-testid="button-next-username">
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <>
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </>}
                </Button>
              </form>
            </Form>
          )}

          {/* Password Step */}
          {step === "password" && (
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordNext)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          className="bg-secondary/50 border-white/5 focus:border-primary/50"
                          data-testid="input-password"
                          autoFocus
                          placeholder="••••••••"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleBack}
                    data-testid="button-back"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isPending}
                    data-testid="button-next-password"
                  >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : isLogin ? "Login" : <>
                      Next <ArrowRight className="w-4 h-4 ml-2" />
                    </>}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* Confirm Password Step (Register only) */}
          {step === "confirm" && !isLogin && (
            <Form {...confirmForm}>
              <form onSubmit={confirmForm.handleSubmit(handleConfirmSubmit)} className="space-y-4">
                <FormField
                  control={confirmForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          className="bg-secondary/50 border-white/5 focus:border-primary/50"
                          data-testid="input-confirm-password"
                          autoFocus
                          placeholder="••••••••"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleBack}
                    data-testid="button-back-confirm"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isPending}
                    data-testid="button-create-account"
                  >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <>
                      Create <Check className="w-4 h-4 ml-2" />
                    </>}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md" data-testid="error-message">
              {error}
            </div>
          )}

          {/* Toggle mode */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onToggleMode}
              className="text-sm text-muted-foreground hover:text-white transition-colors"
              data-testid="button-toggle-auth-mode"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
