import React from 'react';
import { Credit } from '../types';
import { ArrowLeft, Calendar } from 'lucide-react';

interface InstallmentListProps {
  credit: Credit;
  onBack: () => void;
}

export function InstallmentList({ credit, onBack }: InstallmentListProps) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-red-600 mb-6 hover:text-red-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a créditos
      </button>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Detalles del Crédito
        </h2>
        <p className="text-gray-600 mt-2">
          Monto total: ${credit.amount.toLocaleString()}
        </p>
      </div>
      
      <div className="space-y-4">
        {credit.installments.map((installment) => (
          <div
            key={installment.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Cuota {installment.number}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Vencimiento: {new Date(installment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  ${installment.amount.toLocaleString()}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  installment.status === 'paid'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {installment.status === 'paid' ? 'Pagada' : 'Pendiente'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}