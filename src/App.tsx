import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "CSS", isDone: false},

    ])

    let [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodoList = tasks;

    if (filter === "active") {
        tasksForTodoList = tasks.filter(el => el.isDone)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(el => !el.isDone)
    }


    const removeTask = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id))
    }  //функция удаления строки
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        /*let task = tasks.find(el => el.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])*/

        setTasks(tasks.map(el=>el.id===taskId?{...el, isDone: isDone} : el))
    }


    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
            />


        </div>
    );
}

export default App;
