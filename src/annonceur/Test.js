import React from 'react';
import SearchBar from './Searchbar';
import youtube from '../youtubeApi/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

import '../style/Test.css';


class Test extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
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

    render() {
        return(
            <div className="body-an">
                <div className="row-an">
                    <div className="column-left">
                        <h1>Vos Playlist :</h1>
                        <p>Some text..</p>
                    </div>
                    <div className="column-center">
                        <h1>Les vidéos de </h1>
                        <p>Some text..</p>
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