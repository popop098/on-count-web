import admin from "firebase-admin";
import {getMessaging} from 'firebase-admin/messaging';

const sendFCMNotification = async (data,tokenList) => {
    // Firebase Admin SDK 초기화
    const serviceAccount = {
        // 얘는 기존 파이어베이스 api 키
        projectId: "on-count-fcc1b",
        // 얘네는 새로 구해온 서비스 계정 비공개 키
        privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: "firebase-adminsdk-fbsvc@on-count-fcc1b.iam.gserviceaccount.com",
    };

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }



    // 푸시 데이터
    // api 호출할 때 받아올 데이터와 방금 불러온 토큰
    const notificationData = {
        data: {
            title: data.title || data.notification?.title,
            body: data.body || data.notification?.body,
            image: data.image || "",  // 큰 이미지 (하단)
            click_action: data.click_action || data.data?.click_action || "",
        },
        tokens: tokenList
    };

    return await getMessaging().sendEachForMulticast(notificationData);
};
const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { message, tokenList } = req.body;
            const result = await sendFCMNotification(message, tokenList);
            return res.status(200).json({ result });
        } catch (error) {
            console.error('FCM Error:', error);
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(405).end();
    }
};
export default handler;