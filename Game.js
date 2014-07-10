Game = function() {
	this.data = new GameData();
	this.ui = new UserInterface();
	
	this.initialize = function() {
		this.ui.initialize();

		this.data.loadSongGroup();
		//this.data.loadAllSpotifyData();
		this.data.setSongOptions();

		var startButton = document.getElementById("startButton");
		startButton.addEventListener("click", this, false);
	};

	this.startGame = function() {
		this.ui.updateChoiceImages(this.data.songOptions);
		this.ui.setSongInformation(this.data.songOptions);

		var choiceSpans = document.getElementsByClassName("choiceOverlay");

		for (var i = 0; i < choiceSpans.length; i++) {
			addClassToElementAndChildren(choiceSpans[i], "clickableChoice");
			choiceSpans[i].addEventListener("click", this, false);
		}

		this.ui.startHandler();

		var chosenSongIndex = Math.floor(Math.random() * this.data.songOptions.length);
		var chosenSong = this.data.songOptions[chosenSongIndex];

		this.data.audioPreview = new Audio();
		this.data.audioPreview.src = chosenSong.preview_url;
		this.data.audioPreview.play();

		this.data.roundStartTime = Date.now();

		console.log(this.data.songOptions[chosenSongIndex].name);
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

		else if (clickedElementClassList.contains("clickableChoice")) {
			this.handleGuess(clickedElement);
		}
	};

	this.checkGuess = function(clickedElement) {
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

		console.log(choiceContainer);
		var trackGuess = this.getTrackOptionFromImageUrl(choiceImage.src);

		if (trackGuess.preview_url == this.data.audioPreview.src) {
			return true;
		}

		else {
			return false;
		}
	};

	this.handleGuess = function(clickedElement) {
		var guessTime = Date.now() - this.data.roundStartTime;
		this.data.audioPreview.pause();

		var guessIsCorrect = this.checkGuess(clickedElement);

		if (guessIsCorrect) {
			var guessScore = Math.floor((30000 - guessTime)/100);
			this.data.score += guessScore;
			console.log('correct!');
			//console.log((30000 - guessTime)/100);
		}

		else {
			console.log('wrong!');
			console.log(guessTime);
		}

		if (this.data.round < this.data.maxRounds) {
			this.ui.showBetweenRoundsScreen(this.data.round, this.data.score, guessIsCorrect);
			// ui overlay next round

			this.data.roundStartTime = null;
			this.data.round += 1;
			return;
		}

		else {
			// ui show final screen
		}

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