const { collectDiskUsage } = require('../services/diskService');
const DiskUsageEvent = require('../models/diskUsage');
const { client } = require('../helpers/eventStore');
const { jsonEvent } = require('@eventstore/db-client');

async function collectAndStoreDiskUsage() {
    try {
        // Collect usage
        const diskUsage = await collectDiskUsage()

        // Create instance
        const diskUsageEvent = new DiskUsageEvent(diskUsage)
        const event = jsonEvent(diskUsageEvent)
        
        // Store event
        await client.appendToStream('disk-usage-stream', event)
        console.log('disk usage event collected and stored successfully');
        // res.status(200).json({ message: 'disk usage event collected and stored successfully', diskUsageEvent });
    } catch (error) {
        console.error('Error collecting and storing disk usage event:', error);
        // res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { collectAndStoreDiskUsage }