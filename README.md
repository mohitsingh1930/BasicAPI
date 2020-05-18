# BasicAPI
An demo API to show use of GET, PUT, DELETE, POST methods on a single user route 

1. POST /api/users
   For creating new user
   request formdata(url-encoded):
   body: {
     userId: must be unique,
     name: optional,
     info: optional
   }

2. GET /api/users
   For getting list of all users
   
3. GET /api/users/:id
   For getting specific user
   you should provide userId in place of param: id
   
4. PUT /api/users/:id
   For updating previous user
   you should provide userId in place of param: id
   request formdata(url-encoded):
   body: {
     name: optional,
     info: optional
   }
   userId cannot be changed
   only provided fields will be updated rest will be the same

5. DELETE /api/users/:id
   For deleting a user permanently from collection
   you should provide userId in place of param: id
   
   
For connecting to the api you must pass an authorization token in authorization header.
token="API_token" (this is the value of authorization header you must pass to authenticate yourself, copy-paste the string as it is ) 
   
