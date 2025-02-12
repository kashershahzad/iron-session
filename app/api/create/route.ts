import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    let email = "";
    let password = "";

    try {
        const body = await req.json();
        email = body.email;
        password = body.password;
    } catch (error) {
        return NextResponse.json({ Message: "Invalid JSON format" });
    }

    if (!email) {
        return NextResponse.json({ Message: "Please enter your email" });
    } else if (!password) {
        return NextResponse.json({ Message: "Please enter your password" });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return NextResponse.json({ Message: "User already exists" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    console.log("User created:", user);

    return NextResponse.json({ user, Message: "User created successfully" });
}
