EcomShop: E-Commerce Application Overview

This e-commerce application is built using React and provides a variety of features to manage products, orders, and user interactions. The app utilizes API requests to fetch and manage data, allowing users to browse products, view detailed product pages, and track their order history. Additionally, it offers functionalities such as product reviews and user registration.

Features

The application includes several key features that make it user-friendly and functional. Upon visiting the site, users are presented with a list of products that can be filtered by category, enabling easy navigation and product selection. Clicking on any product leads to a detailed page showcasing more information, such as the product's name, price, description, images, and other details.

Product Details

Each product has its own dedicated page where users can view all relevant information. This includes product images, descriptions, pricing, and category information. Users who want to learn more about a product before purchasing can access these details by clicking on the product from the main list. The page also offers an option to return to the main product list.

User Registration and Login

One of the core features of the application is the ability for users to create an account or log in. Without logging in, users cannot access certain features, such as order history. Logging in allows users to view their past purchases, which are displayed in the order history section.
New users can register by filling out a simple registration form. Once registered, they can log in using their credentials. The login system ensures that users’ order history and personal data are securely stored and accessible only to them.

Order History

Logged-in users can view their order history. This feature is accessible only after logging in, ensuring that users' purchases remain private and secure. The order history section displays a list of all past orders, including details such as the order number, the total number of products, the total amount spent, and the date of purchase. If a user tries to access the order history without logging in, they will be prompted to log in or register.

Shopping Cart

The shopping cart is another key feature of the application. Users can add products to the cart and view a summary of their selections before proceeding to checkout. The cart displays the total price of all selected products, and users can review their purchases before confirming the order. Each product added to the cart includes a timestamp indicating when it was added.

Product Reviews

The application allows users to leave reviews for products they have purchased. This feature provides valuable feedback for both the store and other customers. Logged-in users can rate products and share their experiences, fostering a sense of community and trust. Reviews also help potential buyers make informed decisions.

Welcome Modal

To enhance user experience, the application includes a welcome modal that appears when a logged-in user first visits the product page. This modal greets the user and informs them that they are logged in, encouraging them to start shopping. The modal can be dismissed, and once closed, it will not reappear.

Technologies Used

This application is built using React, leveraging powerful features like useState and useEffect for state management and API requests. React Router handles navigation between pages, such as the product list, product details, and order history. The shopping cart is managed using the Context API, ensuring that data is accessible throughout the app without unnecessary prop drilling.

API Integration

The application interacts with an external API to fetch product data and order history. This API processes requests for product information, enabling the app to dynamically display product lists, product details, and order histories. Products are categorized, making it easy for users to filter by categories such as phones, TVs, and more.

How to Use the Application

To get started, install the dependencies by running the command npm install in the project directory. After installation, run the application using npm start and navigate to the main page where you can view the list of products. Log in to access additional features, such as viewing your order history and leaving reviews. New users can register by filling out the registration form.
