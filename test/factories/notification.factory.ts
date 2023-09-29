import { Notification, NotificationProps} from "@application/entities/notification"
import { Content } from "@application/entities/content";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}){
    return new Notification({
        category: 'social',
        content: new Content('Nova Solicitacao de amizade!'),
        recipientId: 'recipient-1',
        ...override,
    });
}