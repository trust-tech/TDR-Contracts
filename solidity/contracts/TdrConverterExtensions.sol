pragma solidity ^0.4.11;
import './TokenHolder.sol';
import './interfaces/ITdrConverterExtensions.sol';

/**
    @dev the TdrConverterExtensions contract is an owned contract that serves as a single point of access
    to the TdrFormula, TdrGasPriceLimit and TdrQuickConverter contracts from all TdrConverter contract instances.
    it allows upgrading these contracts without the need to update each and every
    TdrConverter contract instance individually.
*/
contract TdrConverterExtensions is ITdrConverterExtensions, TokenHolder {
    ITdrFormula public formula;  // tdr calculation formula contract
    ITdrGasPriceLimit public gasPriceLimit; // tdr universal gas price limit contract
    ITdrQuickConverter public quickConverter; // tdr quick converter contract

    /**
        @dev constructor

        @param _formula         address of a tdr formula contract
        @param _gasPriceLimit   address of a tdr gas price limit contract
        @param _quickConverter  address of a tdr quick converter contract
    */
    function TdrConverterExtensions(ITdrFormula _formula, ITdrGasPriceLimit _gasPriceLimit, ITdrQuickConverter _quickConverter)
        validAddress(_formula)
        validAddress(_gasPriceLimit)
        validAddress(_quickConverter)
    {
        formula = _formula;
        gasPriceLimit = _gasPriceLimit;
        quickConverter = _quickConverter;
    }

    /*
        @dev allows the owner to update the formula contract address

        @param _formula    address of a tdr formula contract
    */
    function setFormula(ITdrFormula _formula)
        public
        ownerOnly
        validAddress(_formula)
        notThis(_formula)
    {
        formula = _formula;
    }

    /*
        @dev allows the owner to update the gas price limit contract address

        @param _gasPriceLimit   address of a tdr gas price limit contract
    */
    function setGasPriceLimit(ITdrGasPriceLimit _gasPriceLimit)
        public
        ownerOnly
        validAddress(_gasPriceLimit)
        notThis(_gasPriceLimit)
    {
        gasPriceLimit = _gasPriceLimit;
    }

    /*
        @dev allows the owner to update the quick converter contract address

        @param _quickConverter  address of a tdr quick converter contract
    */
    function setQuickConverter(ITdrQuickConverter _quickConverter)
        public
        ownerOnly
        validAddress(_quickConverter)
        notThis(_quickConverter)
    {
        quickConverter = _quickConverter;
    }
}
