
import pylab as plt

def simplePlot(args, data):
  print data
  plt.figure(figsize=(8, 6), dpi=80)
  plt.plot(data[0], data[1])  
