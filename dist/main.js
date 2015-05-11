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

},{"./common/wait-me":2,"./config":3,"./config/config.index":4,"./config/run.phase.js":5,"./modules":6,"./services/services.index":7,"./youtube":9,"./youtubeList":11,"./youtubeSearch":13,"./youtubeVideo":15}],2:[function(require,module,exports){
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
  var VIDEO_API = "https://www.googleapis.com/youtube/v3/videos";
  var API_KEY = "AIzaSyBsobUXzJvjjuHZsMiv7SZAkzVcSgc8F2c";
  var _videos = [];
  var _video = null;

  /**
   *
   * @param query
   */
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
      setVideos(videos, function () {
        setVideo(getVideos()[0]);
      });
    });
  }

  /**
   *
   * @returns {Array}
   */
  function getVideos() {
    return _videos;
  }

  /**
   * Not all the videos have videoID so i need to filter
   * to not get an error or an empty screen
   * @param videos
   * @param cb
   */
  function setVideos(videos, cb) {
    _videos = videos.filter(function (video) {
      return video.id;
    });
    cb();
  }

  /**
   *
   * @returns {*}
   */
  function getVideo() {
    return _video;
  }

  /**
   *
   * @param video
   */
  function setVideo(video) {
    getVideos().forEach(function (video) {
      video.active = false;
    });
    video.active = true;
    video.src = YOUTUBE_URL + video.id.videoId;
    _video = video;
  }

  /**
   *
   * @param video
   */
  function getVotes(video) {
    if (video.statistics) {
      return;
    }$http.get(VIDEO_API, {
      params: {
        id: video.id.videoId,
        part: "statistics",
        fields: "items/statistics/likeCount,items/statistics/dislikeCount",
        key: API_KEY
      }
    }).then(function (res) {
      video.statistics = res.data.items[0].statistics;
    });
  }

  return {
    getVideos: getVideos,
    setVideos: setVideos,
    getVideo: getVideo,
    setVideo: setVideo,
    searchVideos: searchVideos,
    getVotes: getVotes
  };
}

},{}],9:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  require("./youtube.directive")(app);
};

},{"./youtube.directive":10}],10:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  // @ngInject
  app.directive("youtube", function () {
    return {
      templateUrl: "app/youtube/views/youtube.tpl.html",
      scope: {},
      transclude: true
    };
  });
};

},{}],11:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  require("./youtubeList.directive")(app);
};

},{"./youtubeList.directive":12}],12:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  // @ngInject
  app.directive("youtubeList", ["youtubeFactory", function (youtubeFactory) {
    return {
      templateUrl: "app/youtubeList/views/youtubeList.tpl.html",
      scope: {},
      link: link
    };

    function link(scope) {
      scope.youtubeFactory = youtubeFactory;

      /**
       * Set the video
       * @param video
       */
      scope.setVideo = function (video) {
        scope.youtubeFactory.setVideo(video);
      };

      /**
       * Get video votes
       * @param video
       */
      scope.getVotes = function (video) {
        scope.youtubeFactory.getVotes(video);
      };
    }
  }]);
};

},{}],13:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  require("./youtubeSearch.directive")(app);
};

},{"./youtubeSearch.directive":14}],14:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  // @ngInject
  app.directive("youtubeSearch", ["youtubeFactory", function (youtubeFactory) {
    return {
      templateUrl: "app/youtubeSearch/views/youtubeSearch.tpl.html",
      scope: {},
      link: link
    };

    function link(scope) {
      var query = undefined;

      /**
       * Search video
       */
      scope.searchVideos = function () {
        if (scope.search && scope.search !== query) {
          query = scope.search;
          scope.searchEmpty = false;
          youtubeFactory.searchVideos(scope.search);
        } else if (!scope.search) {
          scope.searchEmpty = true;
        }
      };
    }
  }]);
};

},{}],15:[function(require,module,exports){
"use strict";

module.exports = function (app) {
  require("./youtubeVideo.directive")(app);
};

},{"./youtubeVideo.directive":16}],16:[function(require,module,exports){
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

      /**
       *
       * @param src
       * @returns {*}
       */
      scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
      };

      /**
       * When the video change need to show loading icon
       * and when the iframe finish to load remove the icon
       */
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