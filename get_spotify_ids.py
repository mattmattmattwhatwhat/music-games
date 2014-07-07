import requests
import json
import string

# I don't have a big song database and won't be able to github.io host a
# spotify API key, so this will be a fragile way to get spotify ids in
# usable form

class Song:
	def __init__(self, artist, song_title):
		self.artist = artist
		self.title = song_title

		self.found_perfect_match = False

	def find_match_in_found_tracks(self, search_items):
		# can't distinguish between multiple perfect matches
		# picks the first it encounters

		artist_as_list = self.artist.split()
		title_as_list = self.title.split()

		possible_matches = len(artist_as_list) + len(title_as_list)
		best_match_count = 0
		best_item = None

		perfect_matches = []

		for item in search_items:
			track_name = item['name']
			artists = item['artists']

			artist_matches = 0
			title_matches = 0

			for track_chunk in title_as_list:
				search_chunk = track_chunk.strip(string.punctuation).lower()
				if track_name.lower().find(search_chunk) > -1:
					title_matches += 1

			for artist in artists:
				for artist_chunk in artist_as_list:
					search_chunk = artist_chunk.strip(string.punctuation).lower()

					if artist['name'].lower().find(search_chunk) > -1:
						artist_matches += 1

			total_matches = artist_matches + title_matches

			if total_matches == possible_matches:
				self.found_perfect_match = True
				perfect_matches.append(item)

			if total_matches > best_match_count:
				best_item = item
				best_match_count = total_matches

		if len(perfect_matches) == 1:
			return perfect_matches[0]

		elif len(perfect_matches) > 1:
			for match in perfect_matches:
				artist_name = match['artists'][0]['name'].lower()

				if artist_name == self.artist.lower():
					return match

		print 'got best item for',
		print song.artist,
		print song.title
		return best_item




def search_for_track(song_title):
	base_search_url = "https://api.spotify.com/v1/search?q=track:"
	fixed_title = song_title.replace(' ', '%20')
	search_url = base_search_url + fixed_title + '&type=track'

	search_results = requests.get(search_url)

	return json.loads(search_results.text)

song_set = []

song_count = 0

just_ids = open('1976_ids.txt', 'w')

with open('songout2.txt') as f:
	just_ids.write('[')
	first_id = True

	for line in f:
		song_count += 1
		split_line = line.split('\t')

		if not first_id:
			just_ids.write(', ')

		print repr(split_line[-1])
		just_ids.write(split_line[-1].strip())

		if first_id:
			first_id = False

	just_ids.write(']\n')

print song_count
just_ids.close()

with open('song_list.txt') as f:
	for line in f:
		song_info = line.strip().split('\t')
		song_set.append(Song(song_info[2], song_info[3]))

# with open('songout.txt', 'w') as f:
# 	for song in song_set:
# 		search_results = search_for_track(song.title)
# 		song_results = search_results['tracks']['items']

# 		best_match = song.find_match_in_found_tracks(song_results)

# 		print 'writing:',
# 		print song.artist,
# 		print song.title,

# 		if song.found_perfect_match:
# 			f.write('y\t')
# 		else:
# 			f.write('n\t')

# 		f.write(song.artist)
# 		f.write('\t')
# 		f.write(song.title)
# 		f.write('\t')

# 		for artist in best_match['artists']:
# 			f.write(artist['name'])
# 			f.write(' ')

# 		f.write('\t')
# 		print best_match['name']
# 		f.write(best_match['name'].encode('ascii', 'ignore'))
# 		f.write('\t')
# 		f.write(best_match['id'])

# 		f.write('\n')




