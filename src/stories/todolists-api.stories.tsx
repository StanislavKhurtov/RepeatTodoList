import React, {useState} from 'react'
import {taskAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getTodo = () => {
        todolistAPI.getTodolist()
            .then(res => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <button onClick={getTodo}>Get Todo</button>
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const createTodo = () => {
        todolistAPI.createTodolist(title)
            .then(res => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodo}>Create Todo</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const deleteTodo = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} placeholder={'todolistId'}/>
            <button onClick={deleteTodo}>Delete Todo</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')
    const updateTodo = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} placeholder={'todolistId'}/>
            <input value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }} placeholder={'title'}/>
            <button onClick={updateTodo}>Update Todo</button>
        </div>
    </div>
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const getTask = () => {
        taskAPI.getTask(todolistId)
            .then(res => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} placeholder={'todolistId'}/>
            <button onClick={getTask}>Get Task</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        taskAPI.createTask(todolistId, title)
            .then(res => {
                setState(res.data)
            })

    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} placeholder={'todolistId'}/>
            <input value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }} placeholder={'title'}/>
            <button onClick={createTask}>Create Task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const updateTask = () => {
        taskAPI.updateTask(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: '',
            deadline: ''
        })
            .then(res => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} placeholder={'todolistId'}/>
            <input value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }} placeholder={'taskId'}/>
            <input value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }} placeholder={'title'}/>
            <input value={description} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }} placeholder={'description'}/>
            <input value={status} onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }} placeholder={'status'}/>
            <input value={priority} onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }} placeholder={'priority'}/>
            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState<string>('')
    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId)
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


