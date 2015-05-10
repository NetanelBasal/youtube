export default ( app ) => {
  // @ngInject
  app.directive('youtubeList', ( youtubeFactory ) => {
    return {
      templateUrl: 'app/youtubeList/views/youtubeList.tpl.html',
      require: '^youtube',
      scope      : {},
      link       : link
    };

    function link( scope, ele, attr, ctrl ) {

      scope.youtubeFactory = youtubeFactory;

      scope.setVideo = ( video ) => {
        ctrl.setVideo(video);
      }
    }

  });

}