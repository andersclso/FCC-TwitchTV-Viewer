document.addEventListener('DOMContentLoaded', function() {
	const twitchStreamers = ['freecodecamp', 'imaqtpie', 'DrDisRespectLIVE', 'LexVeldhuis', 'KOOOGLY'];

	twitchStreamers.forEach(function(user) {
		let request = new XMLHttpRequest();
		request.open('GET', 'https://wind-bow.glitch.me/twitch-api/streams/' + user, true);

		request.onload = function() {
  			if (request.status >= 200 && request.status < 400) {
    			let results = JSON.parse(request.responseText),
    				section = document.getElementsByClassName('streamers-wrapper');

    			if (results.stream) {
	    			let	logo = results.stream.channel.logo,
	    				status = results.stream.channel.status;
	     			
	     			section[0].innerHTML += '<div class="live all"><img src="' + logo + '" alt="Streamers Icon" class="logo"><a href="https://go.twitch.tv/' + user + '"><div class="sbox" style="border-right: 5px solid #39fe15;"><p class="streamer">- ' + user + ' -</p><p class="desc">' + status + '</p></div></a></div>';
	    		}
	    		else {
	    			section[0].innerHTML += '<div class="off all"><img src="twitchoffline.png" alt="Twitch Offline Icon" class="logo"><a href="https://go.twitch.tv/' + user + '"><div class="sbox" style="border-right: 5px solid red;"><p class="streamer">- ' + user + ' -</p><p class="desc">Streamer is Offline</p></div></a></div>';
	    		}    			
    		}
		};
		request.send();
	});

	const allStreamers = document.getElementsByClassName('all'),
	 	  onlineStreamers = document.getElementsByClassName('live'),
	      offlineStreamers = document.getElementsByClassName('off');

	document.getElementById('online').onclick = function() {

		for (var i = 0; i < onlineStreamers.length; i++) {
			onlineStreamers[i].style.display = 'flex';
		}

		for (var i = 0; i < offlineStreamers.length; i++) {
			offlineStreamers[i].style.display = 'none';
		}		
	};

	document.getElementById('offline').onclick = function() {

		for (var i = 0; i < offlineStreamers.length; i++) {
			offlineStreamers[i].style.display = 'flex';
		}	

		for (var i = 0; i < onlineStreamers.length; i++) {
			onlineStreamers[i].style.display = 'none';
		}
	};

	document.getElementById('all').onclick = function () {

		for (var i = 0; i < allStreamers.length; i++) {
			allStreamers[i].style.display = 'flex';
		}
	};
}, false);