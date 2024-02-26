const express = require('express');
const router = express.Router();

const { storeSystemUsage, getAllSystemUsage, getCPUUsage, getDiskUsage, getMemoryUsage, getNetworkUsage } = require('../controllers/metricsController');

/**
 * @swagger
 * /usage/store:
 *   get:
 *     summary: Store system usage metrics.
 *     responses:
 *       '200':
 *         description: '✅ System Usage Stored Successfully'
 *       '500':
 *         description: 'Internal Server Error'
 */
router.get("/store", storeSystemUsage);

/**
 * @swagger
 * /usage/all:
 *   get:
 *     summary: Get all system usage.
 *     responses:
 *       '200':
 *         description: 'System Usage'
 *         content:
 *          application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the success of the request.
 *                   example: 'System Usage'
 *                 cpu:
 *                   type: array
 *                   description: Array of CPU usage data.
 *                   items:
 *                     type: object
 *                     properties:
 *                       usage:
 *                         type: number
 *                         description: CPU usage percentage.
 *                         example: 50
 *                 disk:
 *                   type: array
 *                   description: Array of disk usage data.
 *                   items:
 *                     type: object
 *                     properties:
 *                       totalSpace:
 *                         type: number
 *                         description: Total disk space.
 *                         example: 1000000000
 *                       freeSpace:
 *                         type: number
 *                         description: Free disk space.
 *                         example: 500000000
 *                       usedSpace:
 *                         type: number
 *                         description: Used disk space.
 *                         example: 500000000
 *                 memory:
 *                   type: array
 *                   description: Array of memory usage data.
 *                   items:
 *                     type: object
 *                     properties:
 *                       totalMemory:
 *                         type: number
 *                         description: Total memory.
 *                         example: 8000000000
 *                       freeMemory:
 *                         type: number
 *                         description: Free memory.
 *                         example: 2000000000
 *                       usedMemory:
 *                         type: number
 *                         description: Used memory.
 *                         example: 6000000000
 *                 network:
 *                   type: array
 *                   description: Array of network usage data.
 *                   items:
 *                     type: object
 *                     properties:
 *                       bytesReceived:
 *                         type: number
 *                         description: Bytes received over the network.
 *                         example: 1000000
 *                       bytesTransmitted:
 *                         type: number
 *                         description: Bytes transmitted over the network.
 *                         example: 500000
 *       '500':
 *         description: 'Internal Server Error'
 */
router.get("/all", getAllSystemUsage);

/**
 * @swagger
 * /usage/CPU:
 *   get:
 *     summary: Get CPU usage.
 *     responses:
 *       '200':
 *         description: 'CPU Usage'
 *         content:
 *          application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the success of the request.
 *                   example: 'System Usage'
 *                 cpu:
 *                   type: array
 *                   description: Array of CPU usage data.
 *                   items:
 *                     type: object
 *                     properties:
 *                       usage:
 *                         type: number
 *                         description: CPU usage percentage.
 *                         example: 50
 *       '500':
 *         description: 'Internal Server Error'
 */
router.get("/CPU", getCPUUsage);

/**
 * @swagger
 * /usage/disk:
 *   get:
 *     summary: Get disk usage.
 *     responses:
 *       '200':
 *         description: 'Disk Usage'
 *         content:
 *          application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the success of the request.
 *                   example: 'System Usage'
 *                 disk:
 *                   type: array
 *                   description: Array of disk usage data.
 *                   items:
 *                     type: object
 *                     properties:
 *                       totalSpace:
 *                         type: number
 *                         description: Total disk space.
 *                         example: 1000000000
 *                       freeSpace:
 *                         type: number
 *                         description: Free disk space.
 *                         example: 500000000
 *                       usedSpace:
 *                         type: number
 *                         description: Used disk space.
 *                         example: 500000000
 *       '500':
 *         description: 'Internal Server Error'
 */
router.get("/disk", getDiskUsage);

/**
 * @swagger
 * /usage/memory:
 *   get:
 *     summary: Get memory usage.
 *     responses:
 *       '200':
 *         description: 'Memory Usage'
 *         content:
 *          application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the success of the request.
 *                   example: 'System Usage'
 *                 memory:
 *                   type: array
 *                   description: Array of memory usage data.
 *                   items:
 *                     type: object
 *                     properties:
 *                       totalMemory:
 *                         type: number
 *                         description: Total memory.
 *                         example: 8000000000
 *                       freeMemory:
 *                         type: number
 *                         description: Free memory.
 *                         example: 2000000000
 *                       usedMemory:
 *                         type: number
 *                         description: Used memory.
 *                         example: 6000000000
 *       '500':
 *         description: 'Internal Server Error'
 */
router.get("/memory", getMemoryUsage);

/**
 * @swagger
 * /usage/network:
 *   get:
 *     summary: Get network usage.
 *     responses:
 *       '200':
 *         description: 'Network Usage'
 *         content:
 *          application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the success of the request.
 *                   example: 'System Usage'
 *                 network:
 *                   type: array
 *                   description: Array of network usage data.
 *                   items:
 *                     type: object
 *                     properties:
 *                       bytesReceived:
 *                         type: number
 *                         description: Bytes received over the network.
 *                         example: 1000000
 *                       bytesTransmitted:
 *                         type: number
 *                         description: Bytes transmitted over the network.
 *                         example: 500000
 *       '500':
 *         description: 'Internal Server Error'
 */
router.get("/network", getNetworkUsage);

module.exports = router