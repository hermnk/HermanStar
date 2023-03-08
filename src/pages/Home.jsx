import React from 'react';



class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = { 
      username: "",
      update: 0,
      messageList: [],
      messageField: "",
      messageSent: false,
      inputText: ""
  }
  this.handleMessageField = this.handleMessageField.bind(this);
  this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
  this.getUser = this.getUser.bind(this);
  }

  getUser(){
    let token = document.cookie
    for(let x = 0; x<token.length;x++){
      if(token[x] === "="){
        token = token.slice(x+1,token.length)
      }
    }
    fetch('http://51.174.115.16:7146/api/home', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `token=${token}`
  })
  .then(response => response.json())
  .then(data => {
    if(data.expired === true){
      alert('Økten din har utløpet, du må logge inn på nytt')
      window.location.href = "/login"
    }else if( data.token.username){
      this.setState({username: data.token.username})
    }
    
  })
    .catch(error => console.error('Error:', error));
  }
  updateMessageField(){
    fetch('http://51.174.115.16:7146/api/incommingMessages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `noe`
  })
    .then(response => response.json())
    .then(response => {
      console.log(response.message)
      this.setState({
        messageList: response.message
      })
    })
    .catch(error => console.error('Error:', error));
  }
  handleMessageField(event){
    this.setState({
     inputText: event.target.value
    })
  }
  handleSubmitMessage(){
    let token = document.cookie;
    for(let x = 0; x<token.length;x++){
      if(token[x] === "="){
        token = token.slice(x+1,token.length)
      }
    }
    this.setState({
      inputText: ""
    })
    fetch("http://51.174.115.16:7146/api/message",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `username=${this.state.username}&message=${this.state.inputText}&token=${token}`
    })
    .then(res => res.json())
    .then(res => {
      if(res.expired === true){
        alert('Økten din har utløpet, du må logge inn på nytt')
        window.location.href = "/login"
      } else{
        alert('message sent')
        
      }
    })
  }
  
  componentDidMount() {
    this.getUser();
    setInterval(() => this.getUser(), 10000);
    setInterval(() => this.updateMessageField(), 5000);
  }
    
render(){
  return(
      <div className="body-home">
        <div className="chat-div">
          <h1>Chatbox</h1>
          <div>
            <h3>
              Du er logget inn som {this.state.username}!
            </h3>
            <div className="message-post">
            {this.state.messageList.map((items, index) =>(
                <p>
                  {items.user}: <br/>
                  {items.content}
                </p>
            ))}
            </div>
            <input value={this.state.inputText} onChange={this.handleMessageField}></input>
            <button onClick={this.handleSubmitMessage}>Send</button>
          </div>

        </div>
      </div>
  )
}
}

    export default Home;