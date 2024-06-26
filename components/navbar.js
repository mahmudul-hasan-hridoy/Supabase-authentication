"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import supabase from "@/lib/supabase";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, Settings, LogOut } from "lucide-react";
import { ModeToggle } from "./modetoogle";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
    };

    getUser();

    const authSubscription = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser || null);
      },
    );

    setSubscription(authSubscription);

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      setUser(null);
      console.log("Signed out successfully");
    }
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-background shadow-md">
      <div>
        <a href="/" className="text-2xl font-bold text-black dark:text-white">
          Supabase
        </a>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={
                    user.user_metadata.provider === "github"
                      ? user.user_metadata.avatar_url
                      : user.user_metadata.picture
                  }
                  alt={user.user_metadata.full_name || user.email}
                />
                <AvatarFallback className="font-bold">
                  {(user.user_metadata.full_name || user.email)
                    .charAt(0)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {user.user_metadata.full_name || user.email}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
              <Settings className="mr-1"/>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  onClick={handleLogout}
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <LogOut className="mr-1" />
                  Log out                 
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" className="text-black dark:text-white">
            <Link href="/signup">Sign Up</Link>
          </Button>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <AlignJustify />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetDescription className="block flex flex-col gap-2 mt-5">
                <Button
                  asChild
                  variant="outline"
                  className={`w-full ${
                    pathname === "/" ? "bg-indigo-500 text-white" : ""
                  }`}
                >
                  <Link href="/login">Home</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={`w-full ${
                    pathname === "/login" ? "bg-indigo-500 text-white" : ""
                  }`}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={`w-full ${
                    pathname === "/signup" ? "bg-indigo-500 text-white" : ""
                  }`}
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <ModeToggle />
      </div>
    </nav>
  );
}
