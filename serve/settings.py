import tornado
import tornado.template
from tornado.options import define, options
import os

# SERVER DOMAIN
# WEBSERVER_DOMAIN = '192.168.1.10'
WEBSERVER_DOMAIN = 'localhost'

# defining some command arguments
define("port", default=8010, help="run on the given port", type=int)

# Make filepaths relative to settings.
path = lambda root, *a: os.path.join(root, *a)
ROOT = os.path.dirname(os.path.abspath(__file__))

MEDIA_ROOT = path(ROOT, 'media')
path_templates = '../../../SitePrj_1/pages'
TEMPLATE_ROOT = path(ROOT, path_templates)
tornado_path = os.path.join(os.path.dirname(__file__), path_templates)
static_path = os.path.join(os.path.dirname(__file__), path_templates)

settings = {}
settings['debug'] = True
# settings['ui_modules'] = uimodules
settings['static_path'] = MEDIA_ROOT
settings['template_path'] = TEMPLATE_ROOT

# Generate a new cookie_secret for each HTTP Server
settings['cookie_secret'] = "PChu9QAEQcedbiiSMiRNyUcnBXB6TUdkojWlZgLdtMM="

settings['login_url'] = "/login/"
settings['template_loader'] = tornado.template.Loader(TEMPLATE_ROOT)
settings['template_loader'] = tornado.template.Loader(TEMPLATE_ROOT)

# Email settings
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_SENDER = '....@geolink.pt'
EMAIL_PASSWORD = '....'
