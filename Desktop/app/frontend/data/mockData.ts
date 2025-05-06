export const mockStudents = [
  {
    id: '1',
    name: 'Emma Johnson',
    grade: '5th Grade',
    busNumber: '42',
    status: 'on-bus',
    avatar: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg',
  },
  {
    id: '2',
    name: 'Noah Johnson',
    grade: '3rd Grade',
    busNumber: '42',
    status: 'at-school',
    avatar: 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg',
  },
];

export const mockBuses = [
  {
    id: '1',
    number: '42',
    routeId: 1,
    status: 'on-time',
    driver: 'David Wilson',
    capacity: 48,
    studentsOnboard: 23,
    speed: 25,
    latitude: 37.78825,
    longitude: -122.4324,
    eta: '7 min',
  },
  {
    id: '2',
    number: '37',
    routeId: 1,
    status: 'delayed',
    driver: 'James Smith',
    capacity: 52,
    studentsOnboard: 31,
    speed: 18,
    delayMinutes: 10,
    latitude: 37.78925,
    longitude: -122.4344,
    eta: '15 min',
  },
  {
    id: '3',
    number: '23',
    routeId: 1,
    status: 'on-time',
    driver: 'Linda Brown',
    capacity: 48,
    studentsOnboard: 19,
    speed: 22,
    latitude: 37.78725,
    longitude: -122.4314,
    eta: '3 min',
  },
];

export const mockRoutes = [
  {
    id: 1,
    name: 'North Springfield Route',
    school: 'Springfield Elementary',
    coordinates: [
      { latitude: 37.78825, longitude: -122.4324 },
      { latitude: 37.78865, longitude: -122.4334 },
      { latitude: 37.78915, longitude: -122.4344 },
      { latitude: 37.78955, longitude: -122.4354 },
      { latitude: 37.79015, longitude: -122.4364 },
    ],
    stops: [
      {
        name: 'Maple Street & 5th Avenue',
        time: '7:35 AM',
        latitude: 37.78865,
        longitude: -122.4334,
      },
      {
        name: 'Oak Drive & 10th Avenue',
        time: '7:45 AM',
        latitude: 37.78955,
        longitude: -122.4354,
      },
    ],
  },
];

export const mockNotifications = [
  {
    id: 1,
    title: 'Bus #42 is running late',
    message: 'Estimated delay of 10 minutes due to traffic congestion on Main Street.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    type: 'delay',
    read: false,
  },
  {
    id: 2,
    title: 'Emma Johnson has boarded the bus',
    message: 'Your child has been picked up from bus stop "Maple Street & 5th Avenue".',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    type: 'info',
    read: true,
  },
  {
    id: 3,
    title: 'Route change for Bus #37',
    message: 'Due to road construction, Bus #37 will use an alternate route tomorrow. Pickup times remain unchanged.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    type: 'alert',
    read: false,
  },
  {
    id: 4,
    title: 'Noah Johnson has arrived at school',
    message: 'Your child has arrived safely at Springfield Elementary.',
    timestamp: new Date(Date.now() - 27 * 60 * 60 * 1000).toISOString(), // 27 hours ago
    type: 'success',
    read: true,
  },
  {
    id: 5,
    title: 'Early dismissal next Friday',
    message: 'Springfield Elementary will have early dismissal at 1:30 PM next Friday. Buses will arrive 2 hours earlier than usual.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    type: 'info',
    read: true,
  },
];