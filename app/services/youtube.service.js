// @ngInject
export default function youtubeFactory( $http ) {

  const URL_API = 'https://www.googleapis.com/youtube/v3/search';
  const YOUTUBE_URL = 'http://www.youtube.com/embed/';
  const VIDEO_API = 'https://www.googleapis.com/youtube/v3/videos';
  const API_KEY = 'AIzaSyBsobUXzJvjjuHZsMiv7SZAkzVcSgc8F2c';
  let _videos = [];
  let _video = null;

  /**
   *
   * @param query
   */
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
      setVideos(videos, () => {
        setVideo(getVideos()[0]);
      });
    });

  }

  /**
   *
   * @returns {Array}
   */
  function getVideos() {
    return _videos;
  }

  /**
   * Not all the videos have videoID so i need to filter
   * to not get an error or an empty screen
   * @param videos
   * @param cb
   */
  function setVideos( videos, cb ) {
    _videos = videos.filter(( video ) => {
      return video.id;
    });
    cb();
  }

  /**
   *
   * @returns {*}
   */
  function getVideo() {
    return _video;
  }

  /**
   *
   * @param video
   */
  function setVideo( video ) {
    getVideos().forEach(( video ) => {
      video.active = false;
    });
    video.active = true;
    video.src = YOUTUBE_URL + video.id.videoId;
    _video = video;
  }

  /**
   *
   * @param video
   */
  function getVotes( video ) {
    if( video.statistics ) return;
    $http.get(VIDEO_API, {
      params: {
        id    : video.id.videoId,
        part  : 'statistics',
        fields: 'items/statistics/likeCount,items/statistics/dislikeCount',
        key   : API_KEY
      }
    }).then(( res ) => {
      video.statistics = res.data.items[0].statistics;
    });

  }

  return {
    getVideos   : getVideos,
    setVideos   : setVideos,
    getVideo    : getVideo,
    setVideo    : setVideo,
    searchVideos: searchVideos,
    getVotes    : getVotes
  }

}


