import endpoints
from google.appengine.ext import ndb
from protorpc import remote
from protorpc import messages

# Will not use model yet
# from model.model import Model

# model definitions
class Photo(ndb.Model):
    ''' Data getting from Collect.py '''
    photo_id = ndb.KeyProperty()
    tags = ndb.StringProperty()
    locale = ndb.StringProperty()
    geolocation = ndb.GeoPtProperty()
    views = ndb.IntegerProperty() # this may be dangerous
    date_taken = ndb.DateTimeProperty()
    date_posted = ndb.DateTimeProperty()
    tags = ndb.StringProperty(repeat=True) # list of String

class PhotoCollection(ndb.Model):
    ''' Collection of Photo '''
    items = ndb.MessageProperty(Photo, 1, repeat=True)

# read the data from csv provided


# assign the list of photo being read from csv to datastore
STORED_PHOTOS = PhotoCollection(items=[])

# Web service
@endpoints.api(name="flickr", version="v1", description="Flickr Photo API",
               allowed_client_ids=[endpoints.API_EXPLORER_CLIENT_ID])
class Api(remote.Service):
    @endpoints.method(path="model/{id}", http_method="GET", name="model.read")
    def model_list(self, model):
        return list