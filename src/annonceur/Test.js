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

class Test extends React.Component {
    
    state = {
        nomP: '',
        nomPError: '',
        videos: [],
        selectedVideo: null,
        playlist: [],
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
            user_id: this.state.token
        }

        this.setState({nomPError: ''});

        axios.post('http://localhost:4000/app/playlist', playlistBack)
        .then(result => {
          if(result.status === 200) {
            console.log('ok');
          }
        })
        .catch(function (error) {
            this.setState({nomPError: error.response.data.message});
        }.bind(this))

        window.location.reload();
        window.location.reload();

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
                                return <li key={item} className="li-an">{item}</li>;
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
                            <input type='submit' className='bouton-pl' value="Nouvelle Playlist"/>
                            {this.state.nomPError && <p style={{color: 'red'}}>{this.state.nomPError}</p>}
                        </form>
                    </div>
                    <div className="sep1">
                        <hr className="hr-vert"/>
                    </div>
                    <div className="column-center">
                        <h1 className="h1-an">Les vidéos de </h1>
                        <hr className="hr-hori"/>
                        <p>Some text..</p>
                    </div>
                    <div className="sep1">
                        <hr className="hr-vert"/>
                    </div>
                    <div className="column-right">
                        <div className='ui container' style={{marginTop: '1em'}}>
                            <div className='ui grid'>
                                <div className="ui row">
                                    <div className="eleven wide column">
                                        <VideoDetail video={this.state.selectedVideo}/>
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

export default Test;