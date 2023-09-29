
const pushNotification_FCM = async (deviceToken, notification) => {
    try {
        const getFirstTenWords = (str) => {
            const words = str.split(" ");
            return words.slice(0, 10).join(" ");
        }
        const firstTenWords = getFirstTenWords(notification.content);

        for (let i = 0; i < deviceToken.length; i++) {
            const message = {
                "to": deviceToken[i],
                "notification": {
                    "title": `${notification.type}`,
                    "body": "college notice",
                    "type": "BIGPIC",
                    "imageUrl": "https://clinktestapp.s3.ap-south-1.amazonaws.com/posts/images/clink_img1690297303777_Ozh1.jpg"
                },
                "data": {
                    "_id": notification._id,
                    "type": "college",
                    "subType": "message",
                    "content": firstTenWords,
                    "publisher": notification.publisher,
                    "showType": true,
                    "timeStamp": notification.timeStamp,
                    "readFlag": false,
                }
            };

            const response = await axios.post("https://fcm.googleapis.com/fcm/send", JSON.stringify(message), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "key=YOUR_FCM_SERVER_KEY",
                }
            });

            console.log('Successfully sent FCM:', response.data);
        }
    } catch (error) {
        console.log('push notice error')
    }
}
