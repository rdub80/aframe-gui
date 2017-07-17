
window.musicType = 'happy_modern_folk';
window.musicLength = 15;

window.selectCinematic = function() {

    /*  var musicTypePanel = document.getElementById("music_type_panel");
     var musicLengthPanel = document.getElementById("music_type_panel");
     var musicPlayerPanel = document.getElementById("music_player_panel");

     musicTypePanel.setAttribute("position", `-0.5 1000 -3`);
     musicLengthPanel.setAttribute("position", `-0.5 1.5 -3`);
     musicPlayerPanel.setAttribute("position", `-0.5 1000 -3`);

     musicTypePanel.setAttribute("scale", `0.001 0.001 0.001`);
     musicLengthPanel.setAttribute("scale", `1 1 1`);
     musicPlayerPanel.setAttribute("scale", `0.001 0.001 0.001`);

     musicTypePanel.setAttribute("visible", `false`);
     musicLengthPanel.setAttribute("visible", `true`);
     musicPlayerPanel.setAttribute("visible", `false`);
     */
    var typeCinematic = document.getElementById("type_cinematic");
    var typeClassicRock = document.getElementById("type_classic_rock");
    var typeModernFolk = document.getElementById("type_modern_folk");
    var type90sPop = document.getElementById("type_90s_pop");

    typeClassicRock.components['gui-button'].setActiveState(false);
    typeModernFolk.components['gui-button'].setActiveState(false);
    type90sPop.components['gui-button'].setActiveState(false);
    window.musicType = 'ambient_tense_high';

    //console.log("in selectCinematic, musicTypePanel: "+musicTypePanel+", musicLengthPanel: "+musicLengthPanel+", musicPlayerPanel: "+musicPlayerPanel);
    //console.log("musicType position: "+JSON.stringify(musicTypePanel.getAttribute("position")));
}

window.selectClassicRock = function() {
    window.musicType = 'driving_classic_rock';

    var typeCinematic = document.getElementById("type_cinematic");
    var typeClassicRock = document.getElementById("type_classic_rock");
    var typeModernFolk = document.getElementById("type_modern_folk");
    var type90sPop = document.getElementById("type_90s_pop");

    typeCinematic.components['gui-button'].setActiveState(false);
    typeModernFolk.components['gui-button'].setActiveState(false);
    type90sPop.components['gui-button'].setActiveState(false);}

window.selectModernFolk = function() {
    window.musicType = 'reflective_modern_folk';

    var typeCinematic = document.getElementById("type_cinematic");
    var typeClassicRock = document.getElementById("type_classic_rock");
    var typeModernFolk = document.getElementById("type_modern_folk");
    var type90sPop = document.getElementById("type_90s_pop");

    typeClassicRock.components['gui-button'].setActiveState(false);
    typeClassicRock.components['gui-button'].setActiveState(false);
    type90sPop.components['gui-button'].setActiveState(false);}

window.select90sPop = function() {
    window.musicType = 'playful_corporate_pop';

    var typeCinematic = document.getElementById("type_cinematic");
    var typeClassicRock = document.getElementById("type_classic_rock");
    var typeModernFolk = document.getElementById("type_modern_folk");
    var type90sPop = document.getElementById("type_90s_pop");

    typeClassicRock.components['gui-button'].setActiveState(false);
    typeModernFolk.components['gui-button'].setActiveState(false);
    typeCinematic.components['gui-button'].setActiveState(false);
}

window.select5Seconds = function() {
    var length5 = document.getElementById("length_5");
    var length10 = document.getElementById("length_10");
    var length15 = document.getElementById("length_15");

    length10.components['gui-button'].setActiveState(false);
    length15.components['gui-button'].setActiveState(false);
    window.musicLength = 5;
}

window.select10Seconds = function() {
    var length5 = document.getElementById("length_5");
    var length10 = document.getElementById("length_10");
    var length15 = document.getElementById("length_15");
    length5.components['gui-button'].setActiveState(false);
    length15.components['gui-button'].setActiveState(false);
    window.musicLength = 10;
}

