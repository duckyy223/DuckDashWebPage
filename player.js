window.initMeTubePlayer = function (config) {
    window.MTP_Values = config;

    // Clear previous instances/styles if any
    $(MTP_Values["PlayerAppendEl"]).empty();

    if (MTP_Values['Autoplay'] === true) {
        var autoplay = "autoplay";
        var button = "";
    } else {
        var autoplay = "";
        var button = "<div class='MTP_play_button'><span class='material-symbols-outlined' style='font-size: 80px; color: white;'>play_arrow</span></div>";
    }
    $(MTP_Values["PlayerAppendEl"]).prepend(`
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0');

    .MeTubePlayer{
        background-color: #000;
        width: 100%;
        height: 100%;
        position: relative;
        font-family: Arial, Helvetica, sans-serif!important;
        overflow: hidden;
        user-select: none;
    }
    .MTP_Actions{
        padding: 1px 0 0;
        background: rgb(27, 27, 27);
        position: absolute;
        width: 100%;
        bottom: 0px;
        min-height: 40px;
        z-index: 930;
        transition: all .2s;
        display: flex;
        flex-direction: column;
    }
    .MTP_Dropdown{
        background:#fff;
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius:5px;
        border:1px solid #666;
        z-index:100;
    }
    .MTP_Dropdown_El{
        background:#fff;color:#666;margin:5px 0;padding:5px;cursor:pointer;
    }
    .MTP_Dropdown_El:hover{
        background:#666;color:#fff;
    }
    .MTP_Hint_Dur{
        background: rgba(0,0,0, .8);
        color: #fff;
        padding: 4px 8px;
        font-size: 12px;
        font-weight: bold;
        position: absolute;
        bottom: 15px;
        border-radius: 4px;
        pointer-events: none;
        white-space: nowrap;
    }
    .MTP_Button{
        background: none;
        border: none;
        cursor: pointer;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
    }
    .MTP_Button:hover {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
    }
    .MTP_Button .material-symbols-outlined {
        font-size: 24px;
    }
    .MTP_Actions_Main{
        display: flex;
        align-items: center;
        padding: 0 10px;
        height: 40px;
    }
    .MTP_Duration{
        font-size: 12px;
        margin-left: 10px;
        line-height: 40px;
        color: #ddd;
        cursor:default;
    }
    .MTP_Current_Time{
        color:#fff;
    }
    .MTP_Actions_Left{
        display: flex;
        align-items: center;
    }
    .MTP_Actions_Right{
        display: flex;
        align-items: center;
        margin-left:auto;
    }
    .MTP_Progress_Bar{
        background: rgba(255, 255, 255, 0.2);
        position: relative;
        width: 100%;
        z-index: 760;
        height: 3px;
        transition: height 0.1s;
        cursor: pointer;
    }
    .MTP_Progress_Bar:hover{
        height: 5px;
    }
    .MTP_Scrubber{
        background: #f00;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%) scale(0);
        transition: transform 0.1s;
    }
    .MTP_Progress_Bar:hover .MTP_Scrubber{
        transform: translateY(-50%) scale(1);
    }
    .MTP_Progress_Bar_Active{
        background-color: #f00;
        height: 100%;
        width: 0%;
        position: relative;
    }
    video{
        width:100%;
        height: 100%;
        cursor: pointer;
    }
    .MTP_Loading{
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top: 4px solid #fff;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -20px;
        margin-left: -20px;
        animation: MTP_Spin 1s linear infinite;
    }
    @keyframes MTP_Spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .MTP_Sound_Bar_Container {
        width: 0;
        overflow: hidden;
        transition: width 0.2s;
        display: flex;
        align-items: center;
        height: 40px;
        margin-left: 5px;
    }
    #Sound:hover .MTP_Sound_Bar_Container {
        width: 60px;
    }
    .MTP_Sound_Bar{
        width: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        height: 3px;
        cursor: pointer;
        position: relative;
    }
    .MTP_Sound_Bar_Active{
        background-color: #fff;
        width: 100%;
        height: 100%;
        position: relative;
    }
    #Sound{
        display: flex;
        align-items: center;
    }
    .MTP_play_button{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background 0.2s;
    }
    .MTP_play_button:hover{
        background: #f00;
    }
    .MTP_Placeholders{
        display: flex;
        align-items: center;
        justify-content: center;
        width:100%;
        height: 100%;
        position:absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
    .MTP_Play_Placeholder{
        background-color: rgba(0,0,0, .5);
        padding: 15px;
        border-radius: 50%;
        animation: MTP_Animation_Placeholder .5s forwards;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .MTP_Play_Placeholder .material-symbols-outlined {
        color: white;
        font-size: 40px;
    }
    @keyframes MTP_Animation_Placeholder {
        0%{ transform: scale(0.5); opacity: 1; }
        100%{ transform: scale(1.5); opacity: 0; }
    }
    </style>
    <div class="MeTubePlayer">
    ` + button + `
    <video src="`+ MTP_Values["VideoSource"] + `" ` + autoplay + `></video>
    <div class="MTP_Actions">
        <div class="MTP_Progress_Bar">
            <div class="MTP_Progress_Bar_Active" style="width:0px;">
                <div class="MTP_Scrubber"></div>
            </div>
        </div>
        <div class="MTP_Actions_Main">
            <div class="MTP_Actions_Left">
                <button class="MTP_Button" id="PlayPause">
                    <span class="material-symbols-outlined">` + (autoplay ? 'pause' : 'play_arrow') + `</span>
                </button>
                <div id="Sound">
                    <button class="MTP_Button MTP_Sound">
                         <span class="material-symbols-outlined">volume_up</span>
                    </button>
                    <div class="MTP_Sound_Bar_Container">
                        <div class="MTP_Sound_Bar">
                            <div class="MTP_Sound_Bar_Active"></div>
                        </div>
                    </div>
                </div>
                <div class="MTP_Duration">
                    <span class="MTP_Current_Time">00:00</span> / <span class="MTP_Vid_Duration">` + (MTP_Values['DurationSeconds'] ? formatTime(MTP_Values['DurationSeconds']) : "00:00") + `</span>
                </div>
            </div>
            <div class="MTP_Actions_Right">
                <button class="MTP_Button MTP_Full_Screen">
                    <span class="material-symbols-outlined">fullscreen</span>
                </button>
            </div>
        </div>
    </div>
</div>`)

    // Helpers
    const formatTime = (s) => {
        if (isNaN(s)) return "00:00";
        var m = Math.floor(s / 60);
        m = (m >= 10) ? m : "0" + m;
        s = Math.floor(s % 60);
        s = (s >= 10) ? s : "0" + s;
        return m + ":" + s;
    }

    // State
    var loadR = 0;
    var bufferingDetected = false;
    var lastPlayPos = 0;
    var currentPlayPos = 0;

    // Load Metadata to set duration
    document.querySelector('video').onloadedmetadata = function () {
        $('.MTP_Vid_Duration').text(formatTime(this.duration));
    };

    $('.MeTubePlayer').click(() => { $('.MTP_Dropdown').remove(); })

    var playerInterval = setInterval(() => {
        if (!document.querySelector('video')) { clearInterval(playerInterval); return; }

        currentPlayPos = document.querySelector('video').currentTime;
        var offset = (50 - 20) / 1000;
        if (!bufferingDetected && currentPlayPos < (lastPlayPos + offset) && !document.querySelector('video').paused && document.querySelector('video').readyState < 3) {
            if ($('.MTP_Loading').length === 0) {
                $('.MeTubePlayer').prepend('<div class="MTP_Loading"></div>');
            }
            bufferingDetected = true;
        }
        if (bufferingDetected && (currentPlayPos > (lastPlayPos + offset) || document.querySelector('video').readyState >= 3)) {
            $('.MTP_Loading').remove();
            bufferingDetected = false;
        }
        lastPlayPos = currentPlayPos;
    }, 50)

    $('.MeTubePlayer').click(() => {
        $('.MTP_Info').removeClass("MTP_Visible")
    })

    $('.MeTubePlayer').hover(() => {
        if (!document.querySelector('video').paused) {
            $('.MTP_Actions').css('transform', 'translateY(0px)');
            $('.MTP_Actions').css('opacity', '1');
        }
    }, () => {
        if (!document.querySelector('video').paused) {
            // Hide controls after a delay or immediately? Original code translated them down.
            // Let's just keep them visible but maybe fade slightly or verify original behavior.
            // Original behavior: translate Y 33px (hide).
            $('.MTP_Actions').css('transform', 'translateY(100%)');
            $('.MTP_Actions').css('opacity', '0');
        }
    });

    // Show controls when paused
    document.querySelector('video').addEventListener('pause', () => {
        $('.MTP_Actions').css('transform', 'translateY(0px)');
        $('.MTP_Actions').css('opacity', '1');
    })

    $('.MTP_Full_Screen').click(() => {
        var videoContainer = document.querySelector('.MeTubePlayer');
        var icon = $('.MTP_Full_Screen .material-symbols-outlined');

        if (!document.fullscreenElement) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            }
            icon.text('fullscreen_exit');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            icon.text('fullscreen');
        }
    })

    // Keep icon in sync with fullscreen change (esc key)
    document.addEventListener('fullscreenchange', (e) => {
        var icon = $('.MTP_Full_Screen .material-symbols-outlined');
        if (!document.fullscreenElement) {
            icon.text('fullscreen');
        } else {
            icon.text('fullscreen_exit');
        }
    });

    $('.MTP_Sound').click(() => {
        var video = document.querySelector('video');
        var icon = $('.MTP_Sound .material-symbols-outlined');
        if (video.muted || video.volume === 0) {
            video.muted = false;
            video.volume = 1; // Restore volume
            icon.text('volume_up');
            $('.MTP_Sound_Bar_Active').css('width', '100%');
        } else {
            video.muted = true;
            icon.text('volume_off');
            $('.MTP_Sound_Bar_Active').css('width', '0%');
        }
    })

    function togglePlay() {
        var video = document.querySelector('video');
        var icon = $('#PlayPause .material-symbols-outlined');
        var bigPlayBtn = $('.MTP_play_button');

        if (video.paused || video.ended) {
            video.play();
            icon.text('pause');
            bigPlayBtn.remove();

            // Animation
            $('.MeTubePlayer').prepend('<div class="MTP_Placeholders"><div class="MTP_Play_Placeholder"><span class="material-symbols-outlined">play_arrow</span></div></div>');
            setTimeout(() => { $('.MTP_Placeholders').remove(); }, 500);
        } else {
            video.pause();
            icon.text('play_arrow');
            // Animation
            $('.MeTubePlayer').prepend('<div class="MTP_Placeholders"><div class="MTP_Play_Placeholder"><span class="material-symbols-outlined">pause</span></div></div>');
            setTimeout(() => { $('.MTP_Placeholders').remove(); }, 500);
        }
    }

    $('video').click(togglePlay);
    $('#PlayPause').click(togglePlay);
    $('.MTP_play_button').click(togglePlay);

    document.querySelector('video').onended = () => {
        $('#PlayPause .material-symbols-outlined').text('replay');
        $('.MTP_Actions').css('transform', 'translateY(0px)');
        $('.MTP_Actions').css('opacity', '1');
    }

    document.querySelector('video').addEventListener('play', () => {
        $('#PlayPause .material-symbols-outlined').text('pause');
        if ($('.MTP_play_button').length != 0) {
            $('.MTP_play_button').remove();
        }
    })

    document.querySelector('video').addEventListener('pause', () => {
        $('#PlayPause .material-symbols-outlined').text('play_arrow');
    })

    $('.MTP_Progress_Bar').click(function (e) {
        var rect = this.getBoundingClientRect();
        var pos = (e.clientX - rect.left) / this.offsetWidth;
        document.querySelector('video').currentTime = pos * document.querySelector('video').duration;
    })

    $('.MTP_Sound_Bar').click(function (e) {
        var rect = this.getBoundingClientRect();
        var pos = (e.clientX - rect.left) / this.offsetWidth;
        document.querySelector('video').volume = pos;
        document.querySelector('video').muted = false;
    })

    document.querySelector('video').addEventListener("volumechange", () => {
        var video = document.querySelector('video');
        var width = (video.muted ? 0 : video.volume) * 100 + '%';
        $('.MTP_Sound_Bar_Active').css('width', width);

        var icon = $('.MTP_Sound .material-symbols-outlined');
        if (video.muted || video.volume === 0) icon.text('volume_off');
        else if (video.volume < 0.5) icon.text('volume_down');
        else icon.text('volume_up');
    })

    document.querySelector('video').addEventListener("timeupdate", () => {
        $('.MTP_Vid_Duration').text(formatTime(document.querySelector('video').duration));
        $('.MTP_Current_Time').text(formatTime(document.querySelector('video').currentTime));
        var pos = (document.querySelector('video').currentTime / document.querySelector('video').duration) * 100 + '%';
        $('.MTP_Progress_Bar_Active').css('width', pos);
    })

    $('.MTP_Progress_Bar').mousemove(function (e) {
        $('.MTP_Hint_Dur').remove();
        var rect = this.getBoundingClientRect();
        var pos = (e.clientX - rect.left) / this.offsetWidth;
        var time = pos * document.querySelector('video').duration;

        var hint = $('<div class="MTP_Hint_Dur">' + formatTime(time) + '</div>');
        $(this).append(hint);
        hint.css('left', (e.clientX - rect.left - (hint.outerWidth() / 2)) + 'px');
    })

    $('.MTP_Progress_Bar').mouseout(() => {
        $('.MTP_Hint_Dur').remove();
    })
};
