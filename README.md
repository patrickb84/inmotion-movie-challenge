# inmotion-movie-library

Movie library. Create, update, delete movies as well as their genres and actors. Upload movie poster images.

## Dependencies

* Express.js - A popular node.js framework I used to create a server, Rest API, and interface with Sqlite
* Multer - Middleware that handles multipart form-data. Used here to for handling image upload and storage.
* Nodemon - A dev tool that detects changes in the server app and restarts when the app when changes occur.
* Sqlite3 - A module that provides sqlite bindings for node.js.
* Axios - An HTTP client used in this project to make and Rest API requests.
* Bootstrap 4 - CSS/JS framework
  * React Bootstrap - React wrapper for Bootstrap.
  * jquery - Bootstrap dependency
  * popper.js - Bootstrap dependency
  * React Bootstrap Typeahead - Provides a typeahead/token box select component
  * React Router Bootstrap - Enables React-Router-Dom links to be wrapped in Bootstrap components.
* React Router Dom - Routing for the client side part of the project.
* lodash - Library used for array and object functions.
* RxJS - If I had more time I would've created an observable in the search bar component that detected changes in the input and made requests to the API about what to search.