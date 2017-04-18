'use strict';

angular.module('d3HsApp')
  .service('CardsService', function ($http) {
    var self = this;

    const URL = 'https://omgvamp-hearthstone-v1.p.mashape.com/'
    const CONFIG = {
      headers: {
        'X-Mashape-Key': 'VndjBaU3aMmshq1IDQdzCdFHu42Up1YJ334jsnkKel8osacjfF'
      }
    }

    self.getCardsGroupedBySet = function(collectible) {
      return $http.get(URL + `cards?collectible=${collectible}`, CONFIG);
    }
  });