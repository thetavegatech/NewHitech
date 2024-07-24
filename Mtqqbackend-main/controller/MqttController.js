const moment = require('moment-timezone');
const Mqtt = require("../model/MqttModel");
const { groupBy } = require('lodash');


const getAllData = async (req, res) => {
  try {
    const mqttdata = await Mqtt.findOne().sort({ _id: -1 });

    if (mqttdata && mqttdata.RemAFCT ) {
      res.status(200).json(mqttdata);
    } else {
      res.status(404).json({ message: "RemAFCT field not found in latest Mqtt document" });
    }
  } catch (err) {
    console.log(err);
  }
};


const getCumUnload = async (req, res) => {
  try {
    const dataWithCumUnload = await Mqtt.find(
      { CumUnload: { $exists: true, $ne: null } },
      { CumUnload: 1, timestamp: 1, _id: 0 }
    );

    // Convert timestamps to Indian time
    const dataWithIndianTime = dataWithCumUnload.map(item => ({
      CumUnload: item.CumUnload,
      timestamp: new Date(item.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata', // Indian time zone
      }),
    }));

    res.json(dataWithIndianTime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 1w 
const getCumUnload7days = async (req, res) => {
  try {
    const dataWithCumUnload = await Mqtt.find(
      { CumUnload: { $exists: true, $ne: null } },
      { CumUnload: 1, timestamp: 1, _id: 0 }
    );
// Convert timestamps to Indian time
    const dataWithIndianTime = dataWithCumUnload.map(item => ({
      CumUnload: item.CumUnload,
      timestamp: new Date(item.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata', // Indian time zone
      }),
    }));

    res.json(dataWithIndianTime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//  1month 
const getCumUnload1month = async (req, res) => {
  try {
    const dataWithCumUnload = await Mqtt.find(
      { CumUnload: { $exists: true, $ne: null } },
      { CumUnload: 1, timestamp: 1, _id: 0 }
    );

    // Convert timestamps to Indian time
    const dataWithIndianTime = dataWithCumUnload.map(item => ({
      CumUnload: item.CumUnload,
      timestamp: new Date(item.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata', // Indian time zone
      }),
    }));

    res.json(dataWithIndianTime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 3 month 
const getCumUnload3month = async (req, res) => {
  try {
    const dataWithCumUnload = await Mqtt.find(
      { CumUnload: { $exists: true, $ne: null } },
      { CumUnload: 1, timestamp: 1, _id: 0 }
    );

    // Convert timestamps to Indian time
    const dataWithIndianTime = dataWithCumUnload.map(item => ({
      CumUnload: item.CumUnload,
      timestamp: new Date(item.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata', // Indian time zone
      }),
    }));

    res.json(dataWithIndianTime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 6month 
const getCumUnload6month = async (req, res) => {
  try {
    const dataWithCumUnload = await Mqtt.find(
      { CumUnload: { $exists: true, $ne: null } },
      { CumUnload: 1, timestamp: 1, _id: 0 }
    );

    // Convert timestamps to Indian time
    const dataWithIndianTime = dataWithCumUnload.map(item => ({
      CumUnload: item.CumUnload,
      timestamp: new Date(item.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata', // Indian time zone
      }),
    }));

    res.json(dataWithIndianTime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






//last one hours data
const getLastHourData = async (req, res) => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const data = await Mqtt.find(
      { $and: [{ timestamp: { $exists: true } }, { Date: { $exists: true } }, { timestamp: { $gte: oneHourAgo } }] },
      { timestamp: 1, Date: 1, _id: 0 }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






// fetching the Voltage vfd data form the backend
const getVoltageVFD = async (req, res) => {
  try {
    const data = await Mqtt.find({ VoltageVFD: { $exists: true } }, { VoltageVFD: 1, timestamp: 1, _id: 0 })
      .sort({ timestamp: -1 })
      .limit(360);

    if (data.length === 0) {
      // If VoltageVFD field doesn't exist or no data found, return an empty array or appropriate response
      return res.json([]);
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};








// const getFrequencyvdfTimeinterval = async (req, res) => {
//   try {
//     const { timeInterval } = req.params;
//     const now = new Date();
//     const startTime = new Date(now.getTime() - timeInterval * 60000);

//     const options = { timeZone: 'Asia/Kolkata' };
//     const startTimeInIndia = startTime.toLocaleString('en-US', options);
//     const nowInIndia = now.toLocaleString('en-US', options);

//     const frequencyVFDData = await Mqtt.find(
//       { timestamp: { $gte: startTime, $lte: now } },
//       { FrequencyVFD: 1, timestamp: 1, _id: 0 }
//     ).sort({ timestamp: 1 });

//     res.json({ data: frequencyVFDData, startTime: startTimeInIndia, now: nowInIndia });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// This Api is fetching the data form the backend  CumStandby



//This api is fetching the data form the backend  CumSTC

// const getCumSTC = async (req, res) => {
//   try {
//     const dataWithCumSTC = await Mqtt.find(
//       { CumSTC: { $exists: true, $ne: null } },
//       { CumSTC: 1, timestamp: 1, _id: 0 });
//     res.json(dataWithCumSTC);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

//This api is fetching the data from the backend CumLDC


//CurrentVFD data

// const getCurrentVFD = async (req, res) => {
//   try {
//     const data = await Mqtt.find({ CurrentVFD: { $exists: true } }, { CurrentVFD: 1, timestamp: 1, _id: 0 })
//       .sort({ timestamp: -1 })
//       .limit(180)
//       .lean();
//     if (data.length === 0) {
//       return res.json([]);
//     }
//     const reversedData = data.reverse();
//     res.status(200).json(reversedData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// all CurrentVFD 
// const AllCurrentVFD = async (req, res) => {
//   try {
//     // Fetch all CurrentVFD data from the database
//     const data = await Mqtt.find(
//       { CurrentVFD: { $exists: true } },
//       { CurrentVFD: 1, _id: 0 } // Exclude timestamp from the projection
//     ).lean();

//     if (data.length === 0) {
//       return res.json([]);
//     }

//     // Extract CurrentVFD values
//     const currentVFDValues = data.map(item => item.CurrentVFD);

//     res.status(200).json(currentVFDValues);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { AllCurrentVFD };
 

const getCurrentVFD = async (req, res) => {
  try {
    const data = await Mqtt.find(
      { CurrentVFD: { $exists: true } },
      { CurrentVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: -1 })
      .limit(180)
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    // Convert timestamps to Indian time
    const dataWithIndianTime = data.reverse().map(item => ({
      CurrentVFD: item.CurrentVFD,
      timestamp: new Date(item.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata', // Indian time zone
      }),
    }));

    res.status(200).json(dataWithIndianTime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 1W 
const getCurrentVFD7Days = async (req, res) => {
  try {
    // Calculate the timestamp for 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 2);

    const data = await Mqtt.find(
      {
        CurrentVFD: { $exists: true },
        timestamp: { $gte: sevenDaysAgo }, // Filter for timestamp within the last 7 days
      },
      { CurrentVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: -1 })
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    // Convert timestamps to Indian time
    const dataWithIndianTime = data.reverse().map(item => ({
      CurrentVFD: item.CurrentVFD,
      timestamp: new Date(item.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata', // Indian time zone
      }),
    }));

    res.status(200).json(dataWithIndianTime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCurrentVFD7Days };


// 1M 
const getCurrentVFD1Month = async (req, res) => {
  try {
    const data = await Mqtt.find(
      { CurrentVFD: { $exists: true } },
      { CurrentVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: -1 })
      //.limit(30 * 24 * 60) // 30 days * 24 hours * 60 minutes
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    // Convert timestamps to Indian time
    const dataWithIndianTime = data.reverse().map(item => ({
      CurrentVFD: item.CurrentVFD,
      timestamp: new Date(item.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata', // Indian time zone
      }),
    }));

    res.status(200).json(dataWithIndianTime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCurrentVFD1Month };

// 3month
const getCurrentVFD3Months = async (req, res) => {
  try {
    const data = await Mqtt.find(
      { CurrentVFD: { $exists: true } },
      { CurrentVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: -1 })
     //.limit(90 * 24 * 60)  // 90 days * 24 hours * 60 minutes
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    // Convert timestamps to Indian time
    const dataWithIndianTime = data.reverse().map(item => ({
      CurrentVFD: item.CurrentVFD,
      timestamp: new Date(item.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata', // Indian time zone
      }),
    }));

    res.status(200).json(dataWithIndianTime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCurrentVFD3Months };

// 6m
const getCurrentVFD6Months = async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 2); // Subtract 6 months

    const data = await Mqtt.find(
      {
        CurrentVFD: { $exists: true },
        timestamp: { $gte: startDate },
      },
      { CurrentVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: 1 }) // Sort in ascending order
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    // Convert timestamps to Indian time
    const dataWithIndianTime = data.map(item => ({
      CurrentVFD: item.CurrentVFD,
      timestamp: new Date(item.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata', // Indian time zone
      }),
    }));

    res.status(200).json(dataWithIndianTime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCurrentVFD6Months };











//PowerVFD 
const getPowerVFD = async (req, res) => {
  try {
    const data = await Mqtt.find({ PowerVFD: { $exists: true } }, { PowerVFD: 1, timestamp: 1, _id: 0 })
      .sort({ timestamp: -1 })
      .limit(90)
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }
    const formattedData = data.map(item => ({
      PowerVFD: item.PowerVFD,
      timestamp: new Date(item.timestamp).toLocaleString(), // Convert timestamp to local time
    }));
    const reversedData = formattedData.reverse();
    res.status(200).json(reversedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// all data 
// const allPowerVFD = async (req, res) => {
//   try {
//     const data = await Mqtt.find({ PowerVFD: { $exists: true } }, { PowerVFD: 1, timestamp: 1, _id: 0 })
//       .sort({ timestamp: 1 }) // Sort by timestamp in ascending order
//       .lean();

//     if (data.length === 0) {
//       return res.json([]);
//     }

//     const formattedData = data.map(item => ({
//       PowerVFD: item.PowerVFD,
//       timestamp: new Date(item.timestamp).toLocaleString(), // Convert timestamp to local time
//     }));

//     res.status(200).json(formattedData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { allPowerVFD };


// 7 days 
// const getPowerVFDLast7Days = async (req, res) => {
//   try {
//     // Calculate the timestamp for 7 days ago
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     const data = await Mqtt.find(
//       {
//         PowerVFD: { $exists: true },
//         timestamp: { $gte: sevenDaysAgo },
//       },
//       { PowerVFD: 1, timestamp: 1, _id: 0 }
//     )
//       .sort({ timestamp: 1 }) // Sort in ascending order to get data for the last 7 days
//       .lean();

//     if (data.length === 0) {
//       return res.json([]);
//     }

//     const formattedData = data.map(item => ({
//       PowerVFD: item.PowerVFD,
//       timestamp: new Date(item.timestamp).toLocaleString(), // Convert timestamp to local time
//     }));

//     res.status(200).json(formattedData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { getPowerVFDLast7Days };
const getPowerVFDLast7Days = async (req, res) => {
  try {
    // Calculate the date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 1);

    // Find data within the last 7 days
    const data = await Mqtt.find({ 
      PowerVFD: { $exists: true }, 
      timestamp: { $gte: sevenDaysAgo } // Data within the last 7 days
    }, { 
      PowerVFD: 1, 
      timestamp: 1, 
      _id: 0 
    })
    .sort({ timestamp: -1 })
    .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    // Format data
    const formattedData = data.map(item => ({
      PowerVFD: item.PowerVFD,
      timestamp: new Date(item.timestamp).toLocaleString(), // Convert timestamp to local time
    }));

    // Reverse the order if needed
    const reversedData = formattedData.reverse();
    
    res.status(200).json(reversedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
};

module.exports = { getPowerVFDLast7Days };

// 1month 
// const getPowerVFDLastMonth = async (req, res) => {
//   try {
//     // Calculate the timestamp for 1 month ago
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

//     const data = await Mqtt.find(
//       {
//         PowerVFD: { $exists: true },
//         timestamp: { $gte: oneMonthAgo },
//       },
//       { PowerVFD: 1, timestamp: 1, _id: 0 }
//     )
//       .sort({ timestamp: 1 })
//       .lean();

//     if (data.length === 0) {
//       return res.json([]);
//     }

//     const formattedData = data.map(item => ({
//       PowerVFD: item.PowerVFD,
//       timestamp: new Date(item.timestamp).toLocaleString(), // Convert timestamp to local time
//     }));

//     res.status(200).json(formattedData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { getPowerVFDLastMonth };
const getPowerVFDLast30Days = async (req, res) => {
  try {
    // Calculate the date 1 month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2);

    // Find data within the last 1 month
    const data = await Mqtt.find({ 
      PowerVFD: { $exists: true }, 
      timestamp: { $gte: oneMonthAgo } // Data within the last 1 month
    }, { 
      PowerVFD: 1, 
      timestamp: 1, 
      _id: 0 
    })
    .sort({ timestamp: -1 })
    .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    // Format data
    const formattedData = data.map(item => ({
      PowerVFD: item.PowerVFD,
      timestamp: new Date(item.timestamp).toLocaleString(), // Convert timestamp to local time
    }));

    // Reverse the order if needed
    const reversedData = formattedData.reverse();
    
    res.status(200).json(reversedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
};

module.exports = { getPowerVFDLast30Days };


// 3month 
const getPowerVFDLast3Months = async (req, res) => {
  try {
    // Calculate the timestamp for 3 months ago
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 2);

    const data = await Mqtt.find(
      {
        PowerVFD: { $exists: true },
        timestamp: { $gte: threeMonthsAgo },
      },
      { PowerVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: 1 })
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    const formattedData = data.map(item => ({
      PowerVFD: item.PowerVFD,
      timestamp: new Date(item.timestamp).toLocaleString(), // Convert timestamp to local time
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPowerVFDLast3Months };

// 6month 
const getPowerVFDLast6Months = async (req, res) => {
  try {
    // Calculate the timestamp for 6 months ago
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 2);

    const data = await Mqtt.find(
      {
        PowerVFD: { $exists: true },
        timestamp: { $gte: sixMonthsAgo },
      },
      { PowerVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: 1 })
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    const formattedData = data.map(item => ({
      PowerVFD: item.PowerVFD,
      timestamp: new Date(item.timestamp).toLocaleString(), // Convert timestamp to local time
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPowerVFDLast6Months };




















// Get highest value

// Example usage
// const calculate = async (req, res) => {
//   try {
//     const currentDate = new Date(); // Create a Date object for the current date
//     const currentDay = currentDate.getDate()
//     console.log(currentDay)
    
//     //  const data = await Mqtt.find({ timestamp : 1}).sort({_id : -1});
//      const data = await Mqtt.find({Date : currentDay});
    
//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
// chalu 
// const calculateVoltagetoday = async (req, res) => {
//   try {
//     const data = await Mqtt.find(
//       { VoltageVFD: { $exists: true } },
//       { VoltageVFD: 1, timestamp: 1, _id: 0 }
//     )
//       .sort({ timestamp: -1 })
//       .limit(500)
//       .lean();

//     if (data.length === 0) {
//       // If VoltageVFD field doesn't exist or no data found, return an empty array or appropriate response
//       return res.json([]);
//     }

//     // Format timestamp to GMT
//     const formattedData = data.map(item => ({
//       VoltageVFD: item.VoltageVFD,
//       timestamp: new Date(item.timestamp).toLocaleString('en-US', { timeZone: 'UTC' }),
//     }));

//     // Reverse the array if needed
//     const reversedData = formattedData.reverse();

//     res.status(200).json(reversedData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { calculateVoltagetoday };

// new on 


// dp 
// const calculateDisProne = async (req, res) => {
//   try {
//     const data = await Mqtt.find({ DisPr: { $exists: true } }, { DisPr: 1, timestamp: 1, _id: 0 });

//     if (data.length === 0) {
//       return res.status(404).json({ message: 'No data found for discharge pressure' });
//     }

//     const disPrValues = data.map(item => ({ DisPr: item.DisPr, timestamp: item.timestamp }));

//     const resultArray = {
//       data: disPrValues,
//     };

//     res.status(200).json(resultArray);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = { calculateDisProne };












// this api for charts
const calculateVoltagetoday = async (req, res) => {
  try {
    const data = await Mqtt.find(
      { VoltageVFD: { $exists: true } },
      { VoltageVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: -1 })
      .limit(500)
      .lean();

    if (data.length === 0) {
      // If VoltageVFD field doesn't exist or no data found, return an empty array or appropriate response
      return res.json([]);
    }

    // Format timestamp to local time
    const formattedData = data.map(item => ({
      VoltageVFD: item.VoltageVFD,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));

    // Reverse the array if needed
    const reversedData = formattedData.reverse();

    res.status(200).json(reversedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculateVoltagetoday };

// 7 days 
const calculateVoltageLast7Days = async (req, res) => {
  try {
    // Calculate the timestamp for 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 2);

    const data = await Mqtt.find(
      {
        VoltageVFD: { $exists: true },
        timestamp: { $gte: sevenDaysAgo },
      },
      { VoltageVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: 1 }) // Sort in ascending order to get data from the last 7 days
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    // Format timestamp to local time
    const formattedData = data.map(item => ({
      VoltageVFD: item.VoltageVFD,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculateVoltageLast7Days };

// 1month 
const calculateVoltageLast1Month = async (req, res) => {
  try {
    // Calculate the timestamp for 1 month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const data = await Mqtt.find(
      {
        VoltageVFD: { $exists: true },
        timestamp: { $gte: oneMonthAgo },
      },
      { VoltageVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: 1 }) // Sort in ascending order to get data for the last 1 month
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    // Format timestamp to local time
    const formattedData = data.map(item => ({
      VoltageVFD: item.VoltageVFD,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculateVoltageLast1Month };

// 3month 
const calculateVoltageLast3Months = async (req, res) => {
  try {
    // Calculate the timestamp for 3 months ago
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 2);

    const data = await Mqtt.find(
      {
        VoltageVFD: { $exists: true },
        timestamp: { $gte: threeMonthsAgo },
      },
      { VoltageVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: 1 }) // Sort in ascending order to get data for the last 3 months
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    // Format timestamp to local time
    const formattedData = data.map(item => ({
      VoltageVFD: item.VoltageVFD,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculateVoltageLast3Months };


// 6 month 
const calculateVoltageLast6Months = async (req, res) => {
  try {
    // Calculate the timestamp for 6 months ago
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 2);

    const data = await Mqtt.find(
      {
        VoltageVFD: { $exists: true },
        timestamp: { $gte: sixMonthsAgo },
      },
      { VoltageVFD: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: 1 }) // Sort in ascending order to get data for the last 6 months
      .lean();

    if (data.length === 0) {
      return res.json([]);
    }

    // Format timestamp to local time
    const formattedData = data.map(item => ({
      VoltageVFD: item.VoltageVFD,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculateVoltageLast6Months };

// all data 
// const AllVoltageVFDData = async (req, res) => {
//   try {
//     const data = await Mqtt.find(
//       { VoltageVFD: { $exists: true } },
//       { VoltageVFD: 1, _id: 0 } // Exclude timestamp from the projection
//     )
//       .sort({ timestamp: -1 })
//       .lean();

//     if (data.length === 0) {
//       // If VoltageVFD field doesn't exist or no data found, return an empty array or appropriate response
//       return res.json([]);
//     }

//     // Extract VoltageVFD values
//     const voltageVFDValues = data.map(item => item.VoltageVFD);

//     // Reverse the array if needed
//     const reversedData = voltageVFDValues.reverse();

//     res.status(200).json(reversedData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { AllVoltageVFDData };



























// runtime current day data
const calculateDisProne = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day

    const data = await Mqtt.find(
      {
        DisPr: { $exists: true },
        timestamp: { $gte: today },
      },
      { DisPr: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: -1 })
      .lean();

    if (data.length === 0) {
      // If DisPr field doesn't exist or no data found, return an empty array or appropriate response
      return res.json([]);
    }

    // Format timestamp to local time
    const formattedData = data.map(item => ({
      DisPr: item.DisPr,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));

    // Reverse the array if needed
    const reversedData = formattedData.reverse();

    res.status(200).json(reversedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculateDisProne };











// new 
// const calculateDisProne = async (req, res) => {
//   try {
//     let startDate = new Date();
//     startDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day

//     // Handle different durations
//     if (req.query.duration === '1D') {
//       // Fetch data for the past day
//       startDate.setDate(startDate.getDate() - 1);
//     } 
//      if (req.query.duration === '1W') {
//       // Fetch data for the past week
//       startDate.setDate(startDate.getDate() - 7);
//     } else if (req.query.duration === '1M') {
//       // Fetch data for the past month
//       startDate.setMonth(startDate.getMonth() - 30);
//     } else if (req.query.duration === '3M') {
//       // Fetch data for the past 3 months
//       startDate.setMonth(startDate.getMonth() - 90);
//     } else if (req.query.duration === '6M') {
//       // Fetch data for the past 6 months
//       startDate.setMonth(startDate.getMonth() - 180);
//     }

//     const data = await Mqtt.find(
//       {
//         DisPr: { $exists: true },
//         timestamp: { $gte: startDate },
//       },
//       { DisPr: 1, timestamp: 1, _id: 0 }
//     )
//       .sort({ timestamp: -1 })
//       .lean();

//     if (data.length === 0) {
//       // If DisPr field doesn't exist or no data found, return an empty array or appropriate response
//       return res.json([]);
//     }

//     // Format timestamp to local time
//     const formattedData = data.map((item) => ({
//       DisPr: item.DisPr,
//       timestamp: new Date(item.timestamp).toLocaleString(),
//     }));

//     // Reverse the array if needed
//     const reversedData = formattedData.reverse();

//     res.status(200).json(reversedData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { calculateDisProne };























// currentDay data off all cards from here

const calculateDisPr = async (req, res) => {
  try {
    const currentDate = new Date(); // Create a Date object for the current date
    const currentDay = currentDate.getDate();

    const data = await Mqtt.find({ Date: currentDay }, { DisPr: 1, _id: 0 });

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found for the current date' });
    }
   const disPrValues = data.map(item => item.DisPr);
    const minValue = Math.min(...disPrValues);
    const maxValue = Math.max(...disPrValues);

    const resultArray = {
      // values: disPrValues,
      minValue,
      maxValue,
      averageValue: disPrValues.reduce((acc, value) => acc + value, 0) / disPrValues.length
    };
    res.status(200).json(resultArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// averg 
const calculateDisPravg = async (req, res) => {
  try {
    const currentDate = new Date(); // Create a Date object for the current date

    // Initialize an array to store the average DisPr for each of the last 7 days
    const averageDisPrArray = [];

    // Calculate the average DisPr for each of the last 7 days
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000); // Calculate the date i days ago

      const data = await Mqtt.find(
        { Date: currentDay.getDate() },
        { DisPr: 1, _id: 0 }
      );

      let totalDisPr = 0;
      let totalDaysWithData = 0;

      if (data.length > 0) {
        for (const item of data) {
          totalDisPr += item.DisPr;
          totalDaysWithData++;
        }
      }

      const averageDisPr = totalDisPr / totalDaysWithData;
      averageDisPrArray.push(averageDisPr);
    }

    res.status(200).json({ averageDisPrArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};






 




// temperature 

const calculateDisTr = async (req, res) => {
  try {
    const currentDate = new Date(); // Create a Date object for the current date
    const currentDay = currentDate.getDate();

    const data = await Mqtt.find({ Date: currentDay }, { DisTr: 1, _id: 0 });

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found for the current date' });
    }
   const disTrValues = data.map(item => item.DisTr);
    const minValue = Math.min(...disTrValues);
    const maxValue = Math.max(...disTrValues);

    const resultArray = {
      // values: disTrValues,
      minValue,
      maxValue,
      averageValue: disTrValues.reduce((acc, value) => acc + value, 0) / disTrValues.length
    };
    res.status(200).json(resultArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// CurrentVFD 
const calculatevfd = async (req, res) => {
  try {
    const currentDate = new Date(); // Create a Date object for the current date
    const currentDay = currentDate.getDate();

    const data = await Mqtt.find({ Date: currentDay }, { CurrentVFD: 1, _id: 0 });

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found for the current date' });
    }
   const vfdValues = data.map(item => item.CurrentVFD);
    const minValue = Math.min(...vfdValues.filter(value => value > 0));
    const maxValue = Math.max(...vfdValues);

    const resultArray = {
      //  values: vfdValues,
      minValue,
      maxValue,
      averageValue: vfdValues.reduce((acc, value) => acc + value, 0) / vfdValues.length
    };
    res.status(200).json(resultArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// VoltageVFD 

const calculateVoltage = async (req, res) => {
  try {
    const currentDate = new Date(); // Create a Date object for the current date
    const currentDay = currentDate.getDate();

    const data = await Mqtt.find({ Date: currentDay }, { VoltageVFD: 1, _id: 0 });

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found for the current date' });
    }
   const voltageValues = data.map(item => item.VoltageVFD);
    const minValue = Math.min(...voltageValues.filter(value => value > 0));
    const maxValue = Math.max(...voltageValues);

    const resultArray = {
      // values: voltageValues,
      minValue,
      maxValue,
      averageValue: voltageValues.reduce((acc, value) => acc + value, 0) / voltageValues.length
    };
    res.status(200).json(resultArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





// PowerVFD 

const calculatePower = async (req, res) => {
  try {
    const currentDate = new Date(); // Create a Date object for the current date
    const currentDay = currentDate.getDate();

    const data = await Mqtt.find({ Date: currentDay }, { PowerVFD: 1, _id: 0 });
 
    // If no data is found, return a 404 response with a message
    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found for the current date' });
    }
    
    // Extract the PowerVFD values from the found data
   const PowerValues = data.map(item => item.PowerVFD);
   
    const minValue = Math.min(...PowerValues.filter(value => value > 0));
    const maxValue = Math.max(...PowerValues);
    // const minValue = Math.max(...data.map(item => item.daylow), 0);
    

    const resultArray = {
      // values: PowerValues,
      minValue,
      maxValue,
      // daylow,
      averageValue: PowerValues.reduce((acc, value) => acc + value, 0) / PowerValues.length
    };
    res.status(200).json(resultArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// last 7 days data of dishcharge pressure 
const calculateDisPrlast7days = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const data = await Mqtt.find(
      {
        DisPr: { $exists: true },
        timestamp: { $gte: sevenDaysAgo },
      },
      { DisPr: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: -1 })
      .lean();

    if (data.length === 0) {
      // If DisPr field doesn't exist or no data found, return an empty array or appropriate response
      return res.json([]);
    }

    // Format timestamp to local time
    const formattedData = data.map(item => ({
      DisPr: item.DisPr,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));

    // Reverse the array if needed
    const reversedData = formattedData.reverse();

    res.status(200).json(reversedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculateDisPrlast7days };


// last one month 

const calculateDisPrLastMonth = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 30);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const data = await Mqtt.find(
      {
        DisPr: { $exists: true },
        timestamp: { $gte: sevenDaysAgo },
      },
      { DisPr: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: -1 })
      .lean();

    if (data.length === 0) {
      // If DisPr field doesn't exist or no data found, return an empty array or appropriate response
      return res.json([]);
    }

    // Format timestamp to local time
    const formattedData = data.map(item => ({
      DisPr: item.DisPr,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));

    // Reverse the array if needed
    const reversedData = formattedData.reverse();

    res.status(200).json(reversedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculateDisPrLastMonth };



// 3month 

const calculateDisPrlast3month = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 90);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const data = await Mqtt.find(
      {
        DisPr: { $exists: true },
        timestamp: { $gte: sevenDaysAgo },
      },
      { DisPr: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: -1 })
      .lean();

    if (data.length === 0) {
      // If DisPr field doesn't exist or no data found, return an empty array or appropriate response
      return res.json([]);
    }

    // Format timestamp to local time
    const formattedData = data.map(item => ({
      DisPr: item.DisPr,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));

    // Reverse the array if needed
    const reversedData = formattedData.reverse();

    res.status(200).json(reversedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculateDisPrlast3month };



// 6month 
const calculateDisPrlast6month = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 180);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const data = await Mqtt.find(
      {
        DisPr: { $exists: true },
        timestamp: { $gte: sevenDaysAgo },
      },
      { DisPr: 1, timestamp: 1, _id: 0 }
    )
      .sort({ timestamp: -1 })
      .lean();

    if (data.length === 0) {
      // If DisPr field doesn't exist or no data found, return an empty array or appropriate response
      return res.json([]);
    }

    // Format timestamp to local time
    const formattedData = data.map(item => ({
      DisPr: item.DisPr,
      timestamp: new Date(item.timestamp).toLocaleString(),
    }));

    // Reverse the array if needed
    const reversedData = formattedData.reverse();

    res.status(200).json(reversedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { calculateDisPrlast6month };



// cumulativerh 
// all data 
// const AllCumulativeUnloadHours = async (req, res) => {
//   try {
//     // Fetch all CumulativeUnloadHours data from the database
//     const data = await Mqtt.find(
//       { CumulativeUnloadHours: { $exists: true } },
//       { CumulativeUnloadHours: 1, timestamp: 1, _id: 0 }
//     ).lean();

//     if (data.length === 0) {
//       // If no data is found, return an empty array
//       return res.json([]);
//     }

//     // Format timestamp to local time and map the CumulativeUnloadHours values
//     const formattedData = data.map(item => ({
//       CumulativeUnloadHours: item.CumulativeUnloadHours,
//       timestamp: new Date(item.timestamp).toLocaleString(),
//     }));

//     // Reverse the array if needed
//     const reversedData = formattedData.reverse();

//     res.status(200).json(reversedData);
//   } catch (err) {
//     // If there's any error during the process, return a 500 Internal Server Error response with an appropriate message
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = { AllCumulativeUnloadHours };
const AllDataM = async (req, res) => {
  try {
    let query = {};

    // Check if startDate and endDate query parameters are provided
    if (req.query.startDate && req.query.endDate) {
      // Convert startDate and endDate strings to Date objects
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);

      // Add DateTime filter to the query
      query = {
        timestamp: {
          $gte: startDate,
          $lte: endDate,
        },
         // Exclude records where DisPr is null
         DisPr: { $ne: null }
        };
      } else {
        // Exclude records where DisPr is null
        query = {
          DisPr: { $ne: null }
        // };
      // }
      };
    }

    // Fetch data based on the query and sort by DateTime in descending order
    const data = await Mqtt.find(query).sort({ timestamp: -1 }).limit(2000);

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
};

module.exports = { AllDataM };







// averager 
// const dischargePressure = async (req, res) => {
//   try {
//     // Get StartDate and EndDate from request query parameters
//     const startDate = req.query.startDate;
//     const endDate = req.query.endDate;

//     // Build the query object to filter records based on StartDate and EndDate
//     const query = {};
//     if (startDate && endDate) {
//       query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
//     }

//     // Fetch records from the database with the specified field (DisPr) and filtered by Date_Time
//     const records = await Mqtt.find(query, { _id: 0, timestamp: 1, DisPr: 1 }).sort({ timestamp: -1 }).lean();

//     // Prepare the response array
//     const responseArray = records.map(record => ({
//       timestamp: new Date(record.timestamp).toLocaleString(),
//       DisPr: record.DisPr
//     }));

//     res.status(200).json(responseArray);
//   } catch (err) {
//     // Handle errors
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// trying just
// const dischargePressure = async (req, res) => {
//   try {
//     // Get the field name from the request parameters
//     const field = "DisPr"; // Assuming DisPr is the field name for Discharge Pressure
//     // If you want to get the field name dynamically from the request parameters, uncomment the line below:
//     // const field = req.params.field;

//     // Get StartDate and EndDate from request query parameters
//     const startDate = req.query.startDate;
//     const endDate = req.query.endDate;

//     // Build the projection object to select the specified field
//     const projection = { _id: 0, timestamp: 1 };
//     projection[field] = 1;

//     // Build the query object to filter records based on StartDate and EndDate
//     const query = {};
//     if (startDate && endDate) {
//       query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
//     }

//     // Fetch records from the database with the specified field and filtered by Date_Time
//     const records = await Mqtt.find(query, projection).sort({ _id: -1 }).lean();

//     // Prepare the response array
//     const responseArray = [];

//     // Define the size of each chunk
//     const chunkSize = 1; // Set chunk size to 1 for now, change as needed

//     // Group records into chunks of specified size and calculate averages for different time intervals
//     for (let i = 0; i < records.length; i += chunkSize) {
//       // Take records for each chunk
//       const group = records.slice(i, i + chunkSize);
      
//       // Calculate averages for different time intervals
//       const averages = {
//         "1_day_average": calculateAverage(group, field, 1),
//         "7_days_average": calculateAverage(group, field, 7),
//         "15_days_average": calculateAverage(group, field, 15),
//         "1_month_average": calculateAverage(group, field, 30),
//         "3_months_average": calculateAverage(group, field, 90)
//       };

//       const dateTime = group[0].timestamp; // Extract Date_Time field
//       responseArray.push({ timestamp: dateTime, averages });
//     }

//     // Send the response with the array of values
//     res.status(200).json(responseArray);
//   } catch (err) {
//     // Handle errors
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Function to calculate average of a field for a given number of days
// const calculateAverage = (records, field, days) => {
//   const values = records.map(record => record[field]);
//   const filteredValues = values.filter(value => value !== undefined && value !== null);
//   const numRecords = Math.min(filteredValues.length, days);
//   const sum = filteredValues.slice(0, numRecords).reduce((acc, val) => acc + val, 0);
//   return numRecords > 0 ? sum / numRecords : null;
// };

// module.exports = dischargePressure;

// with date average 
const dischargePressure = async (req, res) => {
  try {
    // Find all documents
    const data = await Mqtt.find({}, { Date: 1, DisPr: 1, timestamp: 1, _id: 0 });

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    // Group data by date and calculate daily averages
    const dailyAverages = {};
    data.forEach(item => {
      const date = item.Date;
      const disPrValue = item.DisPr;
      const timestamp = item.timestamp;
      if (!dailyAverages[date]) {
        dailyAverages[date] = [];
      }
      dailyAverages[date].push({ timestamp, disPrValue });
    });

    // Calculate average for each day
    Object.keys(dailyAverages).forEach(date => {
      const disPrValues = dailyAverages[date].map(entry => entry.disPrValue);
      const averageValue = disPrValues.reduce((acc, value) => acc + value, 0) / disPrValues.length;
      dailyAverages[date] = { timestamp: dailyAverages[date][0].timestamp, averageValue };
    });

    // Send the response with daily averages and timestamps
    res.status(200).json({ dailyAverages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// average all dischargePressure v
// const dischargePressure = async (req, res) => {
//   try {
//     // Get the field name from the request parameters
//     const field = "DisPr"; // Assuming DisPr is the field name for Discharge Pressure
//     // If you want to get the field name dynamically from the request parameters, uncomment the line below:
//     // const field = req.params.field;

//     // Get StartDate and EndDate from request query parameters
//     const startDate = req.query.startDate;
//     const endDate = req.query.endDate;

//     // Build the projection object to select the specified field
//     const projection = { _id: 0, timestamp: 1 };
//     projection[field] = 1;

//     // Build the query object to filter records based on StartDate and EndDate
//     const query = {};
//     if (startDate && endDate) {
//       query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
//     }

//     // Fetch records from the database with the specified field and filtered by Date_Time
//     const records = await Mqtt.find(query, projection).sort({ _id: -1 }).lean();

//     // Prepare the response array
//     const responseArray = [];

//     // Group records into chunks of 100 fields each and take the first value from each group
//     for (let i = 0; i < records.length; i += 100) {
//       const group = records.slice(i, i + 100);
//       const value = group[0][field]; // Take the first value from the group
//       const dateTime = group[0].timestamp; // Extract Date_Time field
//       responseArray.push({ timestamp: dateTime, [field]: value });
//     }

//     // Send the response with the array of values
//     res.status(200).json(responseArray);
//   } catch (err) {
//     // Handle errors
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// all records 
// const dischargePressure = async (req, res) => {
//   try {
//     // Get the field name from the request parameters
//     const field = "DisPr"; // Assuming DisPr is the field name for Discharge Pressure

//     // Get EndDate from request query parameters
//     const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();

//     // Calculate the start date for different intervals

//     // 1 Day Interval
//     const oneDayAgo = new Date(endDate);
//     oneDayAgo.setDate(oneDayAgo.getDate() - 1);

//     // 7 Days Interval (7 days ago from endDate to endDate)
//     const sevenDaysAgo = new Date(endDate);
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     // 1 Month Interval (30 days ago from endDate to endDate)
//     const oneMonthAgo = new Date(endDate);
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

//     // 3 Months Interval (90 days ago from endDate to endDate)
//     const threeMonthsAgo = new Date(endDate);
//     threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

//     // Define the queries for different intervals
//     const queries = [
//       { timestamp: { $gte: oneDayAgo, $lte: endDate } },
//       { timestamp: { $gte: sevenDaysAgo, $lte: endDate } },
//       { timestamp: { $gte: oneMonthAgo, $lte: endDate } },
//       { timestamp: { $gte: threeMonthsAgo, $lte: endDate } }
//     ];

//     // Fetch records for different intervals
//     const averages = await Promise.all(queries.map(async query => {
//       const records = await Mqtt.find(query, { _id: 0, timestamp: 1, [field]: 1 }).lean();
//       const average = calculateAverage(records, field);
//       return average;
//     }));

//     // Send the response with the array of averages
//     res.status(200).json(averages);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const calculateAverage = (records, field) => {
//   let sum = 0;
//   let count = 0;
//   records.forEach(record => {
//     if (record[field] !== null && record[field] !== undefined) {
//       sum += record[field];
//       count++;
//     }
//   });
//   const average = count > 0 ? sum / count : 0;
//   return average;
// };


// all average temperature 
// const distr = async (req, res) => {
//   try {
//     const field = "DisTr"; // Assuming DisTr is the field name for discharge pressure

//     const startDate = req.query.startDate;
//     const endDate = req.query.endDate;

//     const projection = { _id: 0 };
//     projection[field] = 1;

//     const query = {};
//     if (startDate && endDate) {
//       query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
//     }

//     const records = await Mqtt.find(query, projection).sort({ _id: -1 }).lean();

//     const responseArray = [];

//     for (let i = 0; i < records.length; i += 100) {
//       const group = records.slice(i, i + 100);
//       const value = group.map(record => record[field]);
//       responseArray.push(value);
//     }

//     if (responseArray.length === 0) {
//       // Handle case when no records are found
//       res.status(404).json({ message: "No records found" });
//     } else {
//       res.status(200).json(responseArray);
//     }
//   } catch (err) {
//     console.error("Error in distr API:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = { distr };





// currentvfd average 
const Currentav = async (req, res) => {
  try {
    const field = "CurrentVFD"; // Assuming CurrentVFD is the field name for discharge pressure

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const projection = { _id: 0, timestamp: 1 };
    projection[field] = 1;

    const query = {};
    if (startDate && endDate) {
      query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const records = await Mqtt.find(query, projection).sort({ _id: -1 }).lean();

    const responseArray = [];

    for (let i = 0; i < records.length; i += 100) {
      const group = records.slice(i, i + 100);
      const value = group[0][field];
      const dateTime = group[0].timestamp;
      responseArray.push({ timestamp: dateTime, [field]: value });
    }

    if (responseArray.length === 0) {
      // Handle case when no records are found
      res.status(404).json({ message: "No records found" });
    } else {
      res.status(200).json(responseArray);
    }
  } catch (err) {
    console.error("Error in CurrentVFD API:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { Currentav };




// VoltageVFD avg
const VolAvg = async (req, res) => {
  try {
    const field = "VoltageVFD"; // Assuming VoltageVFD is the field name for voltage

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const query = {};
    if (startDate && endDate) {
      query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }const VolAvg = async (req, res) => {
      try {
        const field = "VoltageVFD"; // Assuming VoltageVFD is the field name for voltage

        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        const query = {};
        if (startDate && endDate) {
          query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const records = await Mqtt.find(query).lean();

        if (records.length === 0) {
          // Handle case when no records are found
          return res.status(404).json({ message: "No records found" });
        }

        const dateMap = {};
        records.forEach(record => {
          const date = new Date(record.timestamp).toISOString().split('T')[0]; // Extract date from timestamp
          if (!dateMap[date]) {
            dateMap[date] = { sum: 0, count: 0 };
          }
          dateMap[date].sum += record[field];
          dateMap[date].count++;
        });

        const responseArray = [];
        Object.keys(dateMap).forEach(date => {
          const average = dateMap[date].sum / dateMap[date].count;
          responseArray.push({ date, average });
        });

        res.status(200).json(responseArray);
      } catch (err) {
        console.error("Error in VoltageVFD API:", err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };

    module.exports = { VolAvg };


    const records = await Mqtt.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          averageValue: { $avg: `$${field}` }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    if (records.length === 0) {
      // Handle case when no records are found
      return res.status(404).json({ message: "No records found" });
    }

    res.status(200).json(records);
  } catch (err) {
    console.error("Error in VoltageVFD API:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { VolAvg };





// PowerVFD avg 
const PowerAv = async (req, res) => {
  try {
    const field = "PowerVFD"; // Assuming CurrentVFD is the field name for discharge pressure

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const projection = { _id: 0, timestamp: 1 };
    projection[field] = 1;

    const query = {};
    if (startDate && endDate) {
      query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const records = await Mqtt.find(query, projection).sort({ _id: -1 }).lean();

    const responseArray = [];

    for (let i = 0; i < records.length; i += 100) {
      const group = records.slice(i, i + 100);
      const value = group[0][field];
      const dateTime = group[0].timestamp;
      responseArray.push({ timestamp: dateTime, [field]: value });
    }

    if (responseArray.length === 0) {
      // Handle case when no records are found
      res.status(404).json({ message: "No records found" });
    } else {
      res.status(200).json(responseArray);
    }
  } catch (err) {
    console.error("Error in CurrentVFD API:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { PowerAv };
// const getLast7DaysDisTrAndTimestamp = async (req, res) => {
//   try {
//     // Calculate the date 7 days ago
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     // Query for data in the last 7 days
//     const data = await Mqtt.find({
//       timestamp: { $gte: sevenDaysAgo },
//       DisPr: { $ne: null } // Exclude records where DisPr is null
//     }).select('DisTr timestamp').sort({ timestamp: -1 });

//     res.status(200).json(data);
//   } catch (err) {
//     console.error('Error fetching data:', err);
//     res.status(500).json({ err: 'Internal Server Error' });
//   }
// };

// module.exports = { getLast7DaysDisTrAndTimestamp };




// newone 
// const calculateDisprone = async (req, res) => {
//   try {
//     const today = new Date();
//     const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

//     const data = await Mqtt.find(
//       {
//         DisPr: { $exists: true },
//         timestamp: { $gte: startOfDay, $lt: endOfDay },
//       },
//       { DisPr: 1, timestamp: 1, _id: 0 }
//     )
//       .sort({ timestamp: -1 })
//       .lean();

//     if (data.length === 0) {
//       // If DisPr field doesn't exist or no data found, return an empty array or appropriate response
//       return res.json([]);
//     }

//     // Format timestamp to local time
//     const formattedData = data.map(item => ({
//       DisPr: item.DisPr,
//       timestamp: new Date(item.timestamp).toLocaleString(),
//     }));

//     // Reverse the array if needed
//     const reversedData = formattedData.reverse();

//     res.status(200).json(reversedData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { calculateDisprone };














module.exports = {
  getAllData,
  getVoltageVFD,
  // getLast7DaysDisTrAndTimestamp,


  AllDataM,
  dischargePressure,
  // distr,
  Currentav,
  VolAvg,
  PowerAv,
  calculateDisPravg,

  getCumUnload,
  getCumUnload7days,
  getCumUnload1month,
  getCumUnload3month,
  getCumUnload6month,

  // AllCurrentVFD,
  getCurrentVFD,
  getCurrentVFD7Days,
  getCurrentVFD1Month,
  getCurrentVFD3Months,
  getCurrentVFD6Months,

  // allPowerVFD,
  getPowerVFD,
  getPowerVFDLast7Days,
  getPowerVFDLast30Days,
  getPowerVFDLast3Months,
  getPowerVFDLast6Months,
  // getPowerVFDall,
  getLastHourData,
  calculateDisPr,
  calculateDisTr,
  calculatevfd,
  calculateVoltage,
  calculatePower,
  // getAllVoltageData,
  // todaysVoltageData
  // AllVoltageVFDData,
  calculateVoltagetoday,
  calculateVoltageLast7Days,
  calculateVoltageLast1Month,
  calculateVoltageLast3Months,
  calculateVoltageLast6Months,
  // calculateDisProne,
  // calculateDisprone,

  calculateDisProne,
  calculateDisPrlast7days,
  calculateDisPrLastMonth,
  calculateDisPrlast3month,
  calculateDisPrlast6month,
  // calculateDisProne1
  // getDischargePressureData
  // getDischargePressureData


  // AllCumulativeUnloadHours

}












// high , low , average
// const getHighValue = async (req, res) => {
//   try {
//     const highestValue = await Mqtt.findOne({ timestamp: { $gte: moment().startOf('day').toDate() } })
//                                   .sort({ "valueField": -1 });
//     res.status(200).json({ highestValue });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const getLowValue = async (req, res) => {
//   try {
//     const lowestValue = await Mqtt.findOne({ timestamp: { $gte: moment().startOf('day').toDate() } })
//                                   .sort({ "valueField": 1 });
//     res.status(200).json({ lowestValue });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const getAverageValue = async (req, res) => {
//   try {
//     const startOfDay = moment().startOf('day').toDate();
//     const endOfDay = moment().endOf('day').toDate();

//     const values = await Mqtt.find({ timestamp: { $gte: startOfDay, $lte: endOfDay } });
//     const totalValues = values.length;

//     if (totalValues === 0) {
//       res.status(404).json({ message: "No values found in Mqtt documents for today" });
//       return;
//     }

//     const sum = values.reduce((acc, currentValue) => acc + currentValue.valueField, 0);
//     const averageValue = sum / totalValues;

//     if (isNaN(averageValue)) {
//       res.status(500).json({ message: "Error calculating average value" });
//     } else {
//       res.status(200).json({ averageValue });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// new



// get one day data
// const calculate = async (req, res) => {
//   try {
//     const currentDate = new Date(); // Create a Date object for the current date
//     const currentDay = currentDate.getDate()
//     console.log(currentDay)

//     //  const data = await Mqtt.find({ timestamp : 1}).sort({_id : -1});
//      const data = await Mqtt.find({Date : currentDay});

//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };



// todays data run
// const calculateVoltagetoday = async (req, res) => {
//   try {
//     const currentDate = new Date(); // Create a Date object for the current date
//     const currentDay = currentDate.getDate();

//     const data = await Mqtt.find(
//       { Date: currentDay },
//       { VoltageVFD: 1, Date: 1, Time: 1, _id: 0 } // Include Date and Time fields in the query

//     );

//     if (data.length === 0) {
//       return res.status(404).json({ message: 'No data found for the current date' });
//     }

//     const voltageValues = data.map(item => ({
//       VoltageVFD: item.VoltageVFD,
//       Timestamp: new Date(`${item.Date} ${item.timestamp}`).getTime(), // Combine Date and Time into a full timestamp
//     }));

//     const resultArray = {
//       voltageValues,
//     };

//     res.status(200).json(resultArray);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = { calculateVoltagetoday };




// const calculateVoltagetoday = async (req, res) => {
//   try {
//     const currentDate = new Date(); // Create a Date object for the current date
//     const currentDay = currentDate.getDate();

//     const data = await Mqtt.find({ Date: currentDay }, { VoltageVFD: 1, _id: 0 });

//     if (data.length === 0) {
//       return res.status(404).json({ message: 'No data found for the current date' });
//     }

//     const voltageValues = data.map(item => item.VoltageVFD);

//     const resultArray = {
//       voltageValues,
//     };

//     res.status(200).json(resultArray);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = { calculateVoltagetoday };




// new1 all data 
// const calculateDisProne1 = async (req, res) => {
//   try {
//     const data = await Mqtt.find(
//       {
//         DisPr: { $exists: true },
//       },
//       { DisPr: 1, timestamp: 1, _id: 0 }
//     )
//       .sort({ timestamp: -1 })
//       .lean();

//     if (data.length === 0) {
//       // If DisPr field doesn't exist or no data found, return an empty array or appropriate response
//       return res.json([]);
//     }

//     // Format timestamp to local time
//     const formattedData = data.map(item => ({
//       DisPr: item.DisPr,
//       timestamp: new Date(item.timestamp).toLocaleString(),
//     }));

//     // Reverse the array if needed
//     const reversedData = formattedData.reverse();

//     res.status(200).json(reversedData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { calculateDisProne1 };
































