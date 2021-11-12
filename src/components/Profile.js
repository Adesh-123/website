import React,{useState,useEffect} from 'react';
import * as ReactBootStrap from "react-bootstrap"
import {useHistory} from "react-router-dom"
import './visiblepage.css'

function Profile(props){
    const history=useHistory();
    const [user, setUser] = useState({firstName:"",lastName:"",email:"",dateofbirth:"",phoneNumber:""});
    useEffect(async() => {
        const response = await fetch("http://localhost:5000/apicall/profile",{
            method:'GET',
            headers:{
                "content-type":"application/json",
                "auth-token":localStorage.getItem('token')
            }
        });
        const json = await response.json();
        if(json.success){
            setUser(json.user[0]);
            // console.log(json.user[0])
                props.showAlert("your Profile","success")
                
           }
        
    },[])

   const showdeatail=(users)=>{
       return(
             <tr>
                    <td>{users.firstName}</td>
                    <td>{users.lastName}</td>
                    <td>{users.email}</td>
                    <td>{users.dateofbirth}</td>
                    <td>{users.phoneNumber}</td>
             </tr> 
       )
   }

    return (
        <>
        <div style={{display:'flex',justifyContent:'space-between'}}>
              <button style={{margin:'14px',fontSize:"24px",borderRadius:'4px'}} type="button" class="btn btn-primary" onClick={()=>{history.push('/visiblepage')}}>Back</button>
              <button style={{margin:'14px',fontSize:"24px",borderRadius:'4px'}} type="button" class="btn btn-primary" onClick={()=>{history.push('/editprofile')}}>Edit profile</button>
              <button style={{margin:'14px',fontSize:"24px",borderRadius:'4px'}} type="button" class="btn btn-primary" onClick={()=>{history.push('/')}}>Logout</button>
        </div>
        <div className="container"  style={{height:'50vh',width:'50vw',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <table striped bordered hover >
                <thead>
                    <tr>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>Email</th>
                    <th>dateofbirth</th>
                    <th>phoneNumber</th>
                    </tr>
                </thead>
                <tbody >
                   {showdeatail(user)}              
                </tbody>
             </table>
        </div>
        </>
    );
}

export default Profile;