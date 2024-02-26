const { collectAndStoreCPUUsage } = require('./cpuController');
const { collectAndStoreDiskUsage } = require('./diskController');
const { collectAndStoreNetworkUsage } = require('./networkController');
const { collectAndStoreMemoryUsage } = require('./memoryController');
const { client } = require('../helpers/eventStore');

module.exports = (io, socket) => {
    console.log("Client Connected");

    const storeUsage = setInterval(async () => {
        try {
            await collectAndStoreCPUUsage()
            await collectAndStoreDiskUsage()
            await collectAndStoreMemoryUsage()
            await collectAndStoreNetworkUsage()
        } catch (error) {
            console.error('Error storing system usage data:', error);
        }
    }, 5000); // 5 seconds interval

    const emitUsage = setInterval(async () => {
        try {
            // Collect system usage data
            const cpuEvents = await client.readStream("cpu-usage-stream", {
                direction: 'FORWARDS',
                fromRevision: 'START',
                maxCount: 50,
            })

            const diskEvents = await client.readStream("disk-usage-stream", {
                direction: 'FORWARDS',
                fromRevision: 'START',
                maxCount: 50,
            })

            const memoryEvents = await client.readStream("memory-usage-stream", {
                direction: 'FORWARDS',
                fromRevision: 'START',
                maxCount: 50,
            })

            const networkEvents = await client.readStream("network-usage-stream", {
                direction: 'FORWARDS',
                fromRevision: 'START',
                maxCount: 50,
            })

            // Emit usage data to connected clients
            socket.emit('systemUsage', { cpuEvents, diskEvents, memoryEvents, networkEvents });
        } catch (error) {
            console.error('Error collecting and emitting system usage data:', error);
        }
    }, 10000); // 10 seconds interval

    // Clean up interval when client disconnects
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(storeUsage)
        clearInterval(emitUsage);
    });
}