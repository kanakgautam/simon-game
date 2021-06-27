var buttonColours = ["green", "red", "blue", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var playerScore = [];

var players = 1;

var totalPlayers = $("#inputGroupSelect01").val();

var score = 0;

var started = false;


$("#inputGroupSelect01").change(function () {
    totalPlayers = $("#inputGroupSelect01").val();
    console.log(totalPlayers);
    if (!started) {
        started = true;
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
    else {
        location.reload();
    }
})

$(".btn").click(function () {
    if (!started) {
        location.reload();
    }
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer();
})

function nextSequence() {

    var audio1 = new Audio("sounds/water.mp3");
    audio1.play();
    console.log("audio");

    userClickedPattern = [];

    var randomNumber = Math.random();
    randomNumber *= 4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    if(randomChosenColour === "green")
    {
        $("#green").removeClass("btn-outline-success");
        $("#green").addClass("btn-success");

        setTimeout(function(){
            $("#green").removeClass("btn-success");
            $("#green").addClass("btn-outline-success");
        },500);
    }
    else if(randomChosenColour === "yellow")
    {
        $("#yellow").removeClass("btn-outline-warning");
        $("#yellow").addClass("btn-warning");

        setTimeout(function(){
            $("#yellow").removeClass("btn-warning");
            $("#yellow").addClass("btn-outline-warning");
        },500);
    }
    else if(randomChosenColour === "blue")
    {
        $("#blue").removeClass("btn-outline-info");
        $("#blue").addClass("btn-info");

        setTimeout(function(){
            $("#blue").removeClass("btn-info");
            $("#blue").addClass("btn-outline-info");
        },500);
    }
    if(randomChosenColour === "red")
    {
        $("#red").removeClass("btn-outline-danger");
        $("#red").addClass("btn-danger");

        setTimeout(function(){
            $("#red").removeClass("btn-danger");
            $("#red").addClass("btn-outline-danger");
        },500);
    }

}

function checkAnswer() {
    console.log("checking");
    var currPosition = userClickedPattern.length - 1;
    if (userClickedPattern[currPosition] === gamePattern[currPosition]) {
        if (userClickedPattern.length === gamePattern.length) {
            score += 1;
            $("#score").text(score);
            setTimeout(function () {
                nextSequence();
            }, 1500);
        }
    }
    else {
        playerScore.push(score);
        var audio1 = new Audio("sounds/wrong.mp3");
        audio1.play();
        if (players === Number(totalPlayers)) {
            console.log("winner");
            chooseWinner();
            started = false;
        }
        else {
            players += 1;
            $("#player").text("player " + players);
            gamePattern = [];
            score = 0;
            $("#score").text(score);
            setTimeout(function () {
                nextSequence();
            }, 1500);
        }
    }
}

function chooseWinner() {
    var winner = [];
    var max = 0;
    for (var i = 0; i < totalPlayers; i++) {
        if (playerScore[i] > max) {
            max = playerScore[i];
            winner = [];
            winner.push(i + 1);
        }
        else if (playerScore[i] == max) {
            winner.push(i + 1);
        }
    }
    if (winner.length === 1) {
        console.log("yes");
        var winnerPlayer = winner[0];
        $("#player").text("Winner is player" + winnerPlayer);
    }
    else {
        $("#player").text("There is a Draw");
    }
    setTimeout(function () {
        location.reload();
    }, 4000);
}
