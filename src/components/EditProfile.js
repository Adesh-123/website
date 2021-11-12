import React,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"

function EditProfile(props) {
    const history =useHistory();
   const  [user, setUser] = useState({firstName:"",lastName:"",email:"", dateofbirth:"",phoneNumber:""});
   
   const handleonchange=(e)=>{
       setUser({...user,[e.target.name]:e.target.value})
    }
    
    useEffect(async() => {
        const response = await fetch("http://localhost:5000/apicall/profile",{
            method:'GET',
            headers:{
                "content-type":"application/json",
                "auth-token":localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setUser(json.user[0]);
       
    }, [])
    
    const handleSubmit=async(e)=>{
      e.preventDefault();
      const {firstName,lastName,email,dateofbirth,phoneNumber}=user;
      const response = await fetch(`http://localhost:5000/apicall/updateprofile/${user._id}`,{
          method:'POST',
          headers:{
              "content-Type":"application/json",
              "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({firstName,lastName,email,dateofbirth,phoneNumber})
        })
            const json = await response.json();
            if(json.success){
                props.showAlert("Account edit successfully","success")
                setUser(json.user);
                history.push('/profile');
            } 
            else{
                props.showAlert("Invalid detail","danger")
            }

   }

    return (
        <div className="container">
        <div style={{display:'flex',justifyContent:'center'}}>
          
           <h1 className="mt-3">Edit profile</h1>
        </div>
     <form  onSubmit={handleSubmit}>
       <div className="form-group my-4">
          <label htmlFor="name">First Name</label>
           <input type="text" className="form-control" id="firstname" value={user.firstName} name="firstName" onChange={handleonchange}/>
       </div>
       <div className="form-group my-4">
          <label htmlFor="name">Last Name</label>
           <input type="text" className="form-control" id="lastname" value={user.lastName} name="lastName" onChange={handleonchange}/>
       </div>
       <div className="form-group my-4">
           <label htmlFor="exampleInputEmail1">Email address</label>
           <input type="email" className="form-control" id="email" value={user.email} name="email"  onChange={handleonchange}/>
           <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
       </div>
       <div className="form-group my-4">
            <label htmlFor="birthday">Birthday:</label>
            <input type="date" id="birthday" value={user.dateofbirth} name="dateofbirth" onChange={handleonchange}/>
       </div>
       <div className="form-group my-4">
            <label htmlFor="phone">Enter your phone number:</label>
            <input type="tel" id="phone" name="phoneNumber" value={user.phoneNumber} onChange={handleonchange}/>
       </div>
       <button type="submit" className="btn btn-primary">Submit</button>
     </form>
   </div>
    );
}

export default EditProfile;
