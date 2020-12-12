import React from "react";
import firebase from "../config/firebase"
import Button from "react-bootstrap/Button"
import {connect} from "react-redux"
import {login} from '../store/action/action'


class Server extends React.Component{
  
   
    render(){
        console.log(this.props) 
      
        return(
            <div style={{justifyContent:"center",textAlign:"center"}}>
            <h2>First signIN with facebook</h2>
            
  <Button style={{justifyContent:"center"}} variant="primary" size="lg" onClick={()=>this.props.login(this.props.history)}>
   login with facebook
  </Button>
  

        
         </div>   
        )
    }
}
const mapStateToProps=(state)=>({
  currentUser:state.chat.currentUser
})
const mapDispatchToProps=(dispatch)=>({
  login:(history)=>dispatch(login(history))
})

export default connect(mapStateToProps,mapDispatchToProps) (Server)