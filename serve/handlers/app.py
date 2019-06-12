# -*- coding: utf-8 -*-
import tornado.web
import tornado.escape
import tornado.gen
import tornado.httpclient
from models import *
import json
import pandas as pd
from pandas import Index
from numpy import arange
import time
import sys
import collections
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
class InsertSquare(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        print "OPTIONS InsertSquare"
        self.finish()

    def post(self):
        print "POST InsertSquare"
        data = json.loads(self.request.body)

        try:
            # print data
            square = Square(name=data['name'], color=data['color'], status=data['status'])
            self.application.db_session.add(square)
            self.application.db_session.flush()

            self.insertCoordinate(data['layer'], square.id)
            self.application.db_session.commit()

            resp = {square.id: {'id': square.id, 'name': square.name, 'color': square.color, 'status': square.status, 'coors': [  [square_coordinates.lat, square_coordinates.lng] for square_coordinates in self.application.db_session.query(Square_coordinates).filter(Square_coordinates.id_square==square.id).all()]}}
            self.write(resp)

        except Exception as e:
            self.set_status(500)
            self.application.db_session.rollback()
            print(str(e))
            self.write({'error': 'insert'})

        self.finish()

    def insertCoordinate(self, latlngs, id):
        for index in range(len(latlngs)):
            square_coordinate = Square_coordinates(id_square=id, index=index, lat=float(latlngs[index]['lat']), lng=float(latlngs[index]['lng']))
            self.application.db_session.add(square_coordinate)
        # self.application.db_session.commit()


class EditSquare(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def options(self):
        print "OPTIONS EditSquare"
        self.finish()

    def post(self):
        print('PSOT EditSquare')
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
            square_coordinate = Square_coordinates(id, index, float(latlngs[index]['lat']), float(latlngs[index]['lng']))
            self.application.db_session.add(square_coordinate)
            self.application.db_session.commit()
            print(index)

    def deleteCoordinate(self, id):
        # Polygon_coordinate.query.filter_by(polygon_id = id).delete()
        obj = Square_coordinates.__table__.delete().where(Square_coordinates.id_square.in_([id]))
        self.application.db_session.execute(obj)
        self.application.db_session.commit()


class DeleteSquare(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def options(self):
        print('OPTIONS DeleteSquare')
        self.finish()

    def post(self):
        print('POST DeleteSquare')
        id = self.get_argument('id', None)
        print('id: '+str(id))

        try:
            obj = Square.__table__.delete().where(Square.id.in_([id]))
            self.application.db_session.execute(obj)
            self.application.db_session.commit()

        except Exception as e:
            self.application.db_session.rollback()
            print(str(e))
            self.write('{"error": "delete"}')

        self.finish()

class LoadAllMapSquares(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine
    # @tornado.web.authenticated

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        self.finish()

    def post(self):
        print('LoadAllMapSquare')
        try:
            # SELECT * FROM standsdb.polygon INNER JOIN standsdb.polygon_coordinate on standsdb.polygon_coordinate.id_polygon = standsdb.polygon .id;
            squares = self.application.db_session.query(Square).all()

            resp = {square.id: {'id': square.id, 'name': square.name, 'color': square.color, 'status': square.status, 'coors': [  [square_coordinates.lat, square_coordinates.lng] for square_coordinates in self.application.db_session.query(Square_coordinates).filter(Square_coordinates.id_square==square.id).all()]} for square in squares }
            self.write(resp)

        except Exception as e:
            self.set_status(500)
            print(e)
#
        self.finish()

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
            analytics = self.application.db_session.query(Analytics).filter(Analytics.id==data['id']).first()
            analytics_charts = self.application.db_session.query(Analytics_chart).filter(Analytics_chart.analytics_id==data['id']).all()
            resp = json.dumps({'analytics':{'id': analytics.id, 'name': analytics.name}, 'charts': [{'id': a.id, 'analytics_id': a.analytics_id, 'title': a.title, 'subtitle': a.subtitle, 'analytics_chart_timestamp': a.analytics_chart_timestamp, 'square_id': a.square_id, 'lock': a.lock, 'position_index': a.position_index, 'chartSize': a.chartSize, 'chartType': a.chartType, 'show_legends': a.show_legends, 'smart': a.smart, 'time_window': a.time_window} for a in analytics_charts]})
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
            analytics_chart = Analytics_chart(analytics_id=data['analytics_id'], title=data['title'], subtitle=data['subtitle'], chartSize=data['chartSize'], lock=data['lock'], chartType=data['chartType'], analytics_chart_timestamp=data['analytics_chart_timestamp'], square_id=data['square_id'], position_index=data['position_index'],  show_legends=data['show_legends'], smart=data['smart'], time_window=data['time_window'])
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
            analytics_chart.time_window = int(data['time_window'])

            self.application.db_session.commit()

        except Exception as e:
            self.application.db_session.rollback()
            self.set_status(500)
            self.write('{"error": "EditAnalyticsChartById"}')
            print e
        self.finish()



class LoadAnalyticsChartDataById(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.engine

    def set_default_headers(self):
        print ("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')

    def options(self):
        print 'OPTIONS LoadAnalyticsChartDataById'
        self.finish()

    def post(self):
        print('POST LoadAnalyticsChartDataById')
        data = json.loads(self.request.body)
        print data
        try:
            seg_val = 60*data['time_window'] #data['time_window']*
            day_val = 60*60*24 #day
            event_type = 'out'
            max_timestamp = 1541289582

            df = pd.read_sql(self.application.db_session.query(Events).filter(Events.id_square==data['square_id']).statement, self.application.db_session.bind)
            df = df[['type', 'events_timestamp']]

            # df['day'] = df['events_timestamp'].apply(lambda val: int(val/86400)*86400)
            df['day'] = df['events_timestamp'].apply(lambda val: int(val/day_val)*day_val)
            df['events_timestamp'] = df['events_timestamp'].apply(lambda val: int(val/seg_val)*seg_val)
            df['type'] = df['type'].apply(lambda val: 'in' if val in ['regeitado', 'pause'] else 'out' if val in ['recolha', 'busy'] else 'out_error' )

            df_select = df[df['day'] == data['analytics_chart_timestamp']]

            df_select = df_select[df_select['type'] == event_type].groupby('events_timestamp').count().reset_index()
            new_index = Index(arange(df_select.iloc[0]['events_timestamp'],df_select.iloc[0]['events_timestamp']+day_val, seg_val) , name="events_timestamp")
            df_select = df_select.set_index('events_timestamp').reindex(new_index, fill_value=0).reset_index()

            # print df_select

            index_min_df = 0
            val_min_df = sys.maxint
            df_error =  df_select.set_index('events_timestamp').reindex(new_index, fill_value=0).reset_index()
            df_prediction = df_select.set_index('events_timestamp').reindex(new_index, fill_value=0).reset_index()
            try:
                for day in df['day'].unique():
                    df_check = df[df['day'] == day]
                    df_check = df_check[df_check['type'] == event_type].groupby('events_timestamp').count().reset_index()
                    new_index2 = Index(arange(df_check.iloc[0]['events_timestamp'],df_check.iloc[0]['events_timestamp']+day_val, seg_val) , name="events_timestamp")
                    df_check = df_check.set_index('events_timestamp').reindex(new_index2, fill_value=0).reset_index()

                    result = df_check.sub(df_select, fill_value=0)
                    result = result.abs()
                    value = result['type'].sum()
                    # print value
                    if value < val_min_df and df_check['type'].sum()!=0 and day != data['analytics_chart_timestamp']:
                        print df_check['type'].sum()
                        index_min_df = day
                        val_min_df = value
                        df_error = result
                        df_prediction = df_check
            except Exception as e:
                print e

            original =  json.loads(df_select['type'].to_json()).values()
            prediction = json.loads(df_prediction['type'].to_json()).values()
            error_val = json.loads(df_error['type'].to_json()).values()

            resp = {'data': [{ 'data': original, 'label': 'Original' },{ 'data': prediction, 'label': 'Prediction' }, {'data': error_val, 'label': 'Error'}], 'labels': [ i for i in range(len(original))]}
            # resp = {'data': [{ 'data': [65, 59, 80, 81, 56, 55, 40], 'label': 'Series A' },{ 'data': [28, 48, 40, 19, 86, 27, 90], 'label': 'Series B' },{ 'data': [180, 480, 770, 90, 1000, 270, 400], 'label': 'Series C'}], 'labels': ['January', 'February', 'March', 'April', 'May', 'June', 'July']}

            self.write(resp)

        except Exception as e:
            self.set_status(500)
            self.write('{"error": "LoadAnalyticsChartDataById"}')
            print e
        self.finish()
