import React from "react";

class DisplayTable extends React.Component {
  constructor(props) {
    super(props);
    // Initializing state with an empty list
    this.state = {
      list: []
    };

    // Binding the callAPI method to the current instance
    this.callAPI = this.callAPI.bind(this);

    // Immediately call the API when the component is instantiated
    this.callAPI();
  }

  // Method to fetch data from an API
  callAPI() {
    // Making a fetch request to a given API endpoint
    fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then((response) => response.json()) // Parsing the JSON response
      .then((data) => {
        console.log(data); // Logging the fetched data to the console
        // Note: Here the data is not set to state, it's just logged
      });
  }

  // The render method to define the UI structure
  render() {
    return (
      <div>
        {/* Placeholder for rendering UI */}
      </div>
    );
  }
}

export default DisplayTable;
