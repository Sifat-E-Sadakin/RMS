import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  //   console.log("check");

  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get("access");
  const refreshToken = request.cookies.get("refresh");
  // console.log(accessToken.value);
  if (!accessToken && path !== "/login") {
    console.log("no access token");
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    if (accessToken) {
      const apiRes = await fetch(
        "https://rms.techsistltd.com/authentication/v1/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken.value }),
        }
      );
      const data = await apiRes.json();
      if (data.access) {
        const response = NextResponse.next();
        response.cookies.set("access", data.access);
        return response;
      }
    }
    return NextResponse.next();
  }

  //   return NextResponse.rewrite(url);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
