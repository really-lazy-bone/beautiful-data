from protorpc import messages

# model definitions
class Photo(messages.Message):
    ''' Data getting from Collect.py '''
    photo_id = messages.StringField(1)
    tags = messages.StringField(2)
    locale = messages.StringField(3)
    #geolocation = messages.GeoPtField(1)
    views = messages.IntegerField(4) # this may be dangerous
    #date_taken = messages.DateTimeField(1)
    #date_posted = messages.DateTimeField(1)
    # tags = messages.StringField(1repeated=True) # list of String
    url = messages.StringField(5)


class PhotoCollection(messages.Message):
    ''' Collection of flickr Photo '''
    items = messages.MessageField(Photo, 1, repeated=True)
