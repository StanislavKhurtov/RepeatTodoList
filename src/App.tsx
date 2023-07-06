import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}


export function App() {

    const removeTask = (id: string, todolistID: string) => {
        setTasks({...tasksObj, [todolistID]: tasksObj[todolistID].filter(el => el.id !== id)})
        //let tasks = tasksObj[todolistID];
        //let filteredTasks = tasks.filter(el => el.id !== id)
        //tasksObj[todolistID] = filteredTasks;
        //setTasks({...tasksObj})
    };

    const addTask = (title: string, todolistID: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasksObj, [todolistID]: [newTask, ...tasksObj[todolistID]]})
        /*let tasks = tasksObj[todolistID];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistID] = newTasks;
        setTasks({...tasksObj})*/
    };

    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        setTodoLists(todoLists.map(el => el.id === todolistID ? {...el, filter: value} : el))

        /*   let todolist = todoLists.find(el => el.id === todolistID)
           if (todolist) {
               todolist.filter = value;
               setTodoLists([...todoLists])
           }*/
    };

    const changeStatus = (taskId: string, isDone: boolean, todolistID: string) => {
        setTasks({...tasksObj, [todolistID]: tasksObj[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)})

        /*  let tasks = tasksObj[todolistID];
          let task = tasks.find(el => el.id === taskId);
          if (task) {
              task.isDone = isDone;
          }
          setTasks({...tasksObj})*/
    };

    const removeTodolist = (todolistID: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todolistID))
        delete tasksObj[todolistID]
        setTasks({...tasksObj})
    };

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"},
        ]
    )
    let [tasksObj, setTasks] = useState<TaskStateType>({
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

    const addTodolist = (title: string) => {
        let newId = v1();
        let newTodoList: TodoListType = {id: newId, title: title, filter: "all"};
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({...tasksObj, [newId]: []})
    };

    /*  const onCompletedClickHandler = (todolistId: string, id:string, newValue: string) => {
          setTasks({
              ...tasksObj,
              [todolistId]: tasksObj[todolistId].map(el => el.id === id ? {...el, title: newValue} : el)
          })
      }*/

    const onCompletedClickHandler = (todolistId: string, id: string, newValue: string) => {
        setTasks({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(el => el.id === id ? {...el, title: newValue} : el)
        })
    }

    const ChangeTodolistTitle = (id: string, title: string) => {
        setTodoLists(todoLists.map(el => el.id === id ? {...el, title} : el))
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
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
                        removeTodolist={removeTodolist}
                        сhangeTaskTitle={onCompletedClickHandler}
                        ChangeTodolistTitle={ChangeTodolistTitle}
                    />
                );
            })}
        </div>
    );
}


