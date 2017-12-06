/* global artifacts, contract, before, it, assert */
/* eslint-disable prefer-reflect */

const TdrConverterExtensions = artifacts.require('TdrConverterExtensions.sol');
const TdrFormula = artifacts.require('TdrFormula.sol');
const TdrGasPriceLimit = artifacts.require('TdrGasPriceLimit.sol');
const TdrQuickConverter = artifacts.require('TdrQuickConverter.sol');
const utils = require('./helpers/Utils');

let formulaAddress;
let gasPriceLimitAddress;
let quickConverterAddress;

async function initConverterExtensions() {
    return await TdrConverterExtensions.new(formulaAddress, gasPriceLimitAddress, quickConverterAddress);
}

contract('TdrConverterExtensions', (accounts) => {
    before(async () => {
        let formula = await TdrFormula.new();
        let gasPriceLimit = await TdrGasPriceLimit.new(22000000000);
        let quickConverter = await TdrQuickConverter.new();
        formulaAddress = formula.address;
        gasPriceLimitAddress = gasPriceLimit.address;
        quickConverterAddress = quickConverter.address;
    });

    it('verifies the data after construction', async () => {
        let converterExtensions = await initConverterExtensions();
        let formula = await converterExtensions.formula.call();
        assert.equal(formula, formulaAddress);

        let gasPriceLimit = await converterExtensions.gasPriceLimit.call();
        assert.equal(gasPriceLimit, gasPriceLimitAddress);

        let quickConverter = await converterExtensions.quickConverter.call();
        assert.equal(quickConverter, quickConverterAddress);
    });

    it('should throw when attempting to construct the converter extensions with no formula', async () => {
        try {
            await TdrConverterExtensions.new('0x0', gasPriceLimitAddress, quickConverterAddress);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when attempting to construct the converter extensions with no gas price limit', async () => {
        try {
            await TdrConverterExtensions.new(formulaAddress, '0x0', quickConverterAddress);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when attempting to construct the converter extensions with no quick converter', async () => {
        try {
            await TdrConverterExtensions.new(formulaAddress, gasPriceLimitAddress, '0x0');
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('verifies the owner can update the formula contract address', async () => {
        let converterExtensions = await initConverterExtensions();
        await converterExtensions.setFormula(accounts[3]);
        let formula = await converterExtensions.formula.call();
        assert.equal(formula, accounts[3]);
    });

    it('should throw when a non owner attempts update the formula contract address', async () => {
        let converterExtensions = await initConverterExtensions();

        try {
            await converterExtensions.setFormula(accounts[3], { from: accounts[1] });
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when the owner attempts update the formula contract address with an invalid address', async () => {
        let converterExtensions = await initConverterExtensions();

        try {
            await converterExtensions.setFormula('0x0');
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when the owner attempts update the formula contract address with the converter extensions address', async () => {
        let converterExtensions = await initConverterExtensions();

        try {
            await converterExtensions.setFormula(converterExtensions.address);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('verifies the owner can update the gas price limit contract address', async () => {
        let converterExtensions = await initConverterExtensions();
        await converterExtensions.setGasPriceLimit(accounts[3]);
        let gasPriceLimit = await converterExtensions.gasPriceLimit.call();
        assert.equal(gasPriceLimit, accounts[3]);
    });

    it('should throw when a non owner attempts update the gas price limit contract address', async () => {
        let converterExtensions = await initConverterExtensions();

        try {
            await converterExtensions.setGasPriceLimit(accounts[3], { from: accounts[1] });
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when the owner attempts update the gas price limit contract address with an invalid address', async () => {
        let converterExtensions = await initConverterExtensions();

        try {
            await converterExtensions.setGasPriceLimit('0x0');
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when the owner attempts update the gas price limit contract address with the converter extensions address', async () => {
        let converterExtensions = await initConverterExtensions();

        try {
            await converterExtensions.setGasPriceLimit(converterExtensions.address);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('verifies the owner can update the quick converter contract address', async () => {
        let converterExtensions = await initConverterExtensions();
        await converterExtensions.setQuickConverter(accounts[3]);
        let quickConverter = await converterExtensions.quickConverter.call();
        assert.equal(quickConverter, accounts[3]);
    });

    it('should throw when a non owner attempts update the quick converter contract address', async () => {
        let converterExtensions = await initConverterExtensions();

        try {
            await converterExtensions.setQuickConverter(accounts[3], { from: accounts[1] });
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when the owner attempts update the quick converter contract address with an invalid address', async () => {
        let converterExtensions = await initConverterExtensions();

        try {
            await converterExtensions.setQuickConverter('0x0');
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when the owner attempts update the quick converter contract address with the converter extensions address', async () => {
        let converterExtensions = await initConverterExtensions();

        try {
            await converterExtensions.setQuickConverter(converterExtensions.address);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });
});
