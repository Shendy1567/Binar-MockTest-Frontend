export function middleware(req) {
  const nextUrl = req.nextUrl;
  if (nextUrl.pathname === "/todo-list") {
    if (req.cookies.token) {
      return NextResponse.rewrite(new URL("/todo-list", req.url));
    } else {
      return NextResponse.rewrite(new URL("/auth/login", req.url));
    }
  }
}
