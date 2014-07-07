import requests
import json

# I don't have a big song database and won't be able to github.io host a
# spotify API key, so this will be a fragile way to get spotify ids in
# usable form

class Song:
	def __init__(self, artist, song_title):
		self.artist = artist
		self.title = song_title

def search_for_track(song_title):
	base_search_url = "https://api.spotify.com/v1/search?q=track:"
	fixed_title = song_title.replace(' ', '%20')
	search_url = base_search_url + fixed_title + '&type=track'

	search_results = requests.get(search_url)

	return json.loads(search_results.text)

song_set = []

with open('song_list.txt') as f:
	for line in f:
		# lines in the form: year \t billboard rank \t artist \t song \n
		song_info = line.strip().split('\t')
		#print song_info[2],
		#print '\t\t',
		#print song_info[3]
		song_set.append(Song(song_info[2], song_info[3]))

for song in song_set:
	print song.title, song.artist

test_song = song_set[0]

search_results = search_for_track(test_song.title)
song_result_list = search_results['tracks']['items']

for song in song_result_list:
	print song['name']


