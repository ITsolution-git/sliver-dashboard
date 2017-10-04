(function() {

    angular
        .module('adminapp.pages.main')
        .controller('AdminMainIndexController', AdminMainIndexController);

    AdminMainIndexController.$inject = ['pageService'];

    function AdminMainIndexController(pageService, allUsers) {
        pageService
            .reset()
            .setShowBC(true)
            .addCrumb({name: 'Dashboard', path: 'home'})
            .setPageTitle('Dashboard');






        var trendingLineChart;
        var data = {
            labels : ["Apple","Samsung","SONY","Motorola","Nokia","Microsoft","Xiaomi"],
            datasets : [
                {
                    label: "First dataset",
                    fillColor : "rgba(128, 222, 234, 0.6)",
                    strokeColor : "#ffffff",
                    pointColor : "#00bcd4",
                    pointStrokeColor : "#ffffff",
                    pointHighlightFill : "#ffffff",
                    pointHighlightStroke : "#ffffff",
                    data: [100, 50, 20, 40, 80, 50, 80]
                },
                {
                    label: "Second dataset",
                    fillColor : "rgba(128, 222, 234, 0.3)",
                    strokeColor : "#80deea",
                    pointColor : "#00bcd4",
                    pointStrokeColor : "#80deea",
                    pointHighlightFill : "#80deea",
                    pointHighlightStroke : "#80deea",
                    data: [60, 20, 90, 80, 50, 85, 40]
                }
            ]
        };


        var doughnutData = [
            {
                value: 3000,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Mobile"
            },
            {
                value: 500,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Kitchen"
            },
            {
                value: 1000,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Home"
            }

        ];

        /*
        Trending Bar Chart
        */

        var dataBarChart = {
            labels : ["JAN","FEB","MAR","APR","MAY","JUNE"],
            datasets: [
                {
                    label: "Bar dataset",
                    fillColor: "#46BFBD",
                    strokeColor: "#46BFBD",
                    highlightFill: "rgba(70, 191, 189, 0.4)",
                    highlightStroke: "rgba(70, 191, 189, 0.9)",
                    data: [6, 9, 8, 4, 6, 7]
                }
            ]
        };

        /*
        Trending Bar Chart
        */
        var radarChartData = {
            labels: ["Chrome", "Mozilla", "Safari", "IE10", "iPhone"],
            datasets: [
                {
                    label: "First dataset",
                    fillColor: "rgba(255,255,255,0.2)",
                    strokeColor: "#fff",
                    pointColor: "#00796b",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "#fff",
                    data: [5,6,7,8,6]
                }
            ],
        };
            
        /*
        Pie chart 
        */
        var pieData = [
				{
					value: 300,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "America"
				},
				{
					value: 50,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Canada"
				},
				{
					value: 100,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "UK"
				},
				{
					value: 40,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "Europe"
				},
				{
					value: 120,
					color: "#4D5360",
					highlight: "#616774",
					label: "Australia"
				}

			];
        /*
        Line Chart
        */
        var lineChartData = {
            labels : ["USA","UK","UAE","AUS","IN","SA"],
            datasets : [
                {
                    label: "My dataset",
                    fillColor : "rgba(255,255,255,0)",
                    strokeColor : "#fff",
                    pointColor : "#00796b ",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(220,220,220,1)",
                    data: [65, 45, 50, 30, 63, 45]
                }
            ]

        }

        var polarData = [
            {
                value: 4800,
                color:"#f44336",
                highlight: "#FF5A5E",
                label: "USA"
            },
            {
                value: 6000,
                color: "#9c27b0",
                highlight: "#ce93d8",
                label: "UK"
            },
            {
                value: 1800,
                color: "#3f51b5",
                highlight: "#7986cb",
                label: "Canada"
            },
            {
                value: 4000,
                color: "#2196f3 ",
                highlight: "#90caf9",
                label: "Austrelia"
            },
            {
                value: 5500,
                color: "#ff9800",
                highlight: "#ffb74d",
                label: "India"
            },
            {
                value: 2100,
                color: "#009688",
                highlight: "#80cbc4",
                label: "Brazil"
            },
            {
                value: 5000,
                color: "#00acc1",
                highlight: "#4dd0e1",
                label: "China"
            },
            {
                value: 3500,
                color: "#4caf50",
                highlight: "#81c784",
                label: "Germany"
            }
        ];	
		




        var trendingLineChart = document.getElementById("trending-line-chart").getContext("2d");
        window.trendingLineChart = new Chart(trendingLineChart).Line(data, {		
            scaleShowGridLines : true,///Boolean - Whether grid lines are shown across the chart		
            scaleGridLineColor : "rgba(255,255,255,0.4)",//String - Colour of the grid lines		
            scaleGridLineWidth : 1,//Number - Width of the grid lines		
            scaleShowHorizontalLines: true,//Boolean - Whether to show horizontal lines (except X axis)		
            scaleShowVerticalLines: false,//Boolean - Whether to show vertical lines (except Y axis)		
            bezierCurve : true,//Boolean - Whether the line is curved between points		
            bezierCurveTension : 0.4,//Number - Tension of the bezier curve between points		
            pointDot : true,//Boolean - Whether to show a dot for each point		
            pointDotRadius : 5,//Number - Radius of each point dot in pixels		
            pointDotStrokeWidth : 2,//Number - Pixel width of point dot stroke		
            pointHitDetectionRadius : 20,//Number - amount extra to add to the radius to cater for hit detection outside the drawn point		
            datasetStroke : true,//Boolean - Whether to show a stroke for datasets		
            datasetStrokeWidth : 3,//Number - Pixel width of dataset stroke		
            datasetFill : true,//Boolean - Whether to fill the dataset with a colour				
            animationSteps: 15,// Number - Number of animation steps		
            animationEasing: "easeOutQuart",// String - Animation easing effect			
            tooltipTitleFontFamily: "'Roboto','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",// String - Tooltip title font declaration for the scale label		
            scaleFontSize: 12,// Number - Scale label font size in pixels		
            scaleFontStyle: "normal",// String - Scale label font weight style		
            scaleFontColor: "#fff",// String - Scale label font colour
            tooltipEvents: ["mousemove", "touchstart", "touchmove"],// Array - Array of string names to attach tooltip events		
            tooltipFillColor: "rgba(255,255,255,0.8)",// String - Tooltip background colour		
            tooltipFontSize: 12,// Number - Tooltip label font size in pixels
            tooltipFontColor: "#000",// String - Tooltip label font colour		
            tooltipTitleFontSize: 14,// Number - Tooltip title font size in pixels		
            tooltipTitleFontStyle: "bold",// String - Tooltip title font weight style		
            tooltipTitleFontColor: "#000",// String - Tooltip title font colour		
            tooltipYPadding: 8,// Number - pixel width of padding around tooltip text		
            tooltipXPadding: 16,// Number - pixel width of padding around tooltip text		
            tooltipCaretSize: 10,// Number - Size of the caret on the tooltip		
            tooltipCornerRadius: 6,// Number - Pixel radius of the tooltip border		
            tooltipXOffset: 10,// Number - Pixel offset from point x to tooltip edge
            responsive: true
        });

        var doughnutChart = document.getElementById("doughnut-chart").getContext("2d");
        window.myDoughnut = new Chart(doughnutChart).Doughnut(doughnutData, {
            segmentStrokeColor : "#fff",
            tooltipTitleFontFamily: "'Roboto','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",// String - Tooltip title font declaration for the scale label		
            percentageInnerCutout : 50,
            animationSteps : 15,
            segmentStrokeWidth : 4,
            animateScale: true,
            responsive : true
        });

		var trendingBarChart = document.getElementById("trending-bar-chart").getContext("2d");
		window.trendingBarChart = new Chart(trendingBarChart).Bar(dataBarChart,{
			scaleShowGridLines : false,///Boolean - Whether grid lines are shown across the chart
			showScale: true,
			animationSteps:15,
			tooltipTitleFontFamily: "'Roboto','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",// String - Tooltip title font declaration for the scale label		
			responsive : true
		});

		// window.trendingRadarChart = new Chart(document.getElementById("trending-radar-chart").getContext("2d")).Radar(radarChartData, {
		    
		//     angleLineColor : "rgba(255,255,255,0.5)",//String - Colour of the angle line		    
		//     pointLabelFontFamily : "'Roboto','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",// String - Tooltip title font declaration for the scale label	
		//     pointLabelFontColor : "#fff",//String - Point label font colour
		//     pointDotRadius : 4,
		//     animationSteps:15,
		//     pointDotStrokeWidth : 2,
		//     pointLabelFontSize : 12,
		// 	responsive: true
		// });

		// var pieChartArea = document.getElementById("pie-chart-area").getContext("2d");
		// window.pieChartArea = new Chart(pieChartArea).Pie(pieData,{
		// 	responsive: true		
		// });

		// var lineChart = document.getElementById("line-chart").getContext("2d");
		// window.lineChart = new Chart(lineChart).Line(lineChartData, {
		// 	scaleShowGridLines : false,
		// 	bezierCurve : false,
		// 	scaleFontSize: 12,
		// 	scaleFontStyle: "normal",
		// 	scaleFontColor: "#fff",
		// 	responsive: true,			
		// });

		
		if (typeof getContext != "undefined") {
			var polarChartCountry = document.getElementById("polar-chart-country").getContext("2d");
			window.polarChartCountry = new Chart(polarChartCountry).PolarArea(polarData, {
				segmentStrokeWidth : 1,			
				responsive:true
			});
		}






        // Bar chart ( New Clients)

        $("#clients-bar").sparkline([70, 80, 65, 78, 58, 80, 78, 80, 70, 50, 75, 65, 80, 70, 65, 90, 65, 80, 70, 65, 90], {
            type: 'bar',
            height: '25',
            barWidth: 7,
            barSpacing: 4,
            barColor: '#C7FCC9',
            negBarColor: '#81d4fa',
            zeroColor: '#81d4fa',
        });

        //clientsBar.setOptions({chartArea: {width: 100}});


        // Line chart ( New Invoice)
        $("#invoice-line").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9, 5], {
            type: 'line',
            width: '100%',
            height: '25',
            lineWidth: 2,
            lineColor: '#E1D0FF',
            fillColor: 'rgba(233, 30, 99, 0.4)',
            highlightSpotColor: '#E1D0FF',
            highlightLineColor: '#E1D0FF',
            minSpotColor: '#f44336',
            maxSpotColor: '#4caf50',
            spotColor: '#E1D0FF',
            spotRadius: 4,
            
        // //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });


        // Tristate chart (Today Profit)
        $("#profit-tristate").sparkline([2, 3, 0, 4, -5, -6, 7, -2, 3, 0, 2, 3, -1, 0, 2, 3, 3, -1, 0, 2, 3], {
            type: 'tristate',
            width: '100%',
            height: '25',
            posBarColor: '#B9DBEC',
            negBarColor: '#C7EBFC',
            barWidth: 7,
            barSpacing: 4,
            zeroAxis: false,
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });

        // Bar + line composite charts (Total Sales)
        $('#sales-compositebar').sparkline([4, 6, 7, 7, 4, 3, 2, 3, 1, 4, 6, 5, 9, 4, 6, 7, 7, 4, 6, 5, 9, 4, 6, 7], {
            type: 'bar',
            barColor: '#F6CAFD',
            height: '25',
            width: '100%',
            barWidth: '7',
            barSpacing: 2,
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });
        $('#sales-compositebar').sparkline([4, 1, 5, 7, 9, 9, 8, 8, 4, 2, 5, 6, 7], {
            composite: true,
            type: 'line',
            width: '100%',
            lineWidth: 2,
            lineColor: '#fff3e0',
            fillColor: 'rgba(153,114,181,0.3)',
            highlightSpotColor: '#fff3e0',
            highlightLineColor: '#fff3e0',
            minSpotColor: '#f44336',
            maxSpotColor: '#4caf50',
            spotColor: '#fff3e0',
            spotRadius: 4,
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });


        // Project Line chart ( Project Box )
        $("#project-line-1").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
            type: 'line',
            width: '100%',
            height: '30',
            lineWidth: 2,
            lineColor: '#00bcd4',
            fillColor: 'rgba(0, 188, 212, 0.5)',
        });

        $("#project-line-2").sparkline([6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4], {
            type: 'line',
            width: '100%',
            height: '30',
            lineWidth: 2,
            lineColor: '#00bcd4',
            fillColor: 'rgba(0, 188, 212, 0.5)',
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });

        $("#project-line-3").sparkline([2, 4, 6, 7, 5, 6, 7, 9, 5, 6, 7, 9, 9, 5, 3, 2, 9, 5, 3, 2, 2, 4, 6, 7], {
            type: 'line',
            width: '100%',
            height: '30',
            lineWidth: 2,
            lineColor: '#00bcd4',
            fillColor: 'rgba(0, 188, 212, 0.5)',
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });

        $("#project-line-4").sparkline([9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
            type: 'line',
            width: '100%',
            height: '30',
            lineWidth: 2,
            lineColor: '#00bcd4',
            fillColor: 'rgba(0, 188, 212, 0.5)',
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });




        // Sales chart (Sider Bar Chat)
        $("#sales-line-1").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6], {
            type: 'line',
            height: '30',
            lineWidth: 2,
            lineColor: '#00bcd4',
            fillColor: 'rgba(0, 188, 212, 0.5)',
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });

        $("#sales-line-2").sparkline([6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2], {
            type: 'line',
            height: '30',
            lineWidth: 2,
            lineColor: '#00bcd4',
            fillColor: 'rgba(0, 188, 212, 0.5)',
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });

        $("#sales-bar-1").sparkline([2, 4, 6, 7, 5, 6, 7, 9, 5, 6, 7], {
            type: 'bar',
            height: '25',
            barWidth: 2,
            barSpacing: 1,
            barColor: '#4CAF50',
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });

        $("#sales-bar-2").sparkline([9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7], {
            type: 'bar',
            height: '25',
            barWidth: 2,
            barSpacing: 1,
            barColor: '#FF4081',
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });


        /*
        Sparkline sample charts
        */


        $("#bar-chart-sample").sparkline([70, 80, 65, 78, 58, 80, 78, 80, 70, 50, 75, 65, 80, 70], {
            type: 'bar',
            height: '100',
            width: '50%',
            barWidth: 20,
            barSpacing: 10,
            barColor: '#00BCD4',
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });


        $("#line-chart-sample").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9], {
            type: 'line',
            width: '50%',
            height: '100',
            lineWidth: 2,
            lineColor: '#ffcc80',
            fillColor: 'rgba(255, 152, 0, 0.5)',
            highlightSpotColor: '#ffcc80',
            highlightLineColor: '#ffcc80',
            minSpotColor: '#f44336',
            maxSpotColor: '#4caf50',
            spotColor: '#ffcc80',
            spotRadius: 4,
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class')
        });


        $("#pie-chart-sample").sparkline([50,60,80,110], {
            type: 'pie',
            width: '150',
            height: '150',
            //tooltipFormat: $.spformat('{{value}}', 'tooltip-class'),
            sliceColors: ['#f4511e','#ffea00','#c6ff00','#00e676','#1de9b6','#00e5ff','#651fff','#f50057']
        });

    }






}());