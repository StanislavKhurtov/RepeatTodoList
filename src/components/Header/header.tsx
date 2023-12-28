import { RequestStatusType } from '@/app/app-reducer'
import { useAppSelector } from '@/app/store'
import { Linear } from '@/components/Preloader'

export const Header = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)

  return (
    <>
      <div className={'header'}>
        <div className={'header__container'}>
          <div className={'header__logo'}>Trello</div>
          <button className={'header__login'}>Log In</button>
        </div>
      </div>
      {status === 'loading' && <Linear className={'preloader'} />}
    </>
  )
}
