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
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        print('OPTIONS Login')
        self.finish()

    def post(self):
        print('POST Login')
        data = json.loads(self.request.body)

        try:
            user = self.application.db_session.query(Users).filter(Users.email==data['email']).first()
            if user.password != data['password']:
                self.set_status(401)
            else:
                resp = '{'
                resp += '"user": {"id": "'+str(user.id)+'", "name": "'+user.name+'", "email": "'+user.email+'", "password": "'+user.password+'"},'

                analyticsList = self.application.db_session.query(Analytics).filter(Analytics.id_user==user.id).all()
                resp += '"analyticsList": ' + json.dumps( [ {'id': analytics.id, 'name': analytics.name} for analytics in analyticsList])

                resp += '}'

                print resp
                self.write(resp)
                # self.write(resp)

        except Exception as e:
            print e

        # FALTA VALIDAR O LOGIN E FAZER O RETURN DOS DADOS DO UTILIZADOR
        self.finish()


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

            # et2 = time.time()
            # self.write(resp)
            # print(time.time() - et2)
            resp = {}

            ts = time.time();
            # df = pd.read_sql(self.application.db_session.query(Events).statement, self.application.db_session.bind)
            # df.to_csv(r'df.csv')
            # df = pd.read_sql(self.application.db_session.query(Events).statement, self.application.db_session.bind)
            df = pd.read_csv('./df.csv');

            print df
            print time.time() - ts

            self.finish()

        except Exception as e:
            self.finish()
            print(e)

# Analytics
class CreateAnalytics(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        print ("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        print 'OPTIONS CreateAnalytics'
        self.finish()

    def post(self):
        print('POST CreateAnalytics')
        data = json.loads(self.request.body)

        # user_name = data['name']

        try:
            analytics = Analytics(data['name'], data['id_user'])

            # analyticsExist = self.application.db_session.query(Analytics).filter(Analytics.name==data['name']).first()
            # if analyticsExist:
            #     self.set_status(401)
            # else:
            self.application.db_session.add(analytics)
            self.application.db_session.flush()
            self.write('{"id": "'+str(analytics.id)+'", "name": "'+ analytics.name +'"}')
            self.application.db_session.commit()
            # print(user_name)
        except Exception as e:
            self.application.db_session.rollback()
            print e
            self.write('{"error": "insert analytics"}')

        self.finish()

class LoadAnalyticsByUserId(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        print ("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        print 'OPTIONS LoadAnalyticsByUserId'
        self.finish()

    def post(self):
        print('POST LoadAnalyticsByUserId')
        data = json.loads(self.request.body)
        try:
            analyticsList = self.application.db_session.query(Analytics).filter(Analytics.id_user==data['id_user']).all()
            resp = json.dumps({{'id': analytics.id, 'name': analytics.name} for analytics in analyticsList})
            self.write(resp)
            # print(user_name)
        except Exception as e:
            self.application.db_session.rollback()
            print e
            self.write('{"error": "insert analytics"}')

        self.finish()


# Analytics Chart
class CreateAnalyticsChart(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        print ("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        print 'OPTIONS CreateAnalyticsChart'
        self.finish()

    def post(self):
        print('POST CreateAnalyticsChart')
        data = json.loads(self.request.body)
        try:
            analytics_chart = Analytics_chart(analytics_id=data['analytics_id'], title=data['title'], description=data['description'], analytics_chart_timestamp=data['analytics_chart_timestamp'], square_id=data['square_id'], edit_mode=data['edit_mode'], position_index=data['position_index'], size=data['size'], type=data['type'], show_legends=data['show_legends'], smart=data['smart'])

            # if analyticsExist:
            #     self.set_status(401)
            # else:
            self.application.db_session.add(analytics_chart)
            self.application.db_session.flush()
            self.write('{"id": "ok"}')
            self.application.db_session.commit()
            # print(user_name)
        except Exception as e:
            self.application.db_session.rollback()
            print e
            self.write('{"error": "insert analytics"}')

        self.finish()
