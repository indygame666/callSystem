self.addEventListener('push', (event) => {
    var Title = 'Push'

    event.waitUntil(
        self.registration.showNotification(Title,{
        body: 'a message',
        logo: 'logo512.png',
        tag: 'my-tag'
        }));
})