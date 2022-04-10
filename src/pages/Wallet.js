import React from 'react';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <WalletTable />
      </>
    );
  }
}

export default Wallet;
