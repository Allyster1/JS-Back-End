# SoftUni JS Back-End Exam Preparation Cheat Sheet

## Create Skeleton Project

### 1. Initialize Project

-  [x] Initialize npm project `npm init -y`
-  [x] Change module system
-  [x] Add start file `/src/index.js`
-  [x] Add dev script
-  [x] Config debugger
-  [x] Add resources

### 2. Expres

-  [x] Install express `npm i express`
-  [x] init a server
-  [x] Setup static middleware
-  [x] Add body parser
-  [x] Add home controller
-  [x] Add route file
-  [x] Add error controller

### 3. Handlebars

-  [x] Install handlebars `npm i express-handlebars`
-  [x] Config hanlebars engine
-  [x] Use handlebars engine
-  [x] Config handlebars file extension
-  [x] Set views folder
-  [x] Add home view
-  [x] Render home view without layout `res.render('home', {layout: false});`
-  [x] Fix asset paths
-  [x] Add layout
-  [x] Add partials dir
-  [x] Config handlebars to work with mongoose documents `runtimeOptions: { allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true }`

### 4. Database

-  [x] Install mongoose `npm i mongoose`
-  [x] Connect to db
-  [x] Add error handling on connect
-  [x] Add simple user model

### 5. Register

-  [x] Fix navigation links
-  [x] Add user controller
-  [x] Add user controller to routes
-  [x] Create register view
-  [x] Render register view
-  [x] Modify register form
-  [x] Create post route for register
-  [x] Create user service
-  [x] Redirect after successfull register
-  [x] Instal bcrypt `npm i bcrypt`
-  [x] Hash passwords before safe
-  [x] BONUS: Check if user exists

### 6. Login

-  [x] Fix login navigation link
-  [x] Add login view
-  [x] Add get login action
-  [x] Fix login form
-  [x] Add post login acion
-  [x] Add login method in userService
-  [x] Validate if user exists
-  [x] Validate password
-  [x] Install jsonwebtoke `npm i jsonwebtoken`
-  [x] Generate token
-  [x] Call userService from userController
-  [x] Send token as cookie
-  [x] Redirect to homepage
-  [x] BONUS: Extract jwt secret to constant or env
-  [x] Auto login on register

### 7. Logout

### 8. Authentication

### 9. Authorizarion

### 10. Dynamic Content

### 11. Error handling and validation

-  [] Check repeatPassword

### Bonus

-  [] Add env variable for debugging
-  [] Add global error handler
-  [] Add bundler
