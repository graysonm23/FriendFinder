var friends = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    //user input
    var userInput = req.body;
    console.log(userInput);

    //grabbing the users scores so that i can loop through them later
    var userResponses = userInput.scores;

    //creating generic variables to store data in later on
    var matchName = "";
    var matchImage = "";
    var totalDifference = 10000; // Make the initial value big for comparison

    //? Logic for looping through an array of objects
    //looping through api object
    for (i = 0; i < friends.length; i++) {
      var difference = 0;
      for (k = 0; k < userResponses.length; k++) {
        difference += Math.abs(friends[i].scores[k] - userResponses[k]);

        if (difference < totalDifference) {
          console.log("match found " + difference);
          totalDifference = difference;
          matchName = friends[i].name;
          matchImage = friends[i].photo;
        }
      }
    }
    //pushing to the array in friends.js
    friends.push(userInput);
    console.log(friends);

    res.json({ status: "OK", matchName: matchName, matchImage: matchImage });
  });
};
