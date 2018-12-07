/* * 
 * audio visualizer with html5 audio element
 *
 * v0.1.0
 * 
 * licenced under the MIT license
 * 
 * see my related repos:
 * - HTML5_Audio_Visualizer https://github.com/wayou/HTML5_Audio_Visualizer
 * - 3D_Audio_Spectrum_VIsualizer https://github.com/wayou/3D_Audio_Spectrum_VIsualizer
 * - selected https://github.com/wayou/selected
 * - MeowmeowPlayer https://github.com/wayou/MeowmeowPlayer
 * 
 * reference: http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html
 */

    var audio;
    var ctx;
    var analyser;
    var audioSrc;
    var frequencyData;
    var canvas,
        cwidth,
        cheight,
        meterWidth,
        gap,
        capHeight,
        capStyle,
        meterNum,
        capYPositionArray = [];
	var isPlaying;
	var isAudioSetup;

function resize() {
	cwidth = $("#music-canvas").width();
	cheight = $("#music-canvas").height();
	meterWidth = 5; //width of the meters in the spectrum
	gap = 0.5; //gap between meters
	capHeight = 2;
	capStyle = '#fff';
	meterNum = $("#music-canvas").width() / (meterWidth+gap); //count of the meters
	capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
}

function renderFrame() {
	var array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(array);
	var step = Math.round(array.length / meterNum); //sample limited data from the total array
	ctx.clearRect(0, 0, cwidth, cheight);
	for (var i = 0; i < meterNum; i++) {
		var value = array[i * step];
		if (capYPositionArray.length < Math.round(meterNum)) {
			capYPositionArray.push(value);
		};
		ctx.fillStyle = capStyle;
		//draw the cap, with transition effect
		if (value < capYPositionArray[i]) {
			ctx.fillRect(i * (meterWidth+gap) , cheight - (--capYPositionArray[i]), meterWidth, capHeight);
		} else {
			ctx.fillRect(i * (meterWidth+gap) , cheight - value, meterWidth, capHeight);
			capYPositionArray[i] = value;
		};
		ctx.fillStyle = "#ffffff"; //set the filllStyle to gradient for a better look
		ctx.fillRect(i * (meterWidth+gap) , cheight - value + capHeight, meterWidth, cheight); //the meter
	}
	requestAnimationFrame(renderFrame);
}

function music_pause(){
	audio.pause();
	$("#music-control").html("开启音乐");
	isPlaying=false;
}

function music_play(){
	audio.play();
	$("#music-control").html("关闭音乐");
	isPlaying=true;
}

function music_setup(){
	if (!isAudioSetup) {
		isAudioSetup=true;
		ctx = new AudioContext();
		analyser = ctx.createAnalyser();
		audioSrc = ctx.createMediaElementSource(audio);
		// we have to connect the MediaElementSource with the analyser 
		audioSrc.connect(analyser);
		analyser.connect(ctx.destination);
		// we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
		// analyser.fftSize = 64;
		// frequencyBinCount tells you how many values you'll receive from the analyser
		frequencyData = new Uint8Array(analyser.frequencyBinCount);
		// we're ready to receive some data!

		canvas = document.getElementById('music-canvas');
		resize();
		ctx = canvas.getContext('2d');
			

		renderFrame();
	}
}

function music_init() {
	audio = document.getElementById('music-audio');
	audio.src = "audio/FELT - inside.mp3"
	audio.onended = function() {
		music_pause();
	};
	isPlaying=false;
	isAudioSetup=false;
	
	$("#music-control").click(function(){
		//music-control
		if (isPlaying) {
			music_pause();
		}
		else
		{
			music_setup();
			music_play();
		}
	});
};

$(window).resize(function(){ 
	resize();
})


