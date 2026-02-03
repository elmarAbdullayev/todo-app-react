import { useState } from "react";
import "../css/Login.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {


const [formData, setFormData] = useState({
  username: "",
  password: "",
});

const [error,setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const { login } = useContext(AuthContext)!;

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [name]:value
  }))

}

const handleClick = async () => {
  try {
    if(formData.username.trim() === "" || formData.password.trim() === "") {
      setError("Please fill in all fields.");
      return;
    }
    if(formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    await login(formData.username, formData.password);
    navigate("/main");
  } catch (error) {
    setError("Login failed. Please check your credentials.");
  }
}

  return (
    <>
      

<form action="" className="login-form d-flex flex-column align-items-center justify-content-center gap-3">
  
    <label htmlFor="username">Username</label> 
    <input type="text" id="username" name="username" onChange={(e)=>handleChange(e)}/>

    <label htmlFor="password">Password</label> 
    <input type="password" id="password" name="password" onChange={(e)=>handleChange(e)}/>


  {error && <p className="text-danger">{error}</p>}

    <div className="d-flex gap-3">

    

    <button type="button" className="btn btn-primary" onClick={()=>handleClick()}>Login</button>
    <button type="button" className="btn btn-primary" onClick={()=>navigate("/register")}>Register</button>

    </div>

</form>


    </>
  )
}


export default Login;