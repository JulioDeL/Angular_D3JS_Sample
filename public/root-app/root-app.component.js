'use strict';

var rootAppCtrl = [
  'CardsService',
  function (CardsService) {
    var self = this;

    self.$onInit = () => {
      self.loading = true;
      CardsService.getCardsGroupedBySet('1').then(cards => {
        self.plotData = getPlotData(cards.data);
        self.loading = false;
      });
    }

    function getPlotData(cardsData) {
      return _.map(cardsData, (value, key) => {
        return { x: key, y: value.length }
      });
    }
  }
];

angular.module('d3HsApp').component('rootApp', {
  controller: rootAppCtrl,
  templateUrl: 'assets/root-app/root-app.component.html'
});