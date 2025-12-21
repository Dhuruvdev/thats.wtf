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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-display font-bold text-xl group-hover:scale-110 transition-transform">
            W
          </div>
          <span className="font-display font-bold text-lg tracking-tighter group-hover:text-primary transition-colors">
            that's.wtf
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Desktop Nav Items */}
              <div className="hidden md:flex items-center gap-1 mr-4">
                <Link href={`/u/${user.username}`}>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${location.startsWith('/u/') ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}>
                    Profile
                  </div>
                </Link>
                <Link href="/lab">
                  <div className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${location === '/lab' ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}>
                    The Lab
                  </div>
                </Link>
              </div>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden ring-2 ring-transparent hover:ring-primary transition-all">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.username} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-secondary flex items-center justify-center">
                        <span className="text-sm font-bold">{user.username.slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-white/10">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName || user.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
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
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:bg-destructive/10 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/auth">
              <Button size="sm" className="font-display font-semibold bg-white text-black hover:bg-white/90 rounded-full px-6">
                Connect Identity <Zap className="w-4 h-4 ml-2 fill-current" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
