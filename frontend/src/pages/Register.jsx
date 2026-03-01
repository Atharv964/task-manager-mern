import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
    localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/login")
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={submitHandler}>
        <input 
            type="text" 
            placeholder="Enter your name" 
            value={name} 
            onChange={(e)=> setName(e.target.value)} />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;