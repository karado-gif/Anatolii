import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { formatPrice } from '../utils/priceCalculator';

const ProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [user] = useState({
    name: 'Иван Петров',
    email: 'ivan@example.com',
    balance: 500000,
    deposit: 100000,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  });

  const [purchaseHistory] = useState([
    {
      id: 1,
      car: 'Toyota Camry 2020',
      price: 2800000,
      date: '2024-01-15',
      status: 'Доставлен',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      car: 'Honda CR-V 2019',
      price: 3500000,
      date: '2024-01-10',
      status: 'В пути',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=100&h=100&fit=crop',
    },
  ]);

  const [myAuctions] = useState([
    {
      id: 1,
      car: 'Nissan Skyline GT-R 2018',
      currentBid: 8500000,
      endDate: '2024-01-25',
      status: 'Активен',
      image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=100&h=100&fit=crop',
    },
  ]);

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive', onPress: () => navigation.navigate('Home') }
      ]
    );
  };

  const handleSellCar = () => {
    Alert.alert('Продать авто', 'Функция в разработке');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>

        {/* Balance Info */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>{t('profile.balance')}</Text>
            <Text style={styles.balanceAmount}>{formatPrice(user.balance)}</Text>
          </View>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceLabel}>{t('profile.deposit')}</Text>
            <Text style={styles.balanceAmount}>{formatPrice(user.deposit)}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Payment')}
          >
            <Text style={styles.actionButtonText}>Пополнить баланс</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleSellCar}
          >
            <Text style={styles.actionButtonText}>{t('profile.sellCar')}</Text>
          </TouchableOpacity>
        </View>

        {/* Purchase History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('profile.purchaseHistory')}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Смотреть все</Text>
            </TouchableOpacity>
          </View>
          
          {purchaseHistory.map((purchase) => (
            <View key={purchase.id} style={styles.purchaseItem}>
              <Image source={{ uri: purchase.image }} style={styles.purchaseImage} />
              <View style={styles.purchaseInfo}>
                <Text style={styles.purchaseCar}>{purchase.car}</Text>
                <Text style={styles.purchasePrice}>{formatPrice(purchase.price)}</Text>
                <Text style={styles.purchaseDate}>{purchase.date}</Text>
              </View>
              <View style={styles.purchaseStatus}>
                <Text style={styles.statusText}>{purchase.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* My Auctions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('profile.myAuctions')}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Смотреть все</Text>
            </TouchableOpacity>
          </View>
          
          {myAuctions.map((auction) => (
            <View key={auction.id} style={styles.auctionItem}>
              <Image source={{ uri: auction.image }} style={styles.auctionImage} />
              <View style={styles.auctionInfo}>
                <Text style={styles.auctionCar}>{auction.car}</Text>
                <Text style={styles.auctionBid}>{formatPrice(auction.currentBid)}</Text>
                <Text style={styles.auctionDate}>До {auction.endDate}</Text>
              </View>
              <View style={styles.auctionStatus}>
                <Text style={styles.statusText}>{auction.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleLanguageChange}>
            <Text style={styles.settingLabel}>{t('common.language')}</Text>
            <Text style={styles.settingValue}>{i18n.language === 'ru' ? 'Русский' : 'English'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Уведомления</Text>
            <Text style={styles.settingValue}>Включены</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Безопасность</Text>
            <Text style={styles.settingValue}>Настроить</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>{t('profile.logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  userSection: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  balanceSection: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  actionsSection: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  seeAllText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  purchaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  purchaseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  purchaseInfo: {
    flex: 1,
  },
  purchaseCar: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  purchasePrice: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 2,
  },
  purchaseDate: {
    fontSize: 12,
    color: '#666',
  },
  purchaseStatus: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  auctionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  auctionImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  auctionInfo: {
    flex: 1,
  },
  auctionCar: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  auctionBid: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 2,
  },
  auctionDate: {
    fontSize: 12,
    color: '#666',
  },
  auctionStatus: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#fff',
    margin: 20,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  logoutButtonText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen; 