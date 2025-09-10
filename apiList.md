# DevConnect APIs

## AUTH Router
- POST/signup
- POST/login
- POST/logout

## PROFILE Router
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password


## Connection Request Router
- POST/request/send/interesed/:requestId
- POST/request/send/ignored/:requestId -- use same api for interested and ignored 
                                    POST/request/send/:status/:reqId
- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId -- use same api for accepted and rejected 
                                    POST/review/send/:status/:reqId
   

## User Router
- GET /user/requests/requested
- GET /user/connections
- GET /feed - Gets you the Profiles of the users in the Platform

Status : ignore,interested, accepted, rejected
 