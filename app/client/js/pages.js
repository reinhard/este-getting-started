goog.provide('app.Pages');

goog.require('app.PageA');
goog.require('app.PageB');


/**
  @param {app.PageA} pageA
  @param {app.PageB} pageB
  @constructor
 */
app.Pages = function(pageA, pageB) {

  this.pageA = pageA;
  this.pageB = pageB;

}
