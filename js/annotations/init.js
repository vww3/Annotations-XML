/**
 * ANNOTATION v1.0
 *
 * Init file
 */
 
ready(function () {
	var pop = Popcorn("#video");				
	annotations('xml/test').pSubtitles(pop, "subtitles");
	annotations('xml/test').pPages(pop, "target");			
});