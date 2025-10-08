// /public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js",
);

// 이곳에 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
const firebaseConfig = {
  apiKey: "AIzaSyBwMRuuJ-UQIU98u5jx_plZUeEJMBfyScs",
  authDomain: "on-count-fcc1b.firebaseapp.com",
  projectId: "on-count-fcc1b",
  storageBucket: "on-count-fcc1b.firebasestorage.app",
  messagingSenderId: "679660297255",
  appId: "1:679660297255:web:0696a709ec546fd11ac202",
  measurementId: "G-PS481MY3B3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const _messaging = firebase.messaging();

self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json().data;
    console.log("받은 데이터:", data);

    const options = {
      body: data.body, // ✅ DEFAULT면 로컬 아이콘
      image: data.image || "", // ✅ 큰 이미지
      data: {
        click_action: data.click_action,
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// 클릭 이벤트 처리
// 알림을 클릭하면 사이트로 이동한다.
self.addEventListener("notificationclick", (event) => {
  event.preventDefault();
  // 알림창 닫기
  event.notification.close();

  // 이동할 url
  // 아래의 event.notification.data는 위의 푸시 이벤트를 한 번 거쳐서 전달 받은 options.data에 해당한다.
  // api에 직접 전달한 데이터와 혼동 주의
  const urlToOpen = event.notification.data.click_action;

  // 클라이언트에 해당 사이트가 열려있는지 체크
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      // 열려있다면 focus, 아니면 새로 open
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
