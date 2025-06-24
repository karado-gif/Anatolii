// Калькулятор финальной стоимости автомобиля
export const calculateFinalCost = (carPrice) => {
  const customs = carPrice * 0.1; // 10% таможня
  const freight = 150000; // Фрахт до Владивостока
  const insurance = carPrice * 0.02; // 2% страховка
  const processing = 50000; // Обработка документов
  
  return {
    carPrice,
    customs,
    freight,
    insurance,
    processing,
    total: carPrice + customs + freight + insurance + processing
  };
};

// Форматирование цены в рубли
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Рекомендуемая ставка на основе анализа
export const calculateRecommendedBid = (currentBid, condition, year, mileage) => {
  let multiplier = 1.1; // Базовая ставка +10%
  
  // Корректировка по состоянию
  switch (condition) {
    case 'Отличное':
      multiplier += 0.05;
      break;
    case 'Хорошее':
      multiplier += 0.02;
      break;
    case 'Удовлетворительное':
      multiplier -= 0.02;
      break;
    case 'Плохое':
      multiplier -= 0.05;
      break;
  }
  
  // Корректировка по году
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  if (age <= 2) multiplier += 0.03;
  else if (age <= 5) multiplier += 0.01;
  else if (age > 10) multiplier -= 0.02;
  
  // Корректировка по пробегу
  if (mileage < 30000) multiplier += 0.02;
  else if (mileage > 100000) multiplier -= 0.02;
  
  return Math.round(currentBid * multiplier);
}; 