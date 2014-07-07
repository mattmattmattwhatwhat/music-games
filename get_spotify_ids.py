import requests

# I don't have a big song database and won't be able to github.io host a
# spotify API key, so this will be a fragile way to get spotify ids in
# usable form

class Song:
	def __init__(self, artist, song_title):
		self.artist = artist
		self.title = song_title

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
