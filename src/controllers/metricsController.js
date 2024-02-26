const { collectAndStoreCPUUsage } = require('./cpuController');
const { collectAndStoreDiskUsage } = require('./diskController');
const { collectAndStoreNetworkUsage } = require('./networkController');
const { collectAndStoreMemoryUsage } = require('./memoryController');
const { client } = require('../helpers/eventStore');
const { FORWARDS, START } = require('@eventstore/db-client');

async function storeSystemUsage(req, res) {
    try {
        await collectAndStoreCPUUsage()
        await collectAndStoreDiskUsage()
        await collectAndStoreMemoryUsage()
        await collectAndStoreNetworkUsage()
        res.status(200).json({ message: '✅ System Usage Stored Successfully' })
    } catch (error) {
        console.error('Error stroring system usage data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllSystemUsage(req, res) {
    try {
        const cpu = []
        const disk = []
        const memory = []
        const network = []

        // Collect system usage data
        const cpuEvents = client.readStream("cpu-usage-stream", {
            direction: FORWARDS,
            fromRevision: START,
            maxCount: 50,
        })
        for await (const resolvedEvent of cpuEvents) {
            cpu.push(resolvedEvent.event?.data)
        }

        const diskEvents = await client.readStream("disk-usage-stream", {
            direction: FORWARDS,
            fromRevision: START,
            maxCount: 50,
        })
        for await (const resolvedEvent of diskEvents) {
            disk.push(resolvedEvent.event?.data)
        }

        const memoryEvents = await client.readStream("memory-usage-stream", {
            direction: FORWARDS,
            fromRevision: START,
            maxCount: 50,
        })
        for await (const resolvedEvent of memoryEvents) {
            memory.push(resolvedEvent.event?.data)
        }

        const networkEvents = await client.readStream("network-usage-stream", {
            direction: FORWARDS,
            fromRevision: START,
            maxCount: 50,
        })
        for await (const resolvedEvent of networkEvents) {
            network.push(resolvedEvent.event?.data)
        }

        res.status(200).json({
            message: 'System Usage',
            cpu, disk, memory, network
        })
    } catch (error) {
        console.error('Error collecting system usage data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getCPUUsage(req, res) {
    try {
        const cpu = []

        // Collect system usage data
        const cpuEvents = client.readStream("cpu-usage-stream", {
            direction: FORWARDS,
            fromRevision: START,
            maxCount: 50,
        })
        for await (const resolvedEvent of cpuEvents) {
            cpu.push(resolvedEvent.event?.data)
        }

        res.status(200).json({
            message: 'CPU Usage', cpu
        })
    } catch (error) {
        console.error('Error collecting system usage data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getMemoryUsage(req, res) {
    try {
        const memory = []
        const memoryEvents = await client.readStream("memory-usage-stream", {
            direction: FORWARDS,
            fromRevision: START,
            maxCount: 50,
        })
        for await (const resolvedEvent of memoryEvents) {
            memory.push(resolvedEvent.event?.data)
        }

        res.status(200).json({
            message: 'Memory Usage', memory
        })
    } catch (error) {
        console.error('Error collecting system usage data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getDiskUsage(req, res) {
    try {
        const disk = []
        const diskEvents = await client.readStream("disk-usage-stream", {
            direction: FORWARDS,
            fromRevision: START,
            maxCount: 50,
        })
        for await (const resolvedEvent of diskEvents) {
            disk.push(resolvedEvent.event?.data)
        }

        res.status(200).json({
            message: 'Disk Usage', disk
        })
    } catch (error) {
        console.error('Error collecting system usage data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getNetworkUsage(req, res) {
    try {
        const network = []
        const networkEvents = await client.readStream("network-usage-stream", {
            direction: FORWARDS,
            fromRevision: START,
            maxCount: 50,
        })
        for await (const resolvedEvent of networkEvents) {
            network.push(resolvedEvent.event?.data)
        }

        res.status(200).json({
            message: 'Network Usage', network
        })
    } catch (error) {
        console.error('Error collecting system usage data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { storeSystemUsage, getAllSystemUsage, getCPUUsage, getDiskUsage, getMemoryUsage, getNetworkUsage }