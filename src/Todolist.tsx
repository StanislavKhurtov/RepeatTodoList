import React from "react";
import {FilterPropsType} from "./App";
import clsx from "clsx";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {PlusSquareOutline} from "./assets";
import Trash from "./assets/trash";

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
export const Todolist = (props: Props) => {
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }
    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')

    return <div className='todo'>
        <div className="todo__body">
            <h3 className='todo__title title'>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button className={'todo__btnDelete'} onClick={removeTodolist}>{<Trash className={'icon'}/>}</button>
            </h3>
            <AddItemForm addItem={addTask} trigger={<PlusSquareOutline className={'icon'}/>}/>
            <ul className='todo__items'>
                {props.tasks.map(task => {
                    const onClickHandler = () => props.removeTask(props.id, task.id)
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.id, task.id, title)
                    }

                    return <li key={task.id} className={clsx('todo__item', 'item', {'isDone': task.isDone})}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={(e) => {
                                props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
                            }}/>
                        <EditableSpan title={task.title} onChange={changeTaskTitle}/>
                        <button className={'item__btn'} onClick={onClickHandler}>{<Trash className={'icon'}/>}</button>
                    </li>
                })}
            </ul>
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
}
