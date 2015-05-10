export default ( app ) => {
  // @ngInject
  app.directive('youtubeVideo', ( youtubeFactory, $sce ) => {
    return {
      templateUrl: 'app/youtubeVideo/views/youtubeVideo.tpl.html',
      scope      : {},
      link       : link
    };

    function link( scope, el ) {

      scope.youtubeFactory = youtubeFactory;

      scope.trustSrc = function( src ) {
        return $sce.trustAsResourceUrl(src);
      }

      scope.$watch(() => {
        return youtubeFactory.getVideo();
      }, ( newVal ) => {
        if( newVal ) {
          scope.waitMe = true;
          el.find('iframe').on('load', () => {
            scope.$apply(() => {
              scope.waitMe = false;
            })
          });
        }
      });

    }

  });

}