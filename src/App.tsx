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

    const removeTask = (id: string, todolistID: string) => {
        let tasks = tasksObj[todolistID];
        let filteredTasks=tasks.filter(el=> el.id!==id)
        tasksObj[todolistID] = filteredTasks;
        setTasks({...tasksObj})


    }  //функция удаления строки

    const addTask = (title: string, todolistID:string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistID];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistID] = newTasks;
        setTasks({...tasksObj})
    }

    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        let todolist = todoLists.find(el => el.id === todolistID)
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }
        /*setTodoLists(todoLists.map(el=>el.id === todolistID ? {...el, filter: value}: el))*/
    }



    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasksObj.find(el => el.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasksObj])

        /* setTasks(tasks.map(el=>el.id===taskId?{...el, isDone: isDone} : el))*/
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todolistId1, title: "What to learn", filter: "active"},
            {id: todolistId2, title: "What to buy", filter: "completed"},
        ]
    )
    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "html", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "js", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Sugar", isDone: true},

        ],
    });

    return (
        <div className="App">

            {todoLists.map(el => {

                let tasksForTodoList = tasksObj[el.id];

                if (el.filter === "active") {
                    tasksForTodoList = tasksForTodoList.filter(el => el.isDone)
                }
                if (el.filter === "completed") {
                    tasksForTodoList = tasksForTodoList.filter(el => !el.isDone)
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
