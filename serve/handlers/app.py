# -*- coding: utf-8 -*-
import tornado.web
import tornado.escape
import tornado.gen
import tornado.httpclient
from models import *
import json
import pandas as pd
import time
# import motor

class Login(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def options(self):
        print('OPTIONS Login')
        self.finish()

    def post(self):
        # print(self.request.arguments)
        print('POST Login')
        # FALTA VALIDAR O LOGIN E FAZER O RETURN DOS DADOS DO UTILIZADOR
        self.write('{"user_name": "test_user"}')
        self.finish()

    def get(self):
        # self.render('login/index.html')
        print(self.request.arguments)
        print('GET Login')

# create user
class Register(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        print ("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        print 'OPTIONS register'
        self.finish()

    def post(self):
        print('POST Register')
        data = json.loads(self.request.body)

        # OLD
        # user_name = self.get_argument('user_name', None)
        # user_email = self.get_argument('user_email', None)
        # user_password = self.get_argument('user_password', None)

        user_name = data['name']
        user_email = data['email']
        user_password = data['password']

        try:
            user = Users(user_name, user_email, user_password)
            self.application.db_session.add(user)
            self.application.db_session.flush()
            self.write('{"id": "'+str(user.id)+'", "name": "'+ user.name +'", "email": "'+ user.email +'"}')
            self.application.db_session.commit()
            # print(user_name)
        except Exception as e:
            self.application.db_session.rollback()
            print e
            self.write('{"error": "insert"}')

        self.finish()

# POLYGONS
class InsertPoligon(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def options(self):
        print "OPTIONS InsertPoligon"
        self.finish()

    def post(self):
        print "POST InsertPoligon"
        name = self.get_argument('name', None)
        color = self.get_argument('color', None)
        status = int(self.get_argument('status', None))
        latlngs = json.loads(self.get_argument('latlngs', None))

        try:
            # id = self.application.db_session.query(Polygon).
            polygon = Polygons(name, color, status)

            self.application.db_session.add(polygon)
            self.application.db_session.flush()
            self.application.db_session.commit()
            id = polygons.id
            self.write('{"id": "'+str(id))
            self.insertCoordinate(latlngs, id)

        except Exception as e:
            self.application.db_session.rollback()
            print(str(e))
            self.write('{"error": "insert"}')

        self.finish()

    def insertCoordinate(self, latlngs, id):
        for index in range(len(latlngs)):
            polygon_coordinate = Polygon_coordinates(id, index, float(latlngs[index]['lat']), float(latlngs[index]['lng']))

            self.application.db_session.add(polygon_coordinate)
            self.application.db_session.commit()


class EditPolygon(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def options(self):
        print "OPTIONS EditPolygon"
        self.finish()

    def post(self):
        print('PSOT EditPolygon')
        id = int(self.get_argument('id', None))
        latlngs = json.loads(self.get_argument('latlngs', None))[0]

        try:
            self.deleteCoordinate(id)
            self.insertCoordinate(latlngs, id)

        except Exception as e:
            self.application.db_session.rollback()
            print(str(e))
            self.write('{"error": "insert"}')

        self.finish()

    def insertCoordinate(self, latlngs, id):
        for index in range(len(latlngs)):
            polygon_coordinate = Polygon_coordinates(id, index, float(latlngs[index]['lat']), float(latlngs[index]['lng']))
            self.application.db_session.add(polygon_coordinate)
            self.application.db_session.commit()
            print(index)

    def deleteCoordinate(self, id):
        # Polygon_coordinate.query.filter_by(polygon_id = id).delete()
        obj = Polygon_coordinates.__table__.delete().where(Polygon_coordinates.id_polygon.in_([id]))
        self.application.db_session.execute(obj)
        self.application.db_session.commit()


class DeletePolygon(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def options(self):
        print('OPTIONS DeletePolygon')
        self.finish()

    def post(self):
        print('POST DeletePolygon')
        id = self.get_argument('id', None)
        print('id: '+str(id))

        try:
            obj = Polygons.__table__.delete().where(Polygons.id.in_([id]))
            self.application.db_session.execute(obj)
            self.application.db_session.commit()

        except Exception as e:
            self.application.db_session.rollback()
            print(str(e))
            self.write('{"error": "delete"}')

        self.finish()

class LoadAllMapPolygons(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def options(self):
        self.finish()

    def post(self):
        print('LoadAllMapPolygons')
        try:
            # SELECT * FROM standsdb.polygon INNER JOIN standsdb.polygon_coordinate on standsdb.polygon_coordinate.id_polygon = standsdb.polygon .id;
            polygons = self.application.db_session.query(Polygons).all()
            polygon_coordinates = self.application.db_session.query(Polygon_coordinates).all()
            response_polygons = {}
            response_polygons_coordinates = {}
            count = 1
            for polygon in polygons:
                 response_polygons[count] = { 'id': polygon.id, 'name': polygon.name, 'color': polygon.color}
                 count+=1

            count = 1
            for polygon_coordinate in polygon_coordinates:
                 response_polygons_coordinates[count] = { 'id': polygon_coordinate.id, 'id_polygon': polygon_coordinate.id_polygon, 'index': polygon_coordinate.index, 'lat': polygon_coordinate.lat, 'lng': polygon_coordinate.lng}
                 count+=1

            self.write({'response_polygons': response_polygons, 'response_polygons_coordinates': response_polygons_coordinates})
            self.finish()

        except Exception as e:
            print(e)
#

class LoadAllEventsData(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def options(self):
        self.finish()

    def post(self):
        print('LoadAllEventsData')
        try:
            resp = {}
            # df = pd.DataFrame(self.application.db_session.query(Event).all())

            # st = time.time()
            # resp['num_rows_total'] = self.application.db_session.query(Event).count()
            # print (time.time() - st)
            # et = time.time()
            # distinct_types = self.application.db_session.query(Event.tipo).distinct().all()
            # for type in distinct_types:
            #     resp['num_'+type[0]] = distinct_types = self.application.db_session.query(Event).filter(Event.tipo == type).count()
            #     print type[0]





            # timestamp_day = 86400
            # ts =  int(time.time()) - (169 * timestamp_day)
            # list = []
            #
            # for i in range(100):
            #     tsi = ts - timestamp_day
            #     rows = self.application.db_session.query(Event).filter( Event.timestamp.between(tsi , ts) ).all()
            #     print str(i) + ':'
            #
            #     for row in rows:
            #         list+= [{'id': row.id, 'tipo': row.tipo, 'id_taxi': row.id_taxi, 'id_praca': row.id_praca, 'timestamp': row.timestamp }]
            #
            #     ts = tsi
            # df = pd.DataFrame(list)
            # df.to_csv(r'df.csv')
            # print df
            # resp = '{}'



            # et2 = time.time()
            # self.write(resp)
            # print(time.time() - et2)
            resp = {}

            ts = time.time();
            df = pd.read_sql(self.application.db_session.query(Events).statement, self.application.db_session.bind)
            df.to_csv(r'df.csv')
            # df = pd.read_csv('./df.csv');


            ts = time.time();
            df = pd.read_sql(self.application.db_session.query(Events).statement, self.application.db_session.bind)
            print df
            print time.time() - ts

            self.finish()

        except Exception as e:
            self.finish()
            print(e)
