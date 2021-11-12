/*

## User Story
    AS AN avid traveler
    I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
    SO THAT my account balance is accurate when I am traveling 

## Acceptance Criteria
    GIVEN a budget tracker without an internet connection
    WHEN the user inputs an expense or deposit
    THEN they will receive a notification that they have added an expense or deposit
    WHEN the user reestablishes an internet connection
    THEN the deposits or expenses added while they were offline are added to their transaction history and their totals are updated

## Tech Criteria
    Application must include a service worker.
    Application must include a web manifest.
    * Application must use IndexedDB for offline functionality.
    Application must be deployed to Heroku.

## Offline
    You’ll need to use IndexedDB to add offline functionality. Review Module 18: NoSQL, Lesson 4: Add Offline Persistence with IndexedDB as a refresher on how to add this to your application.

    You’ll also need to add a service worker to your application. Review Module 19: Progressive Web Applications (PWA), Lesson 4: Using Service Workers as a refresher on how to add this to your application.

    You should add your idb.js file to the public/js/ directory of your application.
    You should add your service worker to the root of the public/ directory of your application.

    Once you’ve updated the existing budget tracker, it should provide the following functionality:
    The ability to enter deposits offline.
    The ability to enter expenses offline.
    Offline entries should be added to the tracker when the application is brought back online.

## Manifest
    This manifest.json file for this project will contain the following properties: name, short_name, icons, theme_color, background_color, start_url, display

## Heroku
    Finally, the budget tracker has a server and uses MongoDB as its database, so you’ll need to deploy this application to Heroku using MongoDB Atlas. To review this process, look at Module 18: NoSQL, Lesson 5: Add Mongoose Validation, specifically 18.5.5: Deploy to Heroku.
*/