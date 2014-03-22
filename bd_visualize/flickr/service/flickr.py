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
  def base_data_get(self, request):
    try:
      return PHOTO_DICT[request.month]
    except (IndexError, TypeError):
      raise endpoints.NotFoundException('Photo Collection %s not found.' %
        request.month)

  ID_RESOURCE2 = endpoints.ResourceContainer(
          message_types.VoidMessage,
          month=messages.StringField(1),
          field=messages.StringField(2))


  @endpoints.method(ID_RESOURCE2, photo.StatisticCollection,
                    path='photo/{month}/{field}/statistic', http_method='GET',
                    name='photo.month.field.count')
  def statistic_get(self, request):
    try:
      return self.simpleCount(PHOTO_DICT[request.month], request.field)
    except (IndexError, TypeError):
      raise endpoints.NotFoundException('404 not found.')

  def indexOfObj(self, array, obj):
    for i in xrange(len(array)):
      if array[i].name == obj:
        return i
    return -1

  def simpleCount(self, data, field):
    result = photo.StatisticCollection(items = [])

    for i in xrange(len(data.items)):
      if field == "locale":
        if data.items[i].locale:
          item = data.items[i].locale[0]

      if item:
        index = self.indexOfObj(result.items, item)

        if index == -1:
          result.items.append(photo.StatisticModel(name=item, y=1.0))
        else:
          result.items[index].y += 1

    result.items = sorted(result.items, key=lambda item: item.y, reverse=True)

    return result
