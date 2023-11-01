# [GetawayGuide](https://github.com/candry1/final-project)

## Charlotte Andry - candry2@uic.edu | Ada Pici Nieves - apici2@uic.edu

[Demo](https://clipchamp.com/watch/CPYlmC4dQ4o) | [Frontend deployed](https://getawayguide1234.onrender.com/) | [Backend deployed](https://getawayguide123.onrender.com/) | [Checkpoint 1 plans](https://getawayguide09.onrender.com/)

## What does your application currently do?

With what we have right now, a user can navigate to our website and begin entering input related to their trip. The website can process their starting city, their destination, the amount of people their traveling with, their budget, and their travel dates. With selecting travel dates, we were able to implement a calednar feature, verse just letting our user determine teh formatting of the dates they'll be traveling. We were able to make use of the Amadeus Hotel Search API and the City Search API in order to give the user legitimate options for where they can travel throughout the world. Our Hotel Search is currently working on our backend, and is able to take in some input(through the url) and return raw information to the screen based on what is provided.

## What will your application do?

Our application is a vacation planner where you can provide your budget, destination, how many people you're traveling with, and travel dates, and our web app will then provide flight options, lodging options, and activities all within your budget and travel dates!

## What makes it different than a CRUD app? I.e., what functionality does it provide that is not just a user interface layer on top of a database of user information,and the ability to view / add to / change that information?

Our web app will take into account your budget, calculating what you can afford, using real-time pricings of everything. If your budget isn't quite feasible with your destination, the target will be more free activities, and conservative lodging. Taking into account group size, destination and budget will allow us to make this experience more personal to the user.

## What security and privacy concerns do you expect you (as developers) or your users to have with this application?

With this, whatever the users decide to book, we want that to be completely private(location, dates of travel, where they'll stay). Prices we get, we want them to be verified, to prevent overpaying unnecessarily or through the interference of someone else. We'll also look into our APIs to see how those requests are secure, so that noone will be able to get information from our third-party helpers.
