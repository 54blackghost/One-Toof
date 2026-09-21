"""
Configuration Django - Testing.

Paramètres pour l'exécution des tests.
Base de données en mémoire, pas d'emails, logs minimaux, etc.
"""

from .base import *

# =============================================================================
# DEBUG
# =============================================================================

DEBUG = False

# =============================================================================
# SECRET KEY (test uniquement)
# =============================================================================

SECRET_KEY = 'test-secret-key-not-for-production-use-only-in-tests'

# =============================================================================
# DATABASE (SQLite en mémoire pour rapidité)
# =============================================================================

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    }
}

# =============================================================================
# PASSWORD HASHERS (plus rapide pour les tests)
# =============================================================================

PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]

# =============================================================================
# EMAIL (pas d'envoi en test)
# =============================================================================

EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

# =============================================================================
# CACHES (dummy cache)
# =============================================================================

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

# =============================================================================
# LOGGING (minimal)
# =============================================================================

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'handlers': {
        'null': {
            'class': 'logging.NullHandler',
        },
    },
    'root': {
        'handlers': ['null'],
    },
}
