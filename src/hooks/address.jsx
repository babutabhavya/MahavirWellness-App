import React, {useContext, useState, useEffect, createContext} from 'react';
import {useSelector} from 'react-redux';
import AddressClient from '../api/address';

export function useAddress() {
  const [addresses, setAddresses] = useState([]);
  const addressClient = new AddressClient();

  // Function to fetch and set the addresses
  const fetchAddresses = async () => {
    const fetchedAddresses = await addressClient.listAddresses();
    setAddresses(fetchedAddresses);
  };

  // Function to create an address
  const createAddress = async data => {
    const newAddress = await addressClient.createAddress(data);
    setAddresses(prevAddresses => [...prevAddresses, newAddress]);
  };

  // Function to update an address
  const updateAddress = async (id, data) => {
    const updatedAddress = await addressClient.updateAddress(id, data);
    setAddresses(prevAddresses =>
      prevAddresses.map(address =>
        address.id === id ? updatedAddress : address,
      ),
    );
  };

  // Function to delete an address
  const deleteAddress = async id => {
    await addressClient.deleteAddress(id);
    setAddresses(prevAddresses =>
      prevAddresses.filter(address => address.id !== id),
    );
  };

  return {
    addresses,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
  };
}

const AddressContext = createContext();

export const AddressProvider = ({children}) => {
  const addressContextValue = useAddress();
  const {fetchAddresses} = addressContextValue;
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAddresses();
    }
  }, [isLoggedIn]);

  return (
    <AddressContext.Provider value={addressContextValue}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddressContext must be used within an AddressProvider');
  }
  return context;
};
