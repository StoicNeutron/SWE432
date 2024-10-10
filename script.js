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

// Data for the pie chart
const data = [10, 120, 30, 50, 100];

// Set up the SVG container
const svgWidth = 300;
const svgHeight = 300;
const radius = Math.min(svgWidth, svgHeight) / 2;

// Create SVG element
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${svgWidth / 2}, ${svgHeight / 2})`);

// Create a color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Create the pie function
const pie = d3.pie();

// Create the arc generator
const arc = d3.arc()
    .innerRadius(0) // This will create a full pie chart (set innerRadius to create a donut chart)
    .outerRadius(radius);

// Bind data to arcs and append the pie chart
const arcs = svg.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

arcs.append("path")
    .attr("d", arc)
    .attr("fill", function(d, i) {
        return color(i); // Fill each arc with a different color
    });

// Add text labels to each arc
arcs.append("text")
    .attr("transform", function(d) {
        return `translate(${arc.centroid(d)})`; // Centers the text in each arc
    })
    .attr("text-anchor", "middle") // Centers the text horizontally
    .attr("font-size", "14px")
    .attr("fill", "#fff") // White text color for contrast
    .text(function(d) {
        return d.data; // Displays the data value inside the slice
    });