export default ( app ) => {
  app.controller('YoutubeController', YoutubeController);
}

class YoutubeController {
  //@ngInject
  constructor( youtubeFactory ) {
    this.youtubeFactory = youtubeFactory;
  }

  searchVideos( query ) {
    this.youtubeFactory.searchVideos(query);
  }

  setVideo( video ) {
    this.youtubeFactory.setVideo(video);
  }

}

