import requests
from bs4 import BeautifulSoup
# 
import json
# 
import sqlite3
#
import time

baseurl = 'https://www.ticketmaster.it'

headers = {
	'User-Agent': 'Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36 (KHTML, come Gecko) Chrome / 89.0.4389.90 Safari / 537.36'
}

productlinks = []

jsonFile = open("events.json", "w")

jolly = ""

for x in range(1,2):
	# r = requests.get(f'https://www.ticketmaster.it/music/altri-musica/52/events')
	r = requests.get(f'https://www.ticketmaster.it/music/alternative-indie-rock/60/events')
	soup = BeautifulSoup(r.content, 'lxml')
	productlist = soup.find_all('div', class_='sc-1y6w6fq-0 fqRpLy')
	for item in productlist:
		for link in item.find_all('a', href=True):		
			if (jolly == ""):
				productlinks.append(link['href'])
				jolly = link['href']
			if (jolly != link['href']):
				productlinks.append(link['href'])
				jolly = link['href']

i = 0

head = '[\n'
end = '\n]'

jsonFile.write(head)

con = sqlite3.connect('Events.db')

cur = con.cursor()

counter = 0

for link in productlinks:
    if(link[:29] == 'https://shop.ticketmaster.it/'):
    	counter += 1

for link in productlinks:


	if(link[:29] == 'https://shop.ticketmaster.it/'):
		r = requests.get(link, headers = headers)
		content = str(r.content)
		content = content.replace('&nbsp;', '')
		soup = BeautifulSoup(content, 'lxml')

		name = soup.find('h1', class_='text_h3 bold').text.strip()
		location = soup.find('h2', class_='text_p margin-bottom').text.strip()
		status = soup.find('span', class_='badge').text.strip()
		if(status == "Disponibile" or status == "Low availability"):
			sit = soup.find('h3', class_= 'text_h4').text.strip()
			price = soup.find('td', align="right").text.strip()

			location = location.replace('\\xc2', ' ')
			location = location.replace('\\xa0', ' ')
			name = name.replace('\\xc3', 'u\'')
			name = name.replace('\\xb9', '')
			name = name.replace('\\x9c', 'U')
			name = name.replace("'", "")
			name = name.replace('\\xe2', '')
			name = name.replace('\\x9d', '')
			name = name.replace('\\x80', '')
			name = name.replace('\\', '')
			sit = sit.replace("\\xc2\\xb0", '')
			price = price.replace('\\xc2', '')
			price = price.replace('\\xa0', '')
			price = price.replace('\\xe2', '')
			price = price.replace('\\x82', '')
			price = price.replace('\\xac', ' ')
			price = price[:5]
			

			events = '\t{\n\t"id":' + '"' + str(i) + '"' + ',\n\t "name":' + '"' + name + '"' + ', \n\t "location":' + '"' + location + '"' + ', \n\t "status":' + '"' + status + '"' + ', \n\t "sit":' + '"' + sit + '"' + ', \n\t "price":' + '"' + price + '"' + '\n\t}'


			exist = False

			for row in cur.execute('SELECT * FROM Events'):
    				if(row[1] == name and row[2] == location):
    						exist = True

			currenttime = time.time()
			# currenttime = int(currenttime)
			currenttime = str(currenttime)[:17].replace(".", "")
			currenttime = int(currenttime)
			id = currenttime

			if(exist == False):
					print(id)
					insert = cur.execute("INSERT INTO Events (id, name, location, status, sit, price) VALUES (?, ?, ?, ?, ?, ?)", (id, name, location, status, sit, price))
					con.commit()


			jsonFile.write(events)

		else:
		
			location = location.replace('\\xc2', ' ')
			location = location.replace('\\xa0', ' ')
			name = name.replace('\\xc3', 'u\'')
			name = name.replace('\\xb9', '')
			name = name.replace('\\x9c', 'U')
			name = name.replace("'", " ")
			name = name.replace('\\xe2', '')
			name = name.replace('\\x9d', '')
			name = name.replace('\\x80', '')
			name = name.replace('\\', '')

			sit = None
			price = None
			
			# id = i

			events = '\t{\n\t"id":' + '"' + str(i) + '"' + ',\n\t "name":' + '"' + name + '"' + ', \n\t "location":' + '"' + location + '"' + ', \n\t "status":' + '"' + status + '"' + '\n\t}'
			
			exist = False

			for row in cur.execute('SELECT * FROM Events'):
    				if(row[1] == name and row[2] == location):
    						exist = True

			currenttime = time.time()
			currenttime = str(currenttime)[:17].replace(".", "")
			currenttime = int(currenttime)
			id = currenttime

			if(exist == False):
					print(id)
					insert = cur.execute("INSERT INTO Events (id, name, location, status, sit, price) VALUES (?, ?, ?, ?, ?, ?)", (id, name, location, status, sit, price))
					con.commit()

			jsonFile.write(events)

	if(i != counter-1 and link[:29] == 'https://shop.ticketmaster.it/'):
		
		i += 1
		events = ',\n'

		# cur.execute("INSERT INTO Events VALUES (?, ?, ?, ?, ?, ?)", (id, name, location, status, sit, price))

		jsonFile.write(events)

    			
    	
    	
con.close()
jsonFile.write(end)