const express = require("express")
const  mongoose  = require("mongoose")
const mqtt = require("mqtt")
const Mqtt = require("./model/MqttModel")
const cors = require("cors")
const router = require("./routes/MqttRoutes")

const app = express();

app.use(express.json());
-app.use(express.urlencoded({ extended: false}));
app.use(cors());


const client = mqtt.connect('mqtt://91.121.93.94:1883');
const topic = 'thetatest';
client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

// Log when the MQTT client is trying to reconnect
client.on('reconnect', () => {
  // console.log('Reconnecting to MQTT broker');
});

// Log when the MQTT client goes offline
client.on('offline', () => {
  console.log('MQTT client is offline');
});

mongoose.connection.on('connected', async () => {
  console.log('Mongodb connected');
});
// mongoose.connection.on('connected', async () => {
//   console.log('Mongodb connected');
// });

// client.on('connect', async () => {
//   await mongoose.connect(
//     'mongodb+srv://vaibhavdevkar101:Vaibhav123@cluster0.518nyqj.mongodb.net/Mqtt-Collection?retryWrites=true&w=majority'

//   );
//   console.log('Connected to MQTT');
//   client.subscribe(topic);
// });

// client.on('message', async (topic, message) => {
//   let data = message.toString();
//   data = JSON.parse(data);
//   await saveData(data);
// });

// saveData = async (data) => {
//   data = new Mqtt(data);
//   data = await data.save();
// //   console.log('Saved data:', data);
// };

mongoose.connection.on('connected', () => {
  console.log('Mongodb connected');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongodb connection error:', err);
});

client.on('connect', async () => {
  try {
    await mongoose.connect('mongodb+srv://vaibhavdevkar101:Vaibhav123@cluster0.518nyqj.mongodb.net/HiTechDB?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    client.subscribe(topic);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
});

 client.on('message', async (topic, message) => {
  let data = message.toString();
  data = JSON.parse(data);
  await saveData(data);
});

const saveData = async (data) => {
  try {
    const mqttData = new Mqtt(data);
    await mqttData.save();
    // console.log('Saved data:', mqttData);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// show time where we use
// Assume that `mqtt` is the Mongoose document you retrieved from MongoDB
// this is router  or middleware

app.use(router)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log('Server is started');
});














































