import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Lab() {
  const { toast } = useToast();
  const [config, setConfig] = useState(JSON.stringify({
    displayName: "Identity Demo",
    bio: "Extreme customization testing",
    themeConfig: {
      background: { type: "animated", value: "#0a0a0a", overlayOpacity: 0.8 },
      cursor: { type: "trail", color: "#7c3aed" },
      audio: { url: "", enabled: false },
      intro: { enabled: true, type: "glitch" }
    }
  }, null, 2));

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("PATCH", "/api/user", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Identity Updated" });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    }
  });

  return (
    <div className="dopamine-container">
      <div className="identity-block w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Identity Builder (JSON)</h1>
        <Textarea
          value={config}
          onChange={(e) => setConfig(e.target.value)}
          className="min-h-[400px] font-mono bg-black/50 text-accent"
        />
        <div className="mt-4 flex gap-2">
          <Button 
            onClick={() => mutation.mutate(JSON.parse(config))}
            disabled={mutation.isPending}
          >
            Deploy Identity
          </Button>
          <Button variant="outline" onClick={() => {
            const blob = new Blob([config], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'identity.json';
            a.click();
          }}>
            Export JSON
          </Button>
        </div>
      </div>
    </div>
  );
}
