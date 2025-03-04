import React from 'react';
import { Store } from '../types';
import { Building2 } from 'lucide-react';

interface StoreListProps {
  stores: Store[];
  onSelectStore: (store: Store) => void;
}

export function StoreList({ stores, onSelectStore }: StoreListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stores.map((store) => (
        <div
          key={store.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectStore(store)}
        >
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-800">{store.name}</h2>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Créditos activos: {store.activeCredits}
          </p>
        </div>
      ))}
    </div>
  );
}