import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { formatPrice, calculateFinalCost } from '../utils/priceCalculator';

const { width } = Dimensions.get('window');

const CarDetailScreen = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { car } = route.params;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const finalCost = calculateFinalCost(car.recommendedBid);

  const handlePlaceBid = () => {
    Alert.alert(
      'Сделать ставку',
      `Текущая ставка: ${formatPrice(car.currentBid)}\nРекомендуемая ставка: ${formatPrice(car.recommendedBid)}`,
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Сделать ставку', onPress: () => navigation.navigate('Payment') }
      ]
    );
  };

  const handleViewAuctionSheet = () => {
    // Здесь можно открыть аукционный лист в полном размере
    Alert.alert('Аукционный лист', 'Просмотр аукционного листа');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Photo Gallery */}
        <View style={styles.photoContainer}>
          <Image source={{ uri: car.photos[currentPhotoIndex] }} style={styles.mainPhoto} />
          <View style={styles.photoIndicators}>
            {car.photos.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.photoIndicator,
                  index === currentPhotoIndex && styles.photoIndicatorActive
                ]}
              />
            ))}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.photoThumbnails}
            contentContainerStyle={styles.photoThumbnailsContent}
          >
            {car.photos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentPhotoIndex(index)}
              >
                <Image source={{ uri: photo }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Car Info */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{`${car.brand} ${car.model}`}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{car.status}</Text>
            </View>
          </View>

          <Text style={styles.description}>{car.description}</Text>

          {/* Specifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('carDetail.specifications')}</Text>
            <View style={styles.specsGrid}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Год</Text>
                <Text style={styles.specValue}>{car.year}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Пробег</Text>
                <Text style={styles.specValue}>{car.mileage.toLocaleString()} км</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Двигатель</Text>
                <Text style={styles.specValue}>{car.engine}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Мощность</Text>
                <Text style={styles.specValue}>{car.specifications?.power}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Топливо</Text>
                <Text style={styles.specValue}>{car.fuel}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Привод</Text>
                <Text style={styles.specValue}>{car.drive}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Коробка</Text>
                <Text style={styles.specValue}>{car.specifications?.transmission}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Цвет</Text>
                <Text style={styles.specValue}>{car.specifications?.color}</Text>
              </View>
            </View>
          </View>

          {/* Bidding Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Информация о торгах</Text>
            <View style={styles.biddingInfo}>
              <View style={styles.bidItem}>
                <Text style={styles.bidLabel}>{t('carList.currentBid')}</Text>
                <Text style={styles.currentBid}>{formatPrice(car.currentBid)}</Text>
              </View>
              <View style={styles.bidItem}>
                <Text style={styles.bidLabel}>{t('carList.recommendedBid')}</Text>
                <Text style={styles.recommendedBid}>{formatPrice(car.recommendedBid)}</Text>
              </View>
            </View>
          </View>

          {/* Bidding History */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('carDetail.biddingHistory')}</Text>
            {car.biddingHistory.map((bid, index) => (
              <View key={index} style={styles.bidHistoryItem}>
                <Text style={styles.bidAmount}>{formatPrice(bid.bid)}</Text>
                <Text style={styles.bidDate}>{bid.date}</Text>
              </View>
            ))}
          </View>

          {/* Auction Sheet */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('carDetail.auctionSheet')}</Text>
            <TouchableOpacity onPress={handleViewAuctionSheet}>
              <Image source={{ uri: car.auctionSheet }} style={styles.auctionSheet} />
            </TouchableOpacity>
          </View>

          {/* Final Cost Calculation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('carDetail.finalPrice')}</Text>
            <View style={styles.costBreakdown}>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>Стоимость авто</Text>
                <Text style={styles.costValue}>{formatPrice(finalCost.carPrice)}</Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>{t('carDetail.customs')}</Text>
                <Text style={styles.costValue}>{formatPrice(finalCost.customs)}</Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>{t('carDetail.freight')}</Text>
                <Text style={styles.costValue}>{formatPrice(finalCost.freight)}</Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>Страховка</Text>
                <Text style={styles.costValue}>{formatPrice(finalCost.insurance)}</Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>Обработка</Text>
                <Text style={styles.costValue}>{formatPrice(finalCost.processing)}</Text>
              </View>
              <View style={[styles.costItem, styles.totalCostItem]}>
                <Text style={styles.totalCostLabel}>{t('carDetail.totalCost')}</Text>
                <Text style={styles.totalCostValue}>{formatPrice(finalCost.total)}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.placeBidButton} onPress={handlePlaceBid}>
          <Text style={styles.placeBidButtonText}>{t('carList.placeBid')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  photoContainer: {
    backgroundColor: '#fff',
  },
  mainPhoto: {
    width: width,
    height: 300,
  },
  photoIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  photoIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  photoIndicatorActive: {
    backgroundColor: '#2196F3',
  },
  photoThumbnails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  photoThumbnailsContent: {
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  specItem: {
    width: '45%',
  },
  specLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  biddingInfo: {
    flexDirection: 'row',
    gap: 20,
  },
  bidItem: {
    flex: 1,
  },
  bidLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  currentBid: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  recommendedBid: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  bidHistoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bidAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  bidDate: {
    fontSize: 14,
    color: '#666',
  },
  auctionSheet: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  costBreakdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  costLabel: {
    fontSize: 14,
    color: '#666',
  },
  costValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  totalCostItem: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 8,
    paddingTop: 16,
  },
  totalCostLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  totalCostValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  actionButtons: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  placeBidButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeBidButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CarDetailScreen; 