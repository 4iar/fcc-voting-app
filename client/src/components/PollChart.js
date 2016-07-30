import React from 'react';
import _ from 'lodash';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';


export default class PollChart extends React.Component {
  render() {
    const rawData = this.props.rawData;
    const data = _.keys(rawData).map((choice) => {
      return {name: choice, y: rawData[choice]};
    });


    const config = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: null
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Count',
        colorByPoint: true,
        data
      }]
    };

    return (
      <ReactHighcharts config={config}></ReactHighcharts>
    );
  }
}
