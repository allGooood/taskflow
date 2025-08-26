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

    const {content, start, end} = await req.json();
    const task = await prisma.task.create({
        data: {
          content,
          start,
          end,
          userId: user.id,
        },
    });

    return NextResponse.json({
        title: task.content,
        ...task
    })
}

export async function GET(req: Request){

    const user = await getCurrentUser();
    if(!user){
        return NextResponse.json(
            { error: "Unauthorized" }, 
            { status: 401 }
        );
    }

    const { searchParams } = new URL(req.url);
    const start = new Date(searchParams.get("start")!);
    const end = new Date(searchParams.get("end")!);

    const tasks = await prisma.task.findMany({
        where: {
            isDeleted: false,
            userId: user.id,
            start: {
                gte: start,
            },
            end: {
                lte: end,
            },
            // createdAt: {
            //     gte: start,
            //     lte: end,
            // }
        },
        select: {
            id: true,
            content: true,
            isCompleted: true,
            createdAt: true,
            start: true,
            end: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const res = tasks.map(({ content, ...field }) => ({
        ...field,
        title: content,
    }));

    console.log(start);
    console.log(end);

    console.log(res);

    return NextResponse.json(res);
}
