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
for k in f[1:5]:
    count = 1
    if k.tags is not None:
        for t in k.tags:
            tags.append([count, t.raw])
            print t.raw
    print k.getLocation()
    locs.append([count, k.getLocation()])
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
