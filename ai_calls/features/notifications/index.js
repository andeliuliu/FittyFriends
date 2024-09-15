import express from 'express';
import bodyParser from 'body-parser';
import {
    happyNotification,
    neutralNotification,
    sadNotification,
    verySadNotification,
    gonnaLeaveNotification,
    nowLeavingNotification
} from './notifications.js';  // Adjust the path if necessary

const app = express();
app.use(bodyParser.json());

app.post('/send-notification', async (req, res) => {
    const { pet_id } = req.body;

    try {

        const pet = await db.collection('pets').findOne({ pet_id });

        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        const { personality, task, type, mood } = pet;

        let notificationMessage;
        switch (mood) {
            case 'happy':
                notificationMessage = await happyNotification(personality, task, type);
                break;
            case 'neutral':
                notificationMessage = await neutralNotification(personality, task, type);
                break;
            case 'sad':
                notificationMessage = await sadNotification(personality, task, type);
                break;
            case 'very_sad':
                notificationMessage = await verySadNotification(personality, task, type);
                break;
            case 'gonna_leave':
                notificationMessage = await gonnaLeaveNotification(personality, task, type);
                break;
            case 'now_leaving':
                notificationMessage = await nowLeavingNotification(personality, task, type);
                break;
            default:
                return res.status(400).json({ error: 'Unknown mood type' });
        }

        // Here you would send the notification to the user (e.g., via FCM/APNS)
        // Example: sendPushNotification(userId, notificationMessage);

        // Respond with the generated notification message
        res.json({ message: notificationMessage });
    } catch (error) {
        console.error('Error generating notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});