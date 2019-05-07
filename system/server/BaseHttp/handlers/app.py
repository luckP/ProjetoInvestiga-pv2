# -*- coding: utf-8 -*-
import tornado.web
import tornado.escape
import tornado.gen
import tornado.httpclient
from models import *
import json
# import motor

class Login(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def post(self):
        print(self.request.arguments)
        print('login')
        # FALTA VALIDAR O LOGIN E FAZER O RETURN DOS DADOS DO UTILIZADOR
        self.write('{"user_name": "test_user"}')
        self.finish()

    def get(self):
        # self.render('login/index.html')
        print(self.request.arguments)
        print('login')

# create user
class Register(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def post(self):
        print('Register')
        user_name = self.get_argument('user_name', None)
        user_email = self.get_argument('user_email', None)
        user_password = self.get_argument('user_password', None)

        try:
            user = User(user_name, user_email, user_password)
            self.application.db_session.add(user)
            self.application.db_session.flush()
            self.write('{"id": "'+str(user.id)+'"}');
            self.application.db_session.commit()
        except Exception as e:
            self.application.db_session.rollback()
            self.write('{"error": "insert"}')

        self.finish()


# POLYGONS
class InsertPoligon(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def post(self):
        name = self.get_argument('name', None)
        color = self.get_argument('color', None)
        status = int(self.get_argument('status', None))
        latlngs = json.loads(self.get_argument('latlngs', None))

        try:
            # id = self.application.db_session.query(Polygon).
            polygon = Polygon(name, color, status)

            self.application.db_session.add(polygon)
            self.application.db_session.flush()
            self.application.db_session.commit()
            id = polygon.id
            self.write('{"id": "'+str(id))
            self.insertCoordinate(latlngs, id)

        except Exception as e:
            self.application.db_session.rollback()
            print(str(e))
            self.write('{"error": "insert"}')

        self.finish()

    def insertCoordinate(self, latlngs, id):
        for index in range(len(latlngs)):
            polygon_coordinate = Polygon_coordinate(id, index, float(latlngs[index]['lat']), float(latlngs[index]['lng']))

            self.application.db_session.add(polygon_coordinate)
            self.application.db_session.flush()
            self.application.db_session.commit()
            self.write('{"id": "'+str(polygon_coordinate.id)+'"}')

# AINDA NAO IMPLEMENTADO
class EditPolygon(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def post(self):
        print('EditPolygon')
        id = int(self.get_argument('id', None))
        name = self.get_argument('name', None)
        color = self.get_argument('color', None)
        status = int(self.get_argument('status', None))

        try:
            # id = self.application.db_session.query(Polygon).
            polygon = Polygon(name, color, status)

            polygon = Polygon.query.filter_by(id=id).first()
            polygon.name = name
            polygon.color = color
            polygon.status = int(status)

            self.application.db_session.commit()
            self.write('{"id": "'+str(polygon.id)+'", "name": "'+polygon.name+'", "color": "'+polygon.color+'", "status": "'+str(polygon.status)+'"}');

        except Exception as e:
            self.application.db_session.rollback()
            print(str(e))
            self.write('{"error": "insert"}')

        self.finish()
# AINDA NAO IMPLEMENTADO
class DeletePolygon(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def post(self):
        print('DeletePolygon')
        id = self.get_argument('id', None)
        print('id: '+str(id))

        try:
            # id = self.application.db_session.query(Polygon).
            polygon = self.application.db_session.query(Polygon).filter_by(id=id).first()
            # polygon_coordinate_list = self.application.db_session.query(Polygon_coordinate).filter_by(id_polygon=id)
            # for p in polygon_coordinate_list:
            #     self.application.db_session.delete(p)

            # self.application.db_session.delete(polygon_coordinate_list)
            # self.application.db_session.commit()
            self.application.db_session.delete(polygon)
            self.application.db_session.commit()

            self.write('{"id": "'+str(id)+'"}')

        except Exception as e:
            self.application.db_session.rollback()
            print(str(e))
            self.write('{"error": "delete"}')

        self.finish()
