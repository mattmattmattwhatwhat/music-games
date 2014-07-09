GameData = function() {
	this.songSet = null; // an array of spotify track objects
	this.idSet = null;

	this.optionCount = 9;
	this.songOptions = null;

	this.audioPreview = null;

	this.removeSongFromSet = function(trackObject) {
		if (this.songSet === null) {
			alert("No set to remove song from!");
			return;
		}

		var songIndex = this.songSet.indexOf(trackObject);

		if (songIndex == -1) {
			alert("Song not found in set");
			return;
		}

		var removedSong = this.songSet.splice(songIndex, 1);
	};

	this.setSongOptions = function() {
		if (this.songOptions === null) {
			this.songOptions = [];
		}

		if (this.songSet != null && this.songSet.length > this.optionCount) {
			// if spotify data was preloaded
			for (var i = 0; i < this.optionCount; i++) {
				var randIndex = Math.floor(Math.random() * this.songSet.length);
				var randomSong = this.songSet[randIndex];

				while (this.songOptions.indexOf(randomSong) != -1) {
					var newRandIndex = Math.floor(Math.random() * this.songSet.length);
					randomSong = this.songSet[newRandIndex];
				}

				this.songOptions.push(randomSong);
			}

			return;
		}

		if (this.songSet === null && this.idSet != null &&
			this.idSet.length > this.optionCount) {
			// for lazy loading

			this.songSet = [];

			var chosenIds = [];

			for (var i = 0; i < this.optionCount; i++) {
				var randIndex = Math.floor(Math.random() * this.idSet.length);
				var randomId = this.idSet[randIndex];

				while (chosenIds.indexOf(randomId) != -1) {
					var newRandIndex = Math.floor(Math.random() * this.idSet.length);
					randomId = this.idSet[newRandIndex];
				}

				chosenIds.push(randomId);

				var randomSong = getTrackBySpotifyId(randomId);

				this.songSet.push(randomSong);
				this.songOptions.push(randomSong);
			}

			return;
		}

		alert("Couldn't load song choices!");
	};
};