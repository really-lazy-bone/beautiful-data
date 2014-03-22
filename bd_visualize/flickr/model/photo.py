from protorpc import messages

# model definitions
class Photo(messages.Message):
    ''' Data getting from Collect.py '''
    photo_id = messages.StringField(1)
    tags = messages.StringField(2, repeated=True) # list of String
    geolocation = messages.FloatField(3, repeated=True)
    date_taken = messages.StringField(4)
    date_posted = messages.IntegerField(5)
    views = messages.IntegerField(6)
    locale = messages.StringField(7, repeated=True)
    county = messages.StringField(8, repeated=True)
    region = messages.StringField(9, repeated=True)
    url = messages.StringField(10)


class PhotoCollection(messages.Message):
    ''' Collection of flickr Photo '''
    items = messages.MessageField(Photo, 1, repeated=True)

class StatisticModel(messages.Message):
    ''' the statistic model returning to the client '''
    name = messages.StringField(1)
    y = messages.FloatField(2, required=True)

class StatisticCollection(messages.Message):
    ''' collection of the data set '''
    items = messages.MessageField(StatisticModel, 1, repeated=True)

class MapData(messages.Message):
    ''' data used for the map displaying '''
    url = messages.StringField(1)
    latitude = messages.FloatField(2)
    longitude = messages.FloatField(3)