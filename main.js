document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('addPersonnelButton').addEventListener('click', addPersonnel);
    // document.getElementById('saveChangesButton').addEventListener('click', saveChanges);
    // document.getElementById('cancelEditButton').addEventListener('click', cancelEdit);
    // document.getElementById('sortButton').addEventListener('click', toggleSort);

    updateTable();
});

function addPersonnel() {
    const fullName = document.getElementById('fullName').value;
    const rank = document.getElementById('rank').value;
    const position = document.getElementById('position').value;
    const platoon = document.getElementById('platoon').value;
    const missionTime = document.getElementById('missionTime').value;
    const status = document.getElementById('status').value;
    const id = Date.now();

    const personnel = {
        fullName,
        rank,
        position,
        platoon,
        missionTime,
        status,
        id,
    };

        let personnelList = JSON.parse(localStorage.getItem('personnelList')) || [];
        personnelList.push(personnel);
        localStorage.setItem('personnelList', JSON.stringify(personnelList));
}

function updateTable() {
    let personnelList = JSON.parse(localStorage.getItem('personnelList')) || [];
    
    const tableBody = document.querySelector('#personnelTable tbody');
    tableBody.innerHTML = '';

    personnelList.forEach((person, id) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${person.fullName}</td>
            <td>${person.rank}</td>
            <td>${person.position}</td>
            <td>${person.platoon}</td>
            <td>${person.status}</td>
            <td class="action-buttons">
                <button onclick="editPersonnel(${id})">Edit</button>
                <button onclick="removePersonnel(${id})">Remove</button>
                ${person.status !== 'Retired' ? `<button onclick="startMission(${id})">Start Mission</button>` : ''}
            </td>
        `;
    });
}

function editPersonnel(id) {
    let personnelList = JSON.parse(localStorage.getItem('personnelList')) || [];
    const person = personnelList[id];

    document.getElementById('editFullName').value = person.fullName;
    document.getElementById('editRank').value = person.rank;
    document.getElementById('editPosition').value = person.position;
    document.getElementById('editPlatoon').value = person.platoon;
    document.getElementById('editMissionTime').value = person.missionTime;
    document.getElementById('editStatus').value = person.status;


    editingIndex = id;
    document.getElementById('main').style.display = 'none';
    document.getElementById('edit').style.display = 'block';
}

function removePersonnel(id) {
    let personnelList = JSON.parse(localStorage.getItem('personnelList')) || [];
    personnelList.splice(id, 1);
    localStorage.setItem('personnelList', JSON.stringify(personnelList));
    updateTable();
}
