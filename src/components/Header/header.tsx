import { RequestStatusType } from '@/app/app-reducer'
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Linear } from '@/components/Preloader'
import { logOutTC } from "@/features/Login/auth-reducer";
import { LogOutIcon } from "@/assets";

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
          {isLoggidIn ? <button className={"header__btn"} onClick={logOut}>Log Out<LogOutIcon className={'header__icon'} /></button> : ''}
        </div>
      </div>
      {status === 'loading' && <Linear className={'preloader'} />}
    </>
  )
}
