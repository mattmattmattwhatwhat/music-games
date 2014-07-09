Game = function() {
	this.data = new GameData();
	this.ui = new UserInterface();
	
	this.initialize = function() {
		this.ui.initialize();

		this.data.loadSongGroup();
		this.data.setSongOptions();

		var startButton = document.getElementById("startButton");
		startButton.addEventListener("click", this, false);

		//console.log(this.ui);
	};

	this.startGame = function() {
		this.ui.updateChoiceImages(this.data.songOptions);
		this.ui.setSongInformation(this.data.songOptions);

		var choiceSpans = document.getElementsByClassName("choiceOverlay");

		for (var i = 0; i < choiceSpans.length; i++) {
			addClassToElementAndChildren(choiceSpans[i], "clickableChoice");
			choiceSpans[i].addEventListener("click", this, false);
		}

		/*while (document.getElementsByClassName("blurred").length > 0) {
			this.ui.removeBlurEffect(); // one pass wasn't removing all the blurs?
		}*/

		this.ui.startHandler();

		var chosenSongIndex = Math.floor(Math.random() * this.data.songOptions.length);
		var chosenSong = this.data.songOptions[chosenSongIndex];

		this.data.audioPreview = new Audio();
		this.data.audioPreview.src = chosenSong.preview_url;
		this.data.audioPreview.play();

		console.log(this.data.songOptions[chosenSongIndex]);
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
			this.checkGuess(clickedElement);
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
			if (choiceContainer.children[i].classList.contains("choiceImage")) {
				choiceImage = choiceContainer.children[i];
				break;
			}
		}

		var trackGuess = this.getTrackOptionFromImageUrl(choiceImage.src);

		if (trackGuess.preview_url == this.data.audioPreview.src) {
			console.log("correct");
		}

		else {
			console.log("wrong");
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