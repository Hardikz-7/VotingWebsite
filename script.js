/* script.js */
const form = document.getElementById("voteForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const phone = document.getElementById("phone").value;
    const candidate = document.querySelector("input[name='candidate']:checked");
    
    if (!candidate) {
        message.textContent = "Please select a candidate!";
        return;
    }
    
    if (localStorage.getItem(phone)) {
        message.textContent = "You have already voted!";
        return;
    }
    
    localStorage.setItem(phone, candidate.value);
    message.textContent = "Thank you for voting!";
});
document.getElementById("voteForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Check if this device has already voted
    if (localStorage.getItem("voted")) {
        document.getElementById("message").textContent = "You have already voted!";
        return;
    }

    let phone = document.getElementById("phone").value;
    let candidate = document.querySelector('input[name="candidate"]:checked');

    if (!candidate) {
        document.getElementById("message").textContent = "Please select a candidate.";
        return;
    }

    let voteData = { phone: phone, candidate: candidate.value };

    fetch("/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voteData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("message").textContent = data.message;
        
        // Save that this device has voted
        localStorage.setItem("voted", "true");
    })
    .catch(error => console.error("Error submitting vote:", error));
});