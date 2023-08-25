// import { withAuth } from "next-auth/middleware";

export {default} from "next-auth/middleware"
// export { default } from "next-auth/middleware" 

// export default withAuth({
    // secret: process.env.NEXTAUTH_SECRET as string
// }) ;
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/exams/:path*"]
}