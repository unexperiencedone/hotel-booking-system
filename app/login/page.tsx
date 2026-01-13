'use client'

import { useActionState } from "react";
import { loginUser } from "@/app/actions/login";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  // useActionState handles the loading state (isPending) and the return value from the server
  const [state, formAction, isPending] = useActionState(loginUser, null);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-130px)] bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Log in to manage your hotel bookings</p>
        </div>

        <form action={formAction} className="space-y-5">
          {/* Error Message Alert */}
          {state?.error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="admin@gmail.com"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-black"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <a href="#" className="text-xs text-blue-600 hover:underline">Forgot?</a>
            </div>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-black"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full py-6 text-lg font-bold rounded-xl"
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Login to Dashboard"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            Register as Staff
          </Link>
        </div>
      </div>
    </div>
  );
}