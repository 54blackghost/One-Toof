"""
Configuration Django - Production.

Paramètres pour la production.
Sécurité maximale, optimisations, HTTPS, etc.
"""

from .base import *

# =============================================================================
# DEBUG - JAMAIS True en production
# =============================================================================

DEBUG = False

# =============================================================================
# ALLOWED HOSTS
# =============================================================================

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

if not ALLOWED_HOSTS or ALLOWED_HOSTS == ['']:
    raise ValueError(
        "ALLOWED_HOSTS must be set in production environment. "
        "Example: ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com"
    )

# =============================================================================
# SECURITY
# =============================================================================

# HTTPS
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# HSTS (HTTP Strict Transport Security)
SECURE_HSTS_SECONDS = 31536000  # 1 an
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Cookies sécurisés
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = 'Lax'

# Content Security Policy
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'

# =============================================================================
# DATABASE (Production optimizations)
# =============================================================================

DATABASES['default']['CONN_MAX_AGE'] = 600
DATABASES['default']['OPTIONS'] = {
    'connect_timeout': 10,
    'options': '-c statement_timeout=30000',  # 30 secondes max par query
}

# =============================================================================
# CACHES (Production - Redis recommandé)
# =============================================================================

# CACHES = {
#     'default': {
#         'BACKEND': 'django_redis.cache.RedisCache',
#         'LOCATION': os.getenv('REDIS_URL', 'redis://127.0.0.1:6379/1'),
#         'OPTIONS': {
#             'CLIENT_CLASS': 'django_redis.client.DefaultClient',
#         }
#     }
# }

# =============================================================================
# STATIC FILES (Production)
# =============================================================================

# Utiliser WhiteNoise pour servir les static files
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# =============================================================================
# LOGGING (Production - fichiers + sentry recommandé)
# =============================================================================

LOGGING['handlers']['error_file'] = {
    'class': 'logging.FileHandler',
    'filename': BASE_DIR / 'logs' / 'errors.log',
    'formatter': 'verbose',
    'level': 'ERROR',
}

LOGGING['root']['handlers'].append('error_file')

# =============================================================================
# REST FRAMEWORK (Production - JSON seulement)
# =============================================================================

REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = (
    'rest_framework.renderers.JSONRenderer',
)
