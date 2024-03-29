UserInterface = function() {
	this.initialize = function() {
		document.getElementById("screenOverlay").hidden = false;

		var betweenRounds = document.getElementById("betweenRoundsContainer");
		betweenRounds.hidden = true;

		var gameOverContainer = document.getElementById("gameOverContainer");
		gameOverContainer.hidden = true;

		this.fillChoiceContainer();
		this.blurChoices();
	};

	this.startHandler = function(roundInfo) {
		this.removeBlurEffect();
		this.updateRound(roundInfo);

		var screenOverlay = document.getElementById("screenOverlay");
		screenOverlay.hidden = true;
		//screenOverlay.style["backgroundColor"] = "rgba(0, 0, 0, .7)";

		var startContainer = document.getElementById("startContainer");
		startContainer.hidden = true;
	};

	this.resetHandler = function() {
		var startContainer = document.getElementById("startContainer");
		startContainer.hidden = false;

		var betweenRounds = document.getElementById("betweenRoundsContainer");
		betweenRounds.hidden = true;

		var gameOverContainer = document.getElementById("gameOverContainer");
		gameOverContainer.hidden = true;

		var roundDisplay = document.getElementById("roundDisplay");
		roundDisplay.textContent = "Ready?";

		var scoreDisplay = document.getElementById("scoreDisplay");
		scoreDisplay.textContent = "Score: 0";

		var continueButton = document.getElementById("continueButton");
		continueButton.textContent = "Next round";
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

	this.updateRound = function(roundInfo) {
		var roundDisplay = document.getElementById("roundDisplay");
		var roundText = "Round: " + roundInfo.number.toString();

		var numberString = roundInfo.number.toString();
		var totalCountString = roundInfo.totalNumber.toString();

		var roundText = "Round " + numberString + " of " + totalCountString;
		roundDisplay.textContent = roundText;
	};

	this.showBetweenRoundsScreen = function(roundInfo, currentScore) {//, guessedSong, correctSong) {
		var container = document.getElementById("betweenRoundsContainer");
		container.hidden = false;

		var message = document.getElementById("betweenRoundsMessage");

		if (roundInfo.correctGuess) {
			var congratsMessage = "Congratulations! " + roundInfo.guessedSong.name + " is right!";
			message.textContent = congratsMessage;
			this.updateScore(currentScore);
		}

		else {
			var wrongMessage = "Sorry, it was " + roundInfo.correctSong.name + ". You chose " + roundInfo.guessedSong.name  + ".";
			message.textContent = wrongMessage;
			// add way to display the correct song
		}

		if (roundInfo.number == roundInfo.totalNumber) {
			var continueButton = document.getElementById("continueButton");
			continueButton.textContent = "Final score";
		}

		this.displayScreenOverlay();
	};

	this.setGameOverGuesses = function(guessedSongs, correctSongs) {
		var guessesContainer = document.getElementById("guessesContainer");

		while (guessesContainer.children.length > 0) {
			guessesContainer.children[0].remove();
		}

		var guessList = document.createElement("ul");
		guessList.id = "guessList";

		var headerRow = document.createElement("li");
		headerRow.classList.add("guessListRow");

		var headerEntryContainer = document.createElement("ul");
		headerEntryContainer.classList.add("guessListContainer");
		headerEntryContainer.classList.add("guessOddRow");

		var headerFirstCol = document.createElement("li");
		var headerSecondCol = document.createElement("li");
		var headerThirdCol = document.createElement("li");

		headerFirstCol.textContent = "Round";
		headerSecondCol.textContent = "Your Guess";
		headerThirdCol.textContent = "Right Song";

		headerFirstCol.classList.add("guessListEntry");
		headerSecondCol.classList.add("guessListEntry");
		headerThirdCol.classList.add("guessListEntry");

		headerFirstCol.classList.add("guessListHeaderEntry");
		headerSecondCol.classList.add("guessListHeaderEntry");
		headerThirdCol.classList.add("guessListHeaderEntry");

		headerEntryContainer.appendChild(headerFirstCol);
		headerEntryContainer.appendChild(headerSecondCol);
		headerEntryContainer.appendChild(headerThirdCol);

		headerRow.appendChild(headerEntryContainer);
		guessList.appendChild(headerRow);

		for (var i = 0; i < correctSongs.length; i++) {
			var guessRow = document.createElement("li");
			guessRow.classList.add("guessListRow");

			var guessRowEntryContainer = document.createElement("ul");
			guessRowEntryContainer.classList.add("guessListContainer");

			if (i % 2 == 0) {
				guessRowEntryContainer.classList.add("guessEvenRow");
			}

			else {
				guessRowEntryContainer.classList.add("guessOddRow");
			}

			var guessFirstCol = document.createElement("li");
			var guessSecondCol = document.createElement("li");
			var guessThirdCol = document.createElement("li");

			guessFirstCol.classList.add("guessListEntry");
			guessSecondCol.classList.add("guessListEntry");
			guessThirdCol.classList.add("guessListEntry");

			guessFirstCol.textContent = "Round " + (i + 1).toString();
			guessSecondCol.textContent = guessedSongs[i].name;
			guessThirdCol.textContent = correctSongs[i].name;

			if (guessedSongs[i].name != correctSongs[i].name) {
				guessSecondCol.classList.add("wrongGuess");
			}

			guessRowEntryContainer.appendChild(guessFirstCol);
			guessRowEntryContainer.appendChild(guessSecondCol);
			guessRowEntryContainer.appendChild(guessThirdCol);

			guessRow.appendChild(guessRowEntryContainer);
			guessList.appendChild(guessRow);
		}

		guessesContainer.appendChild(guessList);
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

		this.blurChoices();
	};

	this.blurChoices = function() {
		var songInfoContainers = document.getElementsByClassName("songInformationContainer");

		for (var i = 0; i < songInfoContainers.length; i++) {
			var infoElements = songInfoContainers[i].children;

			for (var j = 0; j < infoElements.length; j++) {
				infoElements[j].classList.add("blurred");
			}
		}
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
		var choiceOverlays = document.getElementsByClassName("choiceOverlay");

		if (infoElements.length != spotifyTracks.length) {
			alert("Couldn't set song information");
			return;
		}

		for (var i = 0; i < infoElements.length; i++) {
			choiceOverlays[i].spotifyId = spotifyTracks[i].id;
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