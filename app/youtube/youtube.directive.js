export default ( app ) => {
  // @ngInject
  app.directive('youtube', () => {
    return {
      templateUrl: 'app/youtube/views/youtube.tpl.html',
      scope      : {},
      transclude : true
    };

  });

}