GameData = function() {
	this.songSet = null; // an array of spotify track objects
	this.idSet = null;

	this.songGroupType = null;

	this.optionCount = 9;
	this.songOptions = null;

	this.audioPreview = null;

	this.score = 0;

	this.round = 0;
	this.maxRounds = 3;
	this.roundStartTime = null;

	this.guessedSongs = [];
	this.correctSongs = [];


	this.loadSongGroup = function(listOfSongs, songListType) {
		// song type can be: 'spotifyTracks', 'spotifyIds'

		switch (songListType) {
			case 'spotifyIds':
				this.idSet = listOfSongs;
				this.songGroupType = 'spotifyIds';
				break;

			case 'spotifyTracks':
				this.songSet = listOfSongs;
				this.songGroupType = 'spotifyTracks';
				break;

			default:
				this.idSet = spotifyIds;
				this.songGroupType = 'spotifyIds';
				console.log("Loaded default track list");
				break;
		}
	};

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

	this.removeIdFromIdSet = function(spotifyId) {
		var idIndex = this.idSet.indexOf(spotifyId);

		if (idIndex == -1) {
			console.log("Didn't remove id from GameData.idSet");
			return;
		}

		var removedId = this.idSet.splice(idIndex, 1);
	}

	this.loadAllSpotifyData = function() {
		this.songSet = [];

		if (this.idSet != null) {
			for (var i = 0; i < this.idSet.length; i++) {
				var song = getTrackBySpotifyId(this.idSet[i]);
				this.songSet.push(song);
			}
		}
	};

	this.setSongOptions = function() {
		// set the song options for each round
		// the method used will be determined by this.songGroupType

		if (this.songGroupType === null) {
			alert("Couldn't set song options");
			console.log("GameData.songGroupType not set...");
			return;
		}

		if (this.songGroupType == 'spotifyIds') {
			if (this.idSet === null || this.idSet.length < this.optionCount) {
				alert("Couldn't set song options");
				console.log("GameData.idSet issue:", this.idSet);
				return;
			}

			var chosenIds = [];
			this.songOptions = [];

			for (var i = 0; i < this.optionCount; i++) {
				var randIndex = Math.floor(Math.random() * this.idSet.length);
				var randomId = this.idSet[randIndex];
				var randomSong = getTrackBySpotifyId(randomId);

				while (chosenIds.indexOf(randomId) != -1 || !trackHasAlbumArt(randomSong)) {
					var newRandIndex = Math.floor(Math.random() * this.idSet.length);
					randomId = this.idSet[newRandIndex];
					randomSong = getTrackBySpotifyId(randomId);
				}

				chosenIds.push(randomId);
				this.songOptions.push(randomSong);
			}

			return;
		}

		else {
			console.log("Didn't set song options...");
			return;
		}
	};
};

