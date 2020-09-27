var __audioSynth = new AudioSynth();
__audioSynth.setVolume(0.5);

let selectSound = {
	value: "0" //piano
};

const __octave = 4;

// Generates audio for pressed note and returns that to be played
var fnPlayNote = function(note, octave) {

	src = __audioSynth.generate(selectSound.value, note, octave, 2);
	container = new Audio(src);
	container.addEventListener('ended', function() { container = null; });
	container.addEventListener('loadeddata', function(e) { e.target.play(); });
	container.autoplay = false;
	container.setAttribute('type', 'audio/wav');
	container.load();
	return container;

};

// Creates a keyboard from start octave (0=middle C) to end octave in the container passed
const generateKeyboard = (start, end, container) => {
	//let visualKeyboard = document.getElementById('keyboard');
	let selectSound = {
		value: "0" //piano
	};

	var iKeys = 0;
	var iWhite = 0;
	var notes = __audioSynth._notes; //C, C#, D....A#, B

	for(var i=start;i<=end;i++) {
		for(var n in notes) {
			if(n[2]!='b') {
				var thisKey = document.createElement('div');
				thisKey.setAttribute("data-note", n);
				thisKey.setAttribute("data-active", "false");
				thisKey.setAttribute("data-octave", i+__octave);
				thisKey.setAttribute("data-index", iKeys);
				if(n.length>1) { //adding sharp sign makes 2 characters
					thisKey.className = 'black key'; //2 classes
					thisKey.style.width = '30px';
					thisKey.style.height = '120px';
					thisKey.style.left = (40 * (iWhite - 1)) + 25 + 'px';
				} else {
					thisKey.className = 'white key';
					thisKey.style.width = '40px';
					thisKey.style.height = '200px';
					thisKey.style.left = 40 * iWhite + 'px';
					iWhite++;
				}

				var label = document.createElement('div');
				label.className = n.length > 1 ? 'labelb' : 'labelw';

				//let s = getDispStr(n,i,reverseLookupText);

				label.innerHTML = `<p>${thisKey.getAttribute("data-note")}</p>`//'<b class="keyLabel">' + s + '</b>' + '<br /><br />' + n.substr(0,1) +
					//'<span name="OCTAVE_LABEL" value="' + i + '">' + (__octave + parseInt(i)) + '</span>' + (n.substr(1,1)?n.substr(1,1):'');
				thisKey.appendChild(label);
				thisKey.setAttribute('ID', 'KEY_' + n + ',' + i);
				//thisKey.addEventListener(evtListener[0], (function(_temp) { return function() { fnPlayKeyboard({keyCode:_temp}); } })(reverseLookup[n + ',' + i]));
				container[n + ',' + i] = thisKey;
				container.appendChild(thisKey);
				
				iKeys++;
			}
		}
	}

	container.style.width = iWhite * 40 + 'px';
}