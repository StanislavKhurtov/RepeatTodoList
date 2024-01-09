import { Trash } from '@/assets'
import { EditableSpan } from '@/common/components/EditableSpan'
import { useActions } from '@/common/hooks/useActions'
import { TodolistDomainType, todolistThunks } from '@/features/TodolistList/model/todolistsSlice'
type Props = {
  todolist: TodolistDomainType
}
export const TodolistTitle = ({ todolist }: Props) => {
  const { changeTodolistTitle, removeTodolist } = useActions(todolistThunks)
  const removeTodolistCB = () => {
    removeTodolist(todolist.id)
  }

  const changeTodolistTitleCB = (title: string) => {
    changeTodolistTitle({ id: todolist.id, title })
  }

  return (
    <h3 className={'todo__title title'}>
      <EditableSpan onChange={changeTodolistTitleCB} title={todolist.title} />
      <button
        className={'todo__removeButton'}
        disabled={todolist.entityStatus === 'loading'}
        onClick={removeTodolistCB}
      >
        {
          <Trash
            className={`iconDelete ${todolist.entityStatus === 'loading' ? 'disabled' : ''}`}
          />
        }
      </button>
    </h3>
  )
}
