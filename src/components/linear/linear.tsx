type Props = {
  className?: string
}
export const Linear = ({ className }: Props) => {
  return (
      <div className={`${className}`}>
          <div className={'loader'}>
              <div className={'loaderGradient'}></div>
          </div>
      </div>
  )
}
