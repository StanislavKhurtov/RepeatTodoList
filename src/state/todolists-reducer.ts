import { TodolistType, todolistAPI } from '@/api/todolist-api'
import { SetStatusType } from '@/app/app-reducer'
import { Dispatch } from 'redux'

const initialState: TodolistDomainType[] = []

export const todolistReducer = (
  state = initialState,
  action: TodoActionType
): TodolistDomainType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(el => el.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{ ...action.todolist, filter: 'all' }, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(el => (el.id === action.todolistId ? { ...el, title: action.title } : el))
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(el => (el.id === action.todolistId ? { ...el, filter: action.filter } : el))
    }
    case 'SET-TODOLISTS': {
      return action.todolists.map(tl => ({ ...tl, filter: 'all' }))
    }
    default:
      return state
  }
}
//thunk
export const fetchTodolist = (dispatch: Dispatch<TodoActionType>) => {
  todolistAPI.getTodolist().then(res => {
    dispatch(setTodolistAC(res.data))
  })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodoActionType>) => {
  todolistAPI.deleteTodolist(todolistId).then(() => {
    dispatch(removeTodolistAC(todolistId))
  })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodoActionType>) => {
  todolistAPI.createTodolist(title).then(res => {
    dispatch(addTodolistAC(res.data.data.item))
  })
}

export const changeTodolistTitleTC =
  (todolistId: string, title: string) => (dispatch: Dispatch<TodoActionType>) => {
    todolistAPI.updateTodolist(todolistId, title).then(() => {
      dispatch(changeTodolistTitleAC(todolistId, title))
    })
  }

//actions
export const setTodolistAC = (todolists: TodolistType[]) => ({
  todolists,
  type: 'SET-TODOLISTS' as const,
})
export const removeTodolistAC = (id: string) => ({ id, type: 'REMOVE-TODOLIST' as const })
export const addTodolistAC = (todolist: TodolistType) => ({
  todolist,
  type: 'ADD-TODOLIST' as const,
})
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
  title,
  todolistId,
  type: 'CHANGE-TODOLIST-TITLE' as const,
})
export const changeTodolistFilterAC = (todolistId: string, filter: FilterPropsType) => ({
  filter,
  todolistId,
  type: 'CHANGE-TODOLIST-FILTER' as const,
})

//type

export type FilterPropsType = 'active' | 'all' | 'completed'

export type TodolistDomainType = TodolistType & {
  filter: FilterPropsType
}

type TodoActionType =
  | AddTodolistType
  | ChangeTodolistFilterType
  | ChangeTodolistTitleType
  | RemoveTodolistType
  | SetStatusType
  | SetTodolistsType

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsType = ReturnType<typeof setTodolistAC>
