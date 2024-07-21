# TaskUI - This Application was used to manage Todo Tasks

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.


## Development server
Please follow below steps to run this Application:

npm install --force

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Developer Guidee:

Below are the components implemented :

For this project i just used components and didnt use any modularisation.
**Pipes are used to Search data
Inbuilt date pipe is used**

**Under Utilities folder**

HttpInterceptors are used for handling jwt tokens,http error handling
AuthGuard and role guard for AUthorisation

**Services:**
Auhthentication service is used for Authentication and Authoridation
TaskList Service is userd to manage todo Tasks
Modal service to pop up Modal
Alert Service to trigger Notifications.

Authentication and Authorisation

**Register Component:** This component is used to Register the username and password along with Type of Role

Currently there are 2 roles addedd in the system : [Admin,User]
    o Form to register   the username and password along with Type of Role .
    o Button to submit and register.

**Login Component:** This component is used to Login with username and password after successfull registration.

    o Form to input username and password.
    o Button to submit and authenticate.
    

**UnAuthorise Component:** - This component will be triggered by the Authentication Guards with user trying to access unexpected role.


 After Authentication  success:

 **To-Do List**
 
  o Display list of to-do items.
  o Button to add a new to-do item.
  o Edit and delete buttons for each to-do item.
  o Drag option to move item to complete state (I changed this from checkbox to drap and drop to make more user friendly)

**To-Do Item Component**
   o Displays a single to-do item with title, description, due date, and completed status.

**Add/Edit To-Do Component**
  o Form to input title, description, and due date.
  o Button to save the to-do item.

**All User ToDo List**
  
  o Display list of to-do items for all users.
  o Edit and delete buttons to Manage  each to-do item.

Example UI Flow
**(Role Type User)**
1. User visits the login page .
2. After logging in, the user is redirected to the to-do list page.
3. The user can view, add, edit, or delete to-do items.
4. The user can drag to-do items to complete status
5. The user can log out and return to the login page.

 Example UI Flow 
 **(Role Type Admin)**
1. User visits the login page .
2. After logging in, the user is redirected to the to-do list page.
3. The user can view,edit, or delete to-do items for all users.
5. The user can log out and return to the login page.


