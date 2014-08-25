Game = function() {
	this.data = new GameData();
	this.ui = new UserInterface();
	
	this.initialize = function() {
		this.ui.initialize();

		this.data.loadSongGroup();
		this.data.setSongOptions();

		var startButton = document.getElementById("startButton");
		startButton.addEventListener("click", this, false);

		var continueButton = document.getElementById("continueButton");
		continueButton.addEventListener("click", this, false);
	};

	this.startGame = function() {
		var choiceSpans = document.getElementsByClassName("choiceOverlay");

		for (var i = 0; i < choiceSpans.length; i++) {
			addClassToAllDescendents(choiceSpans[i], "clickableChoice");
			choiceSpans[i].addEventListener("click", this, false);
		}

		this.startRound();
	};

	this.handleEvent = function(e) {
		console.log(e);
		var clickedElement = e.target;
		var clickedElementClassList = clickedElement.classList;
		var clickedId = e.target.id;

		if (clickedId == "startButton") {
			this.startGame();
			return;
		}

		else if (clickedId == "continueButton") {
			this.startRound();
		}

		else if (clickedElementClassList.contains("clickableChoice")) {
			this.handleGuess(clickedElement);
		}
	};

	this.getSongGuess = function(clickedElement) {
		if (clickedElement.classList.contains("choiceOverlay")) {
			var choiceSpan = clickedElement;
		}

		else {
			var parent = clickedElement.parentElement;

			while (!parent.classList.contains("choiceOverlay")) {
				parent = parent.parentElement;
			}

			var choiceSpan = parent;
		}

		var choiceContainer = choiceSpan.firstElementChild;
		var choiceImage = null;

		for (var i = 0; i < choiceContainer.children.length; i++) {
			if (choiceContainer.children[i].classList.contains("songInformationContainer")) {
				var songInfo = choiceContainer.children[i];
				break;
			}
		}

		for (var i = 0; i < songInfo.children.length; i++) {
			if (songInfo.children[i].classList.contains("choiceImage")) {
				choiceImage = songInfo.children[i];
				break;
			}
		}

		var guessedTrack = this.getTrackOptionFromImageUrl(choiceImage.src);
		console.log(guessedTrack.name);

		return guessedTrack;
	};

	this.handleGuess = function(clickedElement) {
		this.data.roundInfo.endTime = Date.now();
		this.data.audioPreview.pause();

		this.data.roundInfo.guessedSong = this.getSongGuess(clickedElement);
		this.data.roundInfo.correctSong = getTrackFromSetByPreviewUrl(this.data.audioPreview.src, this.data.songOptions);

		this.data.updateGameTracking();

		this.ui.showBetweenRoundsScreen(this.data.roundInfo, this.data.score);
	};

	this.startRound = function() {
		if (this.data.roundInfo.number == this.data.roundInfo.totalNumber) {
			this.ui.showGameOverScreen(this.data.score);
			return;
		}

		this.setMusicChoices();
		this.setSongToGuess();

		this.data.roundInfo.number += 1;
		this.data.roundInfo.isActive = true;

		this.ui.startHandler(this.data.roundInfo);
		this.data.roundInfo.startTime = Date.now();

		// get next set of random songs
		// choose song to play
		// update ui/show all guesses
		// hide mid round overlay
		// set round start time
	};

	this.setMusicChoices = function() {
		this.data.setSongOptions();

		this.ui.updateChoiceImages(this.data.songOptions);
		this.ui.setSongInformation(this.data.songOptions);
	};

	this.setSongToGuess = function() {
		var chosenSongIndex = Math.floor(Math.random() * this.data.songOptions.length);
		var chosenSong = this.data.songOptions[chosenSongIndex];

		this.data.audioPreview = new Audio();
		this.data.audioPreview.src = chosenSong.preview_url;
		this.data.audioPreview.play();

		console.log(this.data.songOptions[chosenSongIndex].name);
	};

	this.getTrackOptionFromImageUrl = function(url) {
		for (var i = 0; i < this.data.songOptions.length; i++) {
			var track = this.data.songOptions[i];

			for (var j = 0; j < track.album.images.length; j++) {
				if (url == track.album.images[j].url) {
					return track;
				}
			}
		}

		return null;
	};
};

var x = null;