import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import Failedlogin from "../alerts/failedlogin"

const Signup = () => {

  const [first_name, setFirstname] = useState('')
  const [last_name, setLastname] = useState('')  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(first_name, last_name, email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>First Name:</label>
      <input 
        type="text" 
        onChange={(e) => setFirstname(e.target.value)} 
        value={first_name} 
      />
      <label>Last Name:</label>
      <input 
        type="text" 
        onChange={(e) => setLastname(e.target.value)} 
        value={last_name} 
      />
      <label>Email:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <br/>
      <br/>
      <button disabled={isLoading}>Sign up</button>
      {error && <Failedlogin error={error} />}
    </form>
  )
}

export default Signup