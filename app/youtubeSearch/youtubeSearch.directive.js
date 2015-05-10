export default (app) => {
  // @ngInject
  app.directive('youtubeSearch', () => {
    return {
      require: '^youtube',
      templateUrl: 'app/youtubeSearch/views/youtubeSearch.tpl.html',
      scope: {},
      link: link
    };

    function link(scope, elem, attr, ctrl) {

      scope.searchVideos = function() {
        if(scope.search) {
          scope.searchEmpty = false;
          ctrl.searchVideos(scope.search);
        } else {
          scope.searchEmpty = true;
        }
      }
    }
  });

}