self.addEventListener('push', function (event) {
  let data = { title: 'FreeWalkins New Job', body: 'కొత్త జాబ్ అప్‌డేట్ వచ్చింది!' };
  if (event.data) {
    try { data = event.data.json(); } catch (e) { data.body = event.data.text(); }
  }
  const options = {
    body: data.body,
    icon: 'https://img.icons8.com/color/192/000000/work.png',
    badge: 'https://img.icons8.com/color/192/000000/work.png',
    vibrate: [200, 100, 200]
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        let client = windowClients[i];
        if (client.url === '/' && 'focus' in client) { return client.focus(); }
      }
      if (clients.openWindow) { return clients.openWindow('/'); }
    })
  );
});
