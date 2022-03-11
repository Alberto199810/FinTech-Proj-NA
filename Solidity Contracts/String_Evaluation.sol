pragma solidity ^0.4.7;

contract String_Evaluation {

    function st2num(string memory numString) public pure returns(uint) {
        uint  val=0;
        bytes   memory stringBytes = bytes(numString);
        for (uint  i =  0; i<stringBytes.length; i++) {
            uint exp = stringBytes.length - i;
            bytes1 ival = stringBytes[i];
            uint8 uval = uint8(ival);
           uint jval = uval - uint(0x30);
   
           val +=  (uint(jval) * (10**(exp-1))); 
        }
      return val;
    }

    function getSlice(uint256 begin, uint256 end, string text) public pure returns(string) {
        bytes memory a = new bytes(end-begin+1);
        for(uint i=0;i<=end-begin;i++){
            a[i] = bytes(text)[i+begin-1];
        }
        return string(a);    
    }

    function finalNumb(string _vote, uint start, uint end) public pure returns(uint){
        string memory subb = getSlice(start, end, _vote);
        uint indexVoto = st2num(subb);
        return(indexVoto);
    }

    function utfStringLength(string memory str) public pure returns (uint length) {
        uint i=0;
        bytes memory string_rep = bytes(str);

        while (i<string_rep.length){
            if (string_rep[i]>>7==0)
            i+=1;
        else if (string_rep[i]>>5==bytes1(uint8(0x6)))
            i+=2;
        else if (string_rep[i]>>4==bytes1(uint8(0xE)))
            i+=3;
        else if (string_rep[i]>>3==bytes1(uint8(0x1E)))
            i+=4;
        else
            //For safety
            i+=1;
        length++;
        }
    }
}