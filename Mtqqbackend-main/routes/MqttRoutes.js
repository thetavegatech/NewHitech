const express = require("express");
const { getAllData,AllDataM,dischargePressure,Currentav,calculateDisPravg,VolAvg,PowerAv, getVoltageVFD,getCurrentVFD7Days,getCumUnload,getCumUnload7days,getCumUnload1month,getCumUnload3month,getCumUnload6month,AllCurrentVFD, getCurrentVFD,getCurrentVFD1Month,getCurrentVFD3Months,getCurrentVFD6Months, getPowerVFD,getPowerVFDLast7Days,getPowerVFDLast30Days,getPowerVFDLast3Months,getPowerVFDLast6Months, getLastHourData, calculateDisPr, calculateDisTr, calculatevfd, calculateVoltage,calculateVoltageLast7Days,calculateVoltageLast1Month,calculateVoltageLast3Months,calculateVoltageLast6Months, calculatePower,calculateVoltagetoday,calculateDisPrlast7days,calculateDisPrLastMonth,calculateDisPrlast3month,calculateDisPrlast6month,calculateDisProne} = require("../controller/MqttController")


const router = express()

router.get('/api/data',getAllData );
router.get('/api/dischargePressure', dischargePressure);
// router.get('/api/distr', distr);
router.get('/api/Currentav', Currentav);
router.get('/api/VolAvg', VolAvg);
router.get('/api/PowerAv', PowerAv);
// router.get('/api/getLast7DaysDisTrAndTimestamp',getLast7DaysDisTrAndTimestamp);
router.get('/api/calculateDisPravg', calculateDisPravg);


router.get('/api/AllDataM',AllDataM);

router.get('/api/CumUnload', getCumUnload );
router.get('/api/getCumUnload7days', getCumUnload7days);
router.get('/api/getCumUnload1month', getCumUnload1month);
router.get('/api/getCumUnload3month',getCumUnload3month);
router.get('/api/getCumUnload6month',getCumUnload6month);

router.get('/api/VoltageVFD', getVoltageVFD);


// router.get('/api/AllCurrentVFD',AllCurrentVFD);
router.get('/api/getCurrentVFD', getCurrentVFD);
router.get('/api/getCurrentVFD1Month',getCurrentVFD1Month);
router.get('/api/getCurrentVFD3Months',getCurrentVFD3Months);
router.get('/api/getCurrentVFD6Months', getCurrentVFD6Months);

// router.get('/api/allPowerVFD',allPowerVFD);
router.get('/api/powerVFD' , getPowerVFD)
router.get('/api/getPowerVFDLast7Days',getPowerVFDLast7Days);
router.get('/api/getPowerVFDLast30Days',getPowerVFDLast30Days);
router.get('/api/getPowerVFDLast3Months',getPowerVFDLast3Months);
router.get('/api/getPowerVFDLast6Months',getPowerVFDLast6Months);

// router.get('/api/getPowerVFDall',getPowerVFDall);


router.get('/api/onehourdate' , getLastHourData)


router.get('/api/calculateDisPr' , calculateDisPr);

router.get('/api/calculateDisTr' , calculateDisTr);

router.get('/api/calculatevfd' , calculatevfd);

// router.get('/api/AllVoltageVFDData',AllVoltageVFDData);
router.get('/api/calculateVoltage' , calculateVoltage);
router.get('/api/getCurrentVFD7Days', getCurrentVFD7Days);
router.get('/api/calculateVoltageLast1Month',calculateVoltageLast1Month);
router.get('/api/calculateVoltageLast3Months',calculateVoltageLast3Months);
router.get('/api/calculateVoltageLast6Months',calculateVoltageLast6Months);

router.get('/api/calculatePower' , calculatePower);

// router.get('/api/getAllVoltageData', getAllVoltageData);

router.get('/api/calculateVoltagetoday', calculateVoltagetoday);
router.get('/api/calculateVoltageLast7Days', calculateVoltageLast7Days);

// router.get('/api/calculateDisProne', calculateDisProne);


 router.get('/api/calculateDisPrlast7days', calculateDisPrlast7days);
 router.get('/api/calculateDisPrLastMonth', calculateDisPrLastMonth);
 router.get('/api/calculateDisPrlast3month', calculateDisPrlast3month);
 router.get('/api/calculateDisPrlast6month', calculateDisPrlast6month);

router.get('/api/calculateDisProne', calculateDisProne);
// router.get('/api/getAllVoltageData',getAllVoltageData);
// router.get('/api/calculateDisprone', calculateDisprone);


// router.get('/api/AllCumulativeUnloadHours',AllCumulativeUnloadHours);
















module.exports = router;

















































// const express = require("express");
// const Task = require("../model/TaskModel");
// const { createTask, getTasks , getTask , deleteTask , updateTask} = require("../controller/taskController");
// const router = express.Router()




// router.post("/api/tasks", createTask)
// router.get("/api/tasks", getTasks)
// router.get("/api/tasks/:id", getTask)
// router.delete("/api/tasks/:id", deleteTask)
// router.put("/api/tasks/:id", updateTask)
// module.exports = router;
