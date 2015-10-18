/**
 * Created by bryannissen on 10/17/15.
 */

(function (angular) {
  'use strict';

  var module = angular.module('myApp');

  module.controller('TrackerCtrl', ['$scope', 'LocalCache', function ($scope, LocalCache) {
    $scope.players = LocalCache.getPlayers() || [];
    $scope.enemies = [];
    $scope.allCombatents = [];

    $scope.playerName = null;
    $scope.enemyName = null;

    $scope.canSave = LocalCache.hasLocalStorage();

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

    $scope.deletePlayer = function (player) {
      deleteObject(player, $scope.players);
    };

    $scope.deleteEnemy = function (enemy) {
      deleteObject(enemy, $scope.enemies);
    };

    function deleteObject (object, array) {
      var index = array.indexOf(object);

      if (index > -1) {
        array.splice(index, 1);
      }
    }

    $scope.resetGroup = function (players, allClear) {
      var group;

      if (allClear) {
        (players) ? $scope.players = [] : $scope.enemies = [];
      } else {
        group = (players) ? $scope.players : $scope.enemies
        for (var i = 0; i < group.length; i++) {
          group[i].initiative = null;
        }
      }
    };

    $scope.savePlayers = function () {
      LocalCache.savePlayers($scope.players);
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

})(angular);