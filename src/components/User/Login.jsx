import axios from "axios";
import { useEffect, useState } from "react";

const Login = ({setCheck, setId}) =>{
  const [Username,setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const CreateAccount = async () => {
    const response = await axios.post("http://localhost:3000/user/addUser", {
      password: Password,
      username: Username
    });
    if (response.data.id) { // Assuming the backend returns the new user ID
      setCheck(true);
      setId(response.data.id); // Update the user ID state
      alert("User Added");
    }
  };

  const TryLogin = async () =>
  {
    const response = await axios.get("http://localhost:3000/user/checkUser", {
        params: { 
            username: Username,
            password : Password
          },
        headers: { "Content-Type": "application/json" }
      });


      console.log("API Response:", response.data);
      const newIdValue = response.data.check
      setId(newIdValue);
      if(response.data.check != 'false'){
        setCheck(true)
      }
  }
    return(
    <div  className="flex min-h-screen justify-center items-center">
        <div className="lg:space-x-10 justify-center align-middle lg:flex ">
          <div className="justify-center grid space-y-2 lg:border-r-2 lg:pr-10 lg:border-b-0 border-b-2 lg:pb-0 pb-5">
            <label className="justify-center flex">Login</label>
            <input onChange={(e) => {setUsername(e.target.value)}} className="border-2 rounded-3xl"/>
            <input onChange={(e) => {setPassword(e.target.value)}} className="border-2 rounded-3xl" />
            <button onClick={TryLogin}>Login</button>
          </div>

          <div className="justify-center grid space-y-2 lg:pt-0 pt-5">
            <label className="justify-center flex">Create Account</label>
            <input onChange={(e) => {setUsername(e.target.value)}} className="border-2 rounded-3xl"/>
            <input onChange={(e) => {setPassword(e.target.value)}} className="border-2 rounded-3xl"/>
            <button onClick={CreateAccount}>Create</button>
          </div>
        </div>
    </div>
    )
  };

export default Login


