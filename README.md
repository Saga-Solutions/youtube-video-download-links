# youtube-video-links

This module is used to get the downloadable video links from a Youtube video link.

How to use :-

const youtubeLinks = require("youtube-video-download-links");

youtubeLinks("youtube-video-URL").then(function(data) {
    //data - video URLs in array of object format
}).catch(function(error) {
    //error
});

OR, simply use

let links = await youtubeLinks("youtube-video-URL");