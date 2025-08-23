'use client';

import { useCallback, useMemo, useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React from "react";
import Toolbar from "./big-calendar/Toolbar";
    
export default function Home() {
    const localizer = momentLocalizer(moment)
    const [date, setDate] = useState(new Date());

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

    const onNavigate = useCallback(
        (newDate) => setDate(newDate)
    , [setDate])


	return (
        <section className="h-[600px]">
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
  );
}


// import { addMonths, eachDayOfInterval, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
// import React, { useState } from 'react';
// import Button from './common/Button';

// export default function Dashboard() {
//     const [currentMonth, setCurrentMonth] = useState(new Date());
//     const [tasks, setTasks] = useState<string[]>([]);
//     const [newTask, setNewTask] = useState("");

//     const days = eachDayOfInterval({
//         start: startOfMonth(currentMonth),
//         end: endOfMonth(currentMonth),
//       })
    
//       const handleAddTask = () => {
//         if (!newTask.trim()) return
//         setTasks([...tasks, newTask])
//         setNewTask("")
//       }
      
//     return (
//         // <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <main className="p-6 grid grid-cols-1 gap-6">

//             {/* Calendar */}
//             <section className="bg-white p-6 rounded-2xl shadow">
//                 <div className="flex justify-between items-center mb-4">
//                     <Button
//                         onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
//                     >
//                         ◀
//                     </Button>
//                     <h2 className="text-lg font-bold">
//                         {format(currentMonth, "yyyy년 MM월")}
//                     </h2>
//                     <Button
//                         onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
//                     >
//                         ▶
//                     </Button>
//                 </div>

//                 {/* 달력 그리드 */}
//                 <div className="grid grid-cols-7 gap-2 text-center">
//                     {days.map((day, idx) => (
//                         <div key={idx} className="p-2 border rounded-lg">
//                             {format(day, "d")}
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* To-Do List */}
//             <section className="bg-white p-6 rounded-2xl shadow">
//                 <h2 className="text-lg font-semibold mb-4">📝 To-Do 리스트</h2>

//                 {/* Input */}
//                 <div className="flex mb-4">
//                     <input
//                         type="text"
//                         value={newTask}
//                         onChange={(e) => setNewTask(e.target.value)}
//                         placeholder="할 일을 입력하세요"
//                         className="flex-1 border rounded-lg p-2 mr-2"
//                     />
//                     <Button
//                         onClick={handleAddTask}
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
//     );
// }
