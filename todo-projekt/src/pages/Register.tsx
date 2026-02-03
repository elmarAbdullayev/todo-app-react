import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


 function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error,setError] = useState<string | null>(null);
  
  const {register} = useContext(AuthContext)!;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const { name,value } = e.target

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

      await register(formData.username, formData.password);
      navigate("/login");

    } catch (err) {
      setError("Registration failed. Please try again.");
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

    <button type="button" className="btn btn-primary" onClick={() => navigate("/")}>Login Page</button>
    <button type="button" className="btn btn-primary" onClick= {() => handleClick()}>Register</button>

    </div>

</form>

    </>
  )
}


export default Register;