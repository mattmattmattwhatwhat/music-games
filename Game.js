Game = function() {
	this.data = new GameData();
	this.ui = new UserInterface();
	
	this.initialize = function() {
		this.ui.initialize();
		this.data.loadSongGroup();

		var startButton = document.getElementById("startButton");
		startButton.addEventListener("click", this, false);

		var choiceSpans = document.getElementsByClassName("choiceOverlay");

		for (var i = 0; i < choiceSpans.length; i++) {
			choiceSpans[i].addEventListener("click", this, false);
		}

		this.data.setSongOptions();
		console.log(this.ui);
	};

	this.startGame = function() {
		this.ui.startHandler();

		var chosenSongIndex = Math.floor(Math.random() * this.data.songOptions.length);
		var artUrls = getArtUrlsFromSongSet(this.data.songOptions);

		var placeholderImages = document.getElementsByClassName("placeholderImage");

		this.ui.updateImageSources(placeholderImages, artUrls);
		this.ui.setSongInformation(this.data.songOptions);

		while (document.getElementsByClassName("blurred").length > 0) {
			this.ui.removeBlurEffect(); // one pass wasn't removing all the blurs?
		}

		var chosenSong = this.data.songOptions[chosenSongIndex];
		this.data.audioPreview = new Audio();
		this.data.audioPreview.src = chosenSong.preview_url;
		this.data.audioPreview.play();

		console.log(this.data.songOptions[chosenSongIndex]);
		//console.log(artUrls);
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

		else if (clickedElementClassList.contains("placeholderImage")) {
			var clickedTrack = this.getTrackOptionFromImageUrl(clickedElement.src);
			if (clickedTrack.preview_url == this.data.audioPreview.src){
				//console.log("Match!");
				alert("You got it!");
			}
			else {
				console.log("Wronggg");
			}
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