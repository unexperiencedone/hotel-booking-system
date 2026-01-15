import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/app/actions/logout";
import MobileMenu from "./MobileMenu";

export async function Navbar() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("user_id");

  return (
    <header className="border-b bg-white sticky top-0 z-50 max-[1024]:h-25">
      <div className="container mx-auto flex h-16 px-4 min-[1024]:items-center min-[1024]:justify-between max-[1024]:flex-col max-[1024]:flex-1 max-[1024]:w-full max-[1024]: gap-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-blue-600">
            🏨 HotelNexus
          </Link>

          <nav className=" flex max-[1024]:hidden gap-4">
            <Link
              href="/hotels"
              className="text-sm font-medium hover:text-blue-600"
            >
              Explore Hotels
            </Link>
            <Link
              href="/bookings/new"
              className="text-sm font-medium hover:text-blue-600"
            >
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
            <form action={logoutUser} className="flex flex-row gap-8 max-[1024]:w-full justify-between">
              <MobileMenu>
                <Link href = "/hotels" className="block py-2">Explore Hotels</Link>
                <Link href = "/bookings/new" className="block py-2">Book a Room</Link>
                <Button variant="destructive" type="submit">
                  Logout
                </Button>
              </MobileMenu>
              <div id = "logout-btn">
                <Button variant="destructive" type="submit">
                  Logout
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
