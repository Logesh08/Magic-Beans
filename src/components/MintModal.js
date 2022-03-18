import { Modal, Button, Form } from 'react-bootstrap';
import Web3 from 'web3';
import { abiJSON } from './AbiProv';

export const MintModal = (props) => {
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
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title id='contained-modal-title-vcenter'>Mint Seeds</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className='mb-3' controlId='nameCtrl'>
          {/* <Form.Label>Name</Form.Label> */}
          <Form.Control type='text' placeholder='Name' id='kingName'/>
          <Form.Text className='text-muted'>
            Your name should be between 2 and 31 characters.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='seedCtrl'>
          {/* <Form.Label>SEED Amount</Form.Label> */}
          <Form.Control type='text' placeholder='SEED Amount' id='seedAmount'/>
          <Form.Text className='text-muted'>Min: 100,000 SEED.</Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={props.onHide}>
          CLOSE
        </Button>
        <Button variant='primary' onClick={startMint}>
          MINT
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
