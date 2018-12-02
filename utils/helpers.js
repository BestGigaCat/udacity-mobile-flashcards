import React from 'react';
import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';


const NOTIFICATION_KEY = 'MobileFlashCard:notifications';

export function clearNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const localNotification = {
    title: 'You have not done a quiz for a day!',
    body: 'Come back and challenge yourself!',
};

export function setNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            // Start from the same time tomrrow and repeat every one day
                            Notifications.scheduleLocalNotificationAsync(
                                localNotification,
                                {
                                    time: Date.now() + 86400,
                                    repeat: 'day',
                                }
                            );
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    });
            }
        })
}
