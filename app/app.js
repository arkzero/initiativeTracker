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
      templateUrl: 'app/views/page-templates/tracker.html',
      controller: 'TrackerCtrl'
    });

    $routeProvider.when('/dice-roller', {
      templateUrl: 'app/views/page-templates/dice.html',
      controller: 'DiceCtrl'
    })
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

  module.controller('DiceCtrl', [
    '$scope',
    function ($scope) {
      $scope.numDice = 0;
      $scope.numDiceSets = 0;
      $scope.numSides = 0;

      $scope.rollDice = function () {
        var setIndex, resultIndex;

        $scope.diceSets = [];

        for (setIndex = 0; setIndex < $scope.numDiceSets; setIndex += 1) {
          $scope.diceSets[setIndex] = 0;
          for (resultIndex = 0; resultIndex < $scope.numDice; resultIndex += 1) {
            $scope.diceSets[setIndex] += getRandomInt(1, $scope.numSides);
          }
        }
      };

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
  ]);

})();