import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";

{/** isDeleted 컬럼 수정 */}
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }>}
  ) {
    console.log('update')

    const user = await getCurrentUser();
    if(!user){
        return NextResponse.json(
            { error: "Unauthorized" }, 
            { status: 401 }
        );
    }

    const {id} = await context.params;

    const deletedTask = await prisma.task.update({
        where: { id },
        data: { isDeleted: true },
      });

      return NextResponse.json(deletedTask);
}

{/** isCompleted 컬럼 수정 */}
export async function PATCH(
    req:Request, 
    context: { params: Promise<{ id: string }>}
  ) {
    console.log('delete');
    
    const user = await getCurrentUser();
    if(!user){
        return NextResponse.json(
            { error: "Unauthorized" }, 
            { status: 401 }
        );
    }

    const {id} = await context.params;
    const {isCompleted} = await req.json();

    const processTask = await prisma.task.update({
      where: {id},
      data: { isCompleted: isCompleted}
    });
    
    return NextResponse.json(processTask);
}