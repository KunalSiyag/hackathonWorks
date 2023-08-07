import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import VoterRegistry from './VoterRegistry.json'; 

function App() {
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [voterId, setVoterId] = useState('');
  const [age, setAge] = useState('');
  const [address_, setAddress] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [retrievedVoter, setRetrievedVoter] = useState(null);
  const [fetchVoterId, setFetchVoterId] = useState('');
  const [activeSection, setActiveSection] = useState('input'); 

  const connectToEthereum = async () => {
    try {
      if (window.ethereum) {
        const ethereum = window.ethereum;
        await ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = '0xb9B65CcF4d1f91Ff4aC60078ea13Afcab61f24e3'; 
        const contract = new ethers.Contract(contractAddress, VoterRegistry.abi, signer);

        setSigner(signer);
        setContract(contract);
        setError('');
      } else {
        setError('Ethereum not available in this browser.');
      }
    } catch (err) {
      setError('Error connecting to Ethereum: ' + err.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const tx = await contract.addVoter(name, voterId, age, address_, fatherName);
      await tx.wait();
      alert('Voter details added successfully!');
      clearForm();
      setActiveSection('retrieve'); 
    } catch (err) {
      setError('Error adding voter details: ' + err.message);
    }
  };

  const fetchVoterDetails = async () => {
    try {
      const fetchVoterIdNumber = parseInt(fetchVoterId);
      const voterDetails = await contract.getVoterDetails(fetchVoterIdNumber);
      setRetrievedVoter(voterDetails);
      setError('');
    } catch (err) {
      setError('Error fetching voter details: ' + err.message);
    }
  };

  const clearForm = () => {
    setName('');
    setVoterId('');
    setAge('');
    setAddress('');
    setFatherName('');
  };

  return (
    <div className="App">
    <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
    </ul>
      <h1>Voter Registry</h1>
      {!signer || !contract ? (
        <button className="click" onClick={connectToEthereum}>Connect to Ethereum</button>
      ) : (
        <div>
      
          {activeSection === 'input' ? (
            <div>
              {/* Input Section */}
              <h2>Set Voter Details</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Name:</label>
                  <input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Voter ID:</label>
                  <input
                    placeholder="Voter ID"
                    type="number"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value)}
                  />
                </div>
                <div>
                  <label>Age:</label>
                  <input
                    placeholder="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div>
                  <label>Address:</label>
                  <input
                    placeholder="Address"
                    type="text"
                    value={address_}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label>Father's Name:</label>
                  <input
                    placeholder="Father's Name"
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
              <button onClick={() => setActiveSection('retrieve')}>Switch to Retrieve</button>
            </div>
          ) : (
            <div>
             
              <h2>Retrieve Voter Details</h2>
              <input
                type="number"
                placeholder="Enter Voter ID"
                value={fetchVoterId}
                onChange={(e) => setFetchVoterId(e.target.value)}
              />
              <button onClick={fetchVoterDetails}>Get Voter Details</button>
              {retrievedVoter && (
                <div className="retrieved-voter-details">
                  <h3>Retrieved Voter Details</h3>
                  <p>Name: {retrievedVoter.name}</p>
                  <p>Age: {retrievedVoter.age}</p>
                  <p>Address: {retrievedVoter.address_}</p>
                  <p>Father's Name: {retrievedVoter.fatherName}</p>
                </div>
              )}
              <button onClick={() => setActiveSection('input')}>Switch to Input</button>
            </div>
          )}
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
