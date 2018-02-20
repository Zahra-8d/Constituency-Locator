# Constituency-Locator

Click on the run button to run the program. This will promt you to allow access to your location. 

If permission is given to access your location, you are provided with three results:

1)  An image of a map with a marker pointing to your location
2)  Your nearest postcode
3)  The corresponding parliamentary constituency name

In order to change the location you can click the button to run, this will run the process again.

Failure scenarios:

1)  Browser does not support geolocation: This will give an error message and an autocomplete box will appear where a locatio can manually be input.
2)  Permission to obtain location denied: This will give an error message and an autocomplete box will appear where a locatio can manually be input.
3)  Postcode failed to be retrieved from the Postcodes.io service: The map will be generated and an error message below
