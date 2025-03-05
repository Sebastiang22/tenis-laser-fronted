import { useState, useEffect } from "react";
import { Store, Customer, Credit } from "./types";
import { StoreList } from "./components/StoreList";
import { CustomerList } from "./components/CustomerList";
import { CreditList } from "./components/CreditList";
import { InstallmentList } from "./components/InstallmentList";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { getTiendas, getClientesByTienda, getCreditosByCliente } from "./api";

function App() {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [credits, setCredits] = useState<Credit[]>([]);
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cargar tiendas al iniciar o al volver a la pantalla de tiendas
  useEffect(() => {
    if (!selectedStore) {
      getTiendas().then((tiendas) => setStores(tiendas));
    }
  }, [selectedStore]);

  // Al seleccionar una tienda, cargamos sus clientes
  useEffect(() => {
    if (selectedStore && !selectedCustomer) {
      getClientesByTienda(selectedStore.id).then((clientes) => setCustomers(clientes));
    }
  }, [selectedStore, selectedCustomer]);

  // Al seleccionar un cliente, cargamos sus créditos
  useEffect(() => {
    if (selectedCustomer && !selectedCredit) {
      getCreditosByCliente(selectedCustomer.id).then((creditos) => setCredits(creditos));
    }
  }, [selectedCustomer, selectedCredit]);

  useEffect(() => {
    // Desplazar al principio de la página cada vez que se carga una vista
    window.scrollTo(0, 0);
  }, [selectedStore, selectedCustomer, selectedCredit]); // Dependencias para que se ejecute al cambiar de vista

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
    // Reiniciar estados inferiores
    setCustomers([]);
    setSelectedCustomer(null);
    setCredits([]);
    setSelectedCredit(null);
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    // Reiniciar créditos
    setCredits([]);
    setSelectedCredit(null);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedStore(null);
    setCustomers([]);
    setSelectedCustomer(null);
    setCredits([]);
    setSelectedCredit(null);
  };

  const handleInicio = () => {
    setSelectedStore(null); // Reiniciar la tienda seleccionada
    setCustomers([]); // Limpiar la lista de clientes
    setSelectedCustomer(null); // Reiniciar el cliente seleccionado
    setCredits([]); // Limpiar la lista de créditos
    setSelectedCredit(null); // Reiniciar el crédito seleccionado
  };

  return (
    <>
      <Header onInicio={handleInicio} onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          {isLoggedIn ? (
            selectedCredit ? (
              <InstallmentList credit={selectedCredit} onBack={() => setSelectedCredit(null)} />
            ) : selectedCustomer ? (
              <CreditList
                customer={{ ...selectedCustomer, credits }}
                onSelectCredit={setSelectedCredit}
                onBack={() => setSelectedCustomer(null)}
              />
            ) : selectedStore ? (
              <CustomerList
                store={{ ...selectedStore, customers }}
                onSelectCustomer={handleSelectCustomer}
                onBack={() => setSelectedStore(null)}
              />
            ) : (
              <StoreList stores={stores} onSelectStore={handleSelectStore} />
            )
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;