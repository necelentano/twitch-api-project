
$(document).ready(function() {
	// JQuery tabs by agragregra => https://gist.github.com/agragregra/e0ad62a2a901e615c89a
	$(".tab_item").not(":first").hide();
	$(".wrapper .tab").click(function() {
		$(".wrapper .tab").removeClass("active").eq($(this).index()).addClass("active");
		$(".tab_item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("active");
	//Twitch user data
	var TWITCH_USERS = [
	     'freecodecamp',
			 'welovegames', 
			 'thijshs', 
			 'gleborg', 
			 'hsdogdog', 
			 'bobross',
			 'trumpsc', 
			 'kolento', 
			 'tornis',
			 'itshafu',
			 'blackufa',
			 'cohhcarnage',
			 'eligorko'
			];
		//loop TWITCH_USERS array and get JSON data for each
	TWITCH_USERS.forEach(function(item, index) {
		$.getJSON('https://api.twitch.tv/kraken/streams/'+ item + '?client_id=u3t1qy80il4edhn2af7v3uh3abjep7', function(data) {
			//get user online status and stream description 
			var onlineStatus;
			var streamDescription;
			
			if(data.stream === null) {
				onlineStatus = 'offline';
				streamDescription = 'Channel Offline';
			} else if (data.stream) {
			 	onlineStatus = 'online';
			 	streamDescription = data.stream.channel.status;
			} 
			// get user name and logo of channel
			$.getJSON('https://api.twitch.tv/kraken/users/'+ item + '?client_id=u3t1qy80il4edhn2af7v3uh3abjep7', function(data) {
				//build html
				var html = '<li class=' + onlineStatus + '><img src="' + data.logo + '" alt="" /><a href="https://www.twitch.tv/' 
								+ data.name + '" target="_blank">' + data.display_name + '</a><br><span>' + streamDescription + '</span></li>';
				//add html in DOM
				if (streamDescription === 'Channel Offline') {
					$(".tab_item.all").append(html);
					$(".tab_item.offline").append(html);
				} else {
					$(".tab_item.all").append(html);
					$(".tab_item.online").append(html);
				}
			});
		});
	});
});
