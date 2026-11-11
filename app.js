let chargenData = {};

// Fetch the JSON data exported from your Excel sheets
fetch('chargen_data.json')
    .then(response => response.json())
    .then(data => {
        chargenData = data;
        // Enable the button and update text once data is ready
        const btn = document.getElementById('generate-btn');
        btn.textContent = "Generate Character";
        btn.disabled = false;
    })
    .catch(error => console.error("Error loading JSON:", error));

// Helper function to pull a random array element
function roll(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateCharacter() {
    // 1. Roll the core mechanics
    const race = roll(chargenData.races_complete_stats);
    const charClass = roll(chargenData.classes_tr);
    const birthsign = roll(chargenData.birthsigns);
    const faction = roll(chargenData.factions_tr);
    
    // 2. Roll the Roleplay Traits
    const flaw = roll(chargenData.flaws);
    const ideal = roll(chargenData.ideals);
    const drive = roll(chargenData.drives);

    // 3. Update the HTML UI
    document.getElementById('out-race').textContent = `${race.Name} (${race.Gender})`;
    document.getElementById('out-class').textContent = charClass.Name;
    document.getElementById('out-birthsign').innerHTML = `<strong>${birthsign.Name}</strong> - <em>${birthsign.Effect}</em>`;
    document.getElementById('out-faction').textContent = `${faction.Name} (${faction.Type})`;

    document.getElementById('out-flaw').innerHTML = `<strong>${flaw['Flaw Title']}:</strong> ${flaw.Description}`;
    document.getElementById('out-ideal').innerHTML = `<strong>${ideal.Name}:</strong> ${ideal.Description}`;
    document.getElementById('out-drive').innerHTML = `<strong>${drive.Name}:</strong> ${drive.Description}`;
}

// Bind the button to the function
document.getElementById('generate-btn').addEventListener('click', generateCharacter);