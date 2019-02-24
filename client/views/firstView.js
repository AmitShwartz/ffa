$( () => {
    console.log( "ready!" );
const url = "https://football-academies.herokuapp.com/academiesWorth";

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};

getJSON( url,  function(err, data1) {
    if (err != null) {
        console.error(err);
    } else {
               data1.map((item)=>{
               	        var text = `_id: ${item._id}
					totalValue: ${item.totalValue}`
        console.log(text);
               })
    }
dps = new Array ();
	for (var k in data1){
		dps.push({label: data1[k]._id , y: parseFloat(data1[k].totalValue)});

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text:"Football academies"
	},
	axisX:{
		interval: 1,
		labelFontSize: 14,
	},
	axisY2:{
        labelFontSize: 14,
		interlacedColor: "rgba(1,77,101,.2)",
		gridColor: "rgba(1,77,101,.1)",
	},
	data: [{
		type: "bar",
		name: "academies",
		axisYType: "secondary",
		color: "#014D65",
		toolTipContent: "<b>academies</b>: {label} <br> <b>totalValue</b>: {y}",
		dataPoints: dps
	}]
});
chart.render();
}});
});
