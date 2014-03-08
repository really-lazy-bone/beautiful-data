import csv
import logging

import numpy as np

from model import photo

def readFileFromCSV(filepath, photo_collection):
    # read the data from csv provided
    csv_file_object = csv.reader(open(filepath, 'rU'))
    header = csv_file_object.next()

    data=[]
    for row in csv_file_object:
        data.append(row)

    data = np.array(data)

    for row in data:
        photodata = photo.Photo(photo_id=row[0], tags=eval(row[1]),
                                geolocation=[float(eval(row[2])[0]),
                                float(eval(row[2])[1])], date_taken=row[3],
                                date_posted=int(row[4]), views=int(row[5]),
                                locale=eval(row[6]) if row[6] else [],
                                url=row[9])
        photo_collection.items.append(photodata)