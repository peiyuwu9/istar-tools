# iStar Tool Demo

## Motivation
Create tools for client.

## Technology used and why
**Firebase** for frontend static page hosting.
**Firebase Function** for beckend server deployment.
**Firestore** for databast.
**Fire storage** for oject storage.

## How to Use
- Deploy Backend Functions
    1. Run ```firebase init functions```.
    2. Either go to functions folder to run ```npm run deploy``` or go to root and run firebase deploy

- Deploy Frontend Hosting
    1. Stay at root
    2. Run ```firebase init``` for new project and select dist as public directory.
    3. Run ```npm run build``` to build react application.
    4. Run ```firebase deploy --only hosting```