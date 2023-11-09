import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormContainer, Message } from '../../components'
import { useForm } from 'react-hook-form'
import useAuthHook from '../../api/auth'
// import useUserRolesHook from '../../api/userRoles'
import { inputEmail, inputPassword, inputText } from '../../utils/dynamicForm'
import useAuth from '../../hooks/useAuth'
import { Helmet } from 'react-helmet'

const Register = () => {
  // let [searchParams] = useSearchParams()
  // const pathName = searchParams.get('next') || '/'
  const navigate = useNavigate()

  const { auth } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // const { setAuth } = useAuth()

  const { postRegister } = useAuthHook()
  // const { postUserRoleById } = useUserRolesHook({
  //   page: 1,
  //   q: '',
  //   limit: 10000000,
  // })

  const { isLoading, isError, error, mutateAsync, isSuccess } = postRegister
  // const {
  //   mutateAsync: userRoleMutateAsync,
  //   data: userRole,
  //   error: errorUserRole,
  //   isError: isErrorUserRole,
  // } = postUserRoleById

  useEffect(() => {
    if (isSuccess) {
      // userRoleMutateAsync(data._id)
      // if (userRole) {
      //   localStorage.setItem('userRole', JSON.stringify(userRole))
      //   localStorage.setItem('userInfo', JSON.stringify(data))

      //   setAuth({
      //     userInfo: data,
      //     userRole: userRole,
      //   })
      //   navigate(pathName)
      // }
    }
  }, [isSuccess])

  useEffect(() => {
    auth?.userInfo && navigate('/')
  }, [navigate])

  const submitHandler = async (data) => {
    mutateAsync(data)
  }

  return (
    <>
      <FormContainer>
        <Helmet>
          <title>Register</title>
          <meta property='og:title' content='Register' key='title' />
        </Helmet>
        <h3 className='fw-light font-monospace text-center'>Sign Up</h3>
        {isSuccess && <Message variant='success'>User has been registered successfully.</Message>}
        {isError && <Message variant='danger'>{error}</Message>}
        {/* {isErrorUserRole && <Message variant='danger'>{errorUserRole}</Message>} */}

        <form onSubmit={handleSubmit(submitHandler)}>
          {inputText({
            register,
            errors,
            label: 'First Name',
            name: 'firstname',
            placeholder: 'First Name',
          })}
          {inputText({
            register,
            errors,
            label: 'Last Name',
            name: 'lastname',
            placeholder: 'Last Name',
          })}
          {inputEmail({
            register,
            errors,
            label: 'Email',
            name: 'email',
            placeholder: 'Email',
          })}
          {inputPassword({
            register,
            errors,
            label: 'Password',
            name: 'password',
            placeholder: 'Password',
          })}
          <button
            type='submit'
            className='btn btn-primary form-control '
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='spinner-border spinner-border-sm' />
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <div className='row pt-3'>
          <div className='col text-center'>
            Already have an account? 
            <Link to='/auth/login' className='ps-1'>
              Log in
            </Link>
          </div>
        </div>
      </FormContainer>
    </>
  )
}

export default Register
