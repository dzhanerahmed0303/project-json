const fs = require("fs");
const readlineSync = require("readline-sync");

// Load data from the JSON file
function loadData(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(`Error reading file: ${err}`);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Display all data
function displayAllData(data) {
  console.log("\nHere are all the available records:");
  data.forEach((item) => {
    console.log(`- ${item.name} (${item.code})`);
  });
}

// Display data by ID
function displayById(data, id) {
  const item = data.find((entry) => entry.id === id);
  if (item) {
    console.log(`\nDetails for ID: ${id}`);
    console.log(`Name: ${item.name}`);
    console.log(`Code: ${item.code}`);
  } else {
    console.log(`\nNo item found with ID: ${id}`);
  }
}

// Main function to run the application
async function runApp() {
  try {
    const data = await loadData("data.json"); // Load data from the JSON file

    console.log("Welcome to the JSON data viewer!");

    let userChoice;
    do {
      console.log("1. View all data");
      console.log("2. Filter by ID");
      console.log("3. Exit");

      userChoice = readlineSync.question("Please enter your choice: ");

      if (userChoice === "1") {
        displayAllData(data);
      } else if (userChoice === "2") {
        const id = parseInt(
          readlineSync.question("Enter ID to filter by: "),
          10
        );
        displayById(data, id);
      } else if (userChoice === "3") {
        console.log("Exiting... Goodbye!");
        break;
      } else {
        console.log("Invalid choice, please try again.");
      }
    } while (userChoice !== "3");
  } catch (error) {
    console.error(error);
  }
}

// Run the app
runApp();
