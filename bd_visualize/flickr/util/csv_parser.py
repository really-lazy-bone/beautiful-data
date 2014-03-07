import csv
import logging

import numpy as np

from model import photo

def readFileFromCSV(filepath, photo_collection):
    # read the data from csv provided
    csv_file_object = csv.reader(open('csv/january_flickrdump.csv', 'rb'))
    header = csv_file_object.next()

    logging.info(header)

    data=[]
    for row in csv_file_object:
        data.append(row)

    data = np.array(data)

    for row in data:
        photodata = photo.Photo(photo_id=row[0], views=int(row[5]), url=row[9])
        logging.info(photodata)
        photo_collection.items.append(photodata)