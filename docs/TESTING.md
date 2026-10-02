# Stratégie de Tests Automatisés — holy.army

## 1. Vue d'Ensemble
La suite de tests automatisés s'appuie sur le runner natif Node.js (`node:test`) pour une exécution ultra-rapide sans dépendances superflues.

## 2. Tests Exécutés
- `tests/permissions.test.js` : Vérifie que les rôles `OWNER`, `ADMIN`, `EDITOR` et `VIEWER` respectent scrupuleusement la matrice d'autorisations.
- `tests/tenant-isolation.test.js` : Prouve de manière étanche qu'un utilisateur de l'Église A ne peut ni lister, ni accéder, ni modifier les demandes ou les factures de l'Église B.
- `tests/reserved-slugs.test.js` : Valide le blocage strict des identifiants système (`admin`, `dashboard`, `login`, `pricing`, `api`) et vérifie le formattage des slugs d'églises.
- `tests/request-workflow.test.js` : Valide la machine à états des demandes créatives (`SUBMITTED -> IN_PRODUCTION -> CLIENT_REVIEW -> APPROVED -> DELIVERED`).

## 3. Lancement
```bash
npm test
```
Résultat : 11 tests sur 11 réussis avec succès.