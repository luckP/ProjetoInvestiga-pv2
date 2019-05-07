#!/usr/bin/env python
import tornado.httpserver
import tornado.ioloop
import tornado.web
import settings
from tornado.options import options
from urls import url_patterns
import concurrent.futures
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
# from models import create_all

import logging
# DATABASE_URL = 'mysql+pymysql://root:a7085cLuc-@127.0.0.1/standsdb'
DATABASE_URL = 'mysql+pymysql://root:root@127.0.0.1:8889/standsdb'
# DATABASE_URL = 'mysql+mysqldb://geolink:supergeolink@geolink-web.cloudapp.net/standsdb'
# mysql+mysqldb://developer:superdeveloper@geolink@geolink-web.cloudapp.net
DATABASE_PORT= 3306
logging.basicConfig(filename='logs/http_server.log', level=logging.INFO)


class JSON(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


class TornadoWebApp(tornado.web.Application):
    def __init__(self):
        self.js = JSON()
        self.pool = concurrent.futures.ThreadPoolExecutor(max_workers=4)
        tornado.web.Application.__init__(self, url_patterns, **settings.settings)
        self.engine = create_engine(DATABASE_URL,
                                    pool_recycle=DATABASE_PORT)
        self.db_session = scoped_session(sessionmaker(self.engine))
        # create_all(self.engine)

def main():
    print 'server running'
    options.parse_command_line()
    app = TornadoWebApp()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    logging.info(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
