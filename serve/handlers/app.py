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
            if user and user.password != data['password']:
                self.set_status(401)
            else:
                resp = {'user': {'id': str(user.id), 'name': user.name, 'email': user.email, 'password': user.password }}
                self.write(resp)

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
            user = Users(name=user_name, email=user_email, password=user_password)
            self.application.db_session.add(user)
            self.application.db_session.flush()

            analytics = Analytics(name='Main Analytics', id_user=user.id)
            self.application.db_session.add(analytics)

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

# dashboards
class LoadDashboardsList(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        print ("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        print 'OPTIONS LoadDashboardsList'
        self.finish()

    def post(self):
        print('POST LoadDashboardsList')
        # data = json.loads(self.request.body)
        try:
            dashboards = self.application.db_session.query(Dashboards).all()
            resp = json.dumps([{'id': dashboard.id, 'name': dashboard.name} for dashboard in dashboards])
            self.write(resp)
        except Exception as e:
            self.application.db_session.rollback()
            print e
            self.write('{"error": "LoadDashboardsList"}')

        self.finish()

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
        print data
        try:
            analyticsList = self.application.db_session.query(Analytics).filter(Analytics.id_user==data['id']).all()
            if not analyticsList:
                analytics = Analytics(data['name'], 'Main Analytics')
                analyticsList = self.application.db_session.query(Analytics).filter(Analytics.id_user==data['id']).all()
            resp = json.dumps([{'id': analytics.id, 'name': analytics.name} for analytics in analyticsList])
            self.write(resp)
        except Exception as e:
            self.application.db_session.rollback()
            self.write('{"error": "insert LoadAnalyticsByUserId"}')
            print e
        self.finish()

class LoadAnalyticsById(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        print ("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        print 'OPTIONS LoadAnalyticsById'
        self.finish()

    def post(self):
        print('POST LoadAnalyticsById')
        data = json.loads(self.request.body)

        try:
            print 'teste'
            analytics = self.application.db_session.query(Analytics).filter(Analytics.id==data['id']).first()
            analytics_charts = self.application.db_session.query(Analytics_chart).filter(Analytics_chart.analytics_id==data['id']).all()
            resp = json.dumps({'analytics':{'id': analytics.id, 'name': analytics.name}, 'charts': [{'id': a.id, 'analytics_id': a.analytics_id, 'title': a.title, 'subtitle': a.subtitle, 'analytics_chart_timestamp': a.analytics_chart_timestamp, 'square_id': a.square_id, 'lock': a.lock, 'position_index': a.position_index, 'chartSize': a.chartSize, 'chartType': a.chartType, 'show_legends': a.show_legends, 'smart': a.smart} for a in analytics_charts]})
            self.write(resp)


        # id = Column(Integer, primary_key=True, autoincrement=True)
        # analytics_id = Column(Integer, ForeignKey(Polygons.id), nullable=True)
        # title = Column(String(45), nullable=True)
        # subtitle = Column(String(100), nullable=True)
        # chartSize = Column(Integer, nullable=True)
        # lock = Column(Integer, nullable=True)
        # chartType = Column(String(45), nullable=True)
        # analytics_chart_timestamp = Column(Integer, nullable=True)
        # square_id = Column(Integer, nullable=True)
        # position_index = Column(Integer, nullable=True)
        # show_legends = Column(Integer, nullable=True)
        # smart = Column(Integer, nullable=True)




        except Exception as e:
            self.set_status(500)
            self.application.db_session.rollback()
            print e
            self.write('{"error": "LoadAnalyticsById"}')
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
            analytics_chart = Analytics_chart(analytics_id=data['analytics_id'], title=data['title'], subtitle=data['subtitle'], chartSize=data['chartSize'], lock=data['lock'], chartType=data['chartType'], analytics_chart_timestamp=data['analytics_chart_timestamp'], square_id=data['square_id'], position_index=data['position_index'],  show_legends=data['show_legends'], smart=data['smart'])
            self.application.db_session.add(analytics_chart)
            self.application.db_session.flush()
            # self.write({'id': analytics_chart.id, 'analytics_id': analytics_chart.analytics_id, 'title': analytics_chart.title, 'subtitle': analytics_chart.subtitle, 'analytics_chart_timestamp': analytics_chart.analytics_chart_timestamp, 'square_id': analytics_chart.square_id, 'lock': analytics_chart.lock, 'position_index': analytics_chart.position_index, 'chartSize': analytics_chart.chartSize, 'chartType': analytics_chart.chartType, 'show_legends': analytics_chart.show_legends, 'smart': a.smart})
            self.write({'id': analytics_chart.id})
            self.application.db_session.commit()
            # self.write({'ok':'ok'})
        except Exception as e:
            self.application.db_session.rollback()
            self.write('{"error": "CreateAnalyticsChart"}')
            print e
        self.finish()

class DeleteAnalyticsChartById(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        print ("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        print 'OPTIONS DeleteAnalyticsChartById'
        self.finish()

    def post(self):
        print('POST DeleteAnalyticsChartById')
        data = json.loads(self.request.body)
        try:
            analytics_chart = self.application.db_session.query(Analytics_chart).filter(Analytics_chart.id==data['id']).first()
            self.application.db_session.delete(analytics_chart)
            self.application.db_session.commit()

        except Exception as e:
            self.application.db_session.rollback()
            self.write('{"error": "DeleteAnalyticsChartById"}')
            print e
        self.finish()

class EditAnalyticsChartById(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        print ("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        print 'OPTIONS EditAnalyticsChartById'
        self.finish()

    def post(self):
        print('POST EditAnalyticsChartById')
        data = json.loads(self.request.body)
        print data
        try:
            analytics_chart = self.application.db_session.query(Analytics_chart).filter(Analytics_chart.id==data['id']).first()
            analytics_chart.analytics_id = data['analytics_id']
            analytics_chart.title = data['title']
            analytics_chart.subtitle = data['subtitle']
            analytics_chart.chartSize = data['chartSize']
            analytics_chart.lock = data['lock']
            analytics_chart.chartType = data['chartType']
            analytics_chart.analytics_chart_timestamp = data['analytics_chart_timestamp']
            analytics_chart.square_id = data['square_id']
            analytics_chart.position_index = data['position_index']
            analytics_chart.show_legends = 0 if data['show_legends'] else 1
            analytics_chart.smart = data['smart']

            print data['show_legends']

            self.application.db_session.commit()

        except Exception as e:
            self.application.db_session.rollback()
            self.set_status(500)
            self.write('{"error": "EditAnalyticsChartById"}')
            print e
        self.finish()
