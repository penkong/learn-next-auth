import Layout from '../components/Layout'
import SignupComponent from '../components/auth/Signup.component'

const Signup = () => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signup Page</h2>
      <div className="row">
        <div className="col-md-6 offest-md-3">
          <SignupComponent />
        </div>
      </div>
    </Layout>
  )
}

export default Signup
