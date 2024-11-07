// Menu Bar
var menuBtn =document.getElementById("menuBtn");
var sideNav =document.getElementById("sideNav");

sideNav.style.right="-250px";
menuBtn.onclick = function(){
    if(sideNav.style.right == "-250px"){
        sideNav.style.right ="0";
    }
    else{
        sideNav.style.right ="-250px"
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Color theme functionality
    const colorButtons = document.querySelectorAll('.color-btn,.alabama-logo-btn');
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bgColor = this.getAttribute('data-bgcolor');
            const textColor = this.getAttribute('data-textcolor');
            const bgImage = this.getAttribute('data-bgimage');
            if (bgImage) {
                document.body.style.backgroundImage = bgImage;
                document.body.style.backgroundColor = 'transparent';
            } else {
                document.body.style.backgroundColor = bgColor;
                document.body.style.backgroundImage = 'none';
            }
            document.body.style.color = textColor;
            updateColors(bgColor, textColor);
        });
    });

    function updateColors(bgColor, textColor) {
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            highlight.style.color = (bgColor === '#000000') ? '#D50A0A' : textColor;
        });
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.style.color = (bgColor === '#ffffff') ? '#000' : textColor;
        });
        const subtitles = document.querySelectorAll('.sub-title');
        subtitles.forEach(subtitle => {
            subtitle.style.color = (bgColor === '#ffffff') ? '#000' : '#fff';
        });
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.color = (bgColor === '#19dbe6') ? '#000' : textColor;
        });
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.style.color = (bgColor === '#ffffff') ? '#000' : '#fff';
        }
    }



    

    // Schedule data
    const schedule = [
        { week: "WEEK 1", opponent: "Washington Commanders", result: "W, 37-20", date: "2024-09-08", channel: "FOX", location: "Raymond James Stadium" },
        { week: "WEEK 2", opponent: "Detroit Lions", result: "W, 20-16", date: "2024-09-15",   channel: "FOX", location: "Ford Field" },
        { week: "WEEK 3", opponent: "Denver Broncos", result: "L, 7-26", date: "2024-09-22",  channel: "FOX", location: "Raymond James Stadium" },
        { week: "WEEK 4", opponent: "Philadelphia Eagles", result: "W, 33-16", date: "2024-09-29",   channel: "FOX", location: "Raymond James Stadium" },
        { week: "WEEK 5", opponent: "Atlanta Falcons", result: "L, 30-36 (OT)", date: "2024-10-03", channel: "Amazon Prime", location: "Mercedes-Benz Stadium" },
        { week: "WEEK 6", opponent: "New Orleans Saints", result: "W, 51-27", date: "2024-10-13",  channel: "FOX", location: "Caesars Superdome" },
        { week: "WEEK 7", opponent: "Baltimore Ravens", result: "L, 31-41", date: "2024-10-21",  channel: "ESPN", location: "Raymond James Stadium" },
        { week: "WEEK 8", opponent: "Atlanta Falcons", result: "L, 26-31", date: "2024-10-27",  channel: "FOX", location: "Raymond James Stadium" },
        { week: "WEEK 9", opponent: "Kansas City Chiefs", result: "L, 24-30 (OT)", date: "2024-11-04",  channel: "ESPN", location: "GEHA Field at Arrowhead Stadium" },
        { week: "WEEK 10", opponent: "San Francisco 49ers", result: "Upcoming", date: "2024-11-10T13:00:00", channel: "FOX",location: "Raymond James Stadium" },
        { week: "WEEK 11", opponent: "BYE", result: "", date: "" },
        { week: "WEEK 12", opponent: "New York Giants", result: "Upcoming", date: "2024-11-24T13:00:00", channel: "FOX", location: "MetLife Stadium" },
        { week: "WEEK 13", opponent: "Carolina Panthers", result: "Upcoming", date: "2024-12-01T16:05:00", channel: "FOX",location: "Bank of America Stadium" },
        { week: "WEEK 14", opponent: "Las Vegas Raiders", result: "Upcoming", date: "2024-12-08T13:00:00",  channel: "FOX", location: "Raymond James Stadium" },
        { week: "WEEK 15", opponent: "Los Angeles Chargers", result: "Upcoming", date: "2024-12-15T16:25:00",  channel: "FOX", location: "SoFi Stadium" },
        { week: "WEEK 16", opponent: "Dallas Cowboys", result: "Upcoming", date: "2024-12-22T20:20:00",  channel: "FOX", location: "AT&T Stadium" },
        { week: "WEEK 17", opponent: "Carolina Panthers", result: "Upcoming", date: "2024-12-29T13:00:00",  channel: "FOX", location: "Raymond James Stadium" },
        { week: "WEEK 18", opponent: "New Orleans Saints", result: "Upcoming", date: "2025-01-05T13:00:00",  channel: "CBS", location: "Raymond James Stadium" }
    ];
    
    updateSchedule();
    

    function updateSchedule() {
        const scheduleList = document.querySelector('.schedule-list');
        if (!scheduleList) return;

        scheduleList.innerHTML = '';
        const currentDate = new Date();

        const futureGames = schedule.filter(game => new Date(game.date) > currentDate);

        if (futureGames.length === 0) {
            scheduleList.innerHTML = '<p>No upcoming games scheduled.</p>';
        } else {
            futureGames.forEach(game => {
                const gameDate = new Date(game.date);
                const listItem = document.createElement('div');
                listItem.classList.add('schedule-item');
                listItem.innerHTML = `
                    <h3>${game.opponent}</h3>
                    <p>Date: ${gameDate.toLocaleDateString()}</p>
                    <p>Time: ${gameDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    <p>Channel: ${game.channel}</p>
                    <p>Location: ${game.location}</p>
                `;
                scheduleList.appendChild(listItem);
            });

            // Update countdown for the next game
            updateCountdown(new Date(futureGames[0].date));
        }
    }

    function updateCountdown(nextGameDate) {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
      
        function createDigitElement(value, label) {
          return `
            <div class="countdown-digit">
              <div class="digit-top">${value}</div>
              <div class="digit-bottom">${value}</div>
              <span class="label">${label}</span>
            </div>
          `;
        }
      
        function calculateTimeLeft() {
          const now = new Date();
          const difference = nextGameDate - now;
      
          if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
            countdownElement.innerHTML = `
              ${createDigitElement(days, 'Days')}
              ${createDigitElement(hours, 'Hours')}
              ${createDigitElement(minutes, 'Minutes')}
              ${createDigitElement(seconds, 'Seconds')}
            `;
      
            // Animate changing digits
            const digits = countdownElement.querySelectorAll('.countdown-digit');
            digits.forEach(digit => {
              const top = digit.querySelector('.digit-top');
              const bottom = digit.querySelector('.digit-bottom');
              if (top.textContent !== bottom.textContent) {
                digit.classList.add('flip');
                setTimeout(() => {
                  digit.classList.remove('flip');
                  bottom.textContent = top.textContent;
                }, 500);
              }
            });
          } else {
            countdownElement.innerHTML = "Game day!";
          }
        }
      
        calculateTimeLeft();
        setInterval(calculateTimeLeft, 1000);
      }

      function downloadWallpaper(url) {
        window.open(url, '_blank');
    }
    
    

    // Recent Results Functionality
    const resultsPerPage = 2; // Number of results to display at a time
    let currentResultPage = 1;

    function updateRecentResults() {
        const resultsList = document.querySelector('.results-list');
        const loadMoreBtn = document.getElementById('load-more-results');
        if (!resultsList || !loadMoreBtn) return;

        resultsList.innerHTML = ''; // Clear existing results
        const currentDate = new Date();

        const pastGames = schedule.filter(game => new Date(game.date) < currentDate && game.result);
        pastGames.reverse(); // Show most recent games first

        const visibleResults = pastGames.slice(0, resultsPerPage * currentResultPage); // Paginate results

        visibleResults.forEach(game => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3>${game.opponent}</h3>
                <p>${game.result}</p>
                <p>${formatDate(new Date(game.date))} | ${formatTime(new Date(game.date))}</p>
                <p>${game.channel} | ${game.location}</p>
            `;
            resultsList.appendChild(resultItem);
        });

        if (visibleResults.length >= pastGames.length) {
            loadMoreBtn.style.display = 'none'; // Hide the button if no more results
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // Event listener for Load More button
    const loadMoreBtn = document.getElementById('load-more-results');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentResultPage++; // Increase the page number to show more results
            updateRecentResults();
        });
    }

    // Helper functions for date and time formatting
    function formatDate(date) {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    function formatTime(date) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }

    /// Fan Poll functionality
const pollForm = document.getElementById('poll-form');
const pollResults = document.getElementById('poll-results');

function initializeVotes() {
    const storedData = JSON.parse(localStorage.getItem('fanPollData')) || {};
    const currentDate = new Date().toDateString();

    if (storedData.lastResetDate !== currentDate) {
        // It's a new day, reset the votes
        return {
            votes: {},
            lastResetDate: currentDate
        };
    }
    return storedData;
}

let pollData = initializeVotes();

function updateLocalStorage() {
    localStorage.setItem('fanPollData', JSON.stringify(pollData));
}

if (pollForm) {
    pollForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const playerName = document.getElementById('player-name').value;
        if (playerName) {
            pollData.votes[playerName] = (pollData.votes[playerName] || 0) + 1;
            updateLocalStorage();
            updatePollResults();
            pollForm.reset();
        }
    });
}

function updatePollResults() {
    if (pollResults) {
        const sortedVotes = Object.entries(pollData.votes).sort((a, b) => b[1] - a[1]);
        pollResults.innerHTML = '<h3>Current Poll Results:</h3>';
        sortedVotes.forEach(([player, voteCount]) => {
            pollResults.innerHTML += `<p>${player}: ${voteCount} votes</p>`;
        });
    }
}

// Call updatePollResults on page load to display existing votes
updatePollResults();

    // Highlight Reel Functionality
    const highlightVideos = [
        'JGwGXA7hqdg',
        'qx93e3TBktY',
        'yYk0q-HGphE',
        'ae4vpzIxL6k',
    ];

    let currentVideoIndex = 0;
    let player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('video-player', {
            height: '315',
            width: '560',
            videoId: highlightVideos[currentVideoIndex],
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        const playButton = document.getElementById('play-video');
        const nextButton = document.getElementById('next-highlight');

        playButton.addEventListener('click', function() {
            if (player.getPlayerState() == YT.PlayerState.PLAYING) {
                player.pauseVideo();
                playButton.textContent = 'Play';
            } else {
                player.playVideo();
                playButton.textContent = 'Pause';
            }
        });

        nextButton.addEventListener('click', function() {
            currentVideoIndex = (currentVideoIndex + 1) % highlightVideos.length;
            player.loadVideoById(highlightVideos[currentVideoIndex]);
            playButton.textContent = 'Pause';
        });
    }

    // Call onYouTubeIframeAPIReady when the API is loaded
    if (window.YT && window.YT.Player) {
        onYouTubeIframeAPIReady();
    } else {
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } 

    // Initial calls to set up the page
    updateSchedule();
    updateRecentResults();
    setInterval(updateSchedule, 60000); // Refresh the schedule every minute
});
// Fetch Live Game Stats (Placeholder API URL)
async function fetchLiveGameStats() {
    try {
        const response = await fetch('https://api.collegefootball.com/game-stats'); // Replace with actual API endpoint
        const data = await response.json();

        const liveScore = document.getElementById('live-score');
        liveScore.innerHTML = `<p>Score: ${data.score}</p><p>Time Left: ${data.timeLeft}</p>`;
    } catch (error) {
        console.error('Error fetching live game stats:', error);
    }
}
setInterval(fetchLiveGameStats, 60000); // Update stats every minute

// Fan Comments Section
const commentForm = document.getElementById('comment-form');
const commentList = document.getElementById('comment-list');

// Load comments from localStorage
function loadComments() {
    const storedComments = JSON.parse(localStorage.getItem('fanComments')) || [];
    storedComments.forEach(comment => {
        addCommentToDisplay(comment);
    });
}

function addCommentToDisplay(commentText) {
    const comment = document.createElement('p');
    comment.textContent = commentText;
    commentList.appendChild(comment);
}

commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const commentText = document.getElementById('comment-text').value;
    if (commentText) {
        addCommentToDisplay(commentText);
        saveComment(commentText);
        commentForm.reset();
    }
});

function saveComment(commentText) {
    const storedComments = JSON.parse(localStorage.getItem('fanComments')) || [];
    storedComments.push(commentText);
    localStorage.setItem('fanComments', JSON.stringify(storedComments));
}

// Reset comments daily at midnight
function resetCommentsIfNewDay() {
    const currentDate = new Date().toDateString();
    const lastResetDate = localStorage.getItem('lastResetDate');

    if (lastResetDate !== currentDate) {
        localStorage.removeItem('fanComments'); // Clear comments
        localStorage.setItem('lastResetDate', currentDate); // Update last reset date
        commentList.innerHTML = ''; // Clear displayed comments
    }
}

// Call this function on page load
loadComments();
resetCommentsIfNewDay();

// Player Comparison Tool
const playerData = {
    "Mike Evans": { touchdowns: 89, yards: 10425 },
    "Tom Brady": { touchdowns: 108, yards: 14643 },
    "Warrick Dunn": { touchdowns: 49, yards: 5500 },
    "Keyshawn Johnson": { touchdowns: 41, yards: 4428 },
    "Vinny Testaverde": { touchdowns: 77, yards: 14820 },
    "Doug Williams": { touchdowns: 73, yards: 16000 }
};

function comparePlayers() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    const resultDiv = document.getElementById('comparison-result');

    resultDiv.innerHTML = `
        <p>${player1}: ${playerData[player1].touchdowns} touchdowns, ${playerData[player1].yards} yards</p>
        <p>${player2}: ${playerData[player2].touchdowns} touchdowns, ${playerData[player2].yards} yards</p>
    `;
}

// Trivia Quiz
const triviaQuestions = [
    { question: "Who was the first head coach of the Tampa Bay Buccaneers?", answer: "john mckay" },
    { question: "In what year did the Buccaneers win their first Super Bowl?", answer: "2002" },
    { question: "Which Buccaneers player holds the franchise record for most career sacks?", answer: "warren sapp" },
    { question: "Who was the quarterback for the Buccaneers in their Super Bowl XXXVII victory?", answer: "brad johnson" },
    { question: "What year did the Buccaneers change their primary team colors from orange to red?", answer: "1997" }
];

let currentQuestion;

function loadTriviaQuestion() {
    currentQuestion = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
    document.getElementById('trivia-question').textContent = currentQuestion.question;
}

function checkAnswer() {
    const answer = document.getElementById('answer').value.toLowerCase();
    const quizResult = document.getElementById('quiz-result');

    if (answer === currentQuestion.answer) {
        quizResult.textContent = "Correct!";
    } else {
        quizResult.textContent = "Incorrect. Try again!";
    }
    setTimeout(() => {
        quizResult.textContent = "";
        loadTriviaQuestion();
    }, 2000);
}

document.addEventListener('DOMContentLoaded', loadTriviaQuestion);

function startNewsTicker() {
    const ticker = document.getElementById('news-ticker');
    ticker.style.animation = 'scroll-left 10s linear 1';
    ticker.addEventListener('animationend', function() {
        ticker.style.position = 'relative';
        ticker.style.bottom = '20px';
        ticker.style.animation = 'none';
    });
}
document.addEventListener('DOMContentLoaded', startNewsTicker);

// Player Stats Chart (using Chart.js)
// Function to load player stats into a chart
function loadPlayerStats() {
    const ctx = document.getElementById('statsChart').getContext('2d');

    // Define player data directly within the function
    const players = {
        "Tom Brady": [,,, , , , , , 40, 43,], // Played from 2017 to 2021 
        "Mike Evnas": [, ,12 ,13 ,12 ,5 ,8 , 8, 13, 14, ],      // Played in specific years (2017 and from 2020)
        "Chris Godwin": [, , , , , 1, 7, 9, 7, 5, ],
        "Doug Martin": [ 12 ,1 ,2 ,7 ,3 ,3 , ,,, , ],
        "Rob Gronkowski": [  , , , , , , , ,7,6, ]
        
    };

    // Prepare datasets for each player
    const datasets = Object.keys(players).map(player => ({
        label: `${player} Touchdowns`,
        data: players[player], // Full data set including zeros for non-playing years
        borderColor: getRandomColor(),
        borderWidth: 2,
        fill: false // No fill under the line
    }));

    // Create a new chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [ '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'], // Year labels
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Touchdowns'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                }
            }
        }
    });
}

// Function to generate random colors for each player's line
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Load stats for all players when the DOM is loaded
document.addEventListener('DOMContentLoaded', loadPlayerStats);



// Game Day Popup
function checkGameDay() {
    const gameDates = ['2024-11-09', '2024-11-16', '2024-11-30'];
    const today = new Date().toISOString().slice(0, 10);
    if (gameDates.includes(today)) {
        document.getElementById('game-day-popup').classList.add('active');
    }
}
function closePopup() {
    document.getElementById('game-day-popup').classList.remove('active');
}
document.addEventListener('DOMContentLoaded', checkGameDay);

// Fan Poll and Rankings
const rankingForm = document.getElementById('ranking-form');
const rankResults = document.getElementById('rank-results');
rankingForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const player = document.getElementById('rank').value;
    rankResults.innerHTML += `<p>${player} received a vote!</p>`;
    rankingForm.reset();
});