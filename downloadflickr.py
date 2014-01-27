import flickr
import urllib, urlparse
import os
import sys

# if len(sys.argv)>1:
#     tag = sys.argv[1]
# else:
#     print 'no tag specified'

# downloading image data
# f = flickr.photos_search(tags=tag)

### this is not set-up yet for any particular time period, it's just grabbing most recent photos
f = flickr.photos_get_recent()

photos = []

# urllist = [] #store a list of what was downloaded

# downloading images
count = 1
# we probably want to implement saving the number of views too
# and I'm not convinced a list with a counter is the best data structure, but that's what I have for now
try:
    for photo in f[1:50]: # iterate through the first 50 photos
        tags = []
        loc = None
        if photo.tags is not None:
            for t in photo.tags:
                tags.append(t.raw)
        if photo.getLocation() is not None:
            loc = photo.getLocation()
        if tags != [] and loc is not None:
            # this if clause makes sure the photo info we're collecting is only for photos with geolocations and tags
            photos.append([count, tags, loc])
            count += 1
        # url = k.getURL(size='Medium', urlType='source')
        # urllist.append(url)
        # image = urllib.URLopener()
        # image.retrieve(url, os.path.basename(urlparse.urlparse(url).path))
        # print 'downloading:', url
except FlickrError as e:
    print e

print photos
# If you also want to write the list of urls to a text file, add the following lines at the end.

# write the list of urls to file
# fl = open('urllist.txt', 'w')
# for url in urllist:
#     fl.write(url+'\n')
# fl.close()
