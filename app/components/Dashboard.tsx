'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React from "react";
import Toolbar from "./big-calendar/Toolbar";
import Button from "./common/Button";
import Loader from "./common/Loader";
import { eachDayOfInterval, endOfDay, endOfMonth, format, isWithinInterval, startOfDay, startOfMonth } from "date-fns";
import { ko } from "date-fns/locale";

interface Task {
    id: string,
    title: string,
    isDeleted: boolean,
    isCompleted: boolean,
    start: Date,
    end: Date,
}
    
export default function Home() {
    const localizer = momentLocalizer(moment)
    const [date, setDate] = useState(new Date());
    
    const [monthlyTasks, setMonthlyTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isCreatingTask, setIsCreatingTask] = useState(false);

    const { components, defaultDate, views } = useMemo(
        () => ({
          components: {
            toolbar: Toolbar,
          },
          defaultDate: new Date(),
          views: ['month'] as View[]
        }),[]
    );

    const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate]);
    
    useEffect(() => {
        const fetchMonthly = async () => {
            setIsLoading(true);
            const start = startOfMonth(date);
            const end = endOfMonth(date);

            try {
                const res = await fetch(`/api/tasks?start=${start.toISOString()}&end=${end.toISOString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setMonthlyTasks(data.map((task: Task) => task));
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMonthly();

    }, [date]);

    const dailyTasks = useMemo(() => {
        return monthlyTasks.filter((task) =>
          isWithinInterval(new Date(task.start), {
            start: startOfDay(date),
            end: endOfDay(date),
          })
        );
    }, [monthlyTasks, date]);

    const createTask = async () => {
        if(!newTask.trim()) return;

        setIsCreatingTask(true);
        try{
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: newTask,
                    start: date,
                    end: date,
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.error || "Task 생성 실패");
            }

            const savedTask = await res.json();

            setMonthlyTasks([savedTask, ...monthlyTasks]);
            setNewTask("");

        } catch(err){
            console.error("Failed to fetch tasks:", err);
        } finally {
            setIsCreatingTask(false);
        }
    };

    const onDelete = async (id: string) => {
        try{
            setIsLoading(true);
            const res = await fetch(`/api/tasks/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error("Failed to delete task");
            }

            const data = res.json();

            // setTasks(tasks.filter((_, i) => i !== idx))
            setMonthlyTasks((prev) => prev.filter((task) => task.id !== id));
        } catch(err){
            console.error("Failed to fetch tasks:", err);
        }finally{
            setIsLoading(false);
        }
    }

    const handleProgress = async (id: string, currentValue: boolean) => {
        try{
            setIsLoading(true);
            const res = await fetch(`/api/tasks/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isCompleted: !currentValue }),
            });
            
            if (!res.ok) {
                throw new Error("Failed to delete task");
            }

            const data = await res.json();

            setMonthlyTasks((prev) =>
                prev.map((task) =>
                    task.id === id ? { ...task, isCompleted: data.isCompleted } : task)
            );

        }catch(err){
            alert(err);
        }finally{
            setIsLoading(false);
        }
    }

	return (
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[calc(100vh-100px)]">

            {/* Calendar */}
            <section className="bg-white/60 backdrop-blur-md border border-white/40 p-4 rounded-3xl shadow-xl flex justify-center items-start md:items-center overflow-hidden">
                <div className="w-full h-[600px] md:h-[700px]">
                    {isLoading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Loader size="lg" />
                        </div>
                    ) : (
                        <Calendar
                            components={components}
                            date={date}
                            onNavigate={onNavigate}
                            defaultDate={defaultDate}
                            localizer={localizer}
                            startAccessor="start"
                            endAccessor="end"
                            events={monthlyTasks}
                            views={views}
                            // timeslots={2}
                        />
                    )}
                </div>
            </section>

            {/* To-Do List */}
            <section className="bg-white/70 backdrop-blur-md border border-white/40 shadow-xl rounded-3xl p-8 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    📝 {format(date, "yyyy년 MM월 dd (EEE)",{ locale: ko })}
                </h2>

                 {/* Input */}
                 <div className="flex mb-6">
                    
                     <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="할 일을 입력하세요"
                        className="flex-1 px-4 py-3 mr-3 rounded-xl border border-gray-200/70 bg-white/80 shadow-sm placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                    />
                    <Button 
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] flex items-center justify-center gap-2" 
                        onClick={createTask}
                        disabled={isCreatingTask}
                    >
                        {isCreatingTask ? (
                            <>
                                <Loader size="sm" />
                                추가 중...
                            </>
                        ) : (
                            "추가"
                        )}
                    </Button>
                </div>

                {/* Task List */}
                <ul className="space-y-3 overflow-y-auto flex-1 pr-1">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader size="md" />
                        </div>
                    ) : dailyTasks.length === 0 ? (
                        <li className="text-center text-gray-400 italic">등록 된 일정이 없습니다.</li>
                    ) : (
                        dailyTasks.map((task) => (
                            <li
                                key={task.id}
                                className="p-4 bg-white/80 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition"
                            >
                                <div className="flex items-center space-x-4">
                                    <input 
                                        type="checkbox"
                                        className="w-6 h-6 cursor-pointer accent-indigo-500 rounded-md"
                                        checked={task.isCompleted}
                                        onChange={() => handleProgress(task.id, task.isCompleted)}
                                    />
                                    <span className={task.isCompleted ? "line-through text-gray-400" : "text-gray-700"}>{task.title}</span>
                                </div>
                                <Button
                                    onClick={() => onDelete(task.id)}
                                    disabled={isLoading}
                                    className="text-red-500 hover:underline opacity-80 hover:opacity-100 transition"
                                >
                                    삭제
                                </Button>
                            </li>
                        ))
                    )}
                </ul>
            </section>

        </main>
  );
}
