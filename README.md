beautiful-data
==============

>beautiful-data (BD) is an Open Source project that focuses on a large-scale data processing and visualization.  Its ultimate goal is to provide researchers, business analysts and students a software framework for working with "big data" in relatively short order.

The code organization structure is loosely based on (inspired by) Jean-Paul Calderone's python project directory.  Undoubtedly at somepoint we will have to integrate java and other languages/technologies.  At which point, a reasonable refactoring effort is required.

The project's official website is at http://bd.pcwerk.com/


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

The bd_ directories contain source code for the four modules of project; the website directory contains the static web-related documents (e.g., .html, .css, and .js files); the bin directory contains wrapper scripts that can be used to execute the project.  In theory, code within the bd_ directories should never be directly executed.

References:

[1] Calderone, Jean-Paul.  "Filesystem structure of a Python project" http://as.ynchrono.us/2007/12/filesystem-structure-of-python-project_21.html
