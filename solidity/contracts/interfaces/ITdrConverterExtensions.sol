pragma solidity ^0.4.11;
import './ITdrFormula.sol';
import './ITdrGasPriceLimit.sol';
import './ITdrQuickConverter.sol';

/*
    Tdr Converter Extensions interface
*/
contract ITdrConverterExtensions {
    function formula() public constant returns (ITdrFormula) {}
    function gasPriceLimit() public constant returns (ITdrGasPriceLimit) {}
    function quickConverter() public constant returns (ITdrQuickConverter) {}
}
