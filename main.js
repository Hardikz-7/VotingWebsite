/* main.js */
document.addEventListener("DOMContentLoaded", function() {
    const voteForm = document.getElementById("voteForm");
    const message = document.getElementById("message");
    const resultsPage = window.location.pathname.includes("results.html");
    
    if (!resultsPage) {
        voteForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const phone = document.getElementById("phone").value;
            const candidate = document.querySelector("input[name='candidate']:checked");
            
            if (!candidate) {
                message.textContent = "Please select a candidate.";
                return;
            }
            
            if (localStorage.getItem(phone)) {
                message.textContent = "You have already voted!";
                return;
            }
            
            localStorage.setItem(phone, candidate.value);
            let votes = JSON.parse(localStorage.getItem("votes")) || {};
            votes[candidate.value] = (votes[candidate.value] || 0) + 1;
            localStorage.setItem("votes", JSON.stringify(votes));
            
            message.textContent = "Vote recorded successfully!";
        });
    } else {
        let votes = JSON.parse(localStorage.getItem("votes")) || {};
        document.getElementById("votesA").textContent = votes["Candidate A"] || 0;
        document.getElementById("votesB").textContent = votes["Candidate B"] || 0;
        document.getElementById("votesC").textContent = votes["Candidate C"] || 0;
        document.getElementById("votesD").textContent = votes["Candidate D"] || 0;
    }
});
