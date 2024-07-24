const moment = require('moment-timezone');
const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const now = new Date();

const MqttSchema = new Schema({
    imei: {
        type:String,
        require: true
    },
    uid: {
        type: Number,
        require: true
    },
    dtm: {
        type: String,
        require: true
    },
    seq: {
        type: Number,
        require: true
    },
    CumLoad: {
        type: Number,
        require: true
    },
    CumUnload: {
        type: Number,
        require: true
    },
    CumRun: {
        type: Number,
        require: true
    },
    CumStop: {
        type: Number,
        require: true
    },
    CumFault: {
        type: Number,
        require: true
    },
    CumStandby: {
        type: Number,
        require: true
    },
    CumSTC: {
        type: Number,
        require: true
    },
    CumLDC: {
        type: Number,
        require: true
    },
    Utilisation: {
        type: Number,
        require: true
    },
    VoltageVFD: {
        type:Number,
        require:true
    },
    CurrentVFD: {
        type:Number,
        require:true
    },
    FrequencyVFD: {
        type:Number,
        require:true
    },
    PowerVFD: {
        type:Number,
        require:true
    },
    WindingSetTemp: {
        type:Number,
        require:true
    },
    RemAFCT: {
        type: Number,
        require: true
    },
    SetAFCT: {
        type:Number,
        require:true
    },
    RemOFCT: {
        type: Number,
        require: true
    },
    SetOFCT: {
        type: Number,
        require: true
    },
    RemOSCT: {
        type: Number,
        require: true
    },
    SetOCT: {
        type: Number,
        require: true
    },
    RemOCT: {
        type: Number,
        require: true
    },
    RemRGT: {
        type: Number,
        require: true
    },
    SetRGT: {
        type: Number,
        require: true
    },
    LoadUnloadSour: {
        type: Number,
        require: true
    },
    VFDMinSpeed: {
        type: Number,
        require: true
    },
    MinReference: {
        type: Number,
        require: true
    },
    MaxReference: {
        type: Number,
        require: true
    },

    VFDMaxSpeed: {
        type:Number,
        require:true
    },
    VFDOptimumSpee: {
        type:Number,
        require:true
    },
    VFDUnloadSpeed: {
        type:Number,
        require:true
    },
    PValue: {
        type:Number,
        require:true
    },
    IValue: {
        type:Number,
        require:true
    },
    ITime: {
        type:Number,
        require:true
    },
    ControlMode: {
        type:Number,
        require:true
    },
    UnloadMode: {
        type:Number,
        require:true
    },
    AutoRestart: {
        type:Number,
        require:true
    },
    PrUnit: {
        type:Number,
        require:true
    },
    TrUnit: {
        type:Number,
        require:true
    },
    Relay1: {
        type:Number,
        require:true
    },
    Relay2: {
        type:Number,
        require:true
    },
    LoadPrWrite: {
        type:Number,
        require:true
    },
    DisPr: {
        type:Number,
        require:true
    },
    DisTr: {
        type:Number,
        require:true
    },
    DewPointTemp: {
        type:Number,
        require:true
    },
    SumpPr: {
        type:Number,
        require:true
    },
    DiffPressure: {
        type:Number,
        require:true
    },
    TripTemp: {
        type:Number,
        require:true
    },
    SetLoadPr: {
        type:Number,
        require:true
    },
    SetDiffPressur: {
        type:Number,
        require:true
    },
    WarnTemp:  {
        type:Number,
        require:true
    },
    LowDewPoint:  {
        type:Number,
        require:true
    },

    // HighDewPoint:  {
    //     type:Number,
    //     require:true
    // },
    // FanTemp: {
    //     type:Number,
    //     require:true
    // },
    // InhibitTr: {
    //     type:Number,
    //     require:true
    // },
    // MaxULPr: {
    //     type:Number,
    //     require:true
    // },
    // HighSumpPr: {
    //     type:Number,
    //     require:true
    // },
    // StSumpPr: {
    //     type:Number,
    //     require:true
    // },
    // AutoRestartDly: {
    //     type:Number,
    //     require:true
    // },
    // StarDelay: {
    //     type:Number,
    //     require:true
    // },
    // DTR: {
    //     type:Number,
    //     require:true
    // },
    // RTS: {
    //     type:Number,
    //     require:true
    // },
    // StandbyTime:  {
    //     type:Number,
    //     require:true
    // },
    ADVOffTime: {
        type:Number,
        require:true
    },
    ADVOnTime: {
        type:Number,
        require:true
    },
    DryerTime: {
        type:Number,
        require:true
    },
    StatusVFD: {
        type:Number,
        require:true
    },
    Hour: {
        type:Number,
        require:true
    },
    Minutes: {
        type:Number,
        require:true
    },
    Seconds: {
        type:Number,
        require:true
    },
    Date: {
        type:Number,
        require:true
    },
    Month: {
        type:Number,
        require:true
    },
    Year: {
        type:Number,
        require:true
    },
    Day: {
        type:Number,
        require:true
    },
    timestamp: {
         type: Date,
         default: Date.now
    },


});




const Mqtt = mongoose.model("Mqtt" , MqttSchema)

module.exports = Mqtt;




// timestamp: {
//     type: Date, 
//     default: () => new Date(Date.now() + 330 * 60 * 1000)
// }




















































































// const mongoose = require("mongoose")

// const taskSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     completed: {
//         type: String,
//         required: true
//     }
// })

// const Task = mongoose.model("Task", taskSchema)

// module.exports = Task
