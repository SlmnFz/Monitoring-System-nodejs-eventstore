const express = require('express');
const router = express.Router();

const { storeSystemUsage, getAllSystemUsage, getCPUUsage, getDisksage, getMemoryUsage, getNetworkUsage } = require('../controllers/metricsController');

router.get("/store", storeSystemUsage)
router.get("/all", getAllSystemUsage)
router.get("/CPU", getCPUUsage)
router.get("/disk", getDisksage)
router.get("/memory", getMemoryUsage)
router.get("/network", getNetworkUsage)

module.exports = router