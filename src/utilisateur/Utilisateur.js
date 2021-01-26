import React from 'react';
import axios from 'axios';

import SearchBar from './Searchbar';
import youtube from '../youtubeApi/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

import '../style/Test.css';

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
};

class Utilisateur extends React.Component {
    
    state = {
        nomP: '',
        nomPError: '',
        videoError: '',
        videos: [],
        selectedVideo: null,
        titlePlaylist: '',
        playlist: [],
        videoList: [],
        token: getToken()
    }

    componentWillMount() {
        const user_id = {
            user_id: getToken()
        };
    
        axios.post('http://localhost:4000/app/getPlaylist', user_id)
        .then(function(result) {
          if(result.status === 200) {
            this.setState({playlist: result.data});
          }
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        })
    }

    handleNomP = (e) => {
        this.setState({nomP: e.target.value});
    }

    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
            videos: response.data.items
        })
        console.log("this is resp",response);
    };

    handleVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    }

    handlePlaylist = (e) => {
        e.preventDefault();

        const playlistBack = {
            nom: this.state.nomP,
            user_id: this.state.token,
        }

        this.setState({nomPError: ''});

        axios.post('http://localhost:4000/app/playlist', playlistBack)
        .then(result => {
          if(result.status === 200) {
            console.log('playlist ajoutée');
          }
        })
        .catch(function (error) {
            this.setState({nomPError: error.response.data.message});
        }.bind(this))

        window.location.reload();

    }

    handleVideoPrint = (item) => {
        this.setState({ titlePlaylist: item});
        this.setState({ focused: true });

        const video_id = {
            user_id: getToken(),
            playlist_name: item
        };

        this.setState({videoError: ''});
    
        axios.post('http://localhost:4000/app/getVideo', video_id)
        .then(function(result) {
          if(result.status === 200) {
            this.setState({videoList: result.data});
          }
        }.bind(this))
        .catch(function (error) {
            console.log(error);
            this.setState({videoError: error.response.data.message});
        }.bind(this))
        
    }

    render() {
        return(
            <div className="body-an">
                <div className="row-an">
                    <div className="column-left">
                        <h1 className="h1-an">Vos Playlist :</h1>
                        <hr className="hr-hori"/>
                        <ul className="ul-an">
                            {this.state.playlist.map(item => {
                                return <input 
                                            type='submit'
                                            key={item} 
                                            className="but-an"
                                            value={item}
                                            onClick={() => this.handleVideoPrint(item)}
                                        />;
                            })}
                        </ul>
                        <form onSubmit={this.handlePlaylist}>
                            <input
                                className="input-pl"
                                type='text'
                                placeholder='Nom de la Playlist'
                                value={this.nomP}
                                onChange={this.handleNomP}
                            />
                            <select required className="input-ca" name="category" size="1">
                                <option value=""hidden>Catégorie de la playlist</option>
                                <option value="Meca">Mécanique</option>
                                <option value="Jeux">Jeux-vidéo</option>
                                <option value="Musique">Musique</option>
                                <option value="Podcast">Podcast</option>
                                <option value="Short">Court-métrage</option>
                            </select>
                            <input type='submit' className='bouton-pl' value="Nouvelle Playlist"/>
                            {this.state.nomPError && <p style={{color: 'red'}}>{this.state.nomPError}</p>}
                        </form>
                    </div>
                    <div className="sep1">
                        <hr className="hr-vert"/>
                    </div>
                    <div className="column-center">
                        <h1 className="h1-an">Les vidéos de {this.state.titlePlaylist}</h1>
                        <hr className="hr-hori"/>
                        <ul className="ul-an">
                            {this.state.videoError && <p>{this.state.videoError}</p>}
                            {this.state.videoList.map(item => {
                                console.log(item);
                                return <li className="vid-an" key={item}> {item} </li>;
                            })}
                        </ul>
                    </div>
                    <div className="sep1">
                        <hr className="hr-vert"/>
                    </div>
                    <div className="column-right">
                        <div className='ui container' style={{marginTop: '1em'}}>
                            <div className='ui grid'>
                                <div className="ui row">
                                    <div className="eleven wide column">
                                        <VideoDetail video={this.state.selectedVideo} nomPlay={this.state.titlePlaylist}/>
                                    </div>
                                    <SearchBar handleFormSubmit={this.handleSubmit}/>
                                    <div className="five wide column">
                                        <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default Utilisateur;