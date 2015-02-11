goog.provide('app.main');
goog.require('app.DiContainer');

app.main = function(elementId) {
  var container = new app.DiContainer;

  container.configure({
    resolve: App,
    "with": {element : document.getElementById(elementId)}
  });

  return container.resolveApp();
};

goog.exportSymbol('app.main', app.main);