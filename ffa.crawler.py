from bs4 import BeautifulSoup
import requests
import re
import json

def loadpage(url):
    html = requests.get(url, headers=headers)
    return BeautifulSoup(html.content, "html.parser")

with open('teams.json') as teamsFile:
    teams = json.load(teamsFile)

headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'}

data2 = "data.csv"
f = open(data2, "w", encoding = "utf-8") 
title = "Youth Academy, Name, Position, Current Club, League, Market Value, Appearances, Goals, Assists\n"
f.write(title)

#run on all teams 
for j in range(0,34): 
    #run on all tables in each team
    for i in range(1,14):
        if(i==1):
            page = loadpage("https://www.transfermarkt.com/%s/jugendarbeit/verein/%d" %(teams[j]["club"], teams[j]["num"]))  
        else:    
            page = loadpage("https://www.transfermarkt.com/%s/jugendarbeit/verein/%d/page/%d" %(teams[j]["club"], teams[j]["num"],i))

        links = page.findAll('a', {'class':"spielprofil_tooltip"})
        
        #print the names of all players
        for link in links:
            url = "https://www.transfermarkt.com%s" %(link['href'])
            page = loadpage(url)
            div = page.find('div',{'class':"zeile-oben"})
            if (div!=None):
                value = div.find('div',{'class':"right-td"})
                if(value!= None):
                    if re.search('-', value.get_text()):
                        continue
                    else: 
                        name = page.find('div', {'class':"dataBild"}).find('img')['title']
                        if(page.find('table', {'class':"auflistung"}).find('a',{'class':"vereinprofil_tooltip"}) == None):
                            continue
                        if((page.find('span',{'class':"mediumpunkt"})) == None or (page.find('span',{'class':"mediumpunkt"}).get_text()) == "National"
                            or (page.find('span',{'class':"mediumpunkt"}).get_text()) == "Ligue 2" ):
                            continue
                        league = page.find('span',{'class':"mediumpunkt"}).find('a').get_text().strip()
                        currentClub = page.find('table', {'class':"auflistung"}).find('a',{'class':"vereinprofil_tooltip"}).find('img')['alt'].strip()
                        if re.search("Mill",value.get_text()):
                            marketVal = value.get_text().replace(" Mill. €","0000").replace(",","").strip()
                        if re.search("Th",value.get_text()):
                            marketVal = value.get_text().replace(" Th. €", "000").replace(",","").strip()

                        page = loadpage(url.replace("profil", "leistungsdatendetails"))
                        statistics = page.find('tfoot').find_all('td',{'class':"zentriert"})
                        apps = statistics[1].get_text()
                        goals = statistics[3].get_text().replace("-","0")

                        span = page.findAll('span', {'class':"dataValue"})
                        position = span[4].get_text().strip()
                        if(position == "Goalkeeper"):
                            assists = "0"
                        else:
                            assists = statistics[4].get_text().replace("-","0")
                        print(teams[j]["club"])
                        print(name)
                        print(position)
                        print(currentClub)
                        print(league)  
                        print(marketVal)
                        print(apps)
                        print(goals)
                        print(assists+"\n")
                        f.write(teams[j]["club"] + "," + name + "," + position + "," + currentClub + "," + league + "," + marketVal + "," + apps + "," + goals + "," + assists + "\n")
                        
f.close()