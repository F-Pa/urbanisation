import React from 'react';

import '../style/annonceur.css'

const Annonceur = () => {
    return(
        <div class="body-ut">
            <div class="row-ut">
                <div class="column-left-ut">
                    <h1>Vos Annonces :</h1>
                    <hr className="hr-hori"/>
                    <p>annonce 1</p>
                    {/* <button >Supprimer</button> */}
                </div>
                <div className="sep1">
                        <hr className="hr-vert"/>
                </div>
                <div class="column-right-ut">
                    <h1> Ajouter une annonce</h1>
                    <hr className="hr-hori"/>
                    <form className="form-ut" action="" method="get" class="annonce">
                        <div className="annonce">
                            <label className="label-ut" for="name">Nom de l'annonce: </label>
                            <input className="input-ut" type="text" name="name" id="name"/>
                        </div>
                        <div className="annonce">
                            <label className="label-ut" for="category">Categorie: </label>
                            <select name="category" size="1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="annonce">
                            <label className="label-ut" for="description">Description: </label>
                            <textarea id="description" name="description"></textarea>
                        </div>
                        <div className="annonce">
                            <input className="bouton-ul" type="submit" value="Créer"/>
                        </div>
                    </form> 
                </div>
            </div> 
        </div>
    )
}

export default Annonceur