## Description

A NodeJS script that converts the locations.json of PolarSteps, to the Universal GPX file.

## How to use:

1. Download the project.
2. Get the **locations.json** file from PolarSteps that you're interested in (if you're not sure how to get this file, [check here](https://support.polarsteps.com/article/124-how-can-i-export-a-copy-of-my-data)).
3. Copy the **locations.json** file inside the downloaded **polarsteps-gpx** folder.
4. On Mac, open the Terminal app. On Windows, open the Command Prompt (cmd) app. 
5. cd to the location of the **polarsteps-gpx** folder. An easy way to do this, is to type "cd " on your Terminal window and then drag and drop the folder inside the Terminal window. For example: 
> ``` cd /Users/john/Downloads/polarsteps-gpx ```
6. On your terminal, run: 
> ``` npm install ```
7. Next, run:
> ``` npm start ```
8. If everything goes well, your Terminal will tell you:
> The file was saved!
9. The **trip.gpx** file is in the project folder (**polarsteps-gpx**)!

### P.S.

If you don't have npm / Node.js you can install them [from here](https://www.npmjs.com/get-npm).
