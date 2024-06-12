"use server"

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

    const res = await fetch("http://localhost:3000/api/save-results", {
      method: "POST",
      body: JSON.stringify(newResult),
      headers: {
        "Content-Type": "application/json",
      }
    });

    redirect("/");
};