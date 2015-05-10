(function() {
  'use strict'
  var modules = require('./modules');

  require('./common/wait-me');

  /************************** APP internal modules **********************/

  require('./services/services.index');

  const app = angular.module(require('./config').appName, modules)

    .config(require('./config/config.index'))

    .run(require('./config/run.phase.js'))

  require('./youtube')(app);
  require('./youtubeSearch')(app);
  require('./youtubeList')(app);
  require('./youtubeVideo')(app);

})();


