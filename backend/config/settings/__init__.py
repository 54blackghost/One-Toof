"""
Configuration Django - Auto-detection de l'environnement.

Ce fichier charge automatiquement les paramètres appropriés selon
la variable d'environnement DJANGO_ENVIRONMENT.

Environnements supportés:
    - development (default)
    - production
    - testing

Usage:
    Dans manage.py et wsgi.py/asgi.py, Django cherche config.settings
    et ce fichier redirige vers le bon module.

Exemple dans .env:
    DJANGO_ENVIRONMENT=production
"""

import os

# Détection de l'environnement
environment = os.getenv('DJANGO_ENVIRONMENT', 'development')

# Import des settings appropriés
if environment == 'production':
    from .production import *
elif environment == 'testing':
    from .testing import *
else:
    from .development import *

# Affichage de l'environnement chargé (utile pour debug)
print(f" Django running in: {environment.upper()} mode")
