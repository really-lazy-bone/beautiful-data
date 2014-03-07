import endpoints
from protorpc import remote
from protorpc import messages
from protorpc import message_types

from util import csv_parser
from model import photo

# Will not use model yet
# from model.model import Model

PHOTO_COLLECTION = photo.PhotoCollection(items=[])

# assign the list of photo being read from csv to datastore
csv_parser.readFileFromCSV('', PHOTO_COLLECTION)

# Web service
@endpoints.api(name="flickr", version="v1", description="Flickr Photo API",
               allowed_client_ids=[endpoints.API_EXPLORER_CLIENT_ID])
class Api(remote.Service):
    @endpoints.method(message_types.VoidMessage, photo.PhotoCollection, path="photo/list", http_method="GET", name="photo.list")
    def model_list(self, model):
        return PHOTO_COLLECTION