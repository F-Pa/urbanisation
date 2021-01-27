import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../style/annonceur.css'

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
};

const Annonceur = () => {
    const [nom, setNom] = useState('')
    const [categorie, setCategorie] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [annonceList, setAnnonceList] = useState([]);
    const [categorieList, setCategorieList] = useState([]);

    useEffect(() => {
        const user_id = {
            user_id: getToken()
        };

        axios.post('http://localhost:4000/app/getAnnonce', user_id)
        .then(function(result) {
          if(result.status === 200) {
            setAnnonceList(result.data);
          }
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    function handleClick() {
        const test = ['Meca', 'Jeux', 'Musique', 'Podcast', 'Short']

        for(const i in test) {
            const catBack = {
                catBack: test[i]
            };
    
            axios.post('http://localhost:4000/app/countCategorie', catBack)
            .then(function(result) {
                if(result.status === 200) {
                    setCategorieList(categorieList => [...categorieList, result.data]);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }

    function handleSelect(e) {
        setCategorie(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const annonceBack = {
            nom: nom,
            user_id: getToken(),
            category: categorie,
            description: description
        }

        setError('');

        axios.post('http://localhost:4000/app/annonce', annonceBack)
        .then(result => {
            if(result.status === 200) {
                console.log('annonce ajoutée');
            }
        })
        .catch(function (error) {
            setError(error.response.data.message);
        })

        window.location.reload();
    }

    return(
        <div className="body-ut">
            <div className="row-ut">
                <div className="column-left-ut">
                    <h1>Vos Annonces :</h1>
                    <hr className="hr-hori"/>
                    {annonceList.map(item => {
                        return (                         
                                <li className="vid-an" key={item}> {item} </li>
                        );
                    })}
                </div>
                <div className="sep1">
                        <hr className="hr-vert"/>
                </div>
                <div className="column-right-ut">
                    <h1> Ajouter une annonce</h1>
                    <hr className="hr-hori"/>
                    <form className="form-ut" onSubmit={handleSubmit} className="annonce">
                        <div className="annonce">
                            <input
                                required
                                className="input-pl"
                                type="text"
                                placeholder="Nom de L'annonce"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </div>
                        <div className="annonce">
                            <select 
                                required 
                                name="category" 
                                className="input-ca" 
                                size="1"
                                onChange={handleSelect}
                                onClick={handleClick}
                                >
                                <option value="" hidden>Catégorie (Nombre de playlist)</option>
                                {categorieList.map(item => {
                                    return <option value={item[1]} key={item[1]}>{item[1]} ({item[0]})</option>
                                })}
                            </select>
                        </div>
                        <div className="annonce">
                            <textarea 
                                required 
                                placeholder="Description" 
                                className="input-ca" 
                                id="description" 
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}>
                            </textarea>
                        </div>
                        <div className="annonce">
                            <input className="bouton-ul" type="submit" value="Créer"/>
                        </div>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </form> 
                </div>
            </div> 
        </div>
    )
}

export default Annonceur