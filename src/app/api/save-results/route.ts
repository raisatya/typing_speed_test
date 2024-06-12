import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const result = await prisma.testResult.create({
    data: {
      username: body.username,
      emailId: body.emailId,
      imgUrl: body.imgUrl,
      wpm: body.wpm,
      deviceType: body.deviceType,
    },
  });

  return NextResponse.json(result, { status: 201 });
};