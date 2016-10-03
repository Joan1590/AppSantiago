angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('form', {
      url: '/',
      templateUrl: 'templates/form.html',
      controller: 'formCtrl'
    })
    .state('show', {
      url: '/show',
      templateUrl: 'templates/show.html',
      controller: 'showCtrl'
    })
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
