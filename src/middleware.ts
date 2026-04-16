import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Strip the ?ref= tracking param with a 301 redirect so Google consolidates
// to the clean canonical URL (fixes the peerlist URL in Search Console).
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.searchParams.has("ref")) {
    url.searchParams.delete("ref");
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next internals and static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|logo.png|robots.txt|sitemap.xml|ads.txt|.*\\.svg).*)"],
};
