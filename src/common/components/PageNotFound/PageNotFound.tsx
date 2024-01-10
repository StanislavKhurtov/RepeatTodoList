import s from './PageNotFound.module.scss'
export const PageNotFound = () => {
  return (
    <div className={s.pageForFound}>
      <div className={s.pageForFound__container}>
        <div className={s.pageForFound__body}>
          <div className={s.pageForFound__text}>404</div>
          <div className={s.pageForFound__subtext}>OPPS! Page Not Found</div>
          <a className={s.pageForFound__link} href={'/'}>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
