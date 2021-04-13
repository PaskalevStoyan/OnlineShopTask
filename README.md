# OnlineShopTask
This is a simple website for online grocery shopping

## Technologies
This project is built using vanilla JavaScript, HTML along with custom CSS and Bootstrap. The API used for getting the data(items) is fetch API

## Goal
The idea behind this simple project is to simulate an online shop without its main functionalities - adding items to a cart, placing orders and delivering. 
The data(items) are coming from a file named "data.json", in which an array of objects is included to simulate a database for the items. 

## Functionality 
* Functions:
  - getProducts() - On execution, this function fetches the data from the data.json file and it adds the information in the HTML.
  - loadModalInformation() - When a button "More info" is clicked, a modal is visualized and this function fills up the modal with all of the information the selected item has.
