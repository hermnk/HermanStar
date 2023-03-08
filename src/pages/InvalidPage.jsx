import React, { Component } from 'react'


class InvalidPage extends Component{
    constructor(props){
        super(props)
        this.SendToLogin = this.SendToLogin.bind(this);
        this.SendToRegister = this.SendToRegister.bind(this);
    }
    SendToLogin(){
        window.location.href = "/login"
    }
    SendToRegister(){
        window.location.href = "/register"
    }
    render(){
    return(
        <div className="invalid-buttons"> 
            <h2>It seems that you have not signed in</h2>
            <div className="invalid-buttons">
                <button onClick={this.SendToLogin} className="register-login-button">Click here to login!</button>
                <button onClick={this.SendToRegister} className="register-login-button">Click here to register!</button>
            </div>
        </div>
    )

    }

}

export default InvalidPage;