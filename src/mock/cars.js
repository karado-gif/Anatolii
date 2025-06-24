export const cars = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    mileage: 45000,
    engine: '2.5L',
    fuel: 'Бензин',
    drive: 'Передний',
    condition: 'Отличное',
    currentBid: 2500000,
    recommendedBid: 2800000,
    status: 'На аукционе',
    photos: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&crop=entropy',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&crop=center'
    ],
    description: 'Toyota Camry 2020 года в отличном состоянии. Полная комплектация, один владелец.',
    specifications: {
      power: '200 л.с.',
      transmission: 'Автомат',
      color: 'Белый',
      interior: 'Черный',
      options: ['Климат-контроль', 'Кожаный салон', 'Навигация', 'Парктроники']
    },
    auctionSheet: 'https://images.unsplash.com/photo-1589820296150-ecf34d9f2b1a?w=800&h=1000&fit=crop',
    biddingHistory: [
      { bid: 2000000, date: '2024-01-15', user: 'user1' },
      { bid: 2200000, date: '2024-01-16', user: 'user2' },
      { bid: 2500000, date: '2024-01-17', user: 'user3' }
    ],
    finalCost: {
      carPrice: 2800000,
      customs: 280000,
      freight: 150000,
      total: 3230000
    }
  },
  {
    id: 2,
    brand: 'Honda',
    model: 'CR-V',
    year: 2019,
    mileage: 62000,
    engine: '2.0L',
    fuel: 'Бензин',
    drive: 'Полный',
    condition: 'Хорошее',
    currentBid: 3200000,
    recommendedBid: 3500000,
    status: 'На аукционе',
    photos: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=entropy',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center'
    ],
    description: 'Honda CR-V 2019 года. Надежный кроссовер с полным приводом.',
    specifications: {
      power: '150 л.с.',
      transmission: 'Вариатор',
      color: 'Серебристый',
      interior: 'Серый',
      options: ['Полный привод', 'Климат-контроль', 'Круиз-контроль', 'Камера заднего вида']
    },
    auctionSheet: 'https://images.unsplash.com/photo-1589820296150-ecf34d9f2b1a?w=800&h=1000&fit=crop',
    biddingHistory: [
      { bid: 2800000, date: '2024-01-14', user: 'user4' },
      { bid: 3000000, date: '2024-01-15', user: 'user5' },
      { bid: 3200000, date: '2024-01-16', user: 'user6' }
    ],
    finalCost: {
      carPrice: 3500000,
      customs: 350000,
      freight: 150000,
      total: 4000000
    }
  },
  {
    id: 3,
    brand: 'Nissan',
    model: 'Skyline GT-R',
    year: 2018,
    mileage: 35000,
    engine: '3.8L',
    fuel: 'Бензин',
    drive: 'Полный',
    condition: 'Отличное',
    currentBid: 8500000,
    recommendedBid: 9000000,
    status: 'На аукционе',
    photos: [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&h=600&fit=crop&crop=entropy',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&h=600&fit=crop&crop=center'
    ],
    description: 'Легендарный Nissan Skyline GT-R 2018 года. Спортивный автомобиль в идеальном состоянии.',
    specifications: {
      power: '570 л.с.',
      transmission: 'Робот',
      color: 'Черный',
      interior: 'Черный',
      options: ['Полный привод', 'Спортивная подвеска', 'Кожаный салон', 'Премиум аудиосистема']
    },
    auctionSheet: 'https://images.unsplash.com/photo-1589820296150-ecf34d9f2b1a?w=800&h=1000&fit=crop',
    biddingHistory: [
      { bid: 7500000, date: '2024-01-13', user: 'user7' },
      { bid: 8000000, date: '2024-01-14', user: 'user8' },
      { bid: 8500000, date: '2024-01-15', user: 'user9' }
    ],
    finalCost: {
      carPrice: 9000000,
      customs: 900000,
      freight: 200000,
      total: 10100000
    }
  },
  {
    id: 4,
    brand: 'Mazda',
    model: 'CX-5',
    year: 2021,
    mileage: 28000,
    engine: '2.5L',
    fuel: 'Бензин',
    drive: 'Полный',
    condition: 'Отличное',
    currentBid: 3800000,
    recommendedBid: 4200000,
    status: 'На аукционе',
    photos: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=left',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=right',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=top'
    ],
    description: 'Mazda CX-5 2021 года. Современный дизайн и отличная управляемость.',
    specifications: {
      power: '190 л.с.',
      transmission: 'Автомат',
      color: 'Синий',
      interior: 'Бежевый',
      options: ['Полный привод', 'Климат-контроль', 'Кожаный салон', 'Система безопасности']
    },
    auctionSheet: 'https://images.unsplash.com/photo-1589820296150-ecf34d9f2b1a?w=800&h=1000&fit=crop',
    biddingHistory: [
      { bid: 3500000, date: '2024-01-12', user: 'user10' },
      { bid: 3600000, date: '2024-01-13', user: 'user11' },
      { bid: 3800000, date: '2024-01-14', user: 'user12' }
    ],
    finalCost: {
      carPrice: 4200000,
      customs: 420000,
      freight: 150000,
      total: 4770000
    }
  },
  {
    id: 5,
    brand: 'Subaru',
    model: 'Impreza WRX STI',
    year: 2017,
    mileage: 55000,
    engine: '2.5L',
    fuel: 'Бензин',
    drive: 'Полный',
    condition: 'Хорошее',
    currentBid: 4500000,
    recommendedBid: 4800000,
    status: 'На аукционе',
    photos: [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&h=600&fit=crop&crop=bottom',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&h=600&fit=crop&crop=left',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&h=600&fit=crop&crop=right'
    ],
    description: 'Subaru Impreza WRX STI 2017 года. Спортивный седан с полным приводом.',
    specifications: {
      power: '300 л.с.',
      transmission: 'Механика',
      color: 'Белый',
      interior: 'Черный',
      options: ['Полный привод', 'Спортивная подвеска', 'Кожаный руль', 'Спортивные сиденья']
    },
    auctionSheet: 'https://images.unsplash.com/photo-1589820296150-ecf34d9f2b1a?w=800&h=1000&fit=crop',
    biddingHistory: [
      { bid: 4200000, date: '2024-01-11', user: 'user13' },
      { bid: 4300000, date: '2024-01-12', user: 'user14' },
      { bid: 4500000, date: '2024-01-13', user: 'user15' }
    ],
    finalCost: {
      carPrice: 4800000,
      customs: 480000,
      freight: 180000,
      total: 5460000
    }
  }
];

export const brands = [
  'Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Mitsubishi', 
  'Lexus', 'Infiniti', 'Acura', 'Suzuki', 'Daihatsu', 'Isuzu'
];

export const fuelTypes = ['Бензин', 'Дизель', 'Гибрид', 'Электро'];
export const driveTypes = ['Передний', 'Задний', 'Полный'];
export const conditions = ['Отличное', 'Хорошее', 'Удовлетворительное', 'Плохое']; 