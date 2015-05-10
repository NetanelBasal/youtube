(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

(function () {
  "use strict";
  var modules = require("./modules");

  require("./common/wait-me");

  /************************** APP internal modules **********************/

  require("./services/services.index");

  var app = angular.module(require("./config").appName, modules).config(require("./config/config.index")).run(require("./config/run.phase.js"));

  require("./youtube")(app);
  require("./youtubeSearch")(app);
  require("./youtubeList")(app);
  require("./youtubeVideo")(app);
})();

},{"./common/wait-me":2,"./config":3,"./config/config.index":4,"./config/run.phase.js":5,"./modules":6,"./services/services.index":7,"./youtube":9,"./youtubeList":12,"./youtubeSearch":14,"./youtubeVideo":16}],2:[function(require,module,exports){
"use strict";

(function () {
  "use strict";

  //@ngInject
  function waitMe() {
    return {
      restrict: "A",
      link: link
    };

    function link($scope, elem, attr) {
      $scope.$watch("waitMe", function (show) {
        if (show === true) {
          elem.waitMe({
            effect: attr.shape,
            text: attr.text,
            bg: "rgba(0,0,0,0.7)",
            color: "#000",
            sizeW: "",
            sizeH: ""
          });
        } else {
          elem.waitMe("hide");
        }
      });
    }
  }

  angular.module("wait.me", []).directive("waitMe", waitMe);
})();

},{}],3:[function(require,module,exports){
"use strict";

exports.appName = "youtube";

},{}],4:[function(require,module,exports){
"use strict";

// @ngInject
function config() {}

module.exports = config;

},{}],5:[function(require,module,exports){
"use strict";

// @ngInject
function runPhase() {}

module.exports = runPhase;

},{}],6:[function(require,module,exports){
"use strict";

module.exports = [

/** Third party modules **/

"wait.me",

/** Local modules **/
"services"];

},{}],7:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var youtubeFactory = _interopRequire(require("./youtube.service.js"));




angular.module("services", []).factory("youtubeFactory", youtubeFactory);

},{"./youtube.service.js":8}],8:[function(require,module,exports){
"use strict";

// @ngInject
module.exports = youtubeFactory;
function youtubeFactory($http) {
  var URL_API = "https://www.googleapis.com/youtube/v3/search";
  var YOUTUBE_URL = "http://www.youtube.com/embed/";
  var API_KEY = "AIzaSyBsobUXzJvjjuHZsMiv7SZAkzVcSgc8F2c";
  var _videos = [];
  var _video = null;

  function searchVideos(query) {
    $http.get(URL_API, {
      params: {
        part: "id,snippet",
        fields: "items/id/videoId,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default",
        maxResults: "5",
        key: API_KEY,
        q: query
      }
    }).then(function (res) {
      var videos = res.data.items;
      setVideos(videos);
      setVideo(videos[0]);
    });
  }

  function getVideos() {
    return _videos;
  }

  function setVideos(videos) {
    _videos = videos;
  }

  function getVideo() {
    return _video;
  }

  function setVideo(video) {
    video.src = YOUTUBE_URL + video.id.videoId;
    _video = video;
  }

  return {
    getVideos: getVideos,
    setVideos: setVideos,
    getVideo: getVideo,
    setVideo: setVideo,
    searchVideos: searchVideos
  };
}

},{}],9:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  require("./youtube.controller")(app);
  require("./youtube.directive")(app);
};

},{"./youtube.controller":10,"./youtube.directive":11}],10:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

module.exports = function (app) {
  app.controller("YoutubeController", YoutubeController);
};

var YoutubeController = (function () {
  //@ngInject
  function YoutubeController(youtubeFactory) {
    _classCallCheck(this, YoutubeController);

    this.youtubeFactory = youtubeFactory;
  }
  YoutubeController.$inject = ["youtubeFactory"];
  YoutubeController.$inject = ["youtubeFactory"];

  _prototypeProperties(YoutubeController, null, {
    searchVideos: {
      value: function searchVideos(query) {
        this.youtubeFactory.searchVideos(query);
      },
      writable: true,
      configurable: true
    },
    setVideo: {
      value: function setVideo(video) {
        this.youtubeFactory.setVideo(video);
      },
      writable: true,
      configurable: true
    }
  });

  return YoutubeController;
})();

},{}],11:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  // @ngInject
  app.directive("youtube", function () {
    return {
      templateUrl: "app/youtube/views/youtube.tpl.html",
      scope: {},
      transclude: true,
      controller: "YoutubeController as vm",
      link: link
    };

    function link(scope, elem, attr) {
      console.log("Im in youtube");
    }
  });
};

},{}],12:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  require("./youtubeList.directive")(app);
};

},{"./youtubeList.directive":13}],13:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  // @ngInject
  app.directive("youtubeList", ["youtubeFactory", function (youtubeFactory) {
    return {
      templateUrl: "app/youtubeList/views/youtubeList.tpl.html",
      require: "^youtube",
      scope: {},
      link: link
    };

    function link(scope, ele, attr, ctrl) {
      scope.youtubeFactory = youtubeFactory;

      scope.setVideo = function (video) {
        ctrl.setVideo(video);
      };
    }
  }]);
};

},{}],14:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  require("./youtubeSearch.directive")(app);
};

},{"./youtubeSearch.directive":15}],15:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  // @ngInject
  app.directive("youtubeSearch", function () {
    return {
      require: "^youtube",
      templateUrl: "app/youtubeSearch/views/youtubeSearch.tpl.html",
      scope: {},
      link: link
    };

    function link(scope, elem, attr, ctrl) {
      scope.searchVideos = function () {
        if (scope.search) {
          scope.searchEmpty = false;
          ctrl.searchVideos(scope.search);
        } else {
          scope.searchEmpty = true;
        }
      };
    }
  });
};

},{}],16:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  require("./youtubeVideo.directive")(app);
};

},{"./youtubeVideo.directive":17}],17:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  // @ngInject
  app.directive("youtubeVideo", ["youtubeFactory", "$sce", function (youtubeFactory, $sce) {
    return {
      templateUrl: "app/youtubeVideo/views/youtubeVideo.tpl.html",
      scope: {},
      link: link
    };

    function link(scope, el) {
      scope.youtubeFactory = youtubeFactory;

      scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
      };

      scope.$watch(function () {
        return youtubeFactory.getVideo();
      }, function (newVal) {
        if (newVal) {
          scope.waitMe = true;
          el.find("iframe").on("load", function () {
            scope.$apply(function () {
              scope.waitMe = false;
            });
          });
        }
      });
    }
  }]);
};

},{}]},{},[1])


//# sourceMappingURL=main.js.map