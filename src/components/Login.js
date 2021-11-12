import React,{useState} from 'react';
import {useHistory} from "react-router-dom"


function Login (props){
    const history=useHistory();
    const  [user, setUser] = useState({email:"",password:""});
    const handleonchange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const {email,password}=user;
        const response=await fetch("http://localhost:5000/apicall/login",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({email,password})
        });
        const json= await response.json();
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            history.push('/visiblepage');
            props.showAlert("successfully Login","success")
        }
        else {
            props.showAlert("No such user exist","danger")
        }
    }
    return (
     <div className="container">
         <form onSubmit={handleSubmit}>
             <div className="form-group my-4">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="email" value={user.email}  onChange={handleonchange} name="email" />
             </div>
             <div className="form-group my-4">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" value={user.password} name="password" onChange={handleonchange} />
             </div>
             <button type="submit" className="btn btn-primary">Submit</button>
         </form>
      </div>
    );
}

export default Login;