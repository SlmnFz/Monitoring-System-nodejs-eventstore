const { collectCPUUsage } = require('../services/cpuService');
const CPUUsageEvent = require('../models/cpuUsage');
const { client } = require('../helpers/eventStore');
const { jsonEvent } = require('@eventstore/db-client');
async function collectAndStoreCPUUsage() {
    try {
        // Collect CPU usage
        const cpuUsage = await collectCPUUsage();

        // Create CPUUsageEvent instance
        const cpuUsageEvent = new CPUUsageEvent(cpuUsage);
        const event = jsonEvent(cpuUsageEvent)
        
        // Store CPU usage event
        await client.appendToStream('cpu-usage-stream', event);
        console.log('CPU usage event collected and stored successfully');
        // res.status(200).json({ message: 'CPU usage event collected and stored successfully', cpuUsageEvent });
    } catch (error) {
        console.error('Error collecting and storing CPU usage event:', error);
        // res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { collectAndStoreCPUUsage };