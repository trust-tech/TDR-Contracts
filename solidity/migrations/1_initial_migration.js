/* global artifacts */

const Migrations = artifacts.require('Migrations.sol');
const TdrFormula = artifacts.require('TdrFormula.sol');

module.exports = (deployer) => {
    deployer.deploy(Migrations);
    deployer.deploy(TdrFormula);
};
