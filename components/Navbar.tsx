import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/app/actions/logout";

export async function Navbar() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("user_id");

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-blue-600">
            🏨 HotelNexus
          </Link>
          
          <nav className="hidden flex  md:flex gap-4">
            <Link href="/hotels" className="text-sm font-medium hover:text-blue-600">
              Explore Hotels
            </Link>
            <Link href="/bookings/new" className="text-sm font-medium hover:text-blue-600">
              Book a Room
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          ) : (
            <form action={logoutUser}>
              <Button variant="destructive" type="submit">
                Logout
              </Button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}