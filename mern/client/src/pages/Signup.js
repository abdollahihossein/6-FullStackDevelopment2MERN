import { useState } from "react"

const Signup = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(firstname, lastname, email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>First Name:</label>
      <input 
        type="text" 
        onChange={(e) => setFirstname(e.target.value)} 
        value={firstname} 
      />
      <label>Last Name:</label>
      <input 
        type="text" 
        onChange={(e) => setLastname(e.target.value)} 
        value={lastname} 
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
      <button>Sign up</button>
    </form>
  )
}

export default Signup