import * as React from "react";
import { Portal } from "reakit/Portal";
import { NotificationsContext } from "./createScopedNotificationsManager";
import { QueuedNotifications } from "./renderers/QueuedNotifications";
import { useNotificationsState } from "./useNotificationsState";

type Props = {
    children: React.ReactNode;
    render: React.ElementType<ReturnType<typeof useNotificationsState>>;
};

export const createNotificationsProvider = (
    NotificationContext: React.Context<NotificationsContext>
) => ({ children, render = QueuedNotifications }: Props) => {
    const state = useNotificationsState();
    return (
        <NotificationContext.Provider value={state.actions}>
            {children}
            <Portal>{React.createElement(render, state)}</Portal>
        </NotificationContext.Provider>
    );
};
