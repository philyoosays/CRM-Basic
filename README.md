# CRM

# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

|  Day | Deliverable | 
|---|---| 
|Day 1: Tue| Wireframes and Priority Matrix|
|Day 2: Wed| Project Approval /  Pseudocode / actual code|
|Day 3: Thur| Basic Clickable Model |
|Day 4: Fri| Working Prototype |
|Day 5: Sat| Final Working Project |
|Day 6: Sun| Bugs / Stylying / PostMVP |
|Day 7: Mon| Project Presentations |


## Project Description

The project is a Contact Resource Management System (CRM). This kind of system can be used by a sales team, non-profits, or campaigns. It will keep track of leads/donors/constituents and their contact information, donations/sales, campaign attribution data, and any notes that the fundraising/sales team make.

Post MVP, I am considering adding a fundraiser's profile with their sales data, an API call to Zillow.com's API to be able to show the user the home value of a particular donor so that the fundraiser can have a better idea of what dollar range to make their ask. Lastly, if I ahve the time, I want to represent data in the campaign overview page and the fundraiser's profile page with pretty D3 graphs.

## Wireframes

https://drive.google.com/file/d/1fskb4gy3oTPDvcZsDHgEv15w8Wjz_HF0/view?usp=sharing

## Database Schema

https://drive.google.com/file/d/14XLfs0FRO18f34lnzC-ah7onr4UCaWVs/view?usp=sharing

**** I'm deviating from the schema as drawn to eliminate the many to many relationship between addresses and people from my MVP. A many to many relationship between addresses and people will be a Post MVP feature.

## Priority Matrix

https://drive.google.com/file/d/1lqn45ruWOkCPUJMvzanOlpJuz3Acq8Sq/view?usp=sharing

### Important - Lots of Time
 - Person view
 - Create fake data
 - Models
 - People Search View
 - Server setup

### Important - Not Much Time
 - Build Schema
 - Campaign View
 - Login View
 - New Person View
 - New Note View
 - New Gift View
 - New Campaign View

### Not Important - Not Much Time
 - Fundraiser view

### Not Important - Lots of Time
 - Zillow API
 - D3 data representation

## App Components

### Login Page/Authentication
Straight-up, this is where a sales-person would login.

### Landing Page - People Search View (PostMVP - Fundraiser Overview)
The MVP for my app will send authenticated users to the People Search page but post MVP will send people to the fundraiser overview page.

The People Search View will contain input fields pertaining to the people like their name but also fields to input address information to pull up a list under the search fields for all matching people. Ideally the fields would be able to contain just partial data and not all the fields have to be filled in. The result list will be links to the person's individual view.

(POST MVP)
The Fundraiser Overview would contain the fundraiser's profile and their performance stats as well as the short list of their most recent notes prioritizing the notes that are marked as follow up (which will be a boolean field in the notes table)

### Person View
The Person view will contain the person's information like primary contact information. Giving stats will be a POST MVP feature. There will be three buttons. The all contacts, all gifts, and all notes. Each of these will lead to a view that displays the relevent data.

(POST MVP)
Under the buttons will be a short list of the most recent giving history and notes.
Also, an API call to the Zillow.com API will display the value of the home the person has listed.

### New Person View + Edit
A form to input a new person or contact information and the edit version (2 views)
Delete can happen here.

### New Note View + Edit
A form to add a new note and the edit version (2 views)
Delete can happen here.

### New Gift View + Edit
A form to add a new gift and the edit version (2 views)

### New Campaign View + Edit
A form to add a new campaign and the edit version (2 views)

### Campaign View
Campaign view will show campaign data. POST MVP will also show performance data.

## MVP 
 - Notes for people and donations
 - Gift entry and reporting
 - Campaign style labeling for donations
 - People entry and reporting
 - The ability to search for people

## POST MVP
 - Fundraiser's profile with performance statistics
 - Giving statistics on people
 - Performance statistics for campaigns
 - Use of the Zillow.com API for home value
 - Short lists in the person view of the most recent gifts and notes