var spotifyIds = ['5Yj0cfzPPokzpjUa516jsb', '0bV4WoGRzmYV6y7OojZvqr', '66jBbrVByFETJZ6FfpwxX4', '4nuPrKithHbRJXuA9spwu4', '0D7L4pBEGv8ni1cRfaTdMJ', '6roaUdrIQUlTcujSFLtYKI', '7bdDULyOUqNyWu6XPeAnSO', '5vVuiXoHyRGxJeCaHUpgae', '5LyzPhFwF7MgUY3aQD9TAG', '2dcpVsjiNG2eCE1A0jHzzQ', '5Yq58BC5k14EVUJ63cmg8g', '5VU6nvX3BqkqBmOJ2d9vhW', '4Wr14AISsCuBGdkA6rids4', '0BX0eq3SXW4jeZmQ271CpE', '4MvypG63QYhgFml4PbkycS', '1AhDOtG9vPSOmsWgNW0BEY', '2lBilUJAUX9jCNbbpPRQDD', '0vE1E6ZNJGlCHPe95z5Orl', '1VkjgkPh2joHQFXPxALE4w', '714hERk9U1W8FMYkoC83CO', '3FMaoRyUZ07NQIMlCDAEOi', '7ryYUwyBWKnXY4Ebs7F9Ju', '7paiew5fG14JcbGCCpJ0P5', '69rMjPtfWbelVGHM0TZaAr', '7mSUMlp8ttG8H00RePyZ5J', '4hDDfS0yW4YH0VGsJEjSM8', '4j3nXukQfT5RZTdqgZiKt1', '5VAKsbOWGdBbg1VFlu9W8o', '4bEtg70srLrCqQp3Nm2T5R', '3qVQ4akZVrjKXGE4czz8mI', '7cNq0FTl3GYjLc3g232hdA', '7c52LVpkxq3dzMEkDWiQyw', '0MGO9t2qWvKClhjVtzE8tA', '74DrA5fFoGSy4xgkZarZtP', '6qQrGkO4grQ7wKCxhtX1io', '55pdXiMNJNQxehrjkcwmYL', '65ANSaYbBQK6z8fOl0TWVd', '5phyXUNMfJv76epjasKNDS', '7m3dKsll00vBjZqYgZuP62', '69eoS6bEWWfMac4TL36UiM', '2lYe3AhO4dJhBMsvk9uBkw', '3I7bYwN9cMsXm5HqEH76Vv', '4IYoyOVK9oQyJS1QZt5Vyj', '0KMGxYKeUzK9wc5DZCt3HT', '20MxJN12WEqU5eWsuCrwM5', '65uzzraBcb1BE3BiYEztd7', '07KHJvlYBeQVqrmifTEqEp', '7IoKA8yRibsK8Ryy4SH2NL', '2kOOxUIHZvz4TsYE6kHYjb', '3AdX0KdVoMBqe82b19rWAU', '7tV4IBfyJN1E9rC9lxkl2Z', '6BJTagJUFeUxHpVWxTmatw', '58tKMD5v0R4H6ZtgHNyGbO', '5lSvRiMiLnG5HIpcQH4MAz', '3Hp66WUQ6yu69jMrirhSRs', '6J9paEX8rcBYuAIawdnzUj', '3VXoFBJ67ceuFqFdXd6vld', '0qbVccbQLEMbfJcI5wNLTJ', '0FF6HAfbuaVpZC8td4WcmN', '5eze4FmXWb2LvtuMRGcOXq', '2skIFujR9zTTAEXj8tfrw0', '05zCw24BdvZKGeC5NXowVe', '4UN5z3IkTamNxngTsS3Qrm', '763jJ8T1utfvNqz1WRDzx4', '2JOQYyJH6lG8hxpzmInRX0', '5TWPfkeN07aERO0Yn2D2t2', '77PCWchIQ9Dopdp5sahDEc', '67J6NR2Tdl0h2epWHcCBBN', '5dFoWIiJ2814hRwMYDcFiU', '32UDt5O32Ju7gTQWI3Pb7c', '5YtxOL4iUchhynLL9nEBwQ', '4MYb7NWLwXNDB7bYs3HeX8', '29VPObDt1Sg0YBwv8x8aHE', '4QEbXYWpDDWHzXNINdZlzW', '7odZlvyjhlFESLeu2PSZ5z', '2CsghsYEVWEgACHtecmCCj', '3MFa9idQuY4iJLWsZl3tIQ', '7utoClKnLShFg6u6dZ20gp', '3OALvGFqkjzwylB345KOVt', '3KGM2fm1K3p5alOyHGzTyY', '5XEsQ97NshBJ02yXpFSkTa', '1dCZvxf24rGMQNOamU9yy2', '3WOmG6u7bxrcFXwfiKMk80', '093Yob0qYlv7p4KdOXbkB4', '6fobsZ84ye4LF4m9IhsJH4', '4xsjEa8mfniPVJ58lKFP8e', '0WeJT7rCshvzK5BOBiAjBn'];