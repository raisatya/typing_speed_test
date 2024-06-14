import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export const GET = async () => {
  const result = await prisma.testResult.findMany({
    where: {
      deviceType: "Desktop",
    },
    orderBy: {
      wpm: "desc",
    },
    take: 20
  });

  return NextResponse.json(result, { status: 200 });
};
