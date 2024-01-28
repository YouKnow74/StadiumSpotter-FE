#  Music Box Front-end
Front-end code for Music Box application 
# SEI7 Team Project4 Capstone

## Overview 

The Music Box is a platform for users to reserve Musixbox to play on, advertise for their Musixbox, and keep track of the reservations of the Musixbox.

The Application consists of React to be the Front End for the MERN Application.

## Project Name:  Music Box Front-end

### Developer:

### Rajiah A Rasool

## ERD Music Box

[ERD for Musixbox Web Applicatiion]
![Music Box ERD](separated file included).


## Wireframes
[Wireframe for Musixbox Web Applicatiion](separate file included)


## Link to Music Box Front End Web Application: 
[Web Application Link](https://github.com/Rajiah123/Music-BoxFE)

### Our Team:

only myself as team most of them are full. some student prefer to work alone. for this reason no group.



## Landing Page of the project:

separate file included.

## Features

- Responsive Site
- Multi-User Based Application
- CRUD Operations
- Mobile Responsive
- Single-Page Application

## Project Requirements

- Technology used: 
  - Axios
  - bycrypt
  - Dayjs
  - Bootstrap
  - JSON Web Token
  - JWT-Decode 
  - React
  - React-Dom
  - React-Router-Dom
  - Proxy
  - Sign-up Login functionality

 ## Screenshots
sperate image for front page

## Trello Board
https://trello.com/b/xMlUtZ7Y/music-box


## Platform Map of Data

### User
- Name (First Name, Last Name)
- Username
- Email
- Password
- Phone Number
- Role
- Profile Image

### Music Box app;
-  Name
-  Image
-  Description of business
-  Membership
-  User (Signin/Signout)
-  Communities
-  Album App & Album Store (seperate App)


### Album Reservations (separate app - external link)
- Album add
- Album Description
- Album Edit


### album
- Category (classical & popular)
- Image



## User Stories
### User Stories (If the user is to rent a stadium it is a role called renter)
- Users should be able to sign up.
- Users should be able to sign in.
- Users should be able to log out.
- Users should have a profile.
- Users should be able to upload a profile picture.
- Users should be able to edit their personal information.
- Users should be able to Join communities membership list.
- Users should be able to reserve a albums.
- Users should be able to see their reservation list.
- Users should be able to edit and delete their reservations.

### Admin Stories
- Admin should be able to sign up.
- Admin should be able to sign in.
- Admin should be able to log out.
- Admin should be able to add, edit, and delete albums.
- Admin should be able to see the album list.
- Admin should be able to add or delete album.
- Admin should be able to see the communities list.

  


## Future Features Enhancements
- Develop user-friendly maps with clear directions for easy navigation the business.
- Integrate online payment options to cater to the preferences of individuals who favor convenient and secure transactions.
- Enhance user experience by providing detailed reviews and ratings for the communities  and albums.
- Keep users informed about reservation statuses with real-time updates, ensuring accurate and timely information.
- Implement an interactive seating chart for Musixbox, enabling users to choose their preferred seats during the reservation process.
- Communities membership communication between users venue administrators, addressing queries and providing assistance in real-time.
- Offer multi-language support to cater to a diverse user base, ensuring that language barriers do not hinder the user experience.
- Introduce loyalty programs, offering exclusive perks, discounts, or early access to reservations for dedicated users.

## List of Unsolved Problems and Difficulties
- Occasionally, unintended page refreshes occur when new functions are added to the system, even though such refreshes are not intended or necessary for the intended user experience.
- When attempting to edit or add a reservation,I encountered difficulties in specifying the desired time or broken link. The system consistently defaulted to a predetermined time instead of allowing us to input or modify the selected time as intended.
- Troubleshooting errors stemming from the Axios function involves a detailed analysis of the Axios implementation. It requires identifying and examining the specific error messages, debugging logs, and potential issues within the code that leverages Axios. A thorough investigation is essential to pinpoint the root cause and implement effective solutions for a seamless Axios integration.
- One of the most challenging aspects was implementing a user-friendly and efficient time selection mechanism for album reservations. The complexity arose from the need to   synchronize the start and end times, considering the library’s operational hours and existing reservations.
- Form Validation to ensure that all the fields are set, and to check if the data input is fulfilled and appropriate.


## Requirements

### General Requirements

- Build a web application from scratch, must be your own work.(completed)
- Use MERN Stack framework to build your application.(completed)
- Deploy on any server so application is live on the web. (completed)
- Create a `README.md` file that explains your app to the world.(completed)
- Include ERD of your project idea.(completed)
- Include wireframes or link to wireframes.(completed)
- Include link to your trello board.(completed)
- Users' board and stories. (completed)
- Link to your deployed application. (completed)

### Readme Requirements
Don't underestimate the value of a well crafted README.md.
The README.md introduces your project to prospective employers and forms their first impression of your work!
Include the following sections within the README.md:
  ☐ App Title: Contains a description of what the app does and optional background info.(completed)
  ☐ Screenshot(s): A screenshot of your app's landing page and any other screenshots of interest. (in the progress)
  ☐ Technologies Used: List of the technologies used. (dependencies list included, mongoosdb, testing emails for testing purporse, e-mails for some team members)
  ☐ Planned future enhancements for the application. (search option and more payment methods)

### Technical Requirements

☐ A working full-stack, single-page application.
☐ Incorporate the technologies of the MERN-stack:
    *MongoDB/Mongoose
    *Express
    *React
    *Node
☐ Have a well-styled interactive front-end.
☐ Communicates with the Express backend via AJAX.
☐ Implement token-based authentication. Including the ability of a user to sign-up, log in & log out.
☐ Implement authorization by restricting CUD data functionality to authenticated users. Also, navigation should respond to the
   login status of the user.
☐ Have a well-scoped feature-set. Full-CRUD data operations are required for atleast 2 resources other than user.

#### Stretch Technical Goals (optional)
-Consume data from a third-party API.
-Implement additional functionality if the user is an admin.
-Utilize multi-user, real-time communications (beware that this is difficult and time consuming - please seek instructor approval).

### Team Requirements

- Every team member must have commits contributing to the project.
- No single student should do a majority of the commits.

### Necessary Deliverables

- Projects are due on Thursday, 28th of Jan, 2024!
- You have to fill the [Google Sheet] with you name, github link and deployed link.
- A **15~20 minute presentation** in which you answer the following questions:
  - What is the application about?
  - Is there any information you think might help us understand what you built?
  - What were the team members' contributions to the project?
  - Demo of application.
  - What features did you include?
  - Make sure to explain anything "new" (things that we didn't cover in class).
  - Ensure to program MERN Stack application. Do not forget to include authentication part.
  - What was the most difficult part of the project?
  - What was your favorite part to work on?
  - What would you like to add next?

## About the Web Application (Music Box-Back End):
The Album Reservation Application: is a web-based platform that facilitates the process of conducting reservation. It provides two distinct user roles: Admin, reservation customer, each with specific functionalities tailored to their roles.

### Admin User:
As an Admin user, the user has an access authority to a comprehensive reservation categories created by the user. User can add, edit, view details, and delete reservation. Additionally, has a dedicated section to manage reservation, enabling admin team to add, edit, view details and delete reservation made by the users. Furthermore, they can add new item to album categories to enhance the diversity of available categories of album type. Existing album types are: indoor and outdoor albums.

### Customer as a User:
Customers are users who can create their own reservation and submit reservation request to reservation team. They have the capability to manage their own reservation, as well as review extra communities provided along with reservation. 


#### User resources 

 - User must have a profile.
 - User must be able upload their profile image.
 - User must be able to edit their profile information.
 - User must be able to change the password.
 
#### User Authentication by JSON Web Tokens(WJT)

Authentication by JSON Web Tokens (JWT) is a method of verifying the identity of a user in a web application or API.
- User must be able to sign up.
- User must be able to sign in.
- User must be able to sign out.
- Token Generation: Upon successful authentication, the server generates a JWT.
- The JWT consists of three parts: a header (for signing the token),
 a payload (information about user:Id, role, expiry time) and signature.
- The server signs the header and payload with a secret key to create the signature.
- Token takes multiple phases such as: issuance, usage and until reach verification process and access control.


### Technical Aspect of Music Box-Back End application:

# Server.js

This file contains the server-side code for a web application using Node.js and Express.js. It sets up a server to handle incoming requests and configure various functionalities.

## Dependencies

- Let's go through the JSON file and describe each dependency listed under the "dependencies" key:

1. "bcrypt": "^5.1.1"
   - Description: A library for hashing and salting passwords.
   - Version: "^5.1.1" indicates that it requires a version equal to or greater than 5.1.1.

2. "dotenv": "^16.3.1"
   - Description: A zero-dependency module that loads environment variables from a .env file into process.env.
   - Version: "^16.3.1" indicates that it requires a version equal to or greater than 16.3.1.

3. "ejs": "^3.1.9"
   - Description: A simple templating language that lets you generate HTML markup with plain JavaScript.
   - Version: "^3.1.9" indicates that it requires a version equal to or greater than 3.1.9.

4. "express": "^4.18.2"
   - Description: A fast, unopinionated, minimalist web framework for Node.js.
   - Version: "^4.18.2" indicates that it requires a version equal to or greater than 4.18.2.

5. "jsonwebtoken": "^9.0.2"
   - Description: An implementation of JSON Web Tokens (JWT) for generating and verifying tokens.
   - Version: "^9.0.2" indicates that it requires a version equal to or greater than 9.0.2.

6. "mongoose": "^8.0.3"
   - Description: An object modeling tool for MongoDB that provides a straightforward, schema-based solution to model application data.
   - Version: "^8.0.3" indicates that it requires a version equal to or greater than 8.0.3.

These dependencies are essential for the back-end functionality of the Music Box application. They provide functionalities such as password hashing, environment variable management, HTML templating, web framework capabilities, JWT handling, and MongoDB data modeling. 

## Installation and Setup

1. Clone the project repository.
2. Navigate to the project directory.
3. Install the required dependencies by running the command: `npm install`.
4. Create a `.env` file in the root directory and configure the necessary environment variables. Refer to the `.env.example` file for the required variables.
5. Start the server by running the command: `node server.js`.

## Web Application Configuration:

- The server listens on the port specified in the `PORT`:'3011' environment variable.
- Static files, such as CSS, JS, audio, video, and image files, are served from the "public" directory.
- The database configuration is defined in the "db" module located in the "config" directory.

## Web Application Routes:
Routes import the Express.js framework and create a new router object using the express.Router() method. The router object is used to define the routes for the application. The express.json() middleware is added to the router to parse incoming requests with JSON payloads. The routes are associated with specific handler functions from the differnt routes specified under controller module. At the end, all routes objects are exported so that they can be used in other files. Routes allow you to use these routers' configuration in the main application file by requiring it.

The following routes are available:

- `/community`: handles requests related to communities such as: adding a new facility, retrieving a list of communities, deleting
    a facility, editing a facility and updating a facility.

- `/reservation`: handles requests related to reservations affairs such as: adding a new reservation, retrieving a list of reservations, 
   deleting a reservation, editing a reservation and updating a reservation.

- `/album`: handles requests related to Musixbox such as: creating a new stadium, retrieving a list of Musixbox,
   deleting a stadium, editing a stadium, and updating a stadium. It also includes file upload functionality using 
   the multer middleware for the /add route. 

-  `/payment`: handles request related to payment such as: retrieving a list of payments, adding a new payment, editing 
    a payment, updating a payment and retrieving the details of a specific payment.

-   `/albums`: handles request related to albums such as: adding a new album, retrieving a list of albums and deleting a album category.

-   `/user`:  handles request related to user-related operations such as: signup, signin, index, detail, edit, delete and update 
     the user.



## Web Application Controller:

##control.js file exports functions that handle reservation-related operations such as creating a new reservation, retrieving a list of reservations, deleting a reservation, retrieving a reservation for editing, and updating a reservation. These functions interact with the Reservation model and perform database operations based on the received HTTP requests and send appropriate responses.

##used HTTP methods along with their typical usage:

-GET: retrieves a resource or a list of resources (retrieving data, fetching a web page and retrieving a list of items). 
      It should not have any side effects on the server.

-POST: submits data to be processed to a specified resource (for example, submitting a form, sending data to be processed).
       It can create new resources or perform other actions that have side effects on the server.

-PUT: updates a resource at a specified URL with the new representation provided in the request (updating an existing resource 
      with a complete replacement representation). It replaces the entire resource with the new data.

These HTTP methods are used in combination with URLs (endpoints) to perform various operations on web resources. The choice of method depends on the desired action and the semantics of the operation you decide to perform on the server.

- `/community`: handles requests related to communities such as: adding a new facility, retrieving a list of communities, deleting
    a facility, editing a facility and updating a facility.

- `/reservation`: handles requests related to reservations affairs such as: adding a new reservation, retrieving a list of reservations, 
   deleting a reservation, editing a reservation and updating a reservation.

- `/library`: handles requests related to Musixbox such as: creating a new stadium, retrieving a list of Musixbox,
   deleting a stadium, editing a stadium, and updating a stadium. It also includes file upload functionality using 
   the multer middleware for the /add route. 

-  `/payment`: handles request related to payment such as: retrieving a list of payments, adding a new payment, editing 
    a payment, updating a payment and retrieving the details of a specific payment.

-   `/albums`: handles request related to albums such as: adding a new album, retrieving a list of albums and deleting a album category.

-   `/user`:  handles request related to user-related operations such as: signup, signin, index, detail, edit, delete and update 
     the user.


## Web Application Models:
##modles.js group of files provided define a Mongoose model for each section, it imports the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and provides a convenient way to define schemas and interact with the database. Then creates a Mongoose model for different sections such as: "Community", "payments", "reservation" and "user" by using Schema". The model represents a collection in the MongoDB database and provides an interface for interacting with the data. It allows import & export of these models in other parts of the web application and perform CRUD operations on different sections.:

The break down of each section as follows along with their defined schema:



- `/community`:  defines a Mongoose model for a "Communitty" entity with a schema that includes two fields: "community" and "image". 
   The model provides an interface for interacting with the "community" collection in the MongoDB database.

- `/reservation`: defines a Mongoose model for a "Reservation" entity with a schema that includes several fields such as add their album in separe web application for album. 
   

- `/library`: defines a Mongoose model for a "other library" entity with a schema that includes several fields such as "name", "image", 
    "description", "size", "location", "price", "user", "communities", and "category". The "user", "communities", and "category" fields are object references to the "User", "community membership for other libraries", and "album" models respectively. The model provides an interface for interacting with the "Library" collection in the MongoDB database.

-  `/payment`: defines a Mongoose model for a "Payment" entity with a schema that includes four fields: "status", "date", "price", and 
    "reservation". The "reservation" field is an array of object references to the "Reservation" model. The model provides an interface for interacting with the "Payment" collection in the MongoDB database.  But this for futur enhancement.

-   `/albums`: defines a Mongoose model for a "album" entity with a schema that includes several fields such as "category", "image". The model provides an interface for interacting 
     with the "album" collection in the MongoDB database.  Separate web app available and designed.


-   `/user`:  defines a Mongoose model for a "User" entity with a schema that includes several fields such as "firstName", "lastName",
      "userName", "emailAddress", "phoneNumber", "role", "password", and "image". The model provides an interface for interacting with the "User" collection in the MongoDB database.

## Web is having entertainment zone ;
  Music box application is having virtual music grids for win and loss game that encourage traffic to the website.
  
## Testing for backend;
 postman is used for testing for all HTTP methods, application is tested on different localhosts;3000,3011, 3002,3001.

##  Web Application Usage

1. Make sure the server is running.
2. Send HTTP requests to the appropriate routes using tools like cURL or a web browser.
3. Check the console log for the message indicating that the server is running on the specified port.




## Useful Resources

- **[Git Team Workflow](https://trello.com/invite/Music Box/ATTIb079db0c886353646c04bf9c6612f24e0062057C)**
- **[MongooseJS documentation](https://mongoosejs.com/docs/index.html)**
-**Here are some resources to help in learning and get started with the MERN (MongoDB, Express.js, React, Node.js) stack:

     Official Documentation:

      -MongoDB: https://docs.mongodb.com/
      -Express.js: https://expressjs.com/
      -React: https://reactjs.org/
      -Node.js: https://nodejs.org/


