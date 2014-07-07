import requests

with open('song_list.txt') as f:
	for line in f:
		print line.strip().split('\t')