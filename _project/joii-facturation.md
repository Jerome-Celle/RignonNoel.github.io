---
layout: project_single
title:  "API interne de Joii"
slug: "joii-facturation"
---

* **Type** : Salarié, Partenaire
* **Rôle** : Directeur technique, Développeur
* **Technologies**: Django, Python, Django-Rest-Framework, Stripe

---

**L'API interne de Joii sert principalement à deux choses:**

* La facturation
* La gestion des droits d'accès aux différents portails de Joii

Cette API est donc utilisé par tout les portails de Joii.

L'API est en partie synchronisé avec Stripe.com (via des signaux Django) afin de gérer efficacement les données bancaires des consommateurs.