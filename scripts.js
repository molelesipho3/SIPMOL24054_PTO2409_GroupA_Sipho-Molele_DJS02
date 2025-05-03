const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission which reloads the page

  try {
    // Get form data
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

    // 1. Scenario: Validation when values are missing
    // Trim whitespace from inputs before checking if they are empty
    const trimmedDividend = dividend.trim();
    const trimmedDivider = divider.trim();

    if (trimmedDividend === '' || trimmedDivider === '') {
      result.innerText = "Division not performed. Both values are required in inputs. Try again";
      return; // Stop execution if inputs are missing
    }

    // Convert inputs to numbers
    const numDividend = Number(dividend);
    const numDivider = Number(divider);

    // 2. Scenario: Providing anything that is not a number should crash the program
    // Check if inputs are valid numbers (not NaN - Not a Number)
    if (isNaN(numDividend) || isNaN(numDivider)) {
        // Log the error with stack trace before replacing the body
        console.error("Invalid input: Non-numeric value provided.", new Error().stack);
        // Replace screen content as required
        document.body.innerHTML = "<h1>Something critical went wrong. Please reload the page</h1>";
        // Optionally add a class for styling the critical error state
        document.body.classList.add("critical-error");
        return; // Stop execution
        // Note: The requirement says "crash", but in a browser context, replacing the body and logging is the closest equivalent without actually halting the browser tab. Throwing an uncaught error would also work but might be less user-friendly. The provided solution replaces the screen content as requested.
    }


    // 3. Scenario: An invalid division (divide by zero) should log an error
    // Check for division by zero
    if (numDivider === 0) {
      result.innerText = "Division not performed. Invalid number provided. Try again.";
      // Log the error to the console with a stack trace
      console.error("Division by zero attempted.", new Error().stack);
      return; // Stop execution
    }

    // 4. Scenario: Dividing numbers result in a decimal number (show whole number)
    // Perform division and round down to the nearest whole number
    const divisionResult = Math.floor(numDividend / numDivider);
    result.innerText = divisionResult;

  } catch (error) {
    // Catch any unexpected errors during execution
    // This primarily handles the explicit 'throw' for non-numeric input or any other unforeseen issues
    console.error(error); // Log the caught error and its stack trace
    document.body.innerHTML = "<h1>Something critical went wrong. Please reload the page</h1>";
    document.body.classList.add("critical-error");
  }
});