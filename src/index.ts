import { createScopedNotificationManager } from "./createScopedNotificationsManager";
import { QueuedNotifications } from "./renderers/QueuedNotifications";
import { StackedNotifications } from "./renderers/StackedNotifications";

export { createScopedNotificationManager, QueuedNotifications, StackedNotifications };
export const { NotificationsProvider, useNotificationManager } = createScopedNotificationManager();
