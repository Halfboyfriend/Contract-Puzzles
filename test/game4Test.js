const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const signer = ethers.provider.getSigner(0);
    const others = ethers.provider.getSigner(1);

    const signerAddress = await signer.getAddress();
    const othersAddress = await others.getAddress();

    return { game, signerAddress, othersAddress, signer };
  }
  it('should be a winner', async function () {
    const { game, signer, othersAddress , signerAddress} = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(signer).write(signerAddress);
    await game.connect(signer).win(signerAddress);

    // await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
