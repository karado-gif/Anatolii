import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'bid',
      title: 'Ставка перебита',
      message: 'Ваша ставка на Toyota Camry была перебита. Текущая ставка: 2,600,000 ₽',
      time: '2 минуты назад',
      read: false,
      carId: 1,
    },
    {
      id: 2,
      type: 'auction',
      title: 'Новый аукцион',
      message: 'Начался аукцион на Honda CR-V 2021 года. Успейте сделать ставку!',
      time: '1 час назад',
      read: false,
      carId: 2,
    },
    {
      id: 3,
      type: 'status',
      title: 'Статус доставки',
      message: 'Ваш Nissan Skyline GT-R прибыл во Владивосток. Ожидает таможенной очистки.',
      time: '3 часа назад',
      read: true,
      carId: 3,
    },
    {
      id: 4,
      type: 'bid',
      title: 'Победа в аукционе',
      message: 'Поздравляем! Вы выиграли аукцион на Mazda CX-5 за 4,200,000 ₽',
      time: '1 день назад',
      read: true,
      carId: 4,
    },
    {
      id: 5,
      type: 'auction',
      title: 'Завершение аукциона',
      message: 'Аукцион на Subaru Impreza WRX STI завершается через 2 часа',
      time: '2 дня назад',
      read: true,
      carId: 5,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAll = () => {
    Alert.alert(
      'Очистить все',
      'Вы уверены, что хотите удалить все уведомления?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Очистить', style: 'destructive', onPress: () => setNotifications([]) }
      ]
    );
  };

  const handleNotificationPress = (notification) => {
    markAsRead(notification.id);
    
    switch (notification.type) {
      case 'bid':
      case 'auction':
      case 'status':
        // Навигация к деталям автомобиля
        navigation.navigate('CarDetail', { carId: notification.carId });
        break;
      default:
        console.log('Обработка уведомления:', notification.type);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'bid':
        return '💰';
      case 'auction':
        return '🏁';
      case 'status':
        return '📦';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'bid':
        return '#FF9800';
      case 'auction':
        return '#2196F3';
      case 'status':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification
      ]} 
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.notificationIcon}>
          <Text style={styles.iconText}>{getNotificationIcon(item.type)}</Text>
        </View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </View>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('notifications.title')}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={markAllAsRead}>
            <Text style={styles.headerButtonText}>{t('notifications.markAsRead')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={clearAll}>
            <Text style={styles.headerButtonText}>{t('notifications.clearAll')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Unread Count */}
      {unreadCount > 0 && (
        <View style={styles.unreadCountContainer}>
          <Text style={styles.unreadCountText}>
            {unreadCount} непрочитанных уведомлений
          </Text>
        </View>
      )}

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Уведомлений нет</Text>
            <Text style={styles.emptySubtext}>Новые уведомления появятся здесь</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  headerButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  unreadCountContainer: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  unreadCountText: {
    color: '#1976d2',
    fontSize: 14,
    fontWeight: '500',
  },
  notificationsList: {
    paddingBottom: 20,
  },
  notificationItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default NotificationsScreen; 