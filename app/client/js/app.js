goog.provide('App');

goog.require('app.Routes');
goog.require('app.pages.Basepage');
goog.require('app.Store')

/**
  @param {app.Routes} routes
  @param {este.Router} router
  @param {app.pages.Basepage} basepage
  @param {Element} element
  @constructor
 */
var App = function(routes, router, basepage, element) {

  routes.addToEste(router, function(route, params) {
    routes.setActive(route, params);
    React.render(basepage.component(), element);
  });

  router.start();

}
