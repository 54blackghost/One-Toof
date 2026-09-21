"""
Configuration Django - Development.

Paramètres pour le développement local.
Active le debug, les outils de développement, etc.
"""

from .base import *

# =============================================================================
# DEBUG
# =============================================================================

DEBUG = True

# =============================================================================
# ALLOWED HOSTS
# =============================================================================

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

# =============================================================================
# INSTALLED APPS (Development)
# =============================================================================

INSTALLED_APPS += [
    'debug_toolbar',  # Django Debug Toolbar (si installé)
]

# =============================================================================
# MIDDLEWARE (Development)
# =============================================================================

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

# =============================================================================
# INTERNAL IPS (pour Debug Toolbar)
# =============================================================================

INTERNAL_IPS = [
    '127.0.0.1',
    'localhost',
]

# =============================================================================
# REST FRAMEWORK (Development overrides)
# =============================================================================

REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = (
    'rest_framework.renderers.JSONRenderer',
    'rest_framework.renderers.BrowsableAPIRenderer',  # Interface navigable en dev
)

# =============================================================================
# EMAIL (Development - console backend)
# =============================================================================

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# =============================================================================
# CACHES (Development - dummy cache)
# =============================================================================

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}
