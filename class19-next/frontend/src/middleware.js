import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const publicRoutes = ["/login", "/signup", "/public"]
console.log("middleware running");

export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    let isPublic = false; 
    console.log("middleware running");
    publicRoutes.forEach((path)=>{
        if(request.nextUrl.pathname.startsWith(path)){
            isPublic = true;
        }
    })
    if(!token && !isPublic){
        return NextResponse.redirect(new URL("/login", request.url));
    }
}




export const config = {
    matcher: ["/((?!_next|static|favicon.ico).*)"]
    }


