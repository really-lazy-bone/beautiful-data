import sys
import numpy as np
import argparse
from collections import defaultdict
import pylab as pl

def xyplotter(args, array, figure):
    X = array[:,0]
    Y = np.delete(array, 0, axis=1)
    for i in Y:
        print i

    # shape and color
    shape = []
    for i in args.marker:
        shape.append(i)
    color = []
    for i in args.color:
        color.append(i)

    # plot it
    if args.scale == str(0):
        pl.plot(X, Y[:,0], ('%s%s-' % (color[0], shape[0])), X, Y[:,1], ('%s%s-' % (color[1], shape[1])))
    if args.scale == str(1):
        pl.plot(X, Y[:,0], ('%s%s-' % (color[0], shape[0])), X, Y[:,1], ('%s%s-' % (color[1], shape[1])))
        pl.yscale('log')
    if args.scale == str(2):
        pl.plot(X, Y[:,0], ('%s%s-' % (color[0], shape[0])), X, Y[:,1], ('%s%s-' % (color[1], shape[1])))
        pl.xscale('log')
        pl.yscale('log')
    if args.scale == str(3):
        pl.loglog(X, Y[:,0], ('%s%s-' % (color[0], shape[0])), X, Y[:,1], ('%s%s-' % (color[1], shape[1])))

    pl.title(args.title)

   # gridlines
    pl.grid(args.grid)

    # borders
    # pl.set_frame_on(False)

    # ticks
    if args.no_tick:
        pl.tick_params(left='off',bottom='off',top='off',right='off')
    else:
        pl.xticks(range(len(X)+1))
        pl.yticks(range(len(Y)+1))

    # no markers
    if args.no_x_markers:
        pl.tick_params(labelbottom='off')
    if args.no_y_markers:
        pl.tick_params(labelleft='off')

    # plot size
    xleft = X[np.argmin(X)]
    if xleft > 0:
        xleft = 0
    xright = len(X) + 1
    if xright < 0:
        xright = 0
    ybottom = Y[np.argmin(Y),0]
    if ybottom > 0:
        ybottom = 0
    ytop = len(Y) + 1
    if ytop < 0:
        ytop = 0

    pl.xlim([xleft, xright])
    pl.ylim([ybottom, ytop])
    pl.show()
