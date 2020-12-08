import React, { useState } from 'react';
import axios from 'axios';

import './style/signup.css';

const Login = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const userReg = {
            nom: nom,
            prenom: prenom,
            age: age,
            email: email,
            password: password
        }

        axios.post('http://localhost:4000/app/signup', userReg)
        .then((res) => {
          console.log(res.data._message);
          setLoginError(res.data._message);
        })

        setNom('');
        setPrenom('');
        setAge('');
        setEmail('');
        setPassword('');
    }

    function switchLogin(e){
      e.preventDefault();

      const signUpButton = document.getElementById('signUp');
      const signInButton = document.getElementById('signIn');
      const container = document.getElementById('container');

      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });

    }

    return (
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Créez votre compte</h1>
            <input
                type='text'
                placeholder='Nom'
                value={nom}
                onChange={(e) => setNom(e.target.value)}
            />
            <input
                type='text'
                placeholder='Prénom'
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
            />
            <input
                type='number'
                placeholder='Age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='password'
                placeholder='Mot de Passe'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input type='submit' className='bouton-signup' value='Submit'/>
            {loginError && <p style={{color: 'red'}}>{loginError}</p>}
          </form>
        </div>
        <div className="form-container sign-in-container">
      		<form action="#">
      			<h1>Connectez-vous</h1>
      			<input type="email" placeholder="Email" />
      			<input type="password" placeholder="Password" />
      			<a href="#">Forgot your password?</a>
      			<input type='login' className='bouton-signup' value='Login'/>
      		</form>
      	</div>
        <div className="overlay-container">
      		<div className="overlay">
      			<div className="overlay-panel overlay-left">
      				<h1>Bon retour</h1>
      				<p>Pour vous connecter renseignez vos informations</p>
      				<button onClick={switchLogin} className="ghost" id="signIn">Connexion</button>
      			</div>
      			<div className="overlay-panel overlay-right">
      				<h1>Bienvenue</h1>
      				<p>Crées-vous un compte dès maintenant</p>
      				<button onClick={switchLogin} className="ghost" id="signUp">Créez</button>
      			</div>
      		</div>
      	</div>
      </div>
    )
}

export default Login
