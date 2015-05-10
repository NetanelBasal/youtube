export default (app) => {
  // @ngInject
  app.directive('youtube', () => {
    return {
      templateUrl: 'app/youtube/views/youtube.tpl.html',
      scope: {},
      transclude:true,
      controller: 'YoutubeController as vm',
      link: link
    };

    function link(scope, elem, attr) {
        console.log('Im in youtube');
    }

  });

}