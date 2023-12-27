import { TodolistType, todolistAPI } from '@/api/todolist-api'
import {
  RequestStatusType,
  SetErrorType,
  SetStatusType,
  setError,
  setStatus,
} from '@/app/app-reducer'
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
      return [{ ...action.todolist, entityStatus: 'idle', filter: 'all' }, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(el => (el.id === action.todolistId ? { ...el, title: action.title } : el))
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(el => (el.id === action.todolistId ? { ...el, filter: action.filter } : el))
    }
    case 'SET-TODOLISTS': {
      return action.todolists.map(tl => ({ ...tl, entityStatus: 'idle', filter: 'all' }))
    }
    case 'SET-ENTITY-STATUS': {
      return state.map(tl =>
        tl.id === action.todolistId ? { ...tl, entityStatus: action.entityStatus } : tl
      )
    }
    default:
      return state
  }
}
//thunk
export const fetchTodolist = async (dispatch: Dispatch<TodoActionType>) => {
  setStatus('loading')
  const res = await todolistAPI.getTodolist()

  dispatch(setTodolistAC(res.data))
  dispatch(setStatus('succeeded'))
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodoActionType>) => {
  dispatch(setStatus('loading'))
  dispatch(setEntityStatusAC(todolistId, 'loading'))
  todolistAPI
    .deleteTodolist(todolistId)
    .then(() => {
      dispatch(removeTodolistAC(todolistId))
      dispatch(setEntityStatusAC(todolistId, 'succeeded'))
      dispatch(setStatus('succeeded'))
    })
    .catch(e => {
      dispatch(setError(e.message))
      dispatch(setEntityStatusAC(todolistId, 'idle'))
      dispatch(setStatus('succeeded'))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodoActionType>) => {
  dispatch(setStatus('loading'))
  todolistAPI.createTodolist(title).then(res => {
    dispatch(addTodolistAC(res.data.data.item))
    dispatch(setStatus('succeeded'))
  })
}

export const changeTodolistTitleTC =
  (todolistId: string, title: string) => (dispatch: Dispatch<TodoActionType>) => {
    dispatch(setStatus('loading'))
    todolistAPI.updateTodolist(todolistId, title).then(() => {
      dispatch(changeTodolistTitleAC(todolistId, title))
      dispatch(setStatus('succeeded'))
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

export const setEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({
  entityStatus,
  todolistId,
  type: 'SET-ENTITY-STATUS' as const,
})

//type

export type FilterPropsType = 'active' | 'all' | 'completed'

export type TodolistDomainType = TodolistType & {
  entityStatus: RequestStatusType
  filter: FilterPropsType
}

type TodoActionType =
  | AddTodolistType
  | RemoveTodolistType
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof setEntityStatusAC>
  | SetErrorType
  | SetStatusType
  | SetTodolistsType

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistAC>
