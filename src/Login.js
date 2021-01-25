import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './style/signup.css';

const Login = ({ setToken }) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');

    const [emailLogin, setEmaillogin] = useState('');
    const [passwordLogin, setPasswordlogin] = useState('');

    function handleSubmit(e) {
      e.preventDefault();

      let role;
      if(!document.getElementById("one").checked && !document.getElementById("two").checked){
        setSignupError('Vous n\'avez pas séléctionné votre role');
      }
      else {
        if(document.getElementById("one").checked){
          role = 'Utilisateur'
        }
        else {
          role = 'Annonceur'
        }

        const userReg = {
            nom: nom,
            prenom: prenom,
            age: age,
            email: email,
            password: password,
            role: role
        }

        setSignupError('');

        axios.post('http://localhost:4000/app/signup', userReg)
        .then(result => {
          if(result.status === 200) {
            console.log(result.data);
            setToken(result.data);
          }
        })
        .catch(function (error) {
          setSignupError(error.response.data.message);
        })
      }

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
      .then(res => {
        if(res.status === 200) {
          console.log(res.data);
          setToken(res.data)
        }
      })
      .catch(error => {
          setLoginError(error.response.data.message);
      });

      setEmaillogin('');
      setPasswordlogin('');

    }

    function switchLogin(e){
      e.preventDefault();

      const signUpButton = document.getElementById('signUp');
      const signInButton = document.getElementById('signIn');
      const container = document.getElementById('container-signup');

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });

      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });
    }

    return (
      <div className="body-signup">
        <div className="container-signup" id="container-signup">
          <div className="form-container sign-up-container">
            <form className="form-signup" onSubmit={handleSubmit}>
              <h1 className="h1-signup">Vous êtes :</h1>
              <div className="card">
                <label className="radio">
                  <input
                      className="input-signup"
                    type='radio'
                    name='role'
                    id='one'
                    value='Utilisateur'
                  />
                  <span className="span-signup">Utilisateur</span>
                </label>
                <label className="radio">
                  <input
                      className="input-signup"
                    type='radio'
                    name='role'
                    id='two'
                    value='Annonceur'
                  />
                  <span className="span-signup">Annonceur</span>
                </label>  
              </div>
              <input
                  className="input-signup"
                  type='text'
                  placeholder='Nom'
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
              />
              <input
                  className="input-signup"
                  type='text'
                  placeholder='Prénom'
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
              />
              <input
                  className="input-signup"
                  type='number'
                  min = '1'
                  max = '100'
                  placeholder='Age'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
              />
              <input
                  className="input-signup"
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <input
                  className="input-signup"
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
            <form className="form-signup" onSubmit={handleLogin}>
              <h1 className="h1-signup">Connectez-vous</h1>
              <input
                className="input-signup" 
                type="email" 
                placeholder="Email" 
                value={emailLogin}
                onChange={(e) => setEmaillogin(e.target.value)}
              />
              <input
                className="input-signup" 
                type="password" 
                placeholder="Password" 
                value={passwordLogin}
                onChange={(e) => setPasswordlogin(e.target.value)}
              />
              <a className="a-signup" href="https://reactjs.org">Mot de passe oublié</a>
              <input type='submit' className='bouton-signup' value='Se connecter'/>
              {loginError && <p style={{color: 'red'}}>{loginError}</p>}
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="h1-signup">Bon retour</h1>
                <p className="p-signup">Pour vous connecter renseignez vos informations</p>
                <button onClick={switchLogin} className="ghost" id="signIn">Connexion</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="h1-signup">Bienvenue</h1>
                <p className="p-signup">Créez-vous un compte dès maintenant</p>
                <button onClick={switchLogin} className="ghost" id="signUp">Créez</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login