import React, {useState} from "react";
import {useHistory} from "react-router-dom"


function Register (props){
const  [user, setUser] = useState({firstname:"",lastname:"",email:"",password:"",cpassword:"",dateofbirth:"",phonenumber:""});
const history =useHistory();
 const handleonchange=(e)=>{
     setUser({...user,[e.target.name]:e.target.value})
 }

 const handleSubmit= async(e)=>{
    e.preventDefault();
    const {firstname,lastname,email,password,dateofbirth,phonenumber}=user;
    if(!(firstname && lastname && email && password && dateofbirth && phonenumber)){
      return props.showAlert("All detail should be filled","danger")
    }
    if(password!==user.cpassword) return alert("password not matched")
    const response= await fetch("http://localhost:5000/apicall/register",{
         method:"POST",
         headers:{"content-Type":"application/json"},
         body:JSON.stringify({firstname,lastname,email,password,dateofbirth,phonenumber})
    });
      const json =await response.json();
      if(json.success){
         localStorage.setItem('token',json.authtoken);
         console.log(localStorage.getItem('token'))
         history.push('/visiblepage');
         props.showAlert("Account created successfully","success")
      }
      else{
        props.showAlert("Invalid detail","danger")
      }
 }

    return (
        <div className="container">
        <h1 className="mt-3">Create Account to this website for acessing</h1>
     <form  onSubmit={handleSubmit}>
       <div className="form-group my-4">
          <label htmlFor="name">First Name</label>
           <input type="text" className="form-control" id="firstname" value={user.firstname} name="firstname" onChange={handleonchange}/>
       </div>
       <div className="form-group my-4">
          <label htmlFor="name">Last Name</label>
           <input type="text" className="form-control" id="lastname" value={user.lastname} name="lastname" onChange={handleonchange}/>
       </div>
       <div className="form-group my-4">
           <label htmlFor="exampleInputEmail1">Email address</label>
           <input type="email" className="form-control" id="email" value={user.email} name="email"  onChange={handleonchange}/>
           <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
       </div>
       <div className="form-group my-4">
           <label htmlFor="password">Password</label>
           <input type="password" className="form-control" id="password" value={user.password} name="password"  onChange={handleonchange} minLength={8} required/>
       </div>
       <div className="form-group my-4">
           <label htmlFor="cpassword">confirm Password</label>
           <input type="password" className="form-control" id="cpassword" value={user.cpassword} name="cpassword" onChange={handleonchange}  minLength={8} required/>
       </div>
       <div className="form-group my-4">
            <label htmlFor="birthday">Birthday:</label>
            <input type="date" id="birthday" value={user.dateofbirth} name="dateofbirth" onChange={handleonchange}/>
       </div>
       <div className="form-group my-4">
            <label htmlFor="phone">Enter your phone number:</label>
            <input type="tel" id="phone" name="phonenumber" value={user.phonenumber} onChange={handleonchange}/>
       </div>
       <button type="submit" className="btn btn-primary">Submit</button>
     </form>
   </div>
    );
}

export default Register;