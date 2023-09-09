import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllNotifications, markRead } from "@/controllers/notification";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect("/");
  }
  const userEmail = session?.user.email!;
  const data = await getAllNotifications(userEmail);
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.redirect("/");
    }
    const body = await request.json();
    console.log("🚀 ~ file: route.ts:22 ~ PUT ~ body:", body);
    const data = await markRead(body.notificationID);
    return NextResponse.json(data);
}