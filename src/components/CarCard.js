import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../utils/priceCalculator';

const { width } = Dimensions.get('window');

const CarCard = ({ car, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(car)}>
      <Image source={{ uri: car.photos[0] }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{`${car.brand} ${car.model}`}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{car.status}</Text>
          </View>
        </View>
        
        <View style={styles.specs}>
          <Text style={styles.specText}>{car.year} • {car.mileage.toLocaleString()} км</Text>
          <Text style={styles.specText}>{car.fuel} • {car.specifications?.power}</Text>
        </View>
        
        <View style={styles.bidding}>
          <View style={styles.bidInfo}>
            <Text style={styles.bidLabel}>{t('carList.currentBid')}</Text>
            <Text style={styles.currentBid}>{formatPrice(car.currentBid)}</Text>
          </View>
          <View style={styles.bidInfo}>
            <Text style={styles.bidLabel}>{t('carList.recommendedBid')}</Text>
            <Text style={styles.recommendedBid}>{formatPrice(car.recommendedBid)}</Text>
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>{t('carList.moreDetails')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bidButton}>
            <Text style={styles.bidButtonText}>{t('carList.placeBid')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  statusBadge: {
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
  specs: {
    marginBottom: 12,
  },
  specText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  bidding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bidInfo: {
    flex: 1,
  },
  bidLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  currentBid: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  recommendedBid: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#1a1a1a',
    fontWeight: '600',
  },
  bidButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bidButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default CarCard; 