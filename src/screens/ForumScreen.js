import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const ForumScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const [topics] = useState([
    {
      id: 1,
      title: 'Опыт покупки Toyota Camry с аукциона',
      author: 'Алексей',
      replies: 15,
      views: 234,
      lastPost: '2024-01-17',
      category: 'Опыт покупок',
    },
    {
      id: 2,
      title: 'Как правильно оценить состояние авто по фото?',
      author: 'Мария',
      replies: 8,
      views: 156,
      lastPost: '2024-01-16',
      category: 'Советы',
    },
    {
      id: 3,
      title: 'Лучшие аукционы для покупки Honda',
      author: 'Дмитрий',
      replies: 12,
      views: 189,
      lastPost: '2024-01-15',
      category: 'Аукционы',
    },
    {
      id: 4,
      title: 'Проблемы с доставкой из Японии',
      author: 'Елена',
      replies: 6,
      views: 98,
      lastPost: '2024-01-14',
      category: 'Доставка',
    },
    {
      id: 5,
      title: 'Сравнение цен на Nissan Skyline GT-R',
      author: 'Сергей',
      replies: 23,
      views: 445,
      lastPost: '2024-01-13',
      category: 'Цены',
    },
  ]);

  const [categories] = useState([
    'Все темы',
    'Опыт покупок',
    'Советы',
    'Аукционы',
    'Доставка',
    'Цены',
    'Технические вопросы',
  ]);

  const [selectedCategory, setSelectedCategory] = useState('Все темы');

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все темы' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTopicPress = (topic) => {
    // Здесь будет навигация к теме
    console.log('Открыть тему:', topic.title);
  };

  const handleNewTopic = () => {
    // Здесь будет создание новой темы
    console.log('Создать новую тему');
  };

  const renderTopic = ({ item }) => (
    <TouchableOpacity style={styles.topicItem} onPress={() => handleTopicPress(item)}>
      <View style={styles.topicHeader}>
        <Text style={styles.topicTitle}>{item.title}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      
      <View style={styles.topicMeta}>
        <Text style={styles.authorText}>Автор: {item.author}</Text>
        <Text style={styles.dateText}>{item.lastPost}</Text>
      </View>
      
      <View style={styles.topicStats}>
        <Text style={styles.statsText}>{item.replies} ответов</Text>
        <Text style={styles.statsText}>{item.views} просмотров</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.categoryItemActive
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryItemText,
        selectedCategory === item && styles.categoryItemTextActive
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск тем..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Topics List */}
      <FlatList
        data={filteredTopics}
        renderItem={renderTopic}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.topicsList}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>{t('forum.topics')}</Text>
            <TouchableOpacity style={styles.newTopicButton} onPress={handleNewTopic}>
              <Text style={styles.newTopicButtonText}>{t('forum.newTopic')}</Text>
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Темы не найдены</Text>
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
  searchContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoriesList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryItem: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryItemActive: {
    backgroundColor: '#2196F3',
  },
  categoryItemText: {
    fontSize: 14,
    color: '#666',
  },
  categoryItemTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  newTopicButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  newTopicButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  topicsList: {
    paddingBottom: 20,
  },
  topicItem: {
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
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
  topicMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  authorText: {
    fontSize: 14,
    color: '#666',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  topicStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statsText: {
    fontSize: 12,
    color: '#999',
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

export default ForumScreen; 