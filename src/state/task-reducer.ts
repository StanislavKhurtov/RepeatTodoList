import {TasksStateType} from "../App";
import {v1} from "uuid";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    id: string
};

export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistID: string
    title: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistID: string
    id: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS'
    todolistID: string
    id: string
    isDone: boolean
}


// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType;


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.id)
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID], {id: v1(), title: action.title, isDone: false}]
            }
        case 'CHANGE-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.id ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.id ? {
                    ...el,
                    title: action.title
                } : el)
            }
        default:
            throw new Error("I don't understand this type")
    }
};

export const removeTaskAC = (todolistId: string, id: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID: todolistId, id: id}
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistID: todolistId, title: title}
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistID: todolistId, id: id, title: title}
}

export const changeTaskStatusAC = (todolistID: string, id: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS', todolistID: todolistID, id: id, isDone: isDone}
}