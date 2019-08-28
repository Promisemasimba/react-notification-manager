/**
 * Shows all notifications in the queue
 */

import * as React from "react";
import { State } from "../NotificationsReducer";

type Props = {
    state: State;
};

export function StackedNotifications({ state }: Props) {
    return state.queue.map((notification) =>
        React.createElement(notification.component, {
            key: notification.id,
            destroy: notification.destroy,
        })
    );
}
