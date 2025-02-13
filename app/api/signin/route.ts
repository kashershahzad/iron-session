import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import { IronSessionData } from "iron-session";

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    console.log(email, password);

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    console.log(user);

    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Initialize session response
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

    // Get session and save user info
    const session = await getIronSession<IronSessionData>(request, response, sessionOptions);
    session.user = { id: user.id, email: user.email };
    await session.save();

    return response; // Return the session-initialized response
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
};


