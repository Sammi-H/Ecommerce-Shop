# EcomShop


E-Commerce Application Overview

This e-commerce application is built using React and provides a variety of features to manage products, orders, and user interactions. The app utilizes API requests to fetch and manage data, allowing users to browse products, view detailed product pages, and track their order history. In addition, it offers functionalities such as product reviews and user registration.

Features

The application includes several key features that make it user-friendly and functional. Upon visiting the site, users are presented with a list of products that can be filtered by category. This allows for easy navigation and product selection. By clicking on any product, the user is taken to a detailed page showcasing more information, including the product's name, price, description, images, and more.

Product Details

Each product in the application has its own dedicated page where users can find all relevant details. This includes product images, descriptions, pricing, and category information. If a user wishes to know more about a product before purchasing, they can view these details by clicking on the product from the main list. The page also provides the option to return to the main product list.

User Registration and Login

One of the core features of the application is the ability for users to create an account or log in. If a user is not logged in, they will not have access to certain features, including order history. Logging in gives users access to their past purchases, which are displayed in the order history section.

New users can register by filling out a simple registration form. Once registered, they can log in using their credentials. The login system ensures that users' order history and personal data are securely stored and accessible only to them.

Order History

Logged-in users have the ability to view their order history. This feature is accessible only after logging in, ensuring that users' purchases are kept private and secure. The order history section shows a list of all the user's past orders, including details such as the order number, the total number of products, the total amount spent, and the date of purchase. If a user tries to access the order history without being logged in, they will be prompted to log in or register.

Shopping Cart

The shopping cart is another key feature of the application. Users can add products to the cart and view a summary of their selections before proceeding to checkout. The cart displays the total price of all the products, and users can review their purchases before confirming the order. Each product added to the cart includes a timestamp that indicates when the purchase was made.

Product Reviews

Another important feature is the ability for users to leave reviews on products they have purchased. This provides valuable feedback to both the store and other customers. Once logged in, users can rate products and share their experiences with others. This helps to build a sense of community and trust, allowing potential buyers to make informed decisions.

Welcome Modal

To enhance user experience, the application includes a welcome modal that appears when a logged-in user first visits the products page. This modal welcomes the user and informs them that they are logged in, encouraging them to start shopping. The modal can be dismissed, and once closed, it will not appear again.

Technologies Used

This application is built using React, leveraging its powerful features like useState and useEffect for state management and API requests. React Router is used to handle navigation between the different pages, such as the product list, product details, and order history. The shopping cart is managed using the Context API to ensure that the data is accessible throughout the app without unnecessary prop drilling.

API Integration

The application interacts with an external API to fetch product data and order history. This API handles requests for product information, allowing the app to dynamically display a list of products, product details, and order histories. The products are categorized, making it easy for users to filter by categories like phones, TVs, and more.

How to Use the Application

To get started, simply install the dependencies by running the command npm install in the project directory. After installation, run the application using npm start and navigate to the main page where you can view the list of products. You can log in to access additional features, such as viewing your order history and leaving reviews. New users can register by filling out the registration form.
