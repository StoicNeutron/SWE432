document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('playButton');
    const sound_animated = document.getElementById('sound_animated');
    const buttonImage = document.getElementById('buttonImage');
    const audio = document.getElementById('audioPlayer');

    const expandList = document.getElementById('expandList');
    const songList = document.getElementById('songList');

    const playImage = 'resources/pause.png';
    const pauseImage = 'resources/play.png';

    let isExpanded = false;

    const moreSongs = [
        'Driver’s License - Olivia Rodrigo',
        'Positions - Ariana Grande',
        'Super Natural - News Jean'
    ];

    button.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            buttonImage.src = playImage;
            sound_animated.src = 'resources/sound_wave.webp';
        } else {
            audio.pause();
            buttonImage.src = pauseImage;
            sound_animated.src = '';
        }
    });

    button.addEventListener('mouseover', function() {
        buttonImage.style.transform = 'scale(1.1)'; // Zoom on hover
    });

    button.addEventListener('mouseout', function() {
        buttonImage.style.transform = 'scale(1)'; // Reset zoom when hover ends
    });


    function expand() {
        moreSongs.forEach(function(song) {
            const newLi = document.createElement('li');
            newLi.textContent = song;
            newLi.style.color = 'gray';
            newLi.classList.add('more-item');
            songList.insertBefore(newLi, expandList);
        });

        expandList.innerHTML = '<a href="javascript:void(0);">less...</a>';
        isExpanded = true;
    }

    function collapse() {
        document.querySelectorAll('.more-item').forEach(function(item) {
            item.remove();
        });

        expandList.innerHTML = '<a href="javascript:void(0);">more...</a>';
        isExpanded = false;
    }

    expandList.addEventListener('click', function() {
        if (isExpanded) {
            collapse();
        } else {
            expand();
        }
    });
});
