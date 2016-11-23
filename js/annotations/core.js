/**
 * ANNOTATION v1.0
 *
 * Core file
 */

function ready(closure)
{
	document.addEventListener("DOMContentLoaded", closure, false);
}

function annotations(name)
{	
	this.xmlhttp = window.XMLHttpRequest ? 
		new XMLHttpRequest() : 
		new ActiveXObject("Microsoft.XMLHTTP");
	this.xmlhttp.open("GET", name + ".xml", false);
	this.xmlhttp.send();
	this.xml = xmlhttp.responseXML	
	
	this.addSubtitle = function (start, end, text)
	{
		newSubtitle = this.xml.createElement("subtitle");
		newSubtitle.appendChild(this.xml.createTextNode(text));
		newSubtitle.setAttribute("start", start);
		newSubtitle.setAttribute("end", end);
		this.xml.getElementsByTagName('annotations')[0].appendChild(newSubtitle);
	}

	this.subtitles = function (index)
	{
		
		var subtitles = this.xml.getElementsByTagName('annotations')[0].getElementsByTagName('subtitle');
		var result = [];
		
		for (var i = 0 ; i < subtitles.length ; i++) {
			result.push({
				start: subtitles[i].getAttribute('start'),
				end: subtitles[i].getAttribute('end'),
				value: subtitles[i].childNodes[0].nodeValue
			});
		}
		
		if (null != index)
			return result[index];
		
		return result;
	}
	
	this.pages = function (index)
	{
		
		var pages = this.xml.getElementsByTagName('annotations')[0].getElementsByTagName('page');
		var result = [];
		
		for (var i = 0 ; i < pages.length ; i++) {
			result.push({
				start: pages[i].getAttribute('start'),
				end: pages[i].getAttribute('end'),
				src: pages[i].getAttribute('src'),
				pause: pages[i].getAttribute('pause')
			});
		}
		
		if (null != index)
			return result[index];
		
		return result;
	}
	
	this.pSubtitles = function (popcorn, container)
	{
		var subtitles = this.subtitles();
		
		for (i in subtitles){
					
			var subtitle = subtitles[i];
								
			popcorn.footnote({ start: subtitle.start, end: subtitle.end, target: container,
				text: "<div class='subtitle'>" + subtitle.value + "</div>",
			});
			
		}
	}
	
	this.pPages = function (popcorn, container)
	{
		var pages = this.pages();
		
		for (i in pages){
					
			var page = pages[i];
			
			popcorn.webpage({
				start: page.start,
				end: page.end,
				src: page.src,
				target: container
			});
			
			if (null != page.pause)
				popcorn.cue(page.pause, function() { this.pause(); });
			
		}
	}
	
	return this;
}