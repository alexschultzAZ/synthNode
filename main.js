// Alexander Schultz
// DARK ARP


// global Tone is from index.html CDN

var chorus = new Tone.Chorus(4, 2.5, 1);

var widener = new Tone.StereoWidener(0.2).toMaster();



var synth = new Tone.Synth({
    "oscillator" : {
        "type" : "pwm",
        "modulationFrequency" : 0.05,
        "modulationType" : "fatsine"
    },
    "envelope" : {
        "attack" : 0.005,
        "decay" : 0.5,
        "sustain" : 0.001,
        "release" : 0.5
    }
//}).connect(chorus).connect(widener).toMaster();
}).toMaster();

var pattern = new Tone.Sequence(function(time, note){
    synth.triggerAttackRelease(note, "16n");
}, [null, "D1", "D1", "D1"], "8n");

Tone.Transport.bpm.value = 180;

// --------------------------------------------

// KICK
var kick = new Tone.MembraneSynth({
            "pitchdecay" : 0.02,
            "oscillator" : {
                "type" : "triangle"
            },
            "envelope" : {
                "sustain" : 0.4,
                "attack" : 0.001,
                "decay" : 0.4,
                "release" : 0.8
            },
            "octaves" : 6
        }).toMaster();

var kickPart = new Tone.Sequence(function(time, note){
    kick.triggerAttackRelease(note, "8n", time);
    }, ["A1", null, null, null], "8n");

// ----------------------------

function pressedD1() {
    var oldPattern = pattern;
    pattern = new Tone.Sequence(function(time, note){
        synth.triggerAttackRelease(note, "16n");
        }, [null, "D1", "D1", "D1"], "8n");
    oldPattern.stop();
    if (pattern.state == "stopped") {
        pattern.start(0);
        Tone.Transport.start();
    }
    if (kickPart.state == "started") {
        var oldKick = kickPart;
        oldKick.stop();
        kickPart = new Tone.Sequence(function(time, note){
        kick.triggerAttackRelease(note, "8n", time);
        }, ["D1", null, null, null], "8n");
        kickPart.start(0);
    }
}

function pressedA1() {
    var oldPattern = pattern;
    pattern = new Tone.Sequence(function(time, note){
        synth.triggerAttackRelease(note, "16n");
        }, [null, "A1", "A1", "A1"], "8n");
    oldPattern.stop();
    if (pattern.state == "stopped") {
        pattern.start(0);
        Tone.Transport.start();
    }
    if (kickPart.state == "started") {
        var oldKick = kickPart;
        oldKick.stop();
        kickPart = new Tone.Sequence(function(time, note){
        kick.triggerAttackRelease(note, "8n", time);
        }, ["A1", null, null, null], "8n");
        kickPart.start(0);
    }
}


function pressedC2() {
    var oldPattern = pattern;
    pattern = new Tone.Sequence(function(time, note){
        synth.triggerAttackRelease(note, "16n");
        }, [null, "C2", "C2", "C2"], "8n");
    oldPattern.stop();
    if (pattern.state == "stopped") {
        pattern.start(0);
        Tone.Transport.start();
    }
    if (kickPart.state == "started") {
        var oldKick = kickPart;
        oldKick.stop();
        kickPart = new Tone.Sequence(function(time, note){
        kick.triggerAttackRelease(note, "8n", time);
        }, ["C2", null, null, null], "8n");
        kickPart.start(0);
    }
}

function addKick() {
    if (kickPart.state == "stopped") {
        kickPart.start(0);
        Tone.Transport.start();
    }
}

function stop() {
    pattern.stop(0);
    kickPart.stop(0);
}

function changeSpeed(newValue) {
    Tone.Transport.bpm.value = newValue;
    window.alert(kickPattern.playbackRate + " " + pattern.playbackRate);
}