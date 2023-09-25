const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);
    const signerTwo = ethers.provider.getSigner(1);
    const signerThree = ethers.provider.getSigner(2);


    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();
    const signTwoAdd = await signerTwo.getAddress();
    const signThreeAdd = await signerThree.getAddress();

    return { game, signer, signerTwo, signerThree, signTwoAdd, signThreeAdd, address };
  }

  it('should be a winner', async function () {
    const { game, signer, signerTwo, signerThree, signThreeAdd, signTwoAdd, address } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(signer).buy({value: '4'});
    await game.connect(signerTwo).buy({value: '5'});
    await game.connect(signerThree).buy({value: '2'});
    
    // const add = await signerThree.getBalance();

    // console.log(`Balance : ${add}`)
    // TODO: win expects three arguments

    await game.win(address, signTwoAdd, signThreeAdd);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');

  });
});
