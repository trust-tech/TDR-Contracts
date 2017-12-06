/* global artifacts */
/* eslint-disable prefer-reflect */

const Utils = artifacts.require('Utils.sol');
const Owned = artifacts.require('Owned.sol');
const Managed = artifacts.require('Managed.sol');
const TokenHolder = artifacts.require('TokenHolder.sol');
const ERC20Token = artifacts.require('ERC20Token.sol');
const EtherToken = artifacts.require('EtherToken.sol');
const SmartToken = artifacts.require('SmartToken.sol');
const SmartTokenController = artifacts.require('SmartTokenController.sol');
const TdrFormula = artifacts.require('TdrFormula.sol');
const TdrGasPriceLimit = artifacts.require('TdrGasPriceLimit.sol');
const TdrQuickConverter = artifacts.require('TdrQuickConverter.sol');
const TdrConverterExtensions = artifacts.require('TdrConverterExtensions.sol');
const TdrConverter = artifacts.require('TdrConverter.sol');
const CrowdsaleController = artifacts.require('CrowdsaleController.sol');

module.exports = async (deployer) => {
    deployer.deploy(Utils);
    deployer.deploy(Owned);
    deployer.deploy(Managed);
    deployer.deploy(TokenHolder);
    deployer.deploy(ERC20Token, 'DummyToken', 'DUM', 0);
    deployer.deploy(EtherToken);
    await deployer.deploy(SmartToken, 'Token1', 'TKN1', 2);
    deployer.deploy(SmartTokenController, SmartToken.address);
    deployer.deploy(TdrFormula);
    deployer.deploy(TdrGasPriceLimit, '22000000000');
    deployer.deploy(TdrQuickConverter);
    deployer.deploy(TdrConverterExtensions, '0x125463', '0x145463', '0x125763');
    deployer.deploy(TdrConverter, SmartToken.address, '0x124', 0, '0x0', 0);
    deployer.deploy(CrowdsaleController, SmartToken.address, 4102444800, '0x125', '0x126', 1);
};
