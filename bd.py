#!/usr/bin/python

import sys
import numpy as np
import argparse
from collections import defaultdict

debug = False

def readStdin():
    row = 0 
    col = 0
    array = []

    for line in sys.stdin:
        ta = line.rstrip().split()
        array.extend(ta)
        row += 1
        col = len(ta)

    return np.array(array).reshape((row,col)).astype(np.float)

def parseArguments():
    parser = argparse.ArgumentParser(usage='%(prog)s [options]',
                                     description='bd application')

    parser.add_argument('--debug', action='store_true', default=False)

    parser.add_argument('-m', '--min-area', dest='minArea', type=float, default=2.0,
                        help='specify the minimum area threshold')

    return parser.parse_args()

if __name__ == "__main__":

    config = defaultdict(list)
    args = parseArguments()
    debug = args.debug
    
    array = readStdin()
    print array