## Functional Components

<!-- Based on the initial logic defined in the previous game phases section try and breakdown the logic further into functional components, and by that we mean functions.  Does your logic indicate that code could be encapsulated for the purpose of reusablility.  Once a function has been defined it can then be incorporated into a class as a method.  -->

 - Database
 - Node server
 - EJS views
 - user authentication

<!-- Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted.  -->

| Component | Priority | Estimated Time | Actual Time |
| --- | :---: |  :---: | :---: |
| Build Schema | H | .5hr |  |
| Login | H | .5hr |  |
| Basic server and folder structure | H | .5hr |  |
| People Search | H | 1hr |  |
| Views: person 1hr, new note 1.5hr, new gift 1.5hr, campaign 1hr, new campaign 1hr, new person 1hr| H | 7hr |  |
| Models | H | 2hr |  |
| Controllers | H | 3hr |  |
| Routes | H | 3hr |  |
| HMake appropriate fake data | H | 2hr |  |
| all edit views | H | 2hr |  |
| Total |  | 27hrs |  |

## Helper Functions
Helper functions should be generic enought that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

| Function | Description | 

| revealScore | Reads the global variable 'score', converts it to a string padded with zeros to 4 digits, grabs the correct DOM element and updates the score on the DOM element and returns the padded score string. | 

| theBiggestY | For any given orientation of a falling object, this helper function finds the lowest point of the object to aid in collision detection | 

## Additional Libraries
jQuery is the only library used in this game. 

## Code Snippet

  let pivot = activeObj[activeObj.length - 1];
  let distance = [];
  for (let i = 0; i < activeObj.length - 1; i++) {
    distance.push({x: pivot.x - activeObj[i].x, y: pivot.y - activeObj[i].y});
  }
  for (let i = 0; i < distance.length; i++) {
    activeObj[i].x += distance[i].x;
    activeObj[i].y -= distance[i].x;
    activeObj[i].x += distance[i].y;
    activeObj[i].y += distance[i].y;
  }

This code is what is responsible for rotating the objects in a clockwise motion. It computes the distance to an arbitrarily selected pivot square on each given objects and then selects the correct place in the grid to go despite its relative position to the pivot. I'm proud of this coude because I didn't have to program any exceptions (ex: a square is both above and left of the center.).

## jQuery Discoveries
 $('') - This game really REALLY makes sure of the selectors to compute game logic and to detect collisions.
 
 .html() - I used .html to create my landing, nameScreen, optionsScreen, and gameOver pages. This method was also used to update the score during gameplay.
 
 .addClass() and .removeClass() - This was used to keep track of gameplay data and object positions

## Change Log
-creating gameboard
-object definitions
-keypress function
 -label edges and landscape for border detection
 -randomly select objects from the definitions library
 -create object gravity
 -create movement function
 -place the object on the screen
 -write a function to detect copleted lines
 -write a function to clear completed lines
 -stop active objects from entering landscape from the side
 -rewrote grabbing from the object definitions to copying from object definitions to solve a bug
 -create a death height for a gameover condition
 -create scoring
 -create a gameOver screen
 -create a landing page
 -create a name page
 -create an options page

## Issues and Resolutions
 The one major issue I had was that although I hardcoded all the starting coordinates of the objects, new objects seemed to appear inside the landscape or well outside the game board. I wasn't getting any errors. The answer was in the way my activeObj variable was grabbing objects out of the definition library. I had set the value of activeObj to the object itself so when the game logic is running on the object that activeObj is referring to and updating its coordinate values, the definitions library was also getting the original starting coordinates updated. Like we learned in class, set activeObj equal to a random object doesn't give activeObj a copy of the object but a reference to the selected object in memory.

 After hours of anguish, defeat and a thousand console logs later, I solved this with a forEach loop to copy the values from the definitions library to the activeObj object.
