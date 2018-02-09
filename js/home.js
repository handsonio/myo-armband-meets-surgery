var myo = Myo.create(0);

function Pulsate() {
	setInterval(function () {
        $('#section-waiting-surgeon').fadeIn(900).delay(700).fadeOut(1000).delay(700).fadeIn(1000);
    }, 1000);

}

function ActivateAnalysis() {
	$('#section-waiting-surgeon').remove();
	$('#section-analysing-bio').fadeIn(3000, function () {
		setTimeout(function() {
			ActivateDetected();
		}, 1500)
	});
	

}

function ActivateDetected() {
	$('#section-analysing-bio').animate({ opacity: 0 }, 3000)
	$('#pod3').slideUp(2000);
	$('#pod3').fadeOut(2000);
	$('#pod6').slideUp(2000);
	$('#pod6').fadeOut(2000);
	$('#section-detected-alan').show();
	setTimeout(function () {
		setInterval(function(){
			$('#h1detected').fadeTo(200, 0.33).delay(200).fadeTo(200,1);
		},200);		
	}, 2);
	setTimeout(function () {
		window.location = 'index.html';
	}, 2500);

}

$(document).ready(function() {		

var createGraph = function(elementId, startingData, range, resolution){
	var history = _.times(resolution, function(){
		return startingData;
	});

	var graph = {
		history : history,
		getGraphData : function(){
			var result = {};
			_.each(this.history, function(data, index){
				_.each(data, function(val, axis){
					result[axis] = result[axis] || {label : axis, data : []};
					result[axis].data.push([index, val])
				});
			});
			return _.values(result);
		},
		addData : function(data){
			this.history.push(data);
			this.history = this.history.slice(1);
			this.update();
		},
		update : function(){
			this.plot.setData(this.getGraphData());
			this.plot.draw()
		},
	};

	graph.plot = $.plot("#" + elementId, graph.getGraphData(), {
		series: {shadowSize: 0},
		colors: [ '#84FFF1'],
		xaxis: {
			show: false,
			min : 0,
			max : resolution
		},
		yaxis : {
			min : -range,
			max : range
		},
		legend : {
			show : false,
		},
		grid : {
			borderWidth: 0,
			borderColor : null,
			show: false
		}
	});
	return graph;
};

var podGraphs = _.times(8, function(num){
	return createGraph('pod' + num, {data:0}, 128, 50);
})

var throttledEMGUpdate = _.throttle(function(data){
	_.each(data, function(emgData, index){
		podGraphs[index].addData({data:emgData});
	})
}, 20);



	Pulsate();

	myo.on('connected', function()	{
		myo.streamEMG(true);
		setInterval(function(){
			myo.requestBluetoothStrength();
		}, 100);

	});



	myo.on('emg', function(data){
		throttledEMGUpdate(data);
	});

	myo.on('bluetooth_strength', function(BTS){
		console.log(BTS);
			var width = ((BTS * -1 - 40 ) / 50 ) * 100;			
			if (width < 12) {
				ActivateAnalysis();
			};
		})
});
