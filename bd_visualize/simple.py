
import pylab as plt

def simplePlot(args, data):
  plt.figure(figsize=(8, 6), dpi=80)
  plt.plot(data[0], data[1])  
  plt.plot(data[0], data[2])  
