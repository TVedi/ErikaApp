import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Routes closed until the account phase ships. The pages and their components
 * are untouched; they are simply unreachable. The authenticated role has no
 * privileges on public.profiles, so registration cannot succeed today and a
 * visitor reaching these would only see a generic failure.
 * To reopen, remove a path from this list.
 */
const CLOSED_ROUTES = ["/signup", "/login", "/dashboard", "/welcome"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isClosed = CLOSED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isClosed) {
    const home = request.nextUrl.clone();
    home.pathname = "/";
    home.search = "";
    return NextResponse.redirect(home, 307);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
