(function() {

  return {
    requests: {

      fetchProblems: function() {
        return {
          url: '/api/v2/problems.json?include=incident_counts',
          type: 'GET'
        };
      }
    },

    events: {
      'click .btn': 'getProblems',
      'fetchProblems.done': 'fetchProblemsSuccess',
      'fetchProblems.fail': 'fetchProblemsFail'
    },

    getProblems: function() {
      this.ajax('fetchProblems');
    },

    fetchProblemsSuccess: function(data) {
      // console.log("There are " + data.tickets.length + " Problem tickets total if >= 100 results OR this is the total on page 1 of the results for this account.");
      // console.log("Problem ticket ID: " + data.tickets[0].id + " has " + data.tickets[0].incident_count + " incidents attached.");
      // console.log("The 'created_at' value for Problem ticket ID: " + data.tickets[0].id + " is: " + createdAtTimeToString);

      var timeDateRightNow = Date.now(); // right now in ms as number since midnight of January 1, 1970, according to universal time
      var oneDays = Date.now() - 86400000; // There are 86400000 milliseconds in 24 hours
      var threeDays = Date.now() - 259200000; // There are 259200000 milliseconds in 72 hours
      var sevenDays = Date.now() - 604800000; // There are 604800000 milliseconds in 168 hours

      function compareTimesTwo() {

        for ( var i = 0 ; i < data.tickets.length ; i++ ) {

          var createdAtTimeToString = Date.parse(data.tickets[i].created_at);

          if (((oneDays < createdAtTimeToString) === true) && (data.tickets[i].incident_count >= 5)) {
            console.log("Problem ticket ID: " + data.tickets[i].id + " is TRENDING because it was created less than a day ago and it has " + data.tickets[i].incident_count + " incidents attached.");
          } else if (((threeDays < createdAtTimeToString) === true) && (data.tickets[i].incident_count >= 10)) {
            console.log("Problem ticket ID: " + data.tickets[i].id + " is TRENDING because it was created less than three days ago and it has " + data.tickets[i].incident_count + " incidents attached.");
          } else if (((sevenDays < createdAtTimeToString) === true) && (data.tickets[i].incident_count >= 15)) {
            console.log("Problem ticket ID: " + data.tickets[i].id + " is TRENDING because it was created less than a week ago and it has " + data.tickets[i].incident_count + " incidents attached.");
          } else if (((sevenDays < createdAtTimeToString) === false) && (data.tickets[i].incident_count > 20)) {
            console.log("Problem ticket ID: " + data.tickets[i].id + " was created more than a week ago but it has more than twenty incidents - it is important.");
          } else {
            console.log("Problem ticket ID: " + data.tickets[i].id + " is not significant as it was created over a week ago but has less than twenty incidents.");
          }
        }
      }

      compareTimesTwo();

    },

    fetchProblemsFail: function() {
      console.log("something's wrong.");
    }

  };

}());