(function() {
  'use strict'

  //@ngInject
  function waitMe() {
    return {
      restrict: 'A',
      link    : link
    }

    function link( $scope, elem, attr ) {
      $scope.$watch('waitMe', function( show ) {
        if( show === true ) {
          elem
            .waitMe({
              effect: attr.shape,
              text  : attr.text,
              bg    : 'rgba(0,0,0,0.7)',
              color : '#000',
              sizeW : '',
              sizeH : ''
            });
        } else {
          elem.waitMe("hide");
        }
      })
    }
  }

  angular.module('wait.me', [])
    .directive('waitMe', waitMe);

})();
