import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllJoinedClassrooms } from "@/controllers/classroom";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.redirect(request.nextUrl.origin);
    }
    const userID = session?.user.id!;
    const data = await getAllJoinedClassrooms(userID);
    return NextResponse.json(data);
}