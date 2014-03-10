
import numpy as np
import pylab as plt

def plothistogram(args, data):
  n, bins, patches = plt.hist(data, 10, normed=1, histtype='bar', color = args.color)
