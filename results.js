document.addEventListener("DOMContentLoaded", function() {
    fetch("/getResults")
        .then(response => response.json())
        .then(data => {
            document.getElementById("votesA").textContent = data.CandidateA;
            document.getElementById("votesB").textContent = data.CandidateB;
            document.getElementById("votesC").textContent = data.CandidateC;
            document.getElementById("votesD").textContent = data.CandidateD;
        })
        .catch(error => console.error("Error fetching results:", error));
});
