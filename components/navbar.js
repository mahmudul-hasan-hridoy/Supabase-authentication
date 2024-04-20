"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import supabase from "@/utils/supabase";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const router = useRouter();

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
    <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
      <div>
        <a href="/" className="text-2xl font-bold">
          My App
        </a>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <Popover>
            <PopoverTrigger>
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
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <p className="mb-2">
                Name: {user.user_metadata.full_name || user.email}
              </p>
              <p className="mb-2">Email: {user.email}</p>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <Button onClick={() => router.push("/signup")} variant="outline">
            Sign Up
          </Button>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
