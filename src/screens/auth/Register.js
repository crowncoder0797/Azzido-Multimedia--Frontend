import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormContainer, Message } from '../../components'
import { useForm } from 'react-hook-form'
import useAuthHook from '../../api/auth'
import { inputEmail, inputPassword, inputText } from '../../utils/dynamicForm'
import { Helmet } from 'react-helmet'

const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { postRegister } = useAuthHook()

  const { isLoading, isError, error, mutateAsync, isSuccess } = postRegister

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/auth/login')
      }, 1000);
    }
  }, [isSuccess])

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
