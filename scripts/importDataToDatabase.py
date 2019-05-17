from geolink.TDB import TDB
from geolink.taxilink import mtypes
from geolink.decode_gps import decode_gps
from geolink.taxilink.mtypes import mt_name
from geolink.taxilink.messages import Message
from geolink.geo import deg2meters, meters2deg

# import pandas as pd

import MySQLdb

callcenter = {'cc_0':[0,1,2,3,7], 'cc_1':[8], 'cc_2':[9,11], 'cc_3':[6], 'cc_4':[14], 'cc_5':[13]}
fleets = {'Porto': 0, 'Povoa':1, 'Odivelas': 2, 'Loures': 3, 'Brasil':6, 'Braga': 7, 'Coimbra':8, 'Gaia':9, 'Gondomar':11, 'Oeiras': 13, 'Sintra': 14}

def fleetFromTaxiID(tid):
        if tid == 0: return 20000000, 20000999
        if tid == 1: return 20002000, 20002999
        if tid == 2: return 20004000, 20004999
        if tid == 3: return 20005000, 20005999
        if tid == 6: return 20070000, 20079999
        if tid == 7: return 20007000, 20007999
        if tid == 8: return 20008000, 20008999
        if tid == 9: return 20009000, 20009999
        if tid == 10: return 20080000, 20089999
        if tid == 11: return 20012000, 20012999
        if tid == 12: return 20018000, 20018999
        if tid == 13: return 20010000, 20010999
        if tid == 14: return 20011000, 20011999
        if tid == 15: return 20100000, 20119949
        return None

def processTDBs(tdb, inital_ts, final_ts):

    db = MySQLdb.connect('192.168.1.123', 'developer', 'superdeveloper', 'standsdb')
    cursor = db.cursor()

    taxi_list_event = {}
    list = []

    rt_type = {'RT_PAUSE': 'pause', 'RT_TAXISTOP': 'stop', 'RT_FREE': 'free', 'RT_BUSY': 'busy', 'RT_ACCEPT_SERVICE_ASSIGNMENT': 'recolha'}
    for idd, ts, ty, msg in tdb.iterate_all(inital_ts * 1000, final_ts * 1000, types=[mtypes.RT_PAUSE, mtypes.RT_TAXISTOP, mtypes.RT_FREE, mtypes.RT_BUSY, mtypes.RT_ACCEPT_SERVICE_ASSIGNMENT]):

	       try:
        # taxis porto
            if int(taxi_list_event[idd]) < 64:
                ts = ts/1000
                mm = Message.unpack(ty, msg)
                sql = ''
                if mt_name[ty] == 'RT_TAXISTOP':
                    if int(mm.stop) == 0:
                        # import pdb; pdb.set_trace()
                        if idd in taxi_list_event:
                            sql = "INSERT INTO events (type, id_taxi, id_square, events_timestamp) VALUES ('%s', %d, %d, %d);"  %(rt_type['RT_FREE'], int(idd), taxi_list_event[idd], int(ts))

                            taxi_list_event.pop(idd)
                        else:
                            sql = "INSERT INTO events (type, id_taxi, id_square, events_timestamp) VALUES ('%s', %d, %d, %d);"  %(rt_type[mt_name[ty]], int(idd), int(mm.stop), int(ts))
                            taxi_list_event[idd] = mm.stop
                else:
                    if idd in taxi_list_event:
                        if mt_name[ty] == mtypes.RT_BUSY:
                            if mm.with_passenger:
                                sql = "INSERT INTO events (type, id_taxi, id_square, events_timestamp) VALUES ('%s', %d, %d, %d);" %(rt_type[mt_name[ty]]+'_p', int(idd), taxi_list_event[idd], int(ts))
                            else:
                                sql = "INSERT INTO events (type, id_taxi, id_square, events_timestamp) VALUES ('%s', %d, %d, %d);" %(rt_type[mt_name[ty]]+'_r', int(idd), taxi_list_event[idd], int(ts))
                        else:
                            sql = "INSERT INTO events (type, id_taxi, id_square, events_timestamp) VALUES ('%s', %d, %d, %d);" %(rt_type[mt_name[ty]], int(idd), taxi_list_event[idd],int(ts))
                        taxi_list_event.pop(idd)
                if sql != '':
                    cursor.execute(sql)
                    db.commit()

    except Exception as e:
            print e
    		# pass
    #exportFile.txt




initial_ts = 1514764800
final_ts = 1546300800
tdb = TDB("/backup/TDBs/cc_0")
processTDBs(tdb, initial_ts, final_ts)
