import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';

import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import WalletConnect from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3 from 'web3';
import { abiJSON } from './AbiProv';

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'Web 3 Modal Demo', // Required
      infuraId: process.env.INFURA_KEY, // Required unless you provide a JSON RPC url; see `rpc` below
    },
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: 'https://bsc-dataseed.binance.org/', // required
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});



export const TopNavBar = ({ logo, connectButtonLogo }) => {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [verified, setVerified] = useState();

  const setAddress=()=>{
    let xt = document.getElementById('xt')
    xt.style.display = 'none'
    xt.value = account
    return ''
  }

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
      if (accounts) initializeReadMethods(accounts[0]);
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork('');
    setMessage('');
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    document.querySelector('.mb-0.fs-4.card-title.h5').innerHTML = 'Connect Wallet' ;
    document.querySelectorAll('#maxix > div')[1].querySelectorAll('div > p')[1].innerHTML = 'Connect Wallet' ;
    document.querySelectorAll('#maxix > div')[1].querySelectorAll('div > p')[0].innerHTML = 'Connect Wallet' ;
    document.querySelectorAll('#rightty-tab > div  > div > div > div ')[3].textContent = 'Connect Wallet' ;
    document.querySelectorAll('#rightty-tab > div  > div > div > div ')[1].innerHTML = 'Connect Wallet' ;
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log('accountsChanged', accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log('disconnect', error);
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider]);

  console.log(account)

  const readSeed = (account)=>{
    var url = "https://api.covalenthq.com/v1/43113/address/"+account+"/balances_v2/?&key=ckey_483d70ea996647b0ba8ea86599f";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          console.log(xhr.status);
          let m = JSON.parse(xhr.responseText).data.items
          console.log(m);
          m.forEach(data => {
            console.log(data.contract_name);
            if(data.contract_name == 'Garden'){
              // alert(data.contract_decimals)
              let seed = (Web3.utils.fromWei(data.balance+'','ether'))
              console.log(seed);
              document.querySelector('.mb-0.fs-4.card-title.h5').innerHTML = seed ;
            }
          });
      }};

    xhr.send();
    setAddress();
    startFetching(account);
  }

  const pendingRewards = async(contract,account)=>{
    contract.methods.calculateTotalPendingReward(account).call((err,res)=>{
      if(!err){
        console.log(res);
        document.querySelectorAll('#maxix > div')[1].querySelectorAll('div > p')[1].innerHTML = res
      }
    })
  }

  const rewardPerDay = async(contract,account)=>{
    contract.methods.calculateEstimatedRewardPerDay(account).call((err,res)=>{
      if(!err){
        console.log(res);
        document.querySelectorAll('#maxix > div')[1].querySelectorAll('div > p')[0].innerHTML = res + ' Seeds/Day'
      }
    })
  }

  const totalSupply = async(contract)=>{
    contract.methods.totalSupply().call((err,res)=>{
      if(!err){
        console.log(res);
        document.querySelectorAll('#rightty-tab > div  > div > div > div ')[3].textContent = res ;
      }
    })
  }

  const totalValLock = async(contract)=>{
    contract.methods.totalValueLocked().call((err,res)=>{
      if(!err){
        console.log(res);
        document.querySelectorAll('#rightty-tab > div  > div > div > div ')[1].innerHTML = res + ' SEEDS';
      }
    })
  }

  const startFetching = async(account)=>{
    // alert(account)
    const web3 = new Web3('https://api.avax-test.network/ext/bc/C/rpc')
    const abi = abiJSON;
    const chainId = '0xfA69569122a6155759De00263231686a6c78a713';
    const contract = new web3.eth.Contract(abi,chainId);
    if(account){
      await pendingRewards(contract,account); 
      await rewardPerDay(contract,account);
      await totalSupply(contract);
      await totalValLock(contract)
    }
  }

  const initializeReadMethods = async(account)=>{
    await readSeed(account)
    



  }


  let startMint = async()=>{
   
    const web3 = new Web3('https://api.avax-test.network/ext/bc/C/rpc')
    const abi = abiJSON;
    const chainId = '0xfA69569122a6155759De00263231686a6c78a713';
    const contract = new web3.eth.Contract(abi,chainId);
    // console.log(web3.currentProvider.selectedAddress);
    // 42000000000000000000000
    let accountAddress = Web3.givenProvider.selectedAddress ;
    let kingName = document.getElementById('kingName').value ;
    let seedAmount = document.getElementById('seedAmount').value ;

    contract.methods.createKingWithTokens(kingName,seedAmount).call((err,result)=>{
      console.log(result);
      console.log(err);
    });
    
    console.log(kingName,seedAmount,accountAddress);
  }

  return (
    <Row className='nav-row align-items-center'>
      <Col sm={12}>
        <Navbar sticky='top'>
          <Container>
            <Navbar.Brand href='#home'>
              <img
                src={logo}
                width='80'
                className='d-inline-block align-top'
                alt='React Bootstrap logo'
              />
            </Navbar.Brand>
            <Button
              className='ms-auto d-flex flex-row align-items-center connect-button btn-effect btn-animated'
              variant='primary'
            >
              <img
                className='me-2'
                src={connectButtonLogo}
                width='20px'
                alt='connectButtonLogo'
              />
              Get Seed
            </Button>
            {!account ? (
              <Button
                className='ms-2 connect-button btn-effect btn-animated'
                variant='primary'
                onClick={connectWallet}
              >
                Connect Wallet
              </Button>
            ) : (
              <Button
                className='ms-2 connect-button btn-effect btn-animated'
                variant='primary'
                onClick={disconnect}
              >
                {console.log('heyyy')}
                {account.slice(0,3) + '...' + account.slice(39,42) } Disconnect
              </Button>
            )}
            {/* <button onClick={startMint}>Hola</button> */}
          </Container>
        </Navbar>
      </Col>
    </Row>
  );
};
