import endpoints
from protorpc import remote
from protorpc import messages
from protorpc import message_types

from util import csv_parser
from model import photo

import os

# separate each month into a collection set
january_collection = photo.PhotoCollection(items=[])
february_collection = photo.PhotoCollection(items=[])
march_collection = photo.PhotoCollection(items=[])
april_collection = photo.PhotoCollection(items=[])
may_collection = photo.PhotoCollection(items=[])
june_collection = photo.PhotoCollection(items=[])
july_collection = photo.PhotoCollection(items=[])
august_collection = photo.PhotoCollection(items=[])
september_collection = photo.PhotoCollection(items=[])
october_collection = photo.PhotoCollection(items=[])
november_collection = photo.PhotoCollection(items=[])
december_collection = photo.PhotoCollection(items=[])

# used for switch case later
PHOTO_DICT = {
	'january' : january_collection,
	'february' : february_collection,
	'march' : march_collection,
	'april' : april_collection,
	'may' : may_collection,
	'june' : june_collection,
	'july' : july_collection,
	'august' : august_collection,
	'september' : september_collection,
	'october' : october_collection,
	'november' : november_collection,
	'december' : december_collection
}

# assign the list of photo being read from csv to datastore
for file in os.listdir("csv"):
	filename = file.split(".")[0]
	csv_parser.readFileFromCSV("csv/" + file, PHOTO_DICT[filename])

# Web service
@endpoints.api(name="flickr", version="v1", description="Flickr Photo API",
               allowed_client_ids=[endpoints.API_EXPLORER_CLIENT_ID])
class Api(remote.Service):
    ID_RESOURCE = endpoints.ResourceContainer(
            message_types.VoidMessage,
            month=messages.StringField(1))

    @endpoints.method(ID_RESOURCE, photo.PhotoCollection,
                      path='photo/{month}', http_method='GET',
                      name='photo.month')
    def greeting_get(self, request):
        try:
            return PHOTO_DICT[request.month]
        except (IndexError, TypeError):
            raise endpoints.NotFoundException('Photo Collection %s not found.' %
                                              (request.month,))