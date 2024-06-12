import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const result = await prisma.testResult.findMany({
    where: {
      deviceType: "Desktop",
    },
    orderBy: {
      wpm: "desc",
    },
  });

  return NextResponse.json(result, { status: 200 });
};
