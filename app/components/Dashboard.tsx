'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React from "react";
import Toolbar from "./big-calendar/Toolbar";
import Button from "./common/Button";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { ko } from "date-fns/locale";
import { METHODS } from "http";
import { POST } from "../api/auth/[...nextauth]/route";
import { error } from "console";

interface Task {
    id: string,
    content: string,
    isDeleted: boolean,
    isCompleted: boolean,
}
    
export default function Home() {
    const localizer = momentLocalizer(moment)
    const [date, setDate] = useState(new Date());
    
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");

    const { components, defaultDate, views } = useMemo(
        () => ({
          components: {
            toolbar: Toolbar,
          },
          defaultDate: new Date(),
          views: ['month'] as View[]
        }),[]
    );

    const events = [
        {
            id: 1,
            title: 'Long Event',
            start: new Date(2025, 7, 7),
            end: new Date(2025, 7, 10),
          } 
    ]

    const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);

    const createTask = async () => {
        if(!newTask.trim()) return;

        try{
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({content: newTask})
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.error || "Task 생성 실패");
            }

            const savedTask = await res.json();

            setTasks([savedTask, ...tasks]);
            setNewTask("");

        } catch(err){
            alert(err);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch("/api/tasks");
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setTasks(data.map((task: any) => task));
            } else{
                console.log("error")
            }          
        };
        fetchTasks();
    }, []);

    const onDelete = async (id: string) => {
        try{
            const res = await fetch(`/api/tasks/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error("Failed to delete task");
            }

            const data = res.json();

            // setTasks(tasks.filter((_, i) => i !== idx))
            setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch(err){

        }
    }

	return (
        <main className="p-6 grid grid-cols-1 gap-6">

            {/* Calendar */}
            <section className="h-[600px] bg-white p-2 rounded-2xl shadow">
                <Calendar
                    components={components}
                    date={date}
                    onNavigate={onNavigate}
                    defaultDate={defaultDate}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    events={events}
                    views={views}
                    // timeslots={2}
                />
            </section>

            {/* To-Do List */}
            <section>
                <h2 className="text-2xl font-semibold my-[50px]">
                    📝 {format(date, "yyyy년 MM월 dd (EEE)",{ locale: ko })}
                </h2>

                 {/* Input */}
                 <div className="flex mb-4">
                    {/* <input 
                        type="checkbox"
                        className="w-6 h-6 m-3"
                    /> */}
                     <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="할 일을 입력하세요"
                        className="flex-1 p-2 mr-2 border-0 border-b-2 focus:border-blue-700 focus:ring-0 focus:outline-none"
                    />
                    <Button
                        // onClick={handleAddTask}
                        onClick={createTask}
                    >
                        추가
                    </Button>
                </div>

                {/* Task List */}
                <ul className="space-y-2">
                    {tasks.map((task, idx) => (
                        <li
                            key={idx}
                            className="p-3 border rounded-lg flex justify-between items-center"
                        >
                            <span>{task.content}</span>
                            <Button
                                // onClick={() =>
                                //     setTasks(tasks.filter((_, i) => i !== idx))
                                // }
                                onClick={() => onDelete(task.id)}
                                className="text-red-500 hover:underline"
                            >
                                삭제
                            </Button>
                        </li>
                    ))}
                </ul>
            </section>

        </main>
  );
}




// 'use client';

// import { useCallback, useEffect, useMemo, useState } from "react";
// import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// import React from "react";
// import Toolbar from "./big-calendar/Toolbar";
// import Button from "./common/Button";
// import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
// import { ko } from "date-fns/locale";
// import { METHODS } from "http";
// import { POST } from "../api/auth/[...nextauth]/route";
// import { error } from "console";

// interface Task {
//     id: string,
//     content: string,
//     isDeleted: boolean,
//     isCompleted: boolean,
// }
    
// export default function Home() {
//     const localizer = momentLocalizer(moment)
//     const [date, setDate] = useState(new Date());
    
//     const [tasks, setTasks] = useState<string[]>([]);
//     // const [newTask, setNewTask] = useState("");
//     const [newTask, setNewTask] = useState({});

//     const { components, defaultDate, views } = useMemo(
//         () => ({
//           components: {
//             toolbar: Toolbar,
//           },
//           defaultDate: new Date(),
//           views: ['month'] as View[]
//         }),[]
//     );

//     const events = [
//         {
//             id: 1,
//             title: 'Long Event',
//             start: new Date(2025, 7, 7),
//             end: new Date(2025, 7, 10),
//           } 
//     ]

//     const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);

//     const createTask = async () => {
//         if(!newTask.trim()) return;

//         try{
//             const res = await fetch("/api/tasks", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({content: newTask})
//             });

//             if (!res.ok) {
//                 const errorData = await res.json().catch(() => null);
//                 throw new Error(errorData?.error || "Task 생성 실패");
//             }

//             const savedTask = await res.json();

//             setTasks([...tasks, savedTask.content]);
//             setNewTask("");

//         } catch(err){
//             alert(err);
//         }
//     };

//     useEffect(() => {
//         const fetchTasks = async () => {
//             const res = await fetch("/api/tasks");
//             if (res.ok) {
//                 const data = await res.json();
//                 console.log(data);
//                 setTasks(data.map((task: any) => task.content));
//             } else{
//                 console.log("error")
//             }          
//         };
//         fetchTasks();
//     }, []);

//     const onDelete = async (id: string) => {
//         try{
//             const res = await fetch(`/api/tasks/${id}`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//             });

//             if (!res.ok) {
//                 throw new Error("Failed to delete task");
//             }

//             const data = res.json();
//             // setTasks((prev) => prev.filter((task) => task.id !== id));
//         } catch(err){

//         }
//     }

// 	return (
//         <main className="p-6 grid grid-cols-1 gap-6">

//             {/* Calendar */}
//             <section className="h-[600px] bg-white p-2 rounded-2xl shadow">
//                 <Calendar
//                     components={components}
//                     date={date}
//                     onNavigate={onNavigate}
//                     defaultDate={defaultDate}
//                     localizer={localizer}
//                     startAccessor="start"
//                     endAccessor="end"
//                     events={events}
//                     views={views}
//                     // timeslots={2}
//                 />
//             </section>

//             {/* To-Do List */}
//             <section>
//                 <h2 className="text-2xl font-semibold my-[50px]">
//                     📝 {format(date, "yyyy년 MM월 dd (EEE)",{ locale: ko })}
//                 </h2>

//                  {/* Input */}
//                  <div className="flex mb-4">
//                     {/* <input 
//                         type="checkbox"
//                         className="w-6 h-6 m-3"
//                     /> */}
//                      <input
//                         type="text"
//                         value={newTask}
//                         onChange={(e) => setNewTask(e.target.value)}
//                         placeholder="할 일을 입력하세요"
//                         className="flex-1 p-2 mr-2 border-0 border-b-2 focus:border-blue-700 focus:ring-0 focus:outline-none"
//                     />
//                     <Button
//                         // onClick={handleAddTask}
//                         onClick={createTask}
//                     >
//                         추가
//                     </Button>
//                 </div>

//                 {/* Task List */}
//                 <ul className="space-y-2">
//                     {tasks.map((task, idx) => (
//                         <li
//                             key={idx}
//                             className="p-3 border rounded-lg flex justify-between items-center"
//                         >
//                             <span>{task}</span>
//                             <Button
//                                 onClick={() =>
//                                     setTasks(tasks.filter((_, i) => i !== idx))
//                                 }
//                                 className="text-red-500 hover:underline"
//                             >
//                                 삭제
//                             </Button>
//                         </li>
//                     ))}
//                 </ul>
//             </section>

//         </main>
//   );
// }
