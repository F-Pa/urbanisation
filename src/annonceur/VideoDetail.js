import React from "react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>
       <h1 className="h1-an">Ajoutez une vidéo :</h1>
       <hr className="hr-detail"/>
    </div>;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  console.log(typeof video);
  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <form onSubmit={handleSubmit}>
          <input type='submit' className='bouton-an' value="Ajouter"/>
        </form>
        <hr className="hr-detail"/>
      </div>
    </div>
  );
};

export default VideoDetail;