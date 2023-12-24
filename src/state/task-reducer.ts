import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType, SetTodolistsType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    todoListId: action.todolistId,
                    priority: TaskPriorities.Low,
                    description: '',
                    startDate: '',
                    deadline: '',
                    order: 0,
                    addedDate: ''
                }, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    status: action.status
                } : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.title
                } : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const newState = {...state};
            delete newState[action.id];
            return newState;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        default:
            return state
    }
}


export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (todolistId: string, title: string): AddTaskType => {
    return {type: 'ADD-TASK', todolistId, title}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}

//type

type ActionType = RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistsType

type RemoveTaskType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type AddTaskType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    status: TaskStatuses
}
type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

