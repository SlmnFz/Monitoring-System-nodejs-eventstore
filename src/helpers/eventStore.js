// src/utils/eventStore.js
const { EventStoreDBClient } = require('@eventstore/db-client');
const { EVENTSTORE_HOST, EVENTSTORE_PORT } = process.env

let client = null;

async function connectToEventStore() {
    try {
        if (!client) {
            client = EventStoreDBClient.connectionString(`esdb://${EVENTSTORE_HOST}:${EVENTSTORE_PORT}?tls=false`);
            console.log('Connected to EventStore');
        }
    } catch (error) {
        console.error('Error connecting to EventStore:', error);
        throw error;
    }
}

async function disconnectFromEventStore() {
    try {
        if (client) {
            console.log('Disconnected from EventStore');
            client = null;
        }
    } catch (error) {
        console.error('Error disconnecting from EventStore:', error);
        throw error;
    }
}
connectToEventStore()
module.exports = { client, connectToEventStore, disconnectFromEventStore };
