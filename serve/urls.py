import tornado.web
import handlers.app

url_patterns = [
                (r'/Login', handlers.app.Login),
                (r'/Register', handlers.app.Register),

                (r'/insertSquare', handlers.app.InsertSquare),
                (r'/editSquare', handlers.app.EditSquare),
                (r'/deleteSquare', handlers.app.DeleteSquare),
                (r'/loadAllMapsquares', handlers.app.LoadAllMapSquares),

                (r'/LoadAllEventsData', handlers.app.LoadAllEventsData),
                (r'/createAnalytics', handlers.app.CreateAnalytics),
                (r'/createAnalyticsChart', handlers.app.CreateAnalyticsChart),
                (r'/loadAnalyticsById', handlers.app.LoadAnalyticsById),
                (r'/loadDashboardsList', handlers.app.LoadDashboardsList),
                (r'/loadAnalyticsByUserId', handlers.app.LoadAnalyticsByUserId),
                (r'/deleteAnalyticsChartById', handlers.app.DeleteAnalyticsChartById),
                (r'/editAnalyticsChartById', handlers.app.EditAnalyticsChartById),
                (r'/loadAnalyticsChartDataById', handlers.app.LoadAnalyticsChartDataById),
               ]
