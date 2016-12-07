---
layout: post
title:  "Export d'adresse courriel"
date:   2016-07-10 18:00:00 +0400
categories: [GMail, IMAP, Python]
description: "Hier j'ai eu besoin d'exporter les adresses courriel du GMail de mon partenaire pour les intégrer dans un nouveau CRM. Autant partager mon script avec vous!"
---

Aujourd'hui je vous partage un petit script pour exporter vos adresses 
courriel avec IMAP. Ce script marche pour GMail mais ne devrais pas 
poser de soucis avec les autres services de messagerie.

---

### Le problème ###

J'ai eu besoin d'exporter des adresses courriel du compte GMail de mon 
partenaire pour les intégrer sur notre nouveau CRM. Mon partenaire 
m'a envoyer [cet article](http://www.labnol.org/internet/extract-gmail-addresses/28037/) qu'il avais trouvé.

Non seulement le produit coute 30$ (ce que je considère du vol quand tu 
vois le niveau technique) pour faire l'export complet de vos courriels, 
mais en plus il n'exportent que les courriels et pas les noms associés 
si ils ont présent.

Je voudrais une solution gratuite, meilleur (export nom et prénom) et 
surtout qui marche sans google drive pour pouvoir la réutiliser!

### La solution ###

J'ai trouvé un script de base sur un forum qui faisait une 
connexion IMAP sur les serveurs de GMail afin de récupérer le contenu 
de votre boite mail. L'idée m'a beaucoup plus, j'ai donc décidé de le 
débugger et de l'améliorer pour faire ce que je voulais.

 - J'y ai ajouté des prompt pour la boite de courriel à inspecter et son 
mot de passe.

 - J'ai débuggé tout le script qui n'était plus à jour
 
 - J'ai mis en forme les data dans un fichier sous forme de CSV

Optimalement vous aimeriez pouvoir trier les adresses courriel et 
enlever le doublons. Mais moi je l'ai juste fait avec un feuille de 
calcul pour ne pas perdre plus de temps. Les adresses étant dans un 
array ce ne serais pas long de le faire, hésitez pas à me tenir à jour 
si vous le faite.


### Le code ### 


``` python
import imaplib, email
import getpass

def split_addrs(s):
    #split an address list into list of tuples of (name,address)
    if not(s): return []
    outQ = True
    cut = -1
    res = []
    for i in range(len(s)):
        if s[i]=='"': outQ = not(outQ)
        if outQ and s[i]==',':
            res.append(email.utils.parseaddr(s[cut+1:i]))
            cut=i
    res.append(email.utils.parseaddr(s[cut+1:i+1]))
    return res

userid = input("User ID: ")
password = getpass.getpass("Password:")
mail=imaplib.IMAP4_SSL('imap.gmail.com')
mail.login(userid,password)
mail.select("INBOX")
result,data=mail.search(None,"ALL")
ids=data[0].split()
for i in range(len(ids)):
	ids[i]=ids[i].decode('utf-8')

msgs = mail.fetch(','.join(ids),'(BODY.PEEK[HEADER])')[1][0::2]
for i in range(len(msgs)):
	msgs[i] = (msgs[i][0].decode('utf-8'), msgs[i][1].decode('utf-8'))

addr=[]
for x,msg in msgs:
    msgobj = email.message_from_string(msg)
    addr.extend(split_addrs(msgobj['to']))
    addr.extend(split_addrs(msgobj['from']))
    addr.extend(split_addrs(msgobj['cc']))

to_print = ""
for elem in addr:
	if '@' in elem[1]:
		to_print += elem[0].replace(',', ' ') + "," + elem [1].replace(',', '') + "\r\n"

f = open("extract.txt", "w")
f.write(to_print) #to file
```