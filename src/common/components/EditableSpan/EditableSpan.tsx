import React, { ChangeEvent, useState } from 'react'

type Props = {
  className?: string
  onChange: (title: string) => void
  title: string
}
export const EditableSpan = React.memo((props: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <input autoFocus onBlur={activateViewMode} onChange={onChangeHandler} value={title} />
  ) : (
    <span onClick={activateEditMode}>{props.title}</span>
  )
})
