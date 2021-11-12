import React from "react"
import "./homepage.css"
import {useHistory} from "react-router-dom"

const Homepage = (props) => {
    const history=useHistory();
    return (  
            <div className="homepage">
                <h1>Hello Homepage</h1>
                <div className="button" onClick={()=> history.push("login")} >LOGIN</div>
                <div>OR</div>
                <div className="button" onClick={()=> history.push("register")} >REGISTER</div>
            </div>
    )
}

export default Homepage;