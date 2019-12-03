import React from 'react';
import ReactApexChart from "react-apexcharts";

export default class DemoChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    // options: {
                    //     legend: {
                    //         position: 'bottom',
                    //         offsetX: -10,
                    //         offsetY: 0,
                    //         floating: true,
                    //     }
                    // }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                xaxis: {
                    type: 'string',
                    categories: props.tweetsData.authors.length > 15 ? [] : props.tweetsData.authors,
                    // ["John Oliver", "Donald Trump", "Jean Pierre Dupuy", "some other guy",
                    //     "Barack Obama", "George Washington"
                    // ],
                    labels: {
                        rotate: 300,
                        rotateAlways: true,
                        trim: true,
                        minHeight: 100
                    }
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
                }
            },


            series: [
                {
                    name: 'Unpopular Tweets',
                    data: props.tweetsData.unpopular
                }, {
                    name: 'Somewhat Popular Tweets',
                    data: props.tweetsData.somewhatPopular
                }, {
                    name: 'Popular Tweets',
                    data: props.tweetsData.popular
                }, {
                    name: 'Very Popular Tweets',
                    data: props.tweetsData.veryPopular
                }, {
                    name: 'Extremely Popular Tweets',
                    data: props.tweetsData.extremelyPopular
                }
            ],
        }
    }

    componentDidUpdate() {
        if (this.state.options.xaxis.categories !== this.props.tweetsData.authors){
            this.updateHistogram();
        }
    }

    updateHistogram() {
        var newSeries =
            [
                {
                    name: 'Unpopular Tweets',
                    data: this.props.tweetsData.unpopular
                }, {
                    name: 'Somewhat Popular Tweets',
                    data: this.props.tweetsData.somewhatPopular
                }, {
                    name: 'Popular Tweets',
                    data: this.props.tweetsData.popular
                }, {
                    name: 'Very Popular Tweets',
                    data: this.props.tweetsData.veryPopular
                }, {
                    name: 'Extremely Popular Tweets',
                    data: this.props.tweetsData.extremelyPopular
                }
            ];

        var newOptions = JSON.parse(JSON.stringify(this.state.options));
        newOptions.xaxis.categories = this.props.tweetsData.authors;
        this.setState({options: newOptions, series: newSeries});
    }

    render() {
        // if (this.props.tweetsData.authors.length > 20) return null;
        return (

            <div id="chart">
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    height="350" />
            </div>


        );
    }
}