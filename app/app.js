(function (angular) {
  'use strict';

// Declare app level module which depends on views, and components
  var module = angular.module('myApp', [
    'ngRoute'
  ]).
  config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});

    $routeProvider.when('/', {
      templateUrl: 'app/views/page-templates/tracker.html',
      controller: 'TrackerCtrl'
    });

    $routeProvider.when('/dice-roller', {
      templateUrl: 'app/views/page-templates/dice.html',
      controller: 'DiceCtrl'
    })
  }]);

})(angular);