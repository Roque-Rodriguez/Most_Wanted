
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            //! TODO
            filteredResults = searchByTraits(people); //expected 2 objects
            results = addTrait(filteredResults,people)
           // results = secondaryTrait(filteredResults, people);
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}


function searchByTraits(people) {
    
    const userInput = prompt("Enter a trait: "); 
    const userChoice = prompt(`Please enter the ${userInput}`);
    let filteredResults = []
    switch(userInput){
        case "lastname":
           filteredResults = people.filter(person => (person.lastName.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "firstname":
           filteredResults = people.filter(person => (person.firstName.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "gender":
           filteredResults = people.filter(person => (person.gender.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "eyecolor":
           filteredResults = people.filter(person => (person.eyeColor.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "occupation":
           filteredResults = people.filter(person => (person.occupation.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "dob":
           filteredResults = people.filter(person => (person.dob.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "height":
           filteredResults = people.filter(person => (person.height.toString()  === userChoice.toLowerCase()))
           break;
        case "weight":
           filteredResults = people.filter(person => (person.weight.toString()  === userChoice.toLowerCase()))
           break;
        
        
           
        }
        return filteredResults;
}

function addTrait() {
  var userInput = prompt("Would you like to add another trait? (yes/no)");
  if (userInput.toLowerCase() === "yes") {
   results = secondaryTrait(filteredResults);
   return results
    
  } else {
    // Return the results of the previous function
    return filteredResults;
  }
}


function secondaryTrait(people){
     const userInput = prompt("Enter another trait: "); 
     const userChoice = prompt(`Please enter the ${userInput}`);
    let searchResults = []
    switch(userInput){
        case "lastname":
           searchResults = people.filter(person => (person.lastName.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "firstname":
           searchResults = people.filter(person => (person.firstName.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "gender":
           searchResults = people.filter(person => (person.gender.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "eyecolor":
           searchResults = people.filter(person => (person.eyeColor.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "occupation":
          searchResults = people.filter(person => (person.occupation.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "dob":
           searchResults = people.filter(person => (person.dob.toLowerCase()  === userChoice.toLowerCase()))
           break;
        case "height":
           searchResults = people.filter(person => (person.height.toString()  === userChoice.toLowerCase()))
           break;
        case "weight":
           searchResults = people.filter(person => (person.weight.toString()  === userChoice.toLowerCase()))
           break;
    }
    return searchResults;
}





function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
     `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO
            displayPersonInfo(person);
            break;
        case "family":
            let personFamily = findPersonFamily(person, people);
           
            
            break;
        case "descendants":
           
            let personDescendants = findPersonDescendants(person, people);
            displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}


function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function displayPersonInfo(person) {
  let info = `ID: ${person.id}\n` +
             `First Name: ${person.firstName}\n` +
             `Last Name: ${person.lastName}\n` +
             `Gender: ${person.gender}\n` +
             `Date of Birth: ${person.dob}\n` +
             `Height: ${person.height}\n` +
             `Weight: ${person.weight}\n` +
             `Eye Color: ${person.eyecolor}\n` +
             `Occupation: ${person.occupation}\n` +
             `Parents: ${person.parents}\n` +
             `Current Spouse: ${person.currentSpouse}`;
    alert(info)
}

function findPersonFamily(person, people) {
  let message = '';

  
  if (Array.isArray(person.parents) && person.parents.length > 0) {
    message += 'Parents: ' + person.parents.join(', ') + '\n';
  } else {
    message += 'No parents found.\n';
  }
 if (person.currentSpouse) {
    message += 'Spouse: ' + person.currentSpouse + '\n';   
  } else {
    message += 'No spouse found.\n';
  }
  if (person.parents && person.parents.length > 0) {
    const siblings = [];

    person.parents.forEach(parent => {
      const personSiblings = people.filter(p => p.parents && p.parents.includes(parent));

      personSiblings.forEach(sibling => {
        if (sibling !== person) {
          siblings.push(sibling);
        }
      });
    });

    if (siblings.length > 0) {
      message += 'Siblings:\n';
      siblings.forEach(sibling => {
        message += 'First Name: ' + sibling.firstName + ', Last Name: ' + sibling.lastName + '\n';
      });
    } else {
      message += 'No siblings found.\n';
    }
}  
    alert(message);
}



function findPersonDescendants(person, people) {
 let message = '';
  if (person.parents && person.parents.length > 0) {
    const siblings = [];

    person.parents.forEach(parent => {
      const personSiblings = people.filter(p => p.parents && p.parents.includes(parent));

      personSiblings.forEach(sibling => {
        if (sibling !== person) {
          siblings.push(sibling);
        }
      });
    });

    if (siblings.length > 0) {
      message += 'Siblings:\n';
      siblings.forEach(sibling => {
        message += 'First Name: ' + sibling.firstName + ', Last Name: ' + sibling.lastName + '\n';
      });
    } else {
      message += 'No siblings found.\n';
    }
}  
    alert(message);
}



function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}