import {v1} from "uuid";
import {FilterPropsType, TodolistsType} from "../App";


const initialState: TodolistsType[] = []
export const todolistReducer = (state= initialState, action: ActionType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.todolistId ? {...el, title:action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.todolistId ? {...el, filter:action.filter} : el)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const addTodolistAC = (title: string): AddTodolistType => {
    return {type: 'ADD-TODOLIST', todolistId: v1(), title}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE',todolistId, title}
}
export const changeTodolistFilterAC = (todolistId: string,  filter: FilterPropsType): ChangeTodolistFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER',todolistId, filter}
}

//type

type ActionType = AddTodolistType
    | RemoveTodolistType
|ChangeTodolistTitleType
|ChangeTodolistFilterType

export type AddTodolistType = {
    type: 'ADD-TODOLIST'
    todolistId: string
    title: string
}
export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}
type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    filter: FilterPropsType
}

