//Author: isklikas.
//Create GPX files, from PolarSteps locations.json, based on the following format:
/*
	<?xml version="1.0" encoding="UTF-8"?>
	<gpx creator="PolarSteps to GPX Converter https://www.polarsteps.com/" version="1.0" xmlns="http://www.topografix.com/GPX/1/0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">
	<trk>
 		<name><![CDATA[Trip]]></name>
  		<trkseg><!-- TZ: 10800 -->
      		<trkpt lat="55.777551" lon="37.656911"><ele>121.779610</ele><time>2018-07-31T23:50:00Z</time></trkpt>
      	</trkseg>
	</trk>
	</gpx>
*/

var fs = require('fs');

//First step, open the standard locations.json file.
fs.readFile('./locations.json', function read(err, data) {
    if (err) {
        throw err;
    }
    var jsonData = JSON.parse(data);

    generateGPXFromJSON(jsonData);
});

function generateGPXFromJSON(jsonData) {
	//First, we must get the standard parts of the GPX file in.
	//Due to the fact that PolarSteps uses seconds since 1970 format, we can't make segments for every timezone, only for every 24 hr changed.
  var pointsData = jsonData.locations;
  var byDate = pointsData.slice(0);
  byDate.sort(function(a,b) {
  	return a.time - b.time;
  });
  var outputStr = '<?xml version="1.0" encoding="UTF-8"?>';
	outputStr += "\n" + '<gpx creator="PolarSteps to GPX Converter https://www.polarsteps.com/" version="1.0" xmlns="http://www.topografix.com/GPX/1/0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">';
	outputStr += "\n" + '<trk>';
	outputStr += "\n\t" + '<name><![CDATA[Trip]]></name>';

	var currentDate = 0;
	for (var k = 0; k < byDate.length; k++) {
		var currentPoint = byDate[k];
		var msDate = currentPoint.time * 1000;
		var dateObj = new Date(msDate);

		var objDate = dateObj.getDate();
		if (objDate != currentDate) {
			if (k > 0 && k != byDate.length - 1) {
				outputStr += "\n\t" + '</trkseg>';
			}
			if (k != byDate.length - 1) {
				outputStr += "\n\t" + '<trkseg>';
			}
			currentDate = objDate;
		}
		//Add the object to the track
		var dateStr = dateObj.toISOString();
		var pointLon = currentPoint.lon;
		var pointLat = currentPoint.lat;
		outputStr += "\n\t\t" + '<trkpt lat="' + pointLat + '" lon="' + pointLon + '"><ele>121.779610</ele><time>' + dateStr + '</time></trkpt>';
	}
	outputStr += "\n\t" + '</trkseg>';

	//Actual location points go here.

	outputStr += "\n" + '</trk>';
	outputStr += "\n" + '</gpx>';
	fs.writeFile("./trip.gpx", outputStr, function(err) {
    	if(err) {
        	return console.log(err);
    	}
    	console.log("The file was saved!");
	});
}
