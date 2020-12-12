import { useState } from 'react'
import { signup } from '../../actions/auth'

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: 'mkz',
    email: 'mkz@mkz.com',
    password: 'mkzmkz',
    error: '',
    loading: false,
    message: '',
    showForm: true
  })

  const { name, email, password, error, loading, message, showForm } = values

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: '', [name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.table({ name, email, password, error, loading, message, showForm })
    setValues({ ...values, loading: true, error: '' })
    const user = { name, email, password }
    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false })
      }
      setValues({
        ...values,
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: data.message,
        showForm: false
      })
    })
  }

  const showLoading = () =>
    loading ? <div className="alert alert-info"> loading ...</div> : ''
  const showError = () =>
    error ? <div className="alert alert-danger"> {error} </div> : ''
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : ''

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            onChange={handleChange('name')}
            type="text"
            className="form-control"
            placeholder="name"
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange('email')}
            type="email"
            className="form-control"
            placeholder="email"
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={handleChange('password')}
            type="password"
            className="form-control"
            placeholder="password"
          />
        </div>
        <div>
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    )
  }

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}

      {showForm && signupForm()}
    </>
  )
}

export default SignupComponent
