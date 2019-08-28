/**
 * Picks the notification from the front of the queue and renders it
 */

import * as React from "react";
import { State } from "../NotificationsReducer";

type Props = {
    state: State;
};

export function QueuedNotifications({ state }: Props) {
    const notification = state.queue[0];
    return notification
        ? React.createElement(notification.component, {
            destroy: notification.destroy,
          })
        : null;
}
