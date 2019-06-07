import tornado.web
import handlers.app

url_patterns = [
                (r'/Login', handlers.app.Login),
                (r'/Register', handlers.app.Register),
                (r'/InsertPoligon', handlers.app.InsertPoligon),
                (r'/EditPolygon', handlers.app.EditPolygon),
                (r'/DeletePolygon', handlers.app.DeletePolygon),
                (r'/loadAllMapPolygons', handlers.app.LoadAllMapPolygons),
                (r'/LoadAllEventsData', handlers.app.LoadAllEventsData),
                (r'/createAnalytics', handlers.app.CreateAnalytics),
                (r'/createAnalyticsChart', handlers.app.CreateAnalyticsChart),
                (r'/loadAnalyticsById', handlers.app.LoadAnalyticsById),
                (r'/loadDashboardsList', handlers.app.LoadDashboardsList),
                (r'/loadAnalyticsByUserId', handlers.app.LoadAnalyticsByUserId),
                (r'/deleteAnalyticsChartById', handlers.app.DeleteAnalyticsChartById)


               ]
