import React from 'react';
import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';


const NOTIFICATION_KEY = 'MobileFlashCard:notifications';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const localNotification = {
    title: 'You have not done a quiz for a day!',
    body: 'Come bac and challenge yourself!',
};

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        console.log(status);
                        if (status === 'granted' || status === 'undetermined') {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            Notifications.scheduleLocalNotificationAsync(
                                localNotification,
                                {
                                    time: Date.now() + 5000,
                                    repeat: 'minute',
                                }
                            );
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    });
            }
        })
}
