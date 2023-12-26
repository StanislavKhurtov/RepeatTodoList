import { TodolistType, todolistAPI } from '@/api/todolist-api'
import { setStatus } from '@/app/app-reducer'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state = initialState, action: ActionType): TodolistDomainType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(el => el.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [
        { addedDate: '', filter: 'all', id: action.todolistId, order: 0, title: action.title },
        ...state,
      ]
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
export const fetchTodolist = (dispatch: Dispatch) => {
  dispatch(setStatus('loading'))
  todolistAPI.getTodolist().then(res => {
    dispatch(setTodolistAC(res.data))
    dispatch(setStatus('succeeded'))
  })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTodolist(todolistId).then(() => {
    dispatch(removeTodolistAC(todolistId))
  })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistAPI.createTodolist(title).then(() => {
    dispatch(addTodolistAC(title))
  })
}

export const changeTodolistTitleTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
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
export const addTodolistAC = (title: string) => ({
  title,
  todolistId: v1(),
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

type ActionType =
  | AddTodolistType
  | ChangeTodolistFilterType
  | ChangeTodolistTitleType
  | RemoveTodolistType
  | SetTodolistsType

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsType = ReturnType<typeof setTodolistAC>
