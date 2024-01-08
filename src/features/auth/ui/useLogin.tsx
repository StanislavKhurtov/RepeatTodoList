import { useActions } from '@/common/hooks/useActions'
import { ResponseType } from '@/common/types/common.types'
import { AuthParamsType } from '@/features/auth/api/auth-api.types'
import { authThunk } from '@/features/auth/model/auth-reducer'
import { useFormik } from 'formik'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
export const useLogin = () => {
  const { logIn } = useActions(authThunk)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: (values: AuthParamsType, formikHelpers) => {
      logIn(values)
        .unwrap()
        .catch((err: ResponseType) => {
          err.fieldsErrors?.forEach(fieldError => {
            return formikHelpers.setFieldError(fieldError.field, fieldError.error)
          })
        })
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Must be 3 characters or less'
      }

      return errors
    },
  })

  return { formik }
}
