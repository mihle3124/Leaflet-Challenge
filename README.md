# Leaflet-Challenge

# Instructions

Create the Earthquake Visualization

![image](https://github.com/mihle3124/Leaflet-Challenge/assets/143448727/444f22fa-9669-4ce1-8dec-12c65f8bc4d4)

Your first task is to visualize an earthquake dataset. Complete the following steps:

1. Get your dataset. To do so, follow these steps:
  The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a dataset to visualize. The        following image is an example screenshot of what appears when you visit this link:

![image](https://github.com/mihle3124/Leaflet-Challenge/assets/143448727/3310bbdd-70db-47fb-8dd3-9f6299ecac9f)

  When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the                 visualization. The following image is a sampling of earthquake data in JSON format:

  ![image](https://github.com/mihle3124/Leaflet-Challenge/assets/143448727/47075d61-f0e4-42f5-850a-ffdea4a687e1)

2. Import and visualize the data by doing the following:

Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

Hint: The depth of the earth can be found as the third coordinate for each earthquake.

Include popups that provide additional information about the earthquake when its associated marker is clicked.

Create a legend that will provide context for your map data.

Your visualization should look something like the preceding map.

