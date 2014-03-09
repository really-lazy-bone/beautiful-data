#!/usr/bin/python

import sys
import numpy as np
import argparse
import pylab as plt
from collections import defaultdict
from bd_visualize import simple as s

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

    parser.add_argument('-p', '--plot-type', default='xy', required=True,
                        help='set plot type: xy, pie, or histogram')
    parser.add_argument('-B', '--no-border', action='store_true', default=False)
    parser.add_argument('-e', '--debug', action='store_true', default=False)
    parser.add_argument('-c', '--color', default='', 
                        help='color of the curves = roygbiv')
    parser.add_argument('-D', '--scale', default='0', 
                        help='0: linear, 1: log-linear, 2: linear-log, 3: log-log') 
    parser.add_argument('-g', '--grid', default=False, action='store_true')
    parser.add_argument('-m', '--marker', default='', 
                        help='set markers of the curves = "x+*"')
    parser.add_argument('-n', '--no-line', action='store_true', default=False,
                        help='no lines between points, aka scatter plot')
    parser.add_argument('-S', '--same-scale', default=False, action='store_true',
                        help='force x and y to scale the same')
    parser.add_argument('-t', '--title', default='', 
                        help='title the graph')
    parser.add_argument('-T', '--no-tick', default=False, action='store_true',
                        help='no tick marks')
    parser.add_argument('-x', '--xlabel', default='', 
                        help='label the x-axis')
    parser.add_argument('-y', '--ylabel', default='', 
                        help='label the y-axis')
    parser.add_argument('-z', '--no-x-markers', default='', 
                        help='disable the x markers')
    parser.add_argument('-Z', '--no-y-markers', default='', 
                        help='disable the y markers')

    return parser.parse_args()

if __name__ == "__main__":

    config = defaultdict(list)
    args = parseArguments()
    array = readStdin()
    print array

    if args.plot_type == 'xy':
       print 'doing xy plot'
    elif args.plot_type == 'pie':
       print 'doing pie plot'
    elif args.plot_type == 'histogram':
       print 'doing histogram plot'
    elif args.plot_type == 'simple':
       s.simplePlot(args, array)
    else:
       print 'unknown plot type'
