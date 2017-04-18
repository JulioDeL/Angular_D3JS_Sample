'use strict';

var plotChartCtrl = [
  'D3Factory',
  '$element',
  '$scope',
  function (D3Factory, $element, $scope) {
    var self = this;

    function createChart() {
      D3Factory.d3().then(function (d3) {

        var margin = { top: 20, right: 20, bottom: 30, left: 40 },
          padding = { bottom: 40 },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

        var x = d3.scaleBand().range([0, width]).padding(0.1);
        var y = d3.scaleLinear().range([height, 0]);

        var data = self.plotData;
        var svg = d3.select('.chart-container').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom + padding.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        x.domain(data.map(function (d) { return d.x; }));
        y.domain([0, d3.max(data, function (d) { return d.y; })]);

        svg.selectAll('.bar')
          .data(data)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', function (d) { return x(d.x); })
          .attr('width', x.bandwidth())
          .attr('y', function (d) { return y(d.y); })
          .attr('height', function (d) { return height - y(d.y); })
          .attr('fill', function (d) {
            return 'rgb(0, 0, ' + (d.y) + ')';
          });

        svg.append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x))
          .selectAll('text')
          .attr('transform', 'rotate(20)')
          .style('font-size', '12px')
          .style('text-anchor', 'start');

        svg.append('g')
          .call(d3.axisLeft(y))
          .selectAll('text')
          .style('font-size', '12px');
      });
    }

    $scope.$watch('$ctrl.plotData', (plotData) => {
      if (plotData) createChart();
    });
  }
];

angular.module('d3HsApp').component('plotChart', {
  controller: plotChartCtrl,
  bindings: {
    plotData: '<',
  },
  templateUrl: 'assets/plot-chart/plot-chart.component.html'
});