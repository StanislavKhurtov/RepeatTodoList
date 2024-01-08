import React, { ChangeEvent, InputHTMLAttributes, KeyboardEvent, ReactNode, useState } from 'react'

import clsx from 'clsx'

type Props = {
  addDate?: boolean
  addItem: (title: string) => void
  disabled?: boolean
  label?: string
  trigger?: ReactNode
} & InputHTMLAttributes<HTMLInputElement>

export const AddItemForm = React.memo((props: Props) => {
  const [newTitle, setNewTitle] = useState<string>('')
  const [error, setError] = useState<null | string>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  const onKeypressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.key === 'Enter') {
      addItem()
    }
  }

  const addItem = () => {
    if (newTitle.trim() !== '') {
      let title = newTitle.trim()

      if (props.addDate) {
        const currentDate = new Date().toLocaleDateString('ru-RU')

        title = `${currentDate} - ${title}`
      }
      props.addItem(title)
      setNewTitle('')
    } else {
      setError('Title is required')
    }
  }

  return (
    <div className={'AddItemForm'}>
      <div className={'AddItemForm__label'}>{props.label}</div>
      <input
        {...props}
        className={clsx('AddItemForm__input', { error: error })}
        disabled={props.disabled}
        onChange={onChangeHandler}
        onKeyPress={onKeypressHandler}
        value={newTitle}
      />
      <button className={'AddItemForm__btn'} disabled={props.disabled} onClick={addItem}>
        {props.trigger}
      </button>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  )
})
