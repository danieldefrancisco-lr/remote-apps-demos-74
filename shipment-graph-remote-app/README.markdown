# Shipment Graphs Remote App

This is a React based Remote App that makes use of the Liferay Headless APIs to fecth the commerce orders and it can create 3 different graphs related to orders.
The React Remote App uses the [react-chartjs-2](https://react-chartjs-2.js.org/) library to build the graphs using the orders information fetched using the */o/headless-commerce-admin-order/v1.0/orders* Headless endpoint.

The Remote App has 3 different routes to select which graph you want to display in every instance of the Remote App:
- **number-of-orders-and-amount** : This is the default route. It displays a Line chart that shows the number of orders and total amount per month
-  **orders-status** : This displays a Doughnout chart with a breakdown of orders per status (open, pending, processed, shipped, completed)
-  **orders-amount** : This displays a Bar chart that shows the total amount per month.

Admin users will see all orders, while Customer users will see only their orders.

# Getting Started with Order Graphs Remote App

This project was bootstrapped with using Liferay’s create_remote_app.sh script as explained [here](https://learn.liferay.com/dxp/latest/en/building-applications/remote-apps/remote-apps-tutorials/creating-a-basic-remote-app.html)

## Building the React Application

### `yarn build`

This command creates an optimized production build, which includes the .js and .css files necessary for running the application inside the **./build/static/** folder.

Before proceeding, confirm the code has compiled successfully and take note of the application’s .js and .css files.

## Creating the Remote App in Liferay DXP

### Hosting the Application Files

For demo purposes you can host the application’s static resources in Liferay’s Document Library.
For that, upload the js file in *./build/static/js* and the css file in *./build/static/css* into a folder in the Document Library.


### Registering the Application with Remote Apps

1. Open the Global Menu, click the Applications tab, and go to Remote Apps
2. Click the Add button
3. Enter these values:
  - **Name**: Order Graphs
  - **Type**: Custom Element
  - **HTML Element Name**: order-graph-remote-app
  - **URL** : <WebDAV URL for the .js file>
  - **CSS URL**: <WebDAV URL for the .css file>
  - **Portlet Category Name**: Remote Apps

Once saved, Liferay creates a widget named Order Graphs, which you can deploy to Site Pages like other Page widgets. This widget appears under the selected Portlet Category Name.

When adding a Orders Graph to a page, you can set which route (graph) you want to display. After dragging and dropping the widget on a page, click on the widget Configuration and write the route you want to use. The widget is instanciable, so you can use more than one in a single page.
Like this:

  
![order-graphs-configuration](https://user-images.githubusercontent.com/19341713/173587991-64a31a05-38f4-45af-a64b-fe2d637ab27b.png)

  
  

## Screenshots
![order-graphs-1](https://user-images.githubusercontent.com/19341713/173587503-966ec46f-46a8-4e55-8efc-ab65bebede3e.png)

 ![order-graphs-2](https://user-images.githubusercontent.com/19341713/173587527-3fc170f0-69fb-41b4-96ed-1050a72fb8b9.png)
  
  
![order-graphs-3](https://user-images.githubusercontent.com/19341713/173587553-89cefb7f-4342-4d8c-bfe0-79a2fafc988e.png)

  

