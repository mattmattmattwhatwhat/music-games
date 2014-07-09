UserInterface = function() {
	this.initialize = function() {
		var choiceImages = document.getElementsByClassName("choiceImage");
		var placeHolderUrls = ["https://i.scdn.co/image/682bf4f6907c2fba55174731a785a12567b710e8", "https://i.scdn.co/image/0c95438d67fed97b73af499788a0fabbd03502b0", "https://i.scdn.co/image/150810312f2e14fbfc15739cc3ace0b0e5756676", "https://i.scdn.co/image/db21b2d486c91ef4553b22ecf6340c6004694703", "https://i.scdn.co/image/0067b9dad0b455e90bbe04e161eda040a25b43a0", "https://i.scdn.co/image/91d54a93760914865d8d9939f2fe280972f714bd", "https://i.scdn.co/image/0e606a9b964b2f1762648c78a2973283dfdb24ee", "https://i.scdn.co/image/5aa5fb84963b8dee7500803db9df1942f3c57f2a", "https://i.scdn.co/image/f61693da3e016ea7b6f83a5f4a4d3c63183695fe"];

		for (var i = 0; i < choiceImages.length; i++) {
			choiceImages[i].src = placeHolderUrls[i%choiceImages.length];
		}
	};

	this.startHandler = function() {
		this.removeBlurEffect();

		var screenOverlay = document.getElementById("screenOverlay");
		screenOverlay.hidden = true;
	};

	this.updateChoiceImages = function(spotifyTracks) {
		var artUrls = getArtUrlsFromSongSet(spotifyTracks);
		var choiceImages = document.getElementsByClassName("choiceImage");

		updateImageSources(choiceImages, artUrls);
	};

	this.removeBlurEffect = function() {
		var blurredElements = document.getElementsByClassName("blurred");
		//console.log(blurredElements);
		for (var i = 0; i < blurredElements.length; i++) {
			blurredElements[i].classList.remove("blurred");
		}

		while (document.getElementsByClassName("blurred").length > 0) {
			this.removeBlurEffect(); // one pass wasn't removing all the blurs?
		}
	};

	this.setSongInformation = function(spotifyTracks) {
		var infoElements = document.getElementsByClassName("songInformationContainer");

		if (infoElements.length != spotifyTracks.length) {
			alert("Couldn't set song information");
			return;
		}

		for (var i = 0; i < infoElements.length; i++) {
			var children = infoElements[i].children;
			var trackName = spotifyTracks[i].name;

			var artistName = spotifyTracks[i].artists[0].name;

			if (spotifyTracks[i].artists.length > 1) {
				for (var j = 1; j < spotifyTracks[i].artists.length; j++) {
					artistName = artistName + ' and ' + spotifyTracks[i].artists[j].name;
				}
			}

			children[0].innerText = trackName;
			children[1].innerText = artistName;
		}
	}
};