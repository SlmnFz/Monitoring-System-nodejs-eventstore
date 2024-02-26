const { collectNetworkUsage } = require('../services/networkService');
const NetworkUsageEvent = require('../models/networkUsage');
const { client } = require('../helpers/eventStore');
const { jsonEvent } = require('@eventstore/db-client');

async function collectAndStoreNetworkUsage() {
    try {
        const networkUsage = await collectNetworkUsage()
        const networkUsageEvent = new NetworkUsageEvent(networkUsage)
        const event = jsonEvent(networkUsageEvent)
        await client.appendToStream('network-usage-stream', event)
        console.log('network usage event collected and stored successfully');
        // res.status(200).json({ message: 'network usage event collected and stored successfully', networkUsageEvent });
    } catch (error) {
        console.error('Error collecting and storing network usage event:', error);
        // res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { collectAndStoreNetworkUsage }