/**
 * v0 by Vercel.
 * @see https://v0.dev/t/16fm1cpO1IT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Form() {
  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-800 dark:bg-white sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-100 dark:text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400 dark:text-gray-600">
          Sign in to your account
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-700 dark:bg-white py-8 px-4 sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <Button className="w-full bg-[#24292f] text-white text-sm py-3 px-4">
                Continue with GitHub
              </Button>
            </div>
            <div>
              <Button className="w-full bg-black dark:bg-gray-300 text-white dark:text-gray-700 text-sm py-3 px-4">
                Continue with SSO
              </Button>
            </div>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-gray-600 dark:border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-700 dark:bg-white px-2 text-gray-400 dark:text-gray-500">
                  or
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-300 dark:text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                className="bg-gray-600 dark:bg-gray-100 text-white dark:text-gray-900"
                id="email"
                name="email"
                placeholder="you@example.com"
                type="email"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <label
                  className="block text-sm font-medium text-gray-300 dark:text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-300 dark:hover:text-gray-400"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <Input
                className="bg-gray-600 dark:bg-gray-100 text-white dark:text-gray-900"
                id="password"
                name="password"
                placeholder="********"
                type="password"
              />
            </div>
            <div>
              <Button className="w-full bg-green-600 dark:bg-green-500 text-white text-sm py-3 px-4">
                Sign In
              </Button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-300 dark:hover:text-gray-400"
              href="#"
            >
              Don't have an account?
              <span className="font-medium text-green-500 dark:text-green-600 hover:text-green-400 dark:hover:text-green-500">
                Sign Up Now
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
