import React, { useState } from 'react';
import axios from 'axios';

import './style/signup.css';

const Login = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [util, setUtilisateur] = useState('');
    const [annonc, setAnnonceur] = useState('');

    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');

    const [emailLogin, setEmaillogin] = useState('');
    const [passwordLogin, setPasswordlogin] = useState('');

    function handleSubmit(e) {
      e.preventDefault();

      const userReg = {
          nom: nom,
          prenom: prenom,
          age: age,
          email: email,
          password: password
      }

      setSignupError('');

      axios.post('http://localhost:4000/app/signup', userReg)
      .catch(function (error) {
        setSignupError(error.response.data.message);
      })

      setNom('');
      setPrenom('');
      setAge('');
      setEmail('');
      setPassword('');
    }

    function handleLogin(e) {
      e.preventDefault();

      const userLog = {
        emailLogin: emailLogin,
        passwordLogin: passwordLogin
      }

      setLoginError('');

      axios.post('http://localhost:4000/app/signin', userLog)
      .catch(function (error) {
        setLoginError(error.response.data.message);
      })

      setEmaillogin('');
      setPasswordlogin('');
    }

    function switchLogin(e){
      e.preventDefault();

      const signUpButton = document.getElementById('signUp');
      const signInButton = document.getElementById('signIn');
      const container = document.getElementById('container');

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });

      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });
    }

    return (
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Vous êtes :</h1>
            <div className="card">
              <label className="radio">
                <input
                  type='radio'
                  name='role'
                  id='one'
                  value='Utilisateur'
                  onChange={(e) => setUtilisateur(true)}
                />
                <span>Utilisateur</span>
              </label>
              <label className="radio">
                <input
                  type='radio'
                  name='role'
                  id='two'
                  value='Annonceur'
                  onChange={(e) => setAnnonceur(true)}
                />
                <span>Annonceur</span>
              </label>  
            </div>
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
            <input type='submit' className='bouton-signup' value="S'identifier"/>
            {signupError && <p style={{color: 'red'}}>{signupError}</p>}
          </form>
        </div>
        <div className="form-container sign-in-container">
      		<form onSubmit={handleLogin}>
      			<h1>Connectez-vous</h1>
            <input 
              type="email" 
              placeholder="Email" 
              value={emailLogin}
              onChange={(e) => setEmaillogin(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={passwordLogin}
              onChange={(e) => setPasswordlogin(e.target.value)}
            />
      			<a href="https://reactjs.org">Mot de pass oublié</a>
      			<input type='submit' className='bouton-signup' value='Se connecter'/>
            {loginError && <p style={{color: 'red'}}>{loginError}</p>}
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
      				<p>Créez-vous un compte dès maintenant</p>
      				<button onClick={switchLogin} className="ghost" id="signUp">Créez</button>
      			</div>
      		</div>
      	</div>
      </div>
    )
}

export default Login
