(function () {
  'use strict';

// Declare app level module which depends on views, and components
  var module = angular.module('myApp', [
    'ngRoute',
    'myApp.version'
  ]).
  config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});

    $routeProvider.when('/', {
      templateUrl: 'app/tracker.html',
      controller: 'TrackerCtrl'
    });
  }]);

  module.controller('TrackerCtrl', ['$scope', function ($scope) {
    $scope.players = [];
    $scope.enemies = [];
    $scope.allCombatents = [];

    $scope.playerName = null;
    $scope.enemyName = null;

    $scope.addPlayer = function (playerName) {
      $scope.players.push({
        name: playerName,
        initiative: null
      });
      $scope.playerName = null;
    };

    $scope.addEnemy = function (enemyName) {
      $scope.enemies.push({
        name: enemyName,
        initiative: null
      });
      $scope.enemyName = null;
    };

    $scope.resetGroup = function (players, allClear) {
      var group = (players) ? $scope.players : $scope.enemies;

      if (allClear) {
        $scope.players = [];
      } else {
        for (var i = 0; i < $scope.players.length; i++) {
          group[i].initiative = null;
        }
      }
    };

    $scope.$watchCollection('players + enemies', function () {
      $scope.allCombatents = $scope.players.concat($scope.enemies);
    })

  }]);
})();