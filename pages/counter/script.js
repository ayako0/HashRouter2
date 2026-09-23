        // Initialize the counter variable
        let clicks = 0;

        // The JavaScript function that handles the logic
        function countClicks() {
            clicks += 1; // Increment the count by 1
            
            // Find the HTML element by its ID and update its text
            document.getElementById("counterDisplay").textContent = clicks;
        }
