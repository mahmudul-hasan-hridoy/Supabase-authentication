"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      console.log("User signed up successfully");
      router.push("/signin");
    }
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing up with Google:", error.message);
    } else {
      console.log("User signed up with Google successfully");
      router.push("/");
    }
  };

  const handleGitHubSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.error("Error signing up with GitHub:", error.message);
    } else {
      console.log("User signed up with GitHub successfully");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Sign up for an account</CardTitle>
          <CardDescription>
            Create a new account or sign up with Google or GitHub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center flex-col gap-3">
            <Button
              onClick={handleGoogleSignup}
              variant="outline"
              className="w-full"
            >
              Sign up with Google
            </Button>
            <Button
              onClick={handleGitHubSignup}
              variant="outline"
              className="w-full"
            >
              Sign up with GitHub
            </Button>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            <Input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-5">
              <Input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            type="submit"
            onClick={handleSignup}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </Button>
          <Link href="/signin" className="mt-3 text-center">
            Sign in instead
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
