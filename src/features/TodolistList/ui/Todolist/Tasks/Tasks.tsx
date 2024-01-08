import { TaskStatuses } from '@/common/enums'
import { TaskType } from '@/features/TodolistList/api/tasksSlice.types'
import { TodolistDomainType } from '@/features/TodolistList/model/todolists-reducer'
import { Task } from '@/features/TodolistList/ui/Todolist/Tasks/Task/Task'
type Props = {
  tasks: TaskType[]
  todolist: TodolistDomainType
}
export const Tasks = ({ tasks, todolist }: Props) => {
  let taskForTodolist = tasks

  if (todolist.filter === 'active') {
    taskForTodolist = tasks.filter(task => task.status === TaskStatuses.New)
  }
  if (todolist.filter === 'completed') {
    taskForTodolist = tasks.filter(task => task.status === TaskStatuses.Completed)
  }

  return (
    <div className={'todo__items'}>
      {taskForTodolist?.map(task => <Task key={task.id} task={task} todolistId={todolist.id} />)}
    </div>
  )
}
