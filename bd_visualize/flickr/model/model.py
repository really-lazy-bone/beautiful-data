from endpoints_proto_datastore.ndb import EndpointsModel
from google.appengine.ext import ndb

class Model(EndpointsModel):
    # For EndpointModel, define which properties are published in the
    # translation to and from protorpc messages.
    _message_fields_schema = ("photo_id", "tags", "views", "date_taken", "date_posted", 
        "locale", "geolocation", "url", "region", "county")

    photo_id = ndb.KeyProperty()
    tags = ndb.StringProperty()
    locale = ndb.StringProperty()
    geolocation = ndb.GeoPtProperty()
    views = ndb.IntegerProperty() # this may be dangerous
    date_taken = ndb.DateTimeProperty()
    date_posted = ndb.DateTimeProperty()
    tags = ndb.StringProperty(repeat=True) # list of String
