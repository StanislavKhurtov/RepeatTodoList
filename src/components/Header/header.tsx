import { RequestStatusType } from '@/app/app-reducer'
import { useAppSelector } from '@/app/store'
import { LogOutIcon } from '@/assets'
import { Linear } from '@/components/Preloader'
import { logOutTC } from '@/features/Login/auth-reducer'
import { useAppDispatch } from '@/hooks/useAppDispatch'

export const Header = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isLoggidIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const logOut = () => {
    dispatch(logOutTC())
  }

  return (
    <>
      <div className={'header'}>
        <div className={'header__container'}>
          <div className={'header__logo'}>TasksAssistant</div>
          {isLoggidIn ? (
            <button className={'header__btn'} onClick={logOut}>
              Log Out
              <LogOutIcon className={'header__icon'} />
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
      {status === 'loading' && <Linear className={'preloader'} />}
    </>
  )
}
