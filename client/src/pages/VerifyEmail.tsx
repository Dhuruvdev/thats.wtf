import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useVerifyEmail } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Mail } from "lucide-react";

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const { mutate: verify, isPending, isError, error, isSuccess } = useVerifyEmail();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      verify(tokenParam);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setLocation("/lab"), 2000);
    }
  }, [isSuccess, setLocation]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <Card className="relative w-full max-w-md border-white/10 bg-black/40 backdrop-blur-md p-8">
        <div className="text-center">
          {isSuccess ? (
            <>
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                Email Verified!
              </h1>
              <p className="text-muted-foreground mb-6">
                Your account is ready. Redirecting to dashboard...
              </p>
            </>
          ) : isError ? (
            <>
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                Verification Failed
              </h1>
              <p className="text-muted-foreground mb-6">
                {error?.message || "Invalid or expired verification link"}
              </p>
              <Button onClick={() => setLocation("/login")} className="w-full">
                Back to Login
              </Button>
            </>
          ) : (
            <>
              <Mail className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                Verifying Email...
              </h1>
              <p className="text-muted-foreground">
                {isPending ? "Please wait while we verify your email." : "Check your email for verification link"}
              </p>
              {!token && (
                <div className="mt-8 p-4 bg-primary/10 rounded-md border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-4">
                    A verification email has been sent to your inbox. Click the link in the email to verify your account.
                  </p>
                  <Button variant="outline" onClick={() => setLocation("/login")}>
                    Back to Login
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
