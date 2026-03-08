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
