import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

const publicRoutes = ["/login", "/signup", "/", "/favicon.ico"];

export default async function middleware(req: NextRequest) {
  console.log("start middleware");
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  console.log("path = ", path);
  const isPublicRoute = publicRoutes.includes(path);
  console.log("isPublicRoute = ", isPublicRoute);

  if (isPublicRoute) {
    console.log("public route -> do nothing");
    return NextResponse.next();
  }

  // *** protected area ***

  // 3. Decrypt the session from the cookie
  const cookie = await cookies();
  console.log("cookie = ", cookie);
  const cookieValue = cookie.get("session")?.value;
  console.log("cookie.session = ", cookieValue);
  const session = await decrypt(cookieValue);
  console.log("session = ", session);

  // 4. Redirect to /login if the user is not authenticated
  if (!session?.userId) {
    console.log("middleware: redirect to /login");
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
