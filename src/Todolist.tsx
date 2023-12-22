import React, {useCallback} from "react";
import {FilterPropsType} from "./App";
import clsx from "clsx";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {PlusSquareOutline} from "./assets";
import Trash from "./assets/trash";
import {Task} from "./components/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type Props = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filter: FilterPropsType) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterPropsType
    removeTodolist: (id: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void

}
export const Todolist = React.memo((props: Props) => {

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])

    let taskForTodolist = props.tasks;
    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(task => !task.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(task => task.isDone)
    }

    return <div className='todo'>
        <div className="todo__body">
            <h3 className='todo__title title'>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button className={'todo__btnDelete'} onClick={removeTodolist}>{<Trash className={'icon'}/>}</button>
            </h3>
            <AddItemForm addItem={addTask} trigger={<PlusSquareOutline className={'icon'}/>}/>
            <div className='todo__items'>
                {taskForTodolist.map(task => <Task
                    todolistId={props.id}
                    key={task.id}
                    task={task}
                    removeTask={props.removeTask}
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus}
                />)}
            </div>
            <div className='todo__buttons-block'>
                <button className={clsx('todo__btn', {'activeFilter': props.filter === 'all'})}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={clsx('todo__btn', {'activeFilter': props.filter === 'active'})}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={clsx('todo__btn', {'activeFilter': props.filter === 'completed'})}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    </div>
})

