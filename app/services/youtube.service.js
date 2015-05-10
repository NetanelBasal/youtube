// @ngInject
export default function youtubeFactory( $http ) {

  const URL_API = 'https://www.googleapis.com/youtube/v3/search';
  const YOUTUBE_URL = 'http://www.youtube.com/embed/';
  const API_KEY = 'AIzaSyBsobUXzJvjjuHZsMiv7SZAkzVcSgc8F2c';
  let _videos = [];
  let _video = null;

  function searchVideos( query ) {

    $http.get(URL_API, {
      params: {
        part      : 'id,snippet',
        fields    : 'items/id/videoId,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default',
        maxResults: '5',
        key       : API_KEY,
        q         : query
      }
    }).then(( res ) => {
      let videos = res.data.items;
      setVideos(videos);
      setVideo(videos[0]);
    });

  }

  function getVideos() {
    return _videos;
  }

  function setVideos( videos ) {
    _videos = videos;
  }

  function getVideo() {
    return _video;
  }

  function setVideo( video ) {
    video.src = YOUTUBE_URL + video.id.videoId;
    _video = video;
  }

  return {
    getVideos   : getVideos,
    setVideos   : setVideos,
    getVideo    : getVideo,
    setVideo    : setVideo,
    searchVideos: searchVideos
  }

}


