import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "@teste/factories/notification.factory";
import { UnreadNotification } from "./unread-notification";

describe('Unread notification', () => {
    it('should be able to unread send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        const notification = makeNotification({
            readAt: new Date()
        });

        await notificationsRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull();
    }); 

    it('should not be able to read a non existing notification', () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        expect(() => {
            return unreadNotification.execute({
                notificationId: "fake-notification-id",
            });
        }).rejects.toThrow(NotificationNotFound);
    });
});