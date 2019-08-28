import * as React from "react";
import { createNotificationsProvider } from "./createNotificationsProvider";

export type NotificationsContext = {
    create: (component: () => React.ReactElement<any>) => void;
    destroy: (id: string) => void;
    pop: () => void;
};

const DEFAULT_CONTEXT: NotificationsContext = {
    create: () => {
        throw new Error("create cannot be used outside of a NotificationProvider");
    },
    destroy: () => {
        throw new Error("destroy cannot be used outside of a NotificationProvider");
    },
    pop: () => {
        throw new Error("pop cannot be used outside of a NotificationProvider");
    },
};

export function createScopedNotificationManager() {
    const notificationContext = React.createContext<NotificationsContext>(DEFAULT_CONTEXT);
    return {
        NotificationsProvider: createNotificationsProvider(notificationContext),
        useNotificationManager: () => React.useContext(notificationContext),
    };
}
