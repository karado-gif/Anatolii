import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import CarCard from '../components/CarCard';
import { cars } from '../mock/cars';

const CarListScreen = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { filters } = route.params || {};

  const [filteredCars, setFilteredCars] = useState(cars);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    if (filters) {
      applyFilters(filters);
    }
  }, [filters]);

  const applyFilters = (filters) => {
    setLoading(true);
    
    let filtered = cars.filter(car => {
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.model && !car.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
      if (filters.yearFrom && car.year < parseInt(filters.yearFrom)) return false;
      if (filters.yearTo && car.year > parseInt(filters.yearTo)) return false;
      if (filters.mileageFrom && car.mileage < parseInt(filters.mileageFrom)) return false;
      if (filters.mileageTo && car.mileage > parseInt(filters.mileageTo)) return false;
      if (filters.fuel && car.fuel !== filters.fuel) return false;
      if (filters.drive && car.drive !== filters.drive) return false;
      if (filters.condition && car.condition !== filters.condition) return false;
      if (filters.priceFrom && car.currentBid < parseInt(filters.priceFrom)) return false;
      if (filters.priceTo && car.currentBid > parseInt(filters.priceTo)) return false;
      return true;
    });

    setFilteredCars(filtered);
    setLoading(false);
  };

  const sortCars = (sortType) => {
    setSortBy(sortType);
    const sorted = [...filteredCars].sort((a, b) => {
      switch (sortType) {
        case 'price':
          return a.currentBid - b.currentBid;
        case 'year':
          return b.year - a.year;
        case 'mileage':
          return a.mileage - b.mileage;
        case 'condition':
          const conditionOrder = { 'Отличное': 4, 'Хорошее': 3, 'Удовлетворительное': 2, 'Плохое': 1 };
          return conditionOrder[b.condition] - conditionOrder[a.condition];
        default:
          return 0;
      }
    });
    setFilteredCars(sorted);
  };

  const handleCarPress = (car) => {
    navigation.navigate('CarDetail', { car });
  };

  const renderSortButton = (type, label) => (
    <TouchableOpacity
      style={[styles.sortButton, sortBy === type && styles.sortButtonActive]}
      onPress={() => sortCars(type)}
    >
      <Text style={[styles.sortButtonText, sortBy === type && styles.sortButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Sort Controls */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortTitle}>{t('carList.sortBy')}</Text>
        <View style={styles.sortButtons}>
          {renderSortButton('price', t('carList.price'))}
          {renderSortButton('year', t('carList.year'))}
          {renderSortButton('mileage', t('carList.mileage'))}
          {renderSortButton('condition', t('carList.condition'))}
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          Найдено {filteredCars.length} автомобилей
        </Text>
      </View>

      {/* Cars List */}
      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CarCard car={item} onPress={handleCarPress} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Автомобили не найдены</Text>
            <Text style={styles.emptySubtext}>Попробуйте изменить параметры поиска</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  sortContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sortTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: '#2196F3',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  resultsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingVertical: 8,
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

export default CarListScreen; 