beautiful-data
==============

This is an Open Source project with focus on a large-scale data processing and visualization framework.  The ultimate goal is to provide researchers, business analysts and students a suite of tools for doing "big data" in relatively short order.


The code organization structure is loosely based on (inspired by) Jean-Paul Calderone's python project directory.  Undoubtedly at somepoint we will have to integrate java and other languages/technologies.  At which point a reasonable refactoring effort is required.

directory structure
-------------------

lazy-bones-beautiful-data/
   LICENSE
   README.md
   bd_analyze/
   bd_collect/
   bd_store/
   bd_visualize/
   bin/
   website/

The bd_* directories contain source code for the four modules of project; the website directory contains the static *.html documents; the bin directory contains wrapper scripts to execute the project.  In theory codes within the bd-directories should never be directly executed.

References:

[1] Calderone, Jean-Paul.  "Filesystem structure of a Python project" http://as.ynchrono.us/2007/12/filesystem-structure-of-python-project_21.html