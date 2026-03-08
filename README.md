# Bitespeed Identity Reconciliation API

## Live API

POST
https://bitespeed-identity-reconciliation-ro5q.onrender.com/identify

## Example Request

{
 "email": "doc@fluxkart.com",
 "phoneNumber": "123456"
}

## Example Response

{
 "contact": {
   "primaryContactId": 1,
   "emails": ["doc@fluxkart.com"],
   "phoneNumbers": ["123456"],
   "secondaryContactIds": []
 }
}

curl -X POST https://bitespeed-identity-reconciliation-ro5q.onrender.com/identify \
-H "Content-Type: application/json" \
-d '{"email":"test@gmail.com","phoneNumber":"999999"}'
