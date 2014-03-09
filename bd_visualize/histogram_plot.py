#!/usr/bin/env python
import numpy as np
import pylab as P


def plothistogram(args, data, figure):
  plot = figure

  
  n, bins, patches = P.hist(data, 10, normed=1, histtype='bar', color = args.color)
#  P.legend()
#  P.show()
  return plot
#plothistogram(0)
#def test():
#    mu, sigma = 200, 25
#    data = mu + sigma*P.randn(1000,4)
#    t = plothistogram("asdlkfj",data, P.figure())
#    t.show()
#    
#test()