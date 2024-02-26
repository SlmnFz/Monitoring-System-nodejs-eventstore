// scripts.js

// Function to update usage data
function updateUsageData(id, dataArray) {
    const listElement = document.getElementById(id);
    listElement.innerHTML = '';

    dataArray.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = JSON.stringify(item);
        listElement.appendChild(listItem);
    });
}

// Socket connection
const socket = io();

// Listen for 'systemUsage' event from server
socket.on('systemUsage', (data) => {
    console.log('Received system usage data:', data);

    // Update CPU usage
    updateUsageData('cpuUsage', data.cpu);

    // Update disk usage
    updateUsageData('diskUsage', data.disk);

    // Update memory usage
    updateUsageData('memoryUsage', data.memory);

    // Update network usage
    updateUsageData('networkUsage', data.network);
});
