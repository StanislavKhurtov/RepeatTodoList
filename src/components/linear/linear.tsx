import s from './linear.module.scss'
type Props = {
  className?: string
}
export const Linear = ({ className }: Props) => {
  return (
    <div className={`${className}`}>
      <div className={s.loader}>
        <div className={s.loaderGradient}></div>
      </div>
    </div>
  )
}
