import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@/app/store'
import { selectIsLoginIn } from '@/features/auth/model/auth.selectors'
import { useLogin } from '@/features/auth/ui/useLogin'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

export const Login = () => {
  const { formik } = useLogin()
  const isLoggidIn = useAppSelector<boolean>(selectIsLoginIn)

  if (isLoggidIn) {
    return <Navigate to={'/'} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a
                href={'https://social-network.samuraijs.com/'}
                rel={'noreferrer'}
                target={'_blank'}
              >
                {' '}
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                label={'Email'}
                margin={'normal'}
                {...formik.getFieldProps('email')}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email ? (
                <div className={'formError'} style={{ color: 'red' }}>
                  {formik.errors.email}
                </div>
              ) : null}
              <TextField
                label={'Password'}
                margin={'normal'}
                type={'password'}
                {...formik.getFieldProps('password')}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password ? (
                <div className={'formError'} style={{ color: 'red' }}>
                  {formik.errors.password}
                </div>
              ) : null}
              <FormControlLabel
                checked={formik.values.rememberMe}
                control={<Checkbox />}
                label={'Remember me'}
                name={'rememberMe'}
                onChange={formik.handleChange}
              />
              <Button color={'primary'} type={'submit'} variant={'contained'}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
