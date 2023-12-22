import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let newTitle = ' Blalala'
    useEffect(() => {
       todolistAPI.createTodolist(newTitle)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolist = 'c9d9b61e-61c3-4cef-accd-9c9783dbd9b7'
    useEffect(() => {
        todolistAPI.deleteTodolist(todolist)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolist = '28856b22-235c-4f9c-b371-a597bd644de8'
        todolistAPI.updateTodolist(todolist, 'Update New Title 4')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId= '28856b22-235c-4f9c-b371-a597bd644de8'
       taskAPI.getTask(todolistId)
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId= '28856b22-235c-4f9c-b371-a597bd644de8'
        const title = 'New Task'
        taskAPI.createTask(todolistId, title)
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId= '28856b22-235c-4f9c-b371-a597bd644de8'
        const taskId= '54f5405c-50ea-47a5-843c-84faeeb9b775'
        const title = 'Update Task Todo'
        taskAPI.updateTask(todolistId,taskId, title)
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId,setTodolistId]= useState('')
    const [taskId,setTaskId]= useState<string>('')
    const deleteTask =() => {
        taskAPI.deleteTask(todolistId,taskId)
            .then(res => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)} placeholder={'todolistId'}/>
            <input value={taskId} onChange={e => setTaskId(e.currentTarget.value)} placeholder={'taskId'}/>
            <button onClick={deleteTask}>del task</button>
        </div>
    </div>
}


