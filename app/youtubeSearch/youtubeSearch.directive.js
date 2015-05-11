export default ( app ) => {
  // @ngInject
  app.directive('youtubeSearch', ( youtubeFactory ) => {
    return {
      templateUrl: 'app/youtubeSearch/views/youtubeSearch.tpl.html',
      scope      : {},
      link       : link
    };

    function link( scope ) {

      let query;

      /**
       * Search video
       */
      scope.searchVideos = function() {
        if( scope.search && scope.search !== query ) {
          query = scope.search;
          scope.searchEmpty = false;
          youtubeFactory.searchVideos(scope.search);
        } else if( !scope.search ) {
          scope.searchEmpty = true;
        }
      }
    }
  });

}