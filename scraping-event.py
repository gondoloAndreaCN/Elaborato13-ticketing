import requests
from bs4 import BeautifulSoup
# 
import json
# 

baseurl = 'https://www.ticketmaster.it'

headers = {
	'User-Agent': 'Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36 (KHTML, come Gecko) Chrome / 89.0.4389.90 Safari / 537.36'
}

productlinks = []

jsonFile = open("events.json", "w")

for x in range(1,2):
	r = requests.get(f'https://www.ticketmaster.it/music/altri-musica/52/events')
	soup = BeautifulSoup(r.content, 'lxml')
	productlist = soup.find_all('div', class_='sc-1y6w6fq-0 fqRpLy')
	jolly = 0
	for item in productlist:
		for link in item.find_all('a', href=True):
			if (jolly = 0)
			productlinks.append(link['href'])

i = 0

head = '[\n'
end = ']'

jsonFile.write(head)

counter = 0

for link in productlinks:
    if(link[:29] == 'https://shop.ticketmaster.it/'):
    	counter += 1

for link in productlinks:
	print(counter)
	print(i)
	

	if(link[:29] == 'https://shop.ticketmaster.it/'):
		r = requests.get(link, headers = headers)
		soup = BeautifulSoup(r.content, 'lxml')

		name = soup.find('h1', class_='text_h3 bold').text.strip()
		location = soup.find('h2', class_='text_p margin-bottom').text.strip()
		status = soup.find('span', class_='badge dGreen').text.strip()

		print(name)

		id = i
		
		# myObj = {
  		# 	"name":"John",
  		# 	"age":30,
  		# 	"cars": {
    	# 		"car1":"Ford",
    	# 		"car2":"BMW",
    	# 		"car3":"Fiat"
		# 	}
  		# }

		events = '\t{\n\t"id":' + '"' + str(i) + '"' + ',\n\t "name":' + '"' + name + '"' + ', \n\t "location":' + '"' + location + '"' + ', \n\t "status":' + '"' + status + '"' + '\n\t} \n'

		print("no virgola")
		
		jsonFile.write(events)

	if(i != counter-1 and link[:29] == 'https://shop.ticketmaster.it/'):
		
		i += 1
		print("virgola")
		events = ','
		jsonFile.write(events)

    			
    	
    	

jsonFile.write(end)