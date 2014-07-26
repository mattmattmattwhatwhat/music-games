UserInterface = function() {
	this.initialize = function() {
		var betweenRounds = document.getElementById("betweenRoundsContainer");
		betweenRounds.hidden = true;

		var gameOverContainer = document.getElementById("gameOverContainer");
		gameOverContainer.hidden = true;

		this.fillChoiceContainer();
	};

	this.startHandler = function() {
		this.removeBlurEffect();

		var screenOverlay = document.getElementById("screenOverlay");
		screenOverlay.hidden = true;

		var startContainer = document.getElementById("startContainer");
		startContainer.hidden = true;
	};

	this.updateChoiceImages = function(spotifyTracks) {
		var artUrls = getArtUrlsFromSongSet(spotifyTracks);
		var choiceImages = document.getElementsByClassName("choiceImage");

		updateImageSources(choiceImages, artUrls);
	};

	this.updateScore = function(score) {
		var scoreDisplay = document.getElementById("scoreDisplay");
		var scoreText = "Score: " + score.toString();

		scoreDisplay.textContent = scoreText;
	};

	this.updateRound = function(round) {
		var roundDisplay = document.getElementById("roundDisplay");
		var roundText = "Round: " + round.toString();

		roundDisplay.textContent = roundText;
	};

	this.showBetweenRoundsScreen = function(roundNumber, currentScore, correctGuess) {
		var container = document.getElementById("betweenRoundsContainer");
		container.hidden = false;

		var message = document.getElementById("betweenRoundsMessage");

		if (correctGuess) {
			message.textContent = "Congratulations! You got it!";
			this.updateScore(currentScore);
		}

		else {
			message.textContent = "Close? Maybe?";
			// add way to display the correct song
		}

		this.displayScreenOverlay();
	};

	this.showGameOverScreen = function(finalScore) {
		var container = document.getElementById("betweenRoundsContainer");
		container.hidden = true;

		var gameOverContainer = document.getElementById("gameOverContainer");
		gameOverContainer.hidden = false;

		var gameOverScore = document.getElementById("gameOverScore");
		gameOverScore.textContent = "You scored: " + finalScore.toString() + "!";

		this.displayScreenOverlay();
	};

	this.displayScreenOverlay = function() {
		var screenOverlay = document.getElementById("screenOverlay");
		screenOverlay.hidden = false;

		var choiceContainer = document.getElementById("choiceContainer");
		choiceContainer.classList.add("blurred");
	};

	this.removeBlurEffect = function() {
		var blurredElements = document.getElementsByClassName("blurred");
		var elementCount = blurredElements.length;

		for (var i = elementCount - 1; i >= 0; i--) {
			blurredElements[i].classList.remove("blurred");
		}
	};

	this.setSongInformation = function(spotifyTracks) {
		var infoElements = document.getElementsByClassName("songInformationContainer");

		if (infoElements.length != spotifyTracks.length) {
			alert("Couldn't set song information");
			return;
		}

		for (var i = 0; i < infoElements.length; i++) {
			var artistPara = infoElements[i].getElementsByClassName("artistLabel")[0];
			var titlePara = infoElements[i].getElementsByClassName("titleLabel")[0];

			var trackName = spotifyTracks[i].name;
			var artistName = spotifyTracks[i].artists[0].name;

			if (spotifyTracks[i].artists.length > 1) {
				for (var j = 1; j < spotifyTracks[i].artists.length; j++) {
					artistName = artistName + ' and ' + spotifyTracks[i].artists[j].name;
				}
			}

			titlePara.textContent = trackName;
			artistPara.textContent = artistName;
		}
	};

	this.createChoiceElement = function() {
		var placeHolderUrls = ["https://i.scdn.co/image/682bf4f6907c2fba55174731a785a12567b710e8", "https://i.scdn.co/image/0c95438d67fed97b73af499788a0fabbd03502b0", "https://i.scdn.co/image/150810312f2e14fbfc15739cc3ace0b0e5756676", "https://i.scdn.co/image/db21b2d486c91ef4553b22ecf6340c6004694703", "https://i.scdn.co/image/0067b9dad0b455e90bbe04e161eda040a25b43a0", "https://i.scdn.co/image/91d54a93760914865d8d9939f2fe280972f714bd", "https://i.scdn.co/image/0e606a9b964b2f1762648c78a2973283dfdb24ee", "https://i.scdn.co/image/5aa5fb84963b8dee7500803db9df1942f3c57f2a", "https://i.scdn.co/image/f61693da3e016ea7b6f83a5f4a4d3c63183695fe"];

		var choiceSpan = document.createElement("span");
		choiceSpan.classList.add("choiceOverlay");
		//choiceSpan.classList.add("blurred");

		var choiceDiv = document.createElement("div");
		choiceDiv.classList.add("gameChoice");

		var choiceImage = new Image();
		choiceImage.classList.add("choiceImage");
		choiceImage.src = placeHolderUrls[Math.floor(Math.random() * placeHolderUrls.length)];

		var songInfoDiv = document.createElement("div");
		songInfoDiv.classList.add("songInformationContainer");

		var titlePara = document.createElement("p");
		titlePara.classList.add("titleLabel");
		titlePara.textContent = "What a Wonderful Tune";

		var artistPara = document.createElement("p");
		artistPara.classList.add("artistLabel");
		artistPara.textContent = "Artist and the band";

		songInfoDiv.appendChild(artistPara);
		songInfoDiv.appendChild(choiceImage);
		songInfoDiv.appendChild(titlePara);

		choiceDiv.appendChild(songInfoDiv);
		choiceSpan.appendChild(choiceDiv);

		return choiceSpan;

	};

	this.fillChoiceContainer = function() {
		var choiceContainer = document.getElementById("choiceContainer");

		for (var i = 0; i < 3; i++) {
			var choiceRow = document.createElement("div");
			choiceRow.classList.add("choiceRow");

			for (var j = 0; j < 3; j++) {
				var choiceSpan = this.createChoiceElement();
				choiceRow.appendChild(choiceSpan);
			}

			choiceContainer.appendChild(choiceRow);
		}
	};
};