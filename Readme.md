# Introduction
This is the readme file of Guanlan Ji 530635037's 5347 assignment 1.

# Startup

The project use the Node. js way in the assignment introduction to load json file. So to start the project, you need some steps below:

1. Open Terminal in the project root folder (where index. html is there)
2. Enter command "http-server" to start the server (assume http-server is downloaded)
	+ If failed, open Terminal again as an administrator
3. Once start http-server successfully, open http://127.0.0.1:8080 in the browser, and the project runs.

# Functionalities

## Search Function

Enter the content you want to search and click the Search button at left-top of the page. Then the corresponding results will be highlighted.

## Filter Function

At right of Search button is a dropdown for filter, find the category you want and click Filter button, then the results will show. The last option of dropdown is "Advanture" which is used to test a category with no books.

## Clear Filter Function

At right of Filter button is a Clear Filter button, once click the button, it will reset the filter dropdown to All Categories, and show all books in the table.

## Search and Filter Function together

Search Function and Filter Function can works will together. 

(Attention: The search / filter function will not work if you just enter search content / choose a filter and haven't click Search / Filter button)

## Add to Cart Function

Firstly, all rows of books have a radio button (but looks like a checkbox) at the begining of each row. If you want to buy a book, click it. And if you click another book, the previous one will be unselected.

Then Click Add to Cart button at top-right of the page it will ask you to select the number of the book you want to buy, and then click Confirm button.

As a result, the number in the cart which is at right of Reset Cart button will be added your number.

## Reset Cart Functions

Click Reset Cart button, and the number in the cart will be reset to 0.

## "Dark mode" function

At the very top-right of the page is Dark Mode button, once click it, the theme color of the page will become a dark theme.
And then the button changes to Light Mode button, click it to reset the theme color.