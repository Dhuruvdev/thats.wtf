import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  User as UserIcon, 
  Settings, 
  LogOut, 
  Zap,
  LayoutGrid
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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-display font-bold text-lg group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
            W
          </div>
          <span className="font-display font-bold text-base tracking-tight text-white group-hover:text-primary transition-colors">
            that's.wtf
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Desktop Nav Items - Minimal */}
              <div className="hidden md:flex items-center gap-0">
                <Link href={`/u/${user.username}`}>
                  <div className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${location.startsWith('/u/') ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}>
                    Profile
                  </div>
                </Link>
                <Link href="/lab">
                  <div className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${location === '/lab' ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}>
                    Lab
                  </div>
                </Link>
              </div>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden ring-2 ring-transparent hover:ring-primary/50 transition-all">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.username} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{user.username.slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-white/10">
                  <div className="flex items-center justify-start gap-2 p-2">
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
              <Button size="sm" className="font-display font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full px-6">
                SIGN IN
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
