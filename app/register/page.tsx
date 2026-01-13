'use client'

import { useActionState } from "react"; // New React 19 hook
import { registerUser } from "@/app/actions/auth";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white border rounded-2xl shadow-sm text-black mb-20">
      <h1 className="text-2xl font-bold mb-6">Create Staff Account</h1>
      
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input name="fullName" className="w-full p-2 border rounded" />
          {state?.error?.fullName && <p className="text-red-500 text-xs mt-1">{state.error.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email (@gmail.com)</label>
          <input name="email" type="email" className="w-full p-2 border rounded" />
          {state?.error?.email && <p className="text-red-500 text-xs mt-1">{state.error.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input name="password" type="password" className="w-full p-2 border rounded" />
          {state?.error?.password && <p className="text-red-500 text-xs mt-1">{state.error.password}</p>}
        </div>

        <button 
          disabled={isPending}
          className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "Registering..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}