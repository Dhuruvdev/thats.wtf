import { useMutation } from "@tanstack/react-query";

interface PasskeyRegisterOptions {
  username: string;
  displayName?: string;
}

interface PasskeyLoginOptions {
  username: string;
}

export function usePasskeyRegister() {
  return useMutation({
    mutationFn: async (options: PasskeyRegisterOptions) => {
      // For now, this is a placeholder for future WebAuthn registration
      // The server will need to support WebAuthn/Passkey registration
      const response = await fetch("/api/passkey/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Passkey registration failed");
      }

      return response.json();
    },
  });
}

export function usePasskeyLogin() {
  return useMutation({
    mutationFn: async (options: PasskeyLoginOptions) => {
      // For now, this is a placeholder for future WebAuthn authentication
      const response = await fetch("/api/passkey/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Passkey login failed");
      }

      return response.json();
    },
  });
}
