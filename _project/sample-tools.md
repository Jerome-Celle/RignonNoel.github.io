---
layout: project_single
title:  "Outils d'échantillonage"
slug: "sample-tools"
---

* **Type** : Consultant, Passe-temps
* **Rôle** : Développeur
* **Technologies**: JavaScript

---

Ce projet a vu le jour durant l'un de mes travaux pour **HomeBeaver**, une startup montréalaise pour qui j'ai fait du consulting durant quelques mois.

Le principe était de pouvoir facilement créer des échantillons de données permettant de simuler un trafic d'eau pour tester un device en cours de développement.

Ce petit projet permet de :

 - **Dessiner une courbe** à la souris en disposant une série de points qui seront automatiquement relié
 - **Générer un échantillon** à partir de la courbe en fonction de constante que l'on défini préalablement
 - **Regrouper plusieurs données d'échantillonage** sur une timeline afin de produire une simulation pertinente

Le but était avant tout de disposer d'un outil léger et portable. Ce code source ne contient donc aucune dépendance afin de pouvoir s'éxécuter directement sur un raspberry pi disposant d'un browser mais pas d'internet.

Sur mon temps libre j'ai refais les interfaces et ajouter de l'aide contextuel afin de guider l'utilisateur.