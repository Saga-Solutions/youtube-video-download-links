# youtube-video-links

**How to install**
  

    npm install --save youtube-video-links

**Description**
This module is used to get the downloadable video links from a Youtube video link.

**How to use**

    const youtubeLinks = require("youtube-video-links");
    
    youtubeLinks("youtube-video-URL").then(function(data) {
	    //data - video URLs in array of object format
	}).catch(function(error) {
		//error
	})

OR, simply use (ES6 format)

    let links = await youtubeLinks("youtube-video-URL");
