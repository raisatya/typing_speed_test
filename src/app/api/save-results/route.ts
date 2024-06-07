import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();

    try {
      const result = await prisma.testResult.create({
        data: {
          username: body.username,
          emailId: body.emailId,
          imgUrl: body.imageUrl,
          deviceType: body.deviceType,
          wpm: body.wpm,
        },
      });

        return NextResponse.json(result);

    } catch (error) {
        return NextResponse.json(error);

    }
}