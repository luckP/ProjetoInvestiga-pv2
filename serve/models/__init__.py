from sqlalchemy import Boolean
import bcrypt
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import func, desc, case

Base = declarative_base()

class Users(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(45), nullable=False, unique=True)
    name = Column(String(45), nullable=False)
    password = Column(String(45), nullable=False)

    def __init__(self, email=None, name=None, password=None):
        self.email = email
        self.name = name
        # ERROR
        # self.set_password(password)
        self.password = password

    def set_password(self, pwd, salt=None):
        if salt is None:
            salt = bcrypt.gensalt()
        self.password = bcrypt.hashpw(pwd, salt)

class Squares(Base):
    __tablename__ = 'squares'
    id = Column(Integer, primary_key=True, autoincrement=True)
    # id_praca = Column(Integer, ForeignKey(praca.id), nullable=False)
    id_squares = Column(Integer, nullable=False)
    name = Column(String(45), nullable=False)
    name_concelho = Column(String(45), nullable=False)
    lotacao = Column(Integer, nullable=False)
    latitude = Column(Float, nullable=False) #Float
    longitude = Column(Float, nullable=False) #Float

    def __init__(self, id_squares=None, name=None, name_conselho=None, lotacao=None, latitude=None, longitude=None):
        self.id = id
        self.id_squares = id_squares
        self.name = name
        self.name_concelho = name_concelho
        self.lotacao = lotacao
        self.latitude = latitude
        self.longitude = longitude

class Events(Base):
    __tablename__ = 'events'
    id = Column(Integer, primary_key=True, autoincrement=True)
    type = Column(String(45), nullable=False)
    id_taxi = Column(Integer, nullable=False)
    id_square = Column(Integer, nullable=False)
    events_timestamp = Column(Integer)

    def __init__(self, type=None ,id_taxi=None ,id_square = None, events_timestamp=None):
        self.type = type
        self.id_taxi = id_taxi
        self.id_square = id_square
        self.events_timestamp = events_timestamp

class Polygons(Base):
    __tablename__ = 'polygons'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(45), nullable=False)
    color = Column(String(45), nullable=False)
    status = Column(Integer, nullable=False)

    def __init__(self, name=None, color=None, status=None):
        self.name = name
        self.color = color
        self.status = status

class Polygon_coordinate(Base):
    __tablename__ = 'polygon_coordinates'
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_polygon = Column(Integer, ForeignKey(Polygons.id), nullable=True)
    index = Column(Integer, nullable=True)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)

    def __init__(self, id_polygon=None, index=None, lat=None, lng=None):
        self.id_polygon=id_polygon
        self.index=index;
        self.lat=lat
        self.lng=lng

# Analytics

class Analytics(Base):
    __tablename__ = 'analytics'
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey(Users.id), nullable=True)
    name = Column(String(45), nullable=True)

    def __init__(self, name=None, id_user=None):
        self.name=name
        self.id_user = id_user

class Analytics_chart(Base):
    __tablename__ = 'analytics_chart'
    id = Column(Integer, primary_key=True, autoincrement=True)
    analytics_id = Column(Integer, ForeignKey(Polygons.id), nullable=True)
    title = Column(String(45), nullable=True)
    subtitle = Column(String(100), nullable=True)
    chartSize = Column(String(45), nullable=True)
    lock = Column(Integer, nullable=True)
    chartType = Column(String(45), nullable=True)
    analytics_chart_timestamp = Column(Integer, nullable=True)
    square_id = Column(Integer, nullable=True)
    position_index = Column(Integer, nullable=True)
    show_legends = Column(Integer, nullable=True)
    smart = Column(Integer, nullable=True)

    def __init__(self, analytics_id, title, subtitle, chartSize, lock, chartType, analytics_chart_timestamp, square_id, position_index, show_legends, smart ):
        self.analytics_id = analytics_id
        self.title = title
        self.subtitle = subtitle
        self.chartSize = chartSize
        self.lock = lock
        self.chartType = chartType
        self.analytics_chart_timestamp = analytics_chart_timestamp
        self.square_id = square_id
        self.position_index = position_index
        self.show_legends = show_legends
        self.smart = smart

class Dashboards(Base):
    __tablename__ = 'dashboards'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(Users.id), nullable=True)
    name = Column(String(45), nullable=True)

    def __init__(self, name=None, id_user=None):
        self.name=name
        self.id_user = id_user


# def create_all(engine):
#     Base.metadata.create_all(engine)







# class User(Base):
#     __tablename__ = 'users'
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     email = Column(String(75), nullable=False, unique=True)
#     name = Column(String(100, convert_unicode=True), nullable=False, default="")
#     password = Column(String(128, convert_unicode=True), nullable=False)
#     is_admin = Column(Boolean, nullable=False, default=False)
#     user_type = Column(String(25), nullable=False)
#
#     def __init__(self, email=None, password=None, name="", is_admin=False, user_type=""):
#         self.email = email
#         self.set_password(password)
#         self.name = name
#         self.is_admin = is_admin
#         self.user_type = user_type
#
#     def set_password(self, pwd, salt=None):
#         if salt is None:
#             salt = bcrypt.gensalt()
#         self.password = bcrypt.hashpw(pwd, salt)
#
#     def valid_password(self, pwd, h=None):
#         if h is None:
#             hh = self.password
#         else:
#             hh = h
#         try:
#             return hh == bcrypt.hashpw(pwd, hh)
#         except TypeError:
#             return hh == bcrypt.hashpw(pwd.encode('utf-8'), hh.encode('utf8'))
#
#     def __repr__(self):
#         return "<User('%s', '%s', '%s')>" % (self.email, self.name, self.user_type)
