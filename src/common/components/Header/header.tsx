import { selectStatus } from '@/app/app.selectors'
import { RequestStatusType } from '@/app/app-reducer'
import { useAppSelector } from '@/app/store'
import { LogOutIcon } from '@/assets'
import { Linear } from '@/common/components/Preloader'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { selectIsLoginIn } from '@/features/auth/model/auth.selectors'
import { authThunk } from '@/features/auth/model/auth-reducer'

export const Header = () => {
  const status = useAppSelector<RequestStatusType>(selectStatus)
  const isLoggidIn = useAppSelector<boolean>(selectIsLoginIn)
  const dispatch = useAppDispatch()
  const logOut = () => {
    dispatch(authThunk.logOut())
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
