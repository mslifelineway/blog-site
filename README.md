# blog-site

-----------------------------------------------------------------------------------------------

Hello viewer,
Welcome to this profile.
This is completely react app.

-----------------------------------------------------------------------------------------------

# Tech
    React,
    Material UI,
    Yup validation (frontend),
    Redux,
    Axios (with error handling),
    Express server integration,
    Protected Routes

-----------------------------------------------------------------------------------------------

Links: 
Netlify : https://blogging-today.netlify.app
Heroku: https://blogging-today.herokuapp.com
Repository: https://github.com/mslifelineway/blog-site

-----------------------------------------------------------------------------------------------

I do checking for the bugs and If any bugs are found i will resolve and push back.

-----------------------------------------------------------------------------------------------

Note: 
Schema validations : 
 Name:  Does not allow any special chars or symbols while typing in input text
 Email:  validate email with domain like only .com or .gov or .in or .org
 Password: Password must contain at least 8 characters, one uppercase, one number and one special case character.

-----------------------------------------------------------------------------------------------

Testing Credentials (if required): 

-----------------------------------------------------------------------------------------------
Admin credential :

username/email: mukesh@gmail.com
password: Mukesh@123

-----------------------------------------------------------------------------------------------
User credential :

username/email: irfan@gmail.com
password: Irfan@123

-----------------------------------------------------------------------------------------------
ADMIN REGISTRATION LINK: 

Since, there is no any registration feature so i have provided an api url to register as admin.
Request Url (localhost server)

-----------------------------------------------------------------------------------------------
URL: http://localhost:5000/api/user/registerAsAdmin
Request Body:
 {
    "name": "mukesh kumar",
    "email": "mukesh@gmail.com",
    "password": "Mukesh@123"
}

Response :  
{
  "message": "User created successfully!",
  "user": {
    "role": "ADMIN",
    "is_active": true,
    "_id": "6157ff9190ec2e13e812fca4",
    "name": "mukesh kumar",
    "email": "mukesh@gmail.com",
    "created_at": "2021-10-02T06:43:29.114Z",
    "updated_at": "2021-10-02T06:43:29.114Z"
  }
}

Thanks :)