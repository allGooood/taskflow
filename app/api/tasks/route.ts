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

    return NextResponse.json({
        title: task.content,
        start: task.createdAt,
        end: task.createdAt,
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
            createdAt: {
                gte: start,
                lte: end,
            }
        },
        select: {
            id: true,
            content: true,
            isCompleted: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const res = tasks.map(({ content, createdAt, ...field }) => ({
        ...field,
        start: createdAt,
        end: createdAt,
        title: content,
    }));

    return NextResponse.json(res);
}



// import { NextResponse } from "next/server";
// import { prisma } from "@/app/libs/prisma";
// import getCurrentUser from "@/app/actions/getCurrentUser";

// export async function POST(req: Request) {
    
//     const user = await getCurrentUser();

//     if(!user){
//         return NextResponse.json(
//             { error: "Unauthorized" }, 
//             { status: 401 }
//         );
//     }

//     const {content} = await req.json();
//     const task = await prisma.task.create({
//         data: {
//           content,
//           userId: user.id,
//         },
//     });

//     return NextResponse.json({
//         title: task.content,
//         start: task.createdAt,
//         end: task.createdAt,
//         ...task
//     })
// }

// export async function GET(){

//     const user = await getCurrentUser();

//     if(!user){
//         return NextResponse.json(
//             { error: "Unauthorized" }, 
//             { status: 401 }
//         );
//     }

//     const tasks = await prisma.task.findMany({
//         where: {
//             isDeleted: false,
//             // createdAt: new Date(),
//             userId: user.id,
//         },
//         select: {
//             id: true,
//             content: true,
//             isCompleted: true,
//             createdAt: true,
//         },
//         orderBy: {
//             createdAt: "desc"
//         }
//     })

//     const res = tasks.map(({ content, createdAt, ...field }) => ({
//         ...field,
//         start: createdAt,
//         end: createdAt,
//         title: content,
//     }));

//     return NextResponse.json(res);
// }

