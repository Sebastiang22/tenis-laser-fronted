import { Store } from './types';

export const stores: Store[] = [
  {
    id: 1,
    name: "Tienda Central",
    location: "",
    customers: [
      {
        id: 1,
        name: "Juan Pérez",
        document: "12345678",
        credits: [
          {
            id: 1,
            amount: 5000,
            date: "2024-03-01",
            status: "active",
            installments: [
              {
                id: 1,
                number: 1,
                amount: 1000,
                dueDate: "2024-04-01",
                status: "paid"
              },
              {
                id: 2,
                number: 2,
                amount: 1000,
                dueDate: "2024-05-01",
                status: "pending"
              },
              {
                id: 3,
                number: 3,
                amount: 1000,
                dueDate: "2024-06-01",
                status: "pending"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "María González",
        document: "87654321",
        credits: [
          {
            id: 3,
            amount: 2500,
            date: "2024-02-15",
            status: "active",
            installments: [
              {
                id: 7,
                number: 1,
                amount: 500,
                dueDate: "2024-03-15",
                status: "paid"
              },
              {
                id: 8,
                number: 2,
                amount: 500,
                dueDate: "2024-04-15",
                status: "pending"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Tienda Norte",
    location: "",
    customers: [
      {
        id: 3,
        name: "Carlos Rodríguez",
        document: "98765432",
        credits: [
          {
            id: 2,
            amount: 3000,
            date: "2024-02-15",
            status: "active",
            installments: [
              {
                id: 4,
                number: 1,
                amount: 1000,
                dueDate: "2024-03-15",
                status: "paid"
              },
              {
                id: 5,
                number: 2,
                amount: 1000,
                dueDate: "2024-04-15",
                status: "pending"
              }
            ]
          }
        ]
      }
    ]
  }
];