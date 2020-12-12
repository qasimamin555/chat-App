import { MergeType } from '@material-ui/icons'
import React from 'react'
import {connect} from 'react-redux'
import {getDatabase} from "../store/action/action"
import firebase from '../config/firebase'


class Chat extends React.Component{
    constructor(){
        super()
        this.state={
            chatUser:[],
            chat:[],
         message:''
        }
    }
    componentDidMount(){
        this.props.getDatabase()
    }
    chat=(value)=>{
        this.setState({
            chatUser:value
        })
        var currently=this.props.currentUser
        var chat =this.state.chatUser
        var merge= this.merge(currently.uid,chat.uid)

              this.getData(merge)
    }
    send=()=>{
        var currently=this.props.currentUser
        var chat =this.state.chatUser
        var merge= this.merge(currently.uid,chat.uid)
      
         firebase.database().ref('/').child(`chat/${merge}`).push({
             message:this.state.message,
                name: currently.name,
                email: currently.email
         
         })
       
    }
       getData=(uid)=>{
          firebase.database().ref('/').child(`chat/${uid}`)
          .on("child_added",(data)=>{
        
              this.state.chat.push(data.val().message)
              this.setState({
                   chat:this.state.chat
              })
            
          })
      }
    merge=(current,chat)=>{
      if(current>chat){
          return current+chat
      }else{
          return chat+current
      }
    }
    render(){
      
        console.log(this.props)
        
        return(
            
            <div>
               
        <h2 style={{textAlign:'center'}}>Welcome to {this.props.currentUser.name} </h2>
      <img style={{textAlign:'center'}} src={this.props.currentUser.photo} />  
          <ul>
              {
                  this.props.getusers.map((v,i)=>{
                  return v.uid !== this.props.currentUser.uid &&  <li>
                      <img src={v.photo}/>
                      {v.name}
                      <button onClick={(value)=>this.chat(v)}>letsChat</button>
                      </li>
                    
                  
                  })
              }
              </ul>
              <div style={{
                  height:'300px',
                  width:'500px',
                  backgroundColor:'lightgray'
              }}>
             
              {Object.keys(this.state.chatUser).length?
              <div>
                 <h2>chatting</h2>
                 <ul>
                     {this.state.chat.map((v,i)=>{
                        return <li>{v}</li>
                     })
                     }
                     </ul>
                 <input value={this.state.message} onChange={(e)=>this.setState({message:e.target.value})}/>
                 <button onClick={this.send}>send</button> 
               </div>
               :<h2>click to chat</h2>
            }

            
            
                    
                    
                
                 
                  
                   
              </div>
        </div>
        )
    }
}

const mapStateToProps=(state)=>({
    currentUser:state.chat.currentUser,
    getusers:state.chat.getusers
  })
  const mapDispatchToProps=(dispatch)=>({
    getDatabase:()=>dispatch(getDatabase())
  })

export default connect(mapStateToProps,mapDispatchToProps) (Chat)
