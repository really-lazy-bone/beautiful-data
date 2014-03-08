import csv
import logging

import numpy as np

from model import photo

def readFileFromCSV(filepath, photo_collection):
    # read the data from csv provided
    csv_file_object = csv.reader(open(filepath, 'rb'))
    header = csv_file_object.next()

    logging.info(header)

    data=[]
    for row in csv_file_object:
        data.append(row)

    data = np.array(data)

    for row in data:
        photodata = photo.Photo(photo_id=row[0], tags=eval(row[1]),
                                geolocation=eval(row[2]), date_taken=row[3],
                                date_posted=int(row[4]), views=int(row[5]),
                                locale=eval(row[6]), url=row[9])
        logging.info(photodata)
        photo_collection.items.append(photodata)