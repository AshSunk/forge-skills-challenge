/*
    GROUP A: CHALLENGE 1 (PALINDROME CHECKER)

Checks whether a given input is a palindrome.

Logic:
1. The input is converted to a lowercase string and cleaned
       to remove all characters that are not letters or numbers.
2. If the cleaned string is empty, the function returns false.
3. Two pointers start at the beginning and end of the cleaned string
       and move toward each other, comparing characters.

If any characters don't match, it returns false.
If all characters match, it returns true.

Time Complexity: O(n) - we iterate through the string once.
Space Complexity: O(n) - due to creating the "cleanStr" (pointers use O(1)).
*/
const isPalindrome = (input) => {
    //Edge case: empty or null inputs are not valid palindromes.
    if (input === null || input === undefined) return false;

    //Converts input to string, makes it lowercase, and removes special chars.
    //The regex /[^a-z0-9]/g matches anything that isn't a letter or number
    const cleanStr = String(input).toLowerCase().replace(/[^a-z0-9]/g, '');

    //Edge case: no valid characters after cleaning
    if (cleanStr.length === 0) return false;

    //Initialize pointers
    let left = 0;
    let right = cleanStr.length - 1;

    //Loop until the pointers meet in the middle.
    while (left < right) {
        //If characters at current pointers don't match, it's not a palindrome.
        if (cleanStr[left] !== cleanStr[right]) {
            return false;
        }
        //Move pointers inward.
        left++;
        right--;
    }
    //If we get through the loop without returning false, it is a palindrome.
    return true;
};

/*
    GROUP A: CHALLENGE 2 (PANDIGITAL NUMBER)


Checks whether a number is pandigital (a number containing every digit from 0 to 9 at least once).

Logic:
The number is converted to a string and each digit is stored
in a set. Sets automatically handle duplicates for us.
If the final Set has 10 unique digits, the number is pandigital.

Time Complexity: O(n) - where n is the number of digits.
Space Complexity: O(1) - the Set can have at most 10 items(digits 0-9).
*/

const isPandigital = (num) => {
    //Edge case: handle negative numbers by taking the absolute value first.
    //We only care about the digits, not the sign.
    const numString = Math.abs(num).toString();

    //Create a set from the string digits.
    //Example: "11223" becomes a Set of {1, 2, 3}
    const uniqueDigits = new Set(numString);

    //If the Set has 10 items, it means we found 0,1,2,3,4,5,6,7,8, and 9.
    return uniqueDigits.size === 10;
};


/*
    GROUP A TESTING AND VERIFICATION
*/

console.log("\nTESTING PALINDROME");

//1. Standard Words
console.log("Test 1 (Standard): 'racecar' -> " + isPalindrome("racecar")); //Expected: true
console.log("Test 2 (Standard): 'hello'   -> " + isPalindrome("hello"));   //Expected: false

//2.Sentences with punctuation & spaces
console.log("Test 3 (Sentence): 'A man, a plan, a canal: Panama' -> " +
    isPalindrome("A man, a plan, a canal: Panama")); //Expected: true

//3. Case Sensitivity
console.log("Test 4 (Case): 'RaceCar' -> " + isPalindrome("RaceCar")); // Expected: true

//4. Edge Cases (numbers as strings, empty input, and null input)
console.log("Test 5 (Number String): '12321' -> " + isPalindrome("12321")); // Expected: true
console.log("Test 6 (Empty String): ''       -> " +
    isPalindrome(""));      //Expected: false (handled by length check)
console.log("Test 7 (Null): null             -> " +
    isPalindrome(null));    //Expected: false(handled by safety check)


console.log("\nTESTING PANDIGITAL");

// 1. The perfect pandigital (0-9 exactly once)
console.log("Test 1 (Perfect): 1234567890 -> " + isPandigital(1234567890)); //Expected: true

// 2.Pandigital with duplicates (still contains 0-9)
console.log("Test 2 (Duplicates): 11223344556677889900 -> " +
    isPandigital(11223344556677889900)); //Expected: true

// 3. Missing digits
console.log("Test 3 (Missing '0'): 123456789 -> " + isPandigital(123456789)); //Expected: false

//4. Small numbers (mathematically impossible to be pandigital)
console.log("Test 4 (Too Short): 5 -> " + isPandigital(5)); //Expected: false

// 5. Negative numbers (should ignore sign and just check digits)
console.log("Test 5 (Negative): -1234567890 -> " + isPandigital(-1234567890)); //Expected: true




//------------GROUP B: QUESTION 1 (TO-DO LIST)------------

/*
DATA STRUCTURE:
We use an array of objects to store the to-do items.
Each object represents a single task with the required properties.
*/
let todoList = [];

/*
Adds a new task to the list.
Includes validation to ensure title and due date are provided.
@param {string} title - The name of the task
@param {string} description - Details about the task
@param {string} dateDue - When it is due
@param {string} status - "New", "Working on", or "Finished"
*/
const addTask = (title, description, dateDue, status = "New") => {
    //Validation: ensure title and date are not empty
    if (!title || !dateDue) {
        console.log("Error: Task must have a Title and Due Date.");
        return;
    }

    //Create the task object
    const newTask = {
        title: title,
        description: description,
        dateCreated: new Date().toDateString(),
        dateDue: dateDue,
        status: status
    };

    //Add to the end of the array
    todoList.push(newTask);
    console.log(`Added Task: "${title}"`);
};

/*
Deletes a task by its index in the list.
@param {number} index - The position of the task to remove
*/
const deleteTask = (index) => {
    //Check if index is within valid bounds
    if (index >= 0 && index < todoList.length) {
        const removed = todoList.splice(index, 1);
        console.log(`Deleted Task: "${removed[0].title}"`);
    } else {
        console.log("Error: Invalid Index for Deletion");
    }
};

/*
Edits a specific property of a task.
@param {number} index - The task to edit
@param {object} newDetails - An object containing updates
*/
const editTask = (index, newDetails) => {
    //Check if the task exists
    if (todoList[index]) {
        //Merge the new details into the existing task object
        Object.assign(todoList[index], newDetails);
        console.log(`Updated Task at index ${index}`);
    } else {
        console.log("Error: Task not found");
    }
};

/*
Helper function to mark a task as finished.
@param {number} index - The task to mark complete
*/
const markFinished = (index) => {
    editTask(index, { status: "Finished" });
};

/*
Moves a task to the very top of the list (Index 0).
@param {number} index - The current position of the task
*/
const bringToTop = (index) => {
    if (index > 0 && index < todoList.length) {
        const itemToMove = todoList.splice(index, 1)[0];
        todoList.unshift(itemToMove);
        console.log(`Moved "${itemToMove.title}" to top`);
    }
};

/*
Swaps a task with the one below it.
@param {number} index - The current position
*/
const sendDown = (index) => {
    //Can't move down if it's already the last item
    if (index >= 0 && index < todoList.length - 1) {
        const currentItem = todoList[index];
        const nextItem = todoList[index + 1];

        //Swap them
        todoList[index] = nextItem;
        todoList[index + 1] = currentItem;
        console.log(`Moved "${currentItem.title}" down`);
    }
};

/*
Swaps a task with the one above it.
@param {number} index - The current position
*/
const sendUp = (index) => {
    //Can't move up if it's already at the top (index 0)
    if (index > 0 && index < todoList.length) {
        const currentItem = todoList[index];
        const prevItem = todoList[index - 1];

        //Swap them
        todoList[index] = prevItem;
        todoList[index - 1] = currentItem;
        console.log(`Moved "${currentItem.title}" up`);
    }
};

/*
Sorts the entire list by due date (earliest to latest).
*/
const sortByDueDate = () => {
    todoList.sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue));
    console.log("List sorted by Due Date");
};

// TO-DO LIST TESTING

console.log("\n\n----------TESTING TO-DO LIST----------");

///1. Add items (standard Usage)
addTask("Finish Forge Application", "Complete To-Do List challenge", "2026-01-30");
addTask("Study for Stats Exam", "Review hypothesis testing", "2026-02-05");
addTask("Buy Groceries", "Milk, Eggs, Bread", "2026-02-07");
addTask("Laundry", "Wash gym clothes", "2026-02-03"); // Extra item to test mid-list deletion

//2. Validation check (should print Error)
addTask("Invalid Task", "No Date Provided", "");

//3. Test helper function (Mark Forge App as finished)
markFinished(0);

//4.Test editing text (changing a description)
//We change "Review hypothesis testing" to "Review regression models"
editTask(1, { description: "Review Regression Models" });

//5. Test deletion (remove "Laundry" from the list)
//Laundry was added last, so it is at index 3.
deleteTask(3);

//6. Test reordering (send up & send down)
//Move "Study for Stats" (index 1) UP above "Finish Forge" (index 0)
sendUp(1);
//Move "Buy Groceries" (index 2) DOWN (should stay at bottom or swap if valid)
sendDown(2);

//7. Test sort function
//This should re-arrange everything by date.
//Order should be: Forge (Jan 30), Stats (Feb 5), Groceries (Feb 7)
sortByDueDate();

//8. Test date update & re-sort
//Change Groceries date to be earlier than everything else (Jan 29), then re-sort.
editTask(2, { dateDue: "2026-01-29" });
sortByDueDate(); //Groceries should now be at the top

//Check state before edge cases
console.log("\nList Status (End of Standard Tests):");
console.table(todoList);

//Edge case testing
console.log("\nEDGE CASE TESTING");

//Delete invalid index
deleteTask(10); //Should print an error

//Bring top item to top (should do nothing)
bringToTop(0);

//Send down the last item (should do nothing)
sendDown(todoList.length - 1);

//Edit non-existent task
editTask(10, { status: "Working on" });

//Add a new task and mark it finished immediately
addTask("Finish Harry Potter and the Chamber of Secrets",
    "Continue from page 56", "2026-02-10", "Finished");

//Test sendUp
sendUp(2);

console.log("\nFinal List After Edge Case Tests:");
console.table(todoList);



//------------GROUP B: QUESTION 1 (RELATIONAL DATABASE)------------

