import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  LogOut, 
  LayoutGrid,
  Search,
  Menu
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/98 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo - Ghost Mascot + KIRO Text */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-white font-display font-bold text-lg group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
            👻
          </div>
          <span className="font-display font-black text-lg tracking-tighter text-white group-hover:text-primary transition-colors hidden sm:block">
            THAT'S.WTF
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Desktop Nav Items - Uppercase */}
              <div className="hidden md:flex items-center gap-8">
                <Link href={`/u/${user.username}`}>
                  <div className={`text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${location.startsWith('/u/') ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}>
                    Profile
                  </div>
                </Link>
                <Link href="/lab">
                  <div className={`text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${location === '/lab' ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}>
                    Lab
                  </div>
                </Link>
                <Link href="/templates">
                  <div className={`text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${location === '/templates' ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}>
                    Templates
                  </div>
                </Link>
                <Link href="/analytics">
                  <div className={`text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${location === '/analytics' ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}>
                    Analytics
                  </div>
                </Link>
              </div>

              {/* Search Icon */}
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-muted-foreground hover:text-white transition-colors" />
              </button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Menu className="w-5 h-5 text-muted-foreground hover:text-white transition-colors" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-white/10">
                  <div className="flex items-center justify-start gap-2 p-2">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.username} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{user.username.slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName || user.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                    <Link href={`/u/${user.username}`}>
                      <LayoutGrid className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                    <Link href="/lab">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Customization Lab</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:bg-destructive/10 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/auth">
              <Button size="sm" className="font-black bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 rounded-full px-6 uppercase tracking-wider text-xs">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
