import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "html", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "js", isDone: false},
        {id: v1(), title: "CSS", isDone: false},

    ])


    const removeTask = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id))
    }  //функция удаления строки
    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        let todolist  = todoLists.find(el => el.id === todolistID)
        if(todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }


        /*setTodoLists(todoLists.map(el=>el.id === todolistID ? {...el, filter: value}: el))*/
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(el => el.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])

        /* setTasks(tasks.map(el=>el.id===taskId?{...el, isDone: isDone} : el))*/
    }
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: v1(), title: "What to learn", filter: "active"},
            {id: v1(), title: "What to buy", filter: "completed"},
        ]
    )

    return (
        <div className="App">

            {todoLists.map(el => {


                let tasksForTodoList = tasks;

                if (el.filter === "active") {
                    tasksForTodoList = tasks.filter(el => el.isDone)
                }
                if (el.filter === "completed") {
                    tasksForTodoList = tasks.filter(el => !el.isDone)
                }

                return (

                    <Todolist
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                    />

                );
            })}


        </div>
    );
}

export default App;
