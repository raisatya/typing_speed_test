"use server"

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

interface resultDataTypes {
    username: string,
    emailId: string,
    imgUrl: string,
    wpm: number,
    deviceType: string
}

export const saveResult = async (resultDetails: resultDataTypes) => {
    
    const newResult = {
        username: resultDetails.username,
        emailId: resultDetails.emailId,
        imgUrl: resultDetails.imgUrl,
        wpm: resultDetails.wpm,
        deviceType: resultDetails.deviceType
    }

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/save-results`, {
      method: "POST",
      body: JSON.stringify(newResult),
      headers: {
        "Content-Type": "application/json",
      }
    });

    const redirectlink = resultDetails.deviceType == 'Mobile' ? '/leaderboard/mobile' : '/leaderboard/desktop';
    revalidateTag(`${resultDetails.deviceType}`)
    redirect(`${redirectlink}`);
};