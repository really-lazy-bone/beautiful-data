#!/usr/bin/python

## python modules
import sys
import numpy as np
import argparse
import pylab as plt
from collections import defaultdict

## bd modules
from bd_visualize import histogram_plot as hi
from bd_visualize import xyplotter as xy
from bd_visualize import simple as sp

def readData(args):
    row = 0 
    col = 0
    array = []

    if (args.filename == ''):
        lines = sys.stdin.readlines()
    else:
        f = open(args.filename)
        lines = f.readlines()
        f.close()

    for line in lines:
        ta = line.rstrip().split()
        array.extend(ta)
        row += 1
        col = len(ta)

    return np.array(array).reshape((row,col)).astype(np.float)

def parseArguments():
    parser = argparse.ArgumentParser(usage='%(prog)s [options]', description='bdv application')

    parser.add_argument('-B', '--no-border', action='store_true', default=False, help='disable border')
    parser.add_argument('-c', '--color', default='', metavar='C', help='color of the curves (each character is a pattern, e.g. C = "roygbiv"')
    parser.add_argument('-C', '--current-date', action='store_true', default=False, help='stamp plot with current date')
    parser.add_argument('-d', '--dash', default='0', metavar='D', help='set dash of the curves (each digit is a pattern, e.g. D = "231")')
    parser.add_argument('-D', '--scale', default='0', metavar='D', help='0: linear, 1: log-linear, 2: linear-log, 3: log-log') 
    parser.add_argument('-e', '--debug', action='store_true', default=False, help='enable debug messages')
    parser.add_argument('-f', '--filename', default='', metavar='<filename>', help='use data in file rather than stdin') 
    parser.add_argument('-g', '--grid', default=False, action='store_true', help='use a grid')
    parser.add_argument('-j', '--draw-line', metavar=('mm','color','thick','x1','y1','x2','y2'), nargs=7, help='draw line with arrow(s) = ++, --, +-, or -+')
    parser.add_argument('-k', '--time-series', default=False, action='store_true', help='use time mode for x markers')
    parser.add_argument('-m', '--marker', metavar='M', default='', help='set markers of the curves: M = "x+*"')
    parser.add_argument('-n', '--no-line', action='store_true', default=False, help='no lines between points, aka scatter plot')
    parser.add_argument('-p', '--type', default='xy', metavar='type', help='set plot type: T = xy, pie, or histogram')
    parser.add_argument('-P', '--png-filename', default='image.png', metavar='<filename>', help='specify output filename')
    parser.add_argument('-S', '--same-scale', default=False, action='store_true', help='force x and y to scale the same')
    parser.add_argument('-t', '--title', default='', metavar='"title"', help='title the graph')
    parser.add_argument('-T', '--no-tick', default=False, action='store_true', help='no tick marks')
    parser.add_argument('-x', '--xlabel', default='', metavar='"label"', help='label the x-axis')
    parser.add_argument('-y', '--ylabel', default='', metavar='"label"', help='label the y-axis')
    parser.add_argument('-z', '--no-x-markers', default=False, action='store_true', help='disable the x markers')
    parser.add_argument('-Z', '--no-y-markers', default=False, action='store_true', help='disable the y markers')

    return parser.parse_args()

if __name__ == "__main__":

    config = defaultdict(list)
    args = parseArguments()
    array = readData(args)

    if args.type == 'xy':
       xy.xyplotter(args, array)
    elif args.type == 'histogram':
       hi.plothistogram(args, array)
    elif args.type == 'simple':
       sp.simplePlot(args, array)
    else:
       print 'unknown plot type'
       exit

    plt.savefig(args.png_filename)
