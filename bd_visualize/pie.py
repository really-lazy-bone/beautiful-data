
import matplotlib.pyplot as plt
import matplotlib.figure as fig
import numpy as np

def percentage(data):
        total = sum(data)
        return [each * 100/ total for each in data]

def plotPie(data):
        # Data as percentage to fill in a pie chart
        percents = percentage(data)

	# Labels
        Y = ['Y' + str(i) for i in xrange(1, len(percents))]
        labels = ['X'] + Y

	# Random colors and explode at maximum value
        colors = [np.random.rand(3) for i in xrange(0, len(percents))]
        explode = tuple([0.1 if percents[i] == max(percents) else 0 for i in xrange(0, len(percents))])
        
	# Plot
        plt.pie(percents, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%', shadow=True)
        # Set aspect ratio to be equal so that pie is drawn as a circle.
        plt.axis('equal')

def piePlot(args, data):
        if(len(data) == 0):
                print 'No data to plot'
        elif(args.element == '0' or args.N == '0'):
                plotPie(data.sum(axis=0))
        else:
                plotPie(data[int(args.element) - 1,:])
