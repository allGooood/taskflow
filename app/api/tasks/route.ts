import { NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
    
    const user = await getCurrentUser();

    if(!user){
        return NextResponse.json(
            { error: "Unauthorized" }, 
            { status: 401 }
        );
    }

    const {content} = await req.json();
    const task = await prisma.task.create({
        data: {
          content,
          userId: user.id,
        },
    });

    return NextResponse.json(
        task
    )
}

export async function GET(){

    const user = await getCurrentUser();

    if(!user){
        return NextResponse.json(
            { error: "Unauthorized" }, 
            { status: 401 }
        );
    }

    const tasks = await prisma.task.findMany({
        where: {
            isDeleted: false,
            // createdAt: new Date(),
            userId: user.id,
        },
        select: {
            id: true,
            content: true,
            isCompleted: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return NextResponse.json(tasks);
}

