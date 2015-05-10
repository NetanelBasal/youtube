export default (app) => {
  require('./youtube.controller')(app);
  require('./youtube.directive')(app);
}

