/**
 * Created by bryannissen on 10/17/15.
 */
(function (angular) {
  'use strict';

  var module = angular.module('myApp');

  module.factory('LocalCache', [function () {
    var hasLocalStorage = (typeof(Storage) !== "undefined");

    return {

      hasLocalStorage: function () {
        return hasLocalStorage;
      },

      savePlayers: function (playersArr) {
        if (hasLocalStorage) {
          localStorage.setItem('dnd-initiative.players', JSON.stringify(playersArr));
        }
      },

      getPlayers: function () {
        var players = [];

        if (hasLocalStorage) {
          players = JSON.parse(localStorage.getItem('dnd-initiative.players'));
        }

        return players || [];
      }

    };
  }])

})(angular);