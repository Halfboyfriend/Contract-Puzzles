const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');
// 
describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    const signer = ethers.provider.getSigner(0);
    const addd = await signer.getAddress();
    console.log(`The address ${addd}`)
    return { game, signer };
  }
  it('should be a winner', async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // good luck

    await game.connect(signer).win();
    // await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
