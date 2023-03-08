import React, {useState} from 'react'

function Login(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) =>{
        e.preventDefault();
        fetch('http://51.174.115.16:7146/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${username}&password=${password}`
        })
        .then(res => res.json())
        .then(res => {
            if(res.validUser === true){
                document.cookie = `jwt=${res.token}`
                window.location.href = "/home"
            }
        })
        .catch(error => console.error('Error:', error));
    }
    return(
        <div>
            <div className="login-form">
                <form action="/api" onSubmit={onSubmit}>
                    <div className="login-grid">
                        <h1>Login:</h1>
                        <h2>Name of the author:</h2>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                        <h2>Password:</h2>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/> <br />
                        <button type="submit">Submit login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Login;

