import React, { useState } from "react";
import axios from 'axios';

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
};

const VideoDetail = ({ video, nomPlay }) => {

  const [errorVid, setErrorVid] = useState('');
  const token = getToken();

  if (!video) {
    return <div>
       <h1 className="h1-an">Ajoutez une vidéo :</h1>
       <hr className="hr-detail"/>
    </div>;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(nomPlay === ''){
      setErrorVid('Veuillez selectionner une playlist pour ajouter cette vidéo');
    }
    else {
      const videoBack = {
        nom: video.snippet.title,
        user_id: token,
        playlist_name: nomPlay
      }

      axios.post('http://localhost:4000/app/video', videoBack)
      .then(result => {
        if(result.status === 200) {
          console.log('vidéo ajoutée');
        }
      })
      .catch(function (error) {
        setErrorVid(error.response.data.message);
      })
    }
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <form onSubmit={handleSubmit}>
          <input type='submit' className='bouton-an' value="Ajouter"/>
          {errorVid && <p style={{color: 'red'}}>{errorVid}</p>}
        </form>
        <hr className="hr-detail"/>
      </div>
    </div>
  );
};

export default VideoDetail;