import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";

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
  username: z.string().min(1, "Email is required"),
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  if (!mounted) {
    return null;
  }

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
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden p-4">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[180px]"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/5 rounded-full blur-[180px]"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* Form Card */}
      <motion.div
        className="w-full max-w-[420px] bg-[#121212]/80 border border-white/5 rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] backdrop-blur-3xl relative z-10 p-10 space-y-8"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          
          {/* Icon */}
          <motion.div className="flex justify-center pt-2" variants={itemVariants}>
            <div className="relative group">
              <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full group-hover:bg-purple-500/30 transition-all duration-500" />
              <motion.img 
                src="/icon.png" 
                alt="Icon" 
                className="w-20 h-20 object-contain relative transition-transform duration-500 group-hover:scale-110"
                whileHover={{ scale: 1.1 }}
                data-testid="img-icon"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div className="text-center space-y-2" variants={itemVariants}>
            <h1 className="text-[28px] font-bold text-white tracking-tight leading-tight">
              {isLogin ? "Log in to your account" : `Create a thats.wtf account`}
            </h1>
            {isLogin && (
              <p className="text-[15px] text-zinc-400 font-medium">
                Welcome back to the future of profiles
              </p>
            )}
          </motion.div>

          {/* Discord Social Login */}
          {isLogin && (
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full h-14 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl flex items-center justify-center gap-3 font-bold text-base transition-all"
                  data-testid="button-discord-login"
                  onClick={() => window.location.href = "/api/auth/discord"}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                  </svg>
                  Discord
                </Button>
              </motion.div>
              
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <span className="relative px-4 bg-[#121212] text-[13px] font-bold text-zinc-500 uppercase tracking-widest">
                  Or with email
                </span>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <Form {...formInstance}>
            <form onSubmit={formInstance.handleSubmit(handleSubmit)} className="space-y-6">
            
              {/* Email (Register only) */}
              {!isLogin && (
                <motion.div variants={itemVariants}>
                  <FormField
                    control={formInstance.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2.5">
                        <FormLabel className="text-[14px] font-bold text-zinc-400 ml-1">Email</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 text-zinc-500 group-focus-within:text-purple-500">
                              <Mail className="w-[18px] h-[18px]" />
                            </div>
                            <Input
                              type="email"
                              placeholder="Email"
                              {...field}
                              className="h-[56px] bg-black/40 border-white/5 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-2xl pl-12 text-white font-medium placeholder:text-zinc-600 transition-all"
                              data-testid="input-email"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[12px] font-bold text-red-400" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {/* Username/Email Field */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={formInstance.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-2.5">
                      <FormLabel className="text-[14px] font-bold text-zinc-400 ml-1">
                        {isLogin ? "Email" : "Username"}
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 text-zinc-500 group-focus-within:text-purple-500">
                            {isLogin ? <Mail className="w-[18px] h-[18px]" /> : <div className="text-[14px] font-black opacity-50">@</div>}
                          </div>
                          <Input
                            placeholder={isLogin ? "Email" : "thats.wtf/"}
                            {...field}
                            className="h-[56px] bg-black/40 border-white/5 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-2xl pl-12 text-white font-medium placeholder:text-zinc-600 transition-all"
                            data-testid="input-username"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[12px] font-bold text-red-400" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={formInstance.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2.5">
                      <div className="flex items-center justify-between ml-1">
                        <FormLabel className="text-[14px] font-bold text-zinc-400">Password</FormLabel>
                        {isLogin && (
                          <button type="button" className="text-[13px] font-bold text-zinc-500 hover:text-white transition-colors">
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <FormControl>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 text-zinc-500 group-focus-within:text-purple-500">
                            <Lock className="w-[18px] h-[18px]" />
                          </div>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...field}
                            className="h-[56px] bg-black/40 border-white/5 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-2xl pl-12 pr-12 text-white font-medium placeholder:text-zinc-600 transition-all"
                            data-testid="input-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                            data-testid="button-toggle-password-visibility"
                          >
                            {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-[12px] font-bold text-red-400" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <motion.div variants={itemVariants}>
                  <FormField
                    control={formInstance.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-2.5">
                        <FormLabel className="text-[14px] font-bold text-zinc-400 ml-1">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 text-zinc-500 group-focus-within:text-purple-500">
                              <Lock className="w-[18px] h-[18px]" />
                            </div>
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              {...field}
                              className="h-[56px] bg-black/40 border-white/5 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-2xl pl-12 pr-12 text-white font-medium placeholder:text-zinc-600 transition-all"
                              data-testid="input-confirm-password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                              data-testid="button-toggle-confirm-visibility"
                            >
                              {showConfirmPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-[12px] font-bold text-red-400" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {/* Terms Checkbox (Register only) */}
              {!isLogin && (
                <motion.div variants={itemVariants}>
                  <FormField
                    control={formInstance.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 py-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="w-5 h-5 rounded-md border-white/10 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            data-testid="checkbox-agree-terms"
                          />
                        </FormControl>
                        <FormLabel className="text-[14px] text-zinc-500 font-bold cursor-pointer hover:text-zinc-400 transition-colors">
                          I agree to <span className="text-zinc-300">ToS</span> & <span className="text-zinc-300">Privacy Policy</span>
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    className="w-full h-14 mt-4 bg-[#1a1a1a] hover:bg-[#222] border border-white/5 text-white rounded-2xl font-bold text-base transition-all shadow-lg" 
                    disabled={isPending}
                    data-testid={isLogin ? "button-login" : "button-sign-up"}
                  >
                    {isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      isLogin ? "Login" : "Sign Up"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </Form>

          {/* Toggle Mode */}
          <motion.div className="text-center pt-2" variants={itemVariants}>
            <p className="text-[15px] font-bold text-zinc-500">
              {isLogin ? "Are you new to thats.wtf? " : "Already have an account? "}
              <button
                type="button"
                onClick={onToggleMode}
                className="text-purple-400 hover:text-purple-300 transition-colors decoration-2 underline-offset-4"
                data-testid="button-toggle-auth-mode"
              >
                {isLogin ? "Create an account" : "Sign In"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