window.select15Seconds = function() {
    var length5 = document.getElementById("length_5");
    var length10 = document.getElementById("length_10");
    var length15 = document.getElementById("length_15");

    length5.components['gui-button'].setActiveState(false);
    length10.components['gui-button'].setActiveState(false);
    window.musicLength = 15;
}

window.toggleLoop = function() {
    var loopToggle = document.getElementById("loop_toggle");
    console.log("loopToggle: "+loopToggle);
    var loopToggleComponent = loopToggle.components['gui-toggle'];
    console.log("loopToggleComponent: "+loopToggleComponent);
    var musicPlayer = document.getElementById("musicPlayer");
    var loopToggleComponentChecked = loopToggleComponent.data.checked;
    console.log("loopToggleComponentChecked: "+loopToggleComponentChecked);
    musicPlayer.setAttribute('sound', 'loop', loopToggleComponentChecked);
    console.log("toggled loop, current value: "+musicPlayer.getAttribute('sound', 'loop'));
}

window.playMusic = function() {
    var musicPlayer = document.getElementById("musicPlayer");
    musicPlayer.components.sound.playSound();
}

window.pauseMusic = function() {
    var musicPlayer = document.getElementById("musicPlayer");
    musicPlayer.components.sound.pauseSound();
}

window.getProjectStatus = function(projectId) {
    console.log("in getProjecStatus, projectId: "+projectId);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200) {
                var progressMeter = document.getElementById("progress_meter");
                try {
                    var resp = JSON.parse(request.response);
                    if (resp.status == 'waiting_create') {
                        var percentComplete = resp.progress_percent;
                        var width = percentComplete * 0.01 * 2.5; // TODO: get width dynamically
                        if (width < 0.1) width = 0.1;
                        var position = -1.25 + width*0.5;
                        console.log("width: "+width+", position: "+position);
                        progressMeter.setAttribute('geometry', 'width', width);
                        progressMeter.setAttribute('position', 'x', position);
                        console.log("waiting, percent_complete: "+percentComplete+", project id: "+resp.id);
                        setTimeout(function() {
                            console.log("about to call getProjectStatus recursively with projectId: "+resp.id);
                            window.getProjectStatus(resp.id);
                        }, 200);
                    } else if (resp.status == 'created') {
                        //console.log(request.response);
                        for (var i = 0; i < resp.files.length; i++) {
                            var fileType = resp.files[i].content_type;
                            var fileURL = resp.files[i].download_url.replace('https://jimmy.ampermusic.com/v1','/amper');
                            console.log("file type: "+fileType);
                            console.log("file url: "+fileURL);
                            if (fileType == 'audio/mp3') {
                                var musicPlayer = document.getElementById("musicPlayer");
                                musicPlayer.setAttribute('sound', 'src', fileURL);
                            }
                        }
                        progressMeter.setAttribute('geometry', 'width', 2.5);
                        progressMeter.setAttribute('position', 'x', 0);
                    }
                } catch (e) {
                    console.log('Error calling getProjecStatus: [' + e.message + ']');
                }
            }
        }
    };
    console.log("about to send get request for project status");
    request.open('GET', `/amper/projects/${projectId}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}

window.submitMusicCreate = function() {
    console.log("submitting amperCreateRequest, descriptor: "+window.musicType+", time: "+window.musicLength);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            try {
                var resp = JSON.parse(request.response);
                console.log(request.response);
                var projectId = resp.id;
                console.log("project id: "+projectId);
                window.getProjectStatus(projectId);
            } catch (e){
                console.log('Error calling amperCreateRequest: [' + e.message + ']');
            }
        }
    };
    console.log("about to send get request");
    request.open('GET', `/amper/projects/${window.musicType}/${window.musicLength}`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
}
