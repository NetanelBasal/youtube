export default ( app ) => {
  // @ngInject
  app.directive('youtubeList', ( youtubeFactory ) => {
    return {
      templateUrl: 'app/youtubeList/views/youtubeList.tpl.html',
      scope      : {},
      link       : link
    };

    function link( scope ) {

      scope.youtubeFactory = youtubeFactory;

      /**
       * Set the video
       * @param video
       */
      scope.setVideo = ( video ) => {
        scope.youtubeFactory.setVideo(video);
      }

      /**
       * Get video votes
       * @param video
       */
      scope.getVotes = ( video ) => {
        scope.youtubeFactory.getVotes(video);
      }
    }

  });

}