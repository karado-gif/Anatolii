import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { formatPrice } from '../utils/priceCalculator';

const PaymentScreen = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { amount, type = 'deposit' } = route.params || {};

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(amount || 100000);

  const paymentMethods = [
    {
      id: 'card',
      name: t('payment.card'),
      icon: '💳',
      description: 'Банковская карта',
    },
    {
      id: 'crypto',
      name: t('payment.crypto'),
      icon: '₿',
      description: 'Криптовалюта',
    },
  ];

  const handlePayment = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
        Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
        return;
      }
    } else if (paymentMethod === 'crypto') {
      if (!cryptoAddress) {
        Alert.alert('Ошибка', 'Пожалуйста, введите адрес кошелька');
        return;
      }
    }

    Alert.alert(
      'Подтверждение оплаты',
      `Сумма: ${formatPrice(paymentAmount)}\nСпособ: ${paymentMethods.find(m => m.id === paymentMethod)?.name}`,
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Оплатить', 
          onPress: () => {
            Alert.alert('Успех', 'Оплата прошла успешно!');
            navigation.navigate('Profile');
          }
        }
      ]
    );
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const renderPaymentMethod = (method) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentMethodItem,
        paymentMethod === method.id && styles.paymentMethodItemActive
      ]}
      onPress={() => setPaymentMethod(method.id)}
    >
      <View style={styles.paymentMethodHeader}>
        <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
        <View style={styles.paymentMethodInfo}>
          <Text style={styles.paymentMethodName}>{method.name}</Text>
          <Text style={styles.paymentMethodDescription}>{method.description}</Text>
        </View>
      </View>
      {paymentMethod === method.id && (
        <View style={styles.paymentMethodDetails}>
          {method.id === 'card' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Номер карты"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                maxLength={19}
                keyboardType="numeric"
              />
              <View style={styles.cardRow}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  maxLength={5}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  maxLength={3}
                  keyboardType="numeric"
                  secureTextEntry
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Имя держателя карты"
                value={cardholderName}
                onChangeText={setCardholderName}
              />
            </>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="Адрес криптокошелька"
              value={cryptoAddress}
              onChangeText={setCryptoAddress}
              multiline
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Payment Info */}
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>
              {type === 'deposit' ? t('payment.deposit') : 'Оплата'}
            </Text>
            <Text style={styles.paymentAmount}>{formatPrice(paymentAmount)}</Text>
            {type === 'deposit' && (
              <Text style={styles.paymentDescription}>
                Депозит 10% необходим для участия в торгах
              </Text>
            )}
          </View>

          {/* Amount Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('payment.amount')}</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Введите сумму"
              value={paymentAmount.toString()}
              onChangeText={(text) => setPaymentAmount(parseInt(text) || 0)}
              keyboardType="numeric"
            />
          </View>

          {/* Payment Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('payment.paymentMethods')}</Text>
            {paymentMethods.map(renderPaymentMethod)}
          </View>

          {/* Terms */}
          <View style={styles.termsSection}>
            <Text style={styles.termsText}>
              Нажимая "Оплатить", вы соглашаетесь с условиями использования сервиса
            </Text>
          </View>

          {/* Payment Button */}
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>{t('payment.pay')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  paymentInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  paymentAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  amountInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  paymentMethodItem: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  paymentMethodItemActive: {
    borderColor: '#2196F3',
    backgroundColor: '#f3f8ff',
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: '#666',
  },
  paymentMethodDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  termsSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  payButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PaymentScreen; 