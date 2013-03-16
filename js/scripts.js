function hidecard(id)
{
	document.getElementById(id).style.display = 'none';
}
function displaycard(id)
{
	document.getElementById(id).style.display = 'block';
}

function getlocation()
{
	var script = document.createElement("script");
	script.src = "get_location.php";
	document.getElementsByTagName("head")[0].appendChild(script);
	displayload('Loading Location Data...');
}

function getweatherjson2(json)
{
	getweather(
		json.latitude,
		json.longitude,
		json.country_code,
		json.city,
		json.region_code
	);
	displayload('Loading Weather Data...');
}

function getweather(lat,lon,country,city,state)
{
	var script2 = document.createElement("script");
	script2.src = "weather_json.php?lat="+lat+"&lon="+lon+"&country"+country+"&city="+city+"&state="+state;
	document.getElementsByTagName("head")[0].appendChild(script2);
}
function weather(json)
{
	
	displaycard('weather');
	
	document.getElementById('weather_main_img').src = 'img/weather/'+json.current_conditions.icon+'.png';
	document.getElementById('weather_img_current_cond').innerHTML = json.current_conditions.weather;
	document.getElementById('weather_main_current_temp').innerHTML = json.current_conditions.temperature;
	document.getElementById('weather_main_windy').innerHTML = json.current_conditions.wind;
	document.getElementById('weather_main_rainy').innerHTML = json.current_conditions.precip;
	document.getElementById('weather_main_name_place').innerHTML = json.place;
	
	document.getElementById('day_1').innerHTML = ''+
				'<span class="forecast_day_name">'+(json.forecast[0].day).toUpperCase()+'</span>'+
                '<img  class="forecast_day_icon" src="img/weather/'+json.forecast[0].icon+'.png" />'+
                '<span class="forecast_day_high">'+json.forecast[0].high+'</span>'+
                '<span class="forecast_day_low">'+json.forecast[0].low+'</span>';
				
	document.getElementById('day_2').innerHTML = ''+
				'<span class="forecast_day_name">'+(json.forecast[1].day).toUpperCase()+'</span>'+
                '<img  class="forecast_day_icon" src="img/weather/'+json.forecast[1].icon+'.png" />'+
                '<span class="forecast_day_high">'+json.forecast[1].high+'</span>'+
                '<span class="forecast_day_low">'+json.forecast[1].low+'</span>';
				
				
	document.getElementById('day_3').innerHTML = ''+
				'<span class="forecast_day_name">'+(json.forecast[2].day).toUpperCase()+'</span>'+
                '<img  class="forecast_day_icon" src="img/weather/'+json.forecast[2].icon+'.png" />'+
                '<span class="forecast_day_high">'+json.forecast[2].high+'</span>'+
                '<span class="forecast_day_low">'+json.forecast[2].low+'</span>';
				
	document.getElementById('day_4').innerHTML = ''+
				'<span class="forecast_day_name">'+(json.forecast[3].day).toUpperCase()+'</span>'+
                '<img  class="forecast_day_icon" src="img/weather/'+json.forecast[3].icon+'.png" />'+
                '<span class="forecast_day_high">'+json.forecast[3].high+'</span>'+
                '<span class="forecast_day_low">'+json.forecast[3].low+'</span>';
				
		setTimeout("getlocation();", 900000);//Update every 900 seconds [15 minutes]
		//displayload('Loading Location/Weather Data...');
}

function gettasks()
{
	displayload('Loading Tasks...');
	var script2 = document.createElement("script");
	script2.src = "index.php?m=task";
	document.getElementsByTagName("head")[0].appendChild(script2);
}
function tasks(json)
{
	
	//	Reset the HTML before we load.
	document.getElementById('assignments').innerHTML = '';
	
		if(!json.empty)
		{
			displaycard('tasks');
			var length = json.length,
			element = null;
			for (var i = 0; i < length; i++) {
				element = json[i];
			  
				  if(element.status == "completed")
				  {
					document.getElementById('assignments').innerHTML = document.getElementById('assignments').innerHTML+
						'<li class="task_completed">'+
							'<span class="task_status" style="background:#cc0000;"><br /><br /></span>'+
							'<span class="task_stuff">'+
								'<span class="task_title">'+element.title+'</span>'+
								'<span class="task_notes">'+element.notes+'</span>'+
								'<span class="task_duedate">'+element.duedate+'</span>'+
							'</span>'+
							'<div class="clr"></div>'+
						'</li>';
				  }
				  else
				  {
					 document.getElementById('assignments').innerHTML = document.getElementById('assignments').innerHTML+
						'<li class="task">'+
							'<span class="task_status" style="background:#'+element.background+';"><br /><br /></span>'+
							'<span class="task_stuff">'+
								'<span class="task_title">'+element.title+'</span>'+
								'<span class="task_notes">'+element.notes+'</span>'+
								'<span class="task_duedate">'+element.duedate+'</span>'+
							'</span>'+
							'<div class="clr"></div>'+
						'</li>';
				  }
			}
		}
		else
		{
			hidecard('tasks');
		}
	
	setTimeout("gettasks()", 900000);//Update every 900 seconds [15 minutes]
	
}
function getnextclass()
{
	displayload('Loading Class Data...');
	var script2 = document.createElement("script");
	script2.src = "index.php?m=cal";
	document.getElementsByTagName("head")[0].appendChild(script2);
}
function nextclass(json)
{
	
	if(!json.empty)
	{
		displaycard('next_class');
		
			document.getElementById('next_class').innerHTML = ''+
				'<span class="next_title">'+json.title+'</span>'+
				'<span class="next_bigtime">'+json.time+'</span>'+
				'<span class="next_assoctime" style="color:#'+json.severity+';">'+json.countdown+'</span>'+
				'<span class="next_location" style="color:#'+json.severity+';">'+json.location+'</span>'+
				'<span class="next_push_container" onclick="pushbullet(\'address\',\''+json.title+' at '+json.location+'\',\''+json.location+'\');"><span class="push_text">Send to phone</span></span>';
			setTimeout("getnextclass()", 60000);//Update every 60 seconds [1 minute]
	}
	else
	{
		hidecard('next_class');
		setTimeout("getnextclass()", 120000);//Update every 120 seconds [2 minutes]
	}
	
}

function displayload(message)
{
	//document.getElementById('alerts').style.opacity = 1;
	//document.getElementById('alerts').innerHTML = message;
	//setTimeout("hideload()", 2000);
}
function hideload()
{
	//document.getElementById('alerts').style.opacity = 0;
	//document.getElementById('alerts').innerHTML = '';
}


function pushbullet(type,title,data)
{
	var script2 = document.createElement("script");
	script2.src = "push_bullet.php?type="+type+"&title="+title+"&data="+data;
	document.getElementsByTagName("head")[0].appendChild(script2);
}
function pushcallback(json)
{
	if(json.created != '')
		displayload('Pushed to phone successfully!');
}



function getmusic()
{
	var script2 = document.createElement("script");
	script2.src = "music_json.php";
	document.getElementsByTagName("head")[0].appendChild(script2);
}
function musicdata(json)
{
	
	if(!json.empty)
	{	
		displaycard('music_player');
		document.getElementById('music_player').innerHTML = ''+
			'<img src="'+json.artwork+'" class="album_art"/>'+
			  '<div class="payer_data">'+
				  '<span class="player_track_name">'+json.track+'</span>'+
				  '<span class="player_track_artist">'+json.author+'</span>'+
				  '<span class="player_track_album">'+json.title+'</span>'+
				  '<div class="clr"></div>'+
			  '</div>'+
			'<div class="clr"></div>';
			
			setTimeout("getmusic()", 60000);//Update every minute
			displayload('Loading Music Data...');
	}
	else
	{
		hidecard('music_player');
		setTimeout("getmusic()", 120000);//Update every 2 minutes
	}
}

function getreddit()
{
	var script2 = document.createElement("script");
	script2.src = "http://www.reddit.com/user/fodawim/about.json?jsonp=redditkarma";
	document.getElementsByTagName("head")[0].appendChild(script2);
}
function redditkarma(json)
{
	if(!json.error)
	{
		displaycard('reddit');
		document.getElementById('reddit').innerHTML = ''+
			'<a class="mail_some" href="http://www.reddit.com/message/inbox/" target="_blank"></a>'+
			'<span class="username">'+json.data.name+'</span>'+
			'<span class="karma">'+json.data.link_karma+' &bull; '+json.data.comment_karma+'</span>'+
			'<div class="clr"></div>';
	}
	else
	{
		hidecard('reddit');
	}
}



function getnotes()
{
	var script2 = document.createElement("script");
	script2.src = "evernote_json.php";
	document.getElementsByTagName("head")[0].appendChild(script2);
}
function notedata(json)
{
	
	document.getElementById('notes').innerHTML = '';
	
	if(!json.empty)
	{
		displaycard('evernotes');
		var length = json.length,
		element = null;
		for (var i = 0; i < length; i++) {
			element = json[i];
			document.getElementById('notes').innerHTML = document.getElementById('notes').innerHTML+
				'<li><span class="icon">&nbsp;</span><span class="text">'+element+'</span></li>';
		}
	}
	else
	{
		hidecard('evernotes');
	}
	
	setTimeout("getnotes()", 3600000);//Update every hour
	displayload('Loading Note Data...');
	
}





