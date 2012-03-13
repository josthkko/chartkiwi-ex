// jQuery, Underscore and strftime are already included and available

// Sequentially load the needed scripts
/*_KIWI.loadScript('/renderer/punchcard/raphael-min.js', function(){ 
  console.log('loadScript() raphael loaded');
});

// CSS for tooltips
_KIWI.loadStylesheet('example_renderer.css', function(){
	console.log('loadStylesheet() delorean CSS loaded');
});


// INPUT: 
// kiwiData = {
//   rows : [ { id:'timestamp', type: 'unix_utc_timestamp' }, { id: 'kiwis', type: 'number' }, { id: 'apples', type: 'number' }, ... ]
//   cols : [ [123324324, 4, 54, ... ], [123324325, 10, 43, ...] ]
//   kiwi_options : { title: 'Shiny little chart' }
// }

// OUTPUT is the same as INPUT for punchcard:
*/
// called with JSONP when kiwiData returns from _KIWI.getData()
rendererParseData = function(kiwiData) { console.log('punchcard_renderer.js:parseData(kiwiData)')
	var names=[],
            data=[],
            ordered_data=[];
	
	
	_.each(kiwiData.cols,function(num){ names.push(num.id); });
  	
  	_.each(kiwiData.rows,function(num){ data.push(num); });
  	
 	for(var i=0 ; i<names.length ; i++){
  		ordered_data.push(new Array());
  		_.each(data,function(num){ ordered_data[i].push(num[i]); }); 		
  	}
  	
  	for(var i=1 ; i<names.length ; i++){
  		document.write(names[i] + ":");
  		document.write(" Max: " + _.max(ordered_data[i]));
  		document.write(" Min: " + _.min(ordered_data[i]));
  		
  		var trend = 0;
  		trend = (ordered_data[i][ordered_data[i].length-1]-ordered_data[i][0])/(ordered_data[i].length-1-0);
  		trend = Math.atan(trend)/1.570796;
  		
  		document.write(" Trend: " + Math.round(trend*Math.pow(10,3))/Math.pow(10,3));
  		
  		
  		ordered_data[i] = _.sortBy(ordered_data[i],function(num){return num});
  		
  		var listlength = ordered_data[i].length;
  		var median = 0;
  		if (listlength % 2){
			var odd = (listlength / 2 - 0.5);
			median =  ordered_data[i][odd];
		}else{
			var even = (ordered_data[i][listlength / 2]);
			even += (ordered_data[i][listlength / 2 + 1]);
			even = (even / 2);
			median = even;
		}
  		
  		document.write(" Median: " + median);
  		
  		var avg=0;
  		_.each(ordered_data[i],function(num){ avg += num; })
  		avg = avg / ordered_data[i].length;
  		
  		document.write(" Avg: " + Math.round(avg*Math.pow(10,3))/Math.pow(10,3) + "<br />");
  	}  
}
/*
renderChart = function(punchcardData) { console.log('punchcard_renderer.js:renderChart()')
  // console.log(deloreanData)
  // console.log(deloreanOptions)
  punchCard(punchcardData, 1, 'chart_div');
}*/

