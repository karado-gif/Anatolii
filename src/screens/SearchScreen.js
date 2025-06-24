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
import { brands, fuelTypes, driveTypes, conditions } from '../mock/cars';

const SearchScreen = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { query } = route.params || {};

  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    yearFrom: '',
    yearTo: '',
    mileageFrom: '',
    mileageTo: '',
    engine: '',
    fuel: '',
    drive: '',
    condition: '',
    priceFrom: '',
    priceTo: '',
  });

  const handleSearch = () => {
    // Здесь будет логика поиска
    navigation.navigate('CarList', { filters });
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      model: '',
      yearFrom: '',
      yearTo: '',
      mileageFrom: '',
      mileageTo: '',
      engine: '',
      fuel: '',
      drive: '',
      condition: '',
      priceFrom: '',
      priceTo: '',
    });
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Brand and Model */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('search.brand')}</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите марку (например: Toyota)"
              value={filters.brand}
              onChangeText={(value) => updateFilter('brand', value)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('search.model')}</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите модель"
              value={filters.model}
              onChangeText={(value) => updateFilter('model', value)}
            />
          </View>

          {/* Year Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('search.year')}</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="От"
                keyboardType="numeric"
                value={filters.yearFrom}
                onChangeText={(value) => updateFilter('yearFrom', value)}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="До"
                keyboardType="numeric"
                value={filters.yearTo}
                onChangeText={(value) => updateFilter('yearTo', value)}
              />
            </View>
          </View>

          {/* Mileage Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('search.mileage')}</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="От (км)"
                keyboardType="numeric"
                value={filters.mileageFrom}
                onChangeText={(value) => updateFilter('mileageFrom', value)}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="До (км)"
                keyboardType="numeric"
                value={filters.mileageTo}
                onChangeText={(value) => updateFilter('mileageTo', value)}
              />
            </View>
          </View>

          {/* Engine */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('search.engine')}</Text>
            <TextInput
              style={styles.input}
              placeholder="Объем двигателя (л)"
              value={filters.engine}
              onChangeText={(value) => updateFilter('engine', value)}
            />
          </View>

          {/* Fuel Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('search.fuel')}</Text>
            <TextInput
              style={styles.input}
              placeholder="Тип топлива (Бензин, Дизель, Гибрид)"
              value={filters.fuel}
              onChangeText={(value) => updateFilter('fuel', value)}
            />
          </View>

          {/* Drive Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('search.drive')}</Text>
            <TextInput
              style={styles.input}
              placeholder="Привод (Передний, Задний, Полный)"
              value={filters.drive}
              onChangeText={(value) => updateFilter('drive', value)}
            />
          </View>

          {/* Condition */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('search.condition')}</Text>
            <TextInput
              style={styles.input}
              placeholder="Состояние (Отличное, Хорошее, Удовлетворительное)"
              value={filters.condition}
              onChangeText={(value) => updateFilter('condition', value)}
            />
          </View>

          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('search.price')}</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="От (₽)"
                keyboardType="numeric"
                value={filters.priceFrom}
                onChangeText={(value) => updateFilter('priceFrom', value)}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="До (₽)"
                keyboardType="numeric"
                value={filters.priceTo}
                onChangeText={(value) => updateFilter('priceTo', value)}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>{t('search.clearFilters')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>{t('search.searchButton')}</Text>
            </TouchableOpacity>
          </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  halfInput: {
    flex: 1,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  searchButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SearchScreen; 