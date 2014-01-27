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
f = flickr.photos_get_recent()
tags = []

locs = []

urllist = [] #store a list of what was downloaded

# downloading images
count = 1
for photo in f[1:100]:
    tags = []
    if photo.tags is not None:
        for t in photo.tags:
            tags.append([count, t.raw])
    locs = []
    if 'attrib' in photo:
        if photo.attrib['latitude'] != '0':
            loc = {}
            loc['plugin'] = "flickr"
            photo_link = unicode('http://www.flickr.com/photos/%s/%s' % (photo.attrib['owner'], photo.attrib['id']), 'utf-8')
            title = photo.attrib['title']
            #If the title is a string, make it unicode
            if isinstance(title,str):
                title = title.decode('utf-8')
            loc['context'] = u'Photo from flickr  \n Title : %s \n ' % (title)
            loc['date'] = datetime.datetime.strptime(photo.attrib['datetaken'], "%Y-%m-%d %H:%M:%S")
            loc['lat'] = photo.attrib['latitude']
            loc['lon'] = photo.attrib['longitude']
            loc['shortName'] = "Unavailable"
            loc['infowindow'] = self.constructContextInfoWindow(photo_link, loc['date'])
            locs.append([count, loc])
    count += 1
    # p = k._load_properties()
    # print p.tags
    # g = k.getLocation()
    # print g
    # url = k.getURL(size='Medium', urlType='source')
    # urllist.append(url)
    # image = urllib.URLopener()
    # image.retrieve(url, os.path.basename(urlparse.urlparse(url).path))
    # print 'downloading:', url
print tags
print locs
# If you also want to write the list of urls to a text file, add the following lines at the end.

# write the list of urls to file
# fl = open('urllist.txt', 'w')
# for url in urllist:
#     fl.write(url+'\n')
# fl.close()
