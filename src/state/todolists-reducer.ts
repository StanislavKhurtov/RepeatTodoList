import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";


const initialState: TodolistDomainType[] = []
export const todolistReducer = (state = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todolistId, title: action.title, filter: "all", addedDate: '', order: 0}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state
    }
}
//thunk
export const fetchTodolistThunk = (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistAC(res.data))
        })
}

//actions
export const setTodolistAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS' as const, todolists})
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST' as const, id})
export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST' as const, todolistId: v1(), title})
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE' as const, todolistId, title})
export const changeTodolistFilterAC = (todolistId: string, filter: FilterPropsType) => ({type: 'CHANGE-TODOLIST-FILTER' as const, todolistId, filter})

//type

export type FilterPropsType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterPropsType
}

type ActionType = AddTodolistType
    | RemoveTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistsType

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsType = ReturnType<typeof setTodolistAC>



