import React from "react";

import { storiesOf } from "@storybook/react";

import {
    NotificationsProvider,
    useNotificationManager,
    createScopedNotificationManager,
    StackedNotifications,
} from "../src/index.ts";

const {
    NotificationsProvider: ToastsProvider,
    useNotificationManager: useToastsManager,
} = createScopedNotificationManager();
const {
    NotificationsProvider: DialogsProvider,
    useNotificationManager: useDialogsManager,
} = createScopedNotificationManager();

const stories = storiesOf("NotificationManager", /*eslint-disable-line no-undef*/ module);

//eslint-disable-next-line react/prop-types
const DemoComponent = React.memo(({ destroy }) => (
    <div
        style={{
            background: "#ccc",
            opacity: 0.75,
            padding: "3em",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
        }}>
        <small>{Math.random()}</small>
        <button onClick={destroy}>Close</button>
    </div>
));
DemoComponent.displayName = "DemoComponent";

function ControlComponent() {
    const { create: createToast } = useToastsManager();
    const { create: createDialog } = useDialogsManager();
    return (
        <div>
            <button onClick={() => createToast(DemoComponent)}>Create Toast</button>
            <button onClick={() => createDialog(DemoComponent)}>Create Dialog</button>
        </div>
    );
}

stories.add("basic", () => {
    const ControlComponent = () => {
        const { create } = useNotificationManager();
        return <button onClick={() => create(DemoComponent)}>Create Dialog</button>;
    };
    return (
        <NotificationsProvider>
            <ControlComponent />
        </NotificationsProvider>
    );
});

stories.add("scoped", () => {
    return (
        <ToastsProvider render={StackedNotifications}>
            <DialogsProvider>
                <ControlComponent />
            </DialogsProvider>
        </ToastsProvider>
    );
});
