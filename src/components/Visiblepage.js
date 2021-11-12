import React,{useState,useEffect} from 'react';
import {useHistory} from "react-router-dom"
import './visiblepage.css'

function Visiblepage(props){
    const history=useHistory();
    let count=1;
   const [data, setData] = useState([])

   useEffect(() => {
    async function datafetch() {
        const response= await fetch("http://localhost:5000/apicall/alluser",{
              method:"GET",
              headers:{
                  "content-type":"application/json"
              }
             });
            const json=await response.json();
            if(json.success){
                setData(json.detail);     
                props.showAlert("All user detail","success")
            }
          }
          datafetch();
        //   eslint-disable-next-line
   },[])
   
    const renderdata=(note,index)=>{
        
       return ( <tr>
                <th >{count++}</th>
                <td>{note.firstName}</td>
                <td>{note.lastName}</td>
                <td>{note.email}</td>
                <td>{note.dateofbirth}</td>
                <td>{note.phoneNumber}</td>
           </tr>)
   }
    return(
        <div className="box">
            <div style={{display:"flex",justifyContent:'space-between',alignItems:"center",fontSize:"24px"}}>
                <div style={{fontSize:"54px"}}>All user list </div>
                <div style={{margin:"14px"}}>
                    <button style={{margin:"14px", fontSize:"24px",borderRadius:'4px'}} type="button" className="btn btn-primary" onClick={()=>{history.push('/profile')}}>Profile</button>
                    <button style={{fontSize:"24px",borderRadius:'4px'}} type="button" className="btn btn-primary" onClick={()=>{history.push('/')}}>Logout</button>
                </div>
            </div>
             <table>
                  <thead>
                    <tr>
                    <th>#</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>Email</th>
                    <th>dateofbirth</th>
                    <th>phoneNumber</th>
                    </tr>
                   </thead>
                <tbody>
                    { data.map((note)=>{
                       return  renderdata(note);
                    })}
                </tbody>
             </table>
      </div>
    );
}

export default Visiblepage