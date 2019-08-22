pragma solidity ^0.4.16;

contract owned {
    address public owner;
    address public owner1;

    function owned() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner||msg.sender==owner1);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner public {
        owner = newOwner;
    }
    
      function addOwnership(address newOwner) onlyOwner public {
        owner1 = newOwner;
    }
}
 

contract ppc is owned {

       struct patient{
           string stat;
           string fname;
           string lname;
            uint zipcode;
            uint phoneno;
            uint ssn;
            uint mid;
         }
         
          struct mhistory{
           uint mid;
           string provider;
           address provideraddr;
           string claimtype;
           uint cfs_id;
           string adjd_date;
           uint age;
           uint cca_nbr;
           string diseaseid;
           uint claimamount;
           string description;
           uint providerid;
         }
          
          struct provider
          {
              string pname;
              uint pid;
          }
          
       mapping (address => patient) private pdetails;
       mapping (address => mhistory[]) private pmhistory;
       mapping (uint => address) private fetchaddr;
       mapping (uint => address) private fetchpaddr;
       mapping (address => address[]) private permissionlist;
       mapping (address => provider) private prodetails;

       uint public pidcounter=0;
 
   function addpatient(address publickey,string _fname,string _lname,uint _zipcode,uint _phoneno,uint _ssn) onlyOwner public returns(uint)
   {
        var a = pdetails[publickey];
        require(keccak256("created")!= keccak256(a.stat));
        a.stat="created";
        a.fname = _fname;
        a.lname = _lname;
        a.zipcode = _zipcode;
        a.phoneno = _phoneno;
        a.ssn = _ssn;
        ++pidcounter;
        a.mid=pidcounter;
        fetchaddr[pidcounter]=publickey;
        return pidcounter;
   }
   
   function updatepdetails(uint _zipcode,uint _phoneno)
   {
       address ad=msg.sender;
       var a=pdetails[ad];
        require(keccak256("created")== keccak256(a.stat));
       a.phoneno=_phoneno;
       a.zipcode=_zipcode;
       
   }
   
   function addpermission(address tprovider)
   {
       permissionlist[msg.sender].push(tprovider);
   }
   
    function removepermission(address tprovider) public
   {
       for(uint i=0;i<permissionlist[msg.sender].length;i++)
       {
        if(permissionlist[msg.sender][i]==tprovider){
              permissionlist[msg.sender][i]=0;
            }
       }
   }
   
   
   function viewdetails(uint _mid) public constant returns(string,string,uint,uint,uint)
   {
       if(_mid==0)
       {
           _mid=pdetails[msg.sender].mid;
       }
      address ad=fetchaddr[_mid];
      if(ad!=msg.sender)
       {require(checkpermission(_mid)==1);}
       var a=pdetails[ad];
       return (a.fname,a.lname,a.zipcode,a.phoneno,a.ssn);
       
   }
   
     function oviewdetails(uint _mid) onlyOwner public constant returns(string,string,uint,uint,uint)
   {
     
      address ad=fetchaddr[_mid];
       var a=pdetails[ad];
       return (a.fname,a.lname,a.zipcode,a.phoneno,a.ssn);
       
   }
  
  
  
function updatemh1(uint _mid,uint _claimamt,string _claimtype,uint _cfs_id,string _adjd_date) public
{
    address ad=fetchaddr[_mid];
    require(checkpermission(_mid)==1);
    mhistory m;
    var a=pmhistory[ad];
    m.claimamount=_claimamt;
    m.claimtype=_claimtype;
    m.cfs_id=_cfs_id;
    m.adjd_date=_adjd_date;
    a.push(m);
}
/*
 function _updatemedicalhistory(uint _mid,string _claimtype,uint _cfs_id,string _adjd_date,uint _age,uint _cca_nbr,string _diseaseid,uint _claimamount,string _description) public {
       address ad=fetchaddr[_mid];
       require(checkpermission(_mid)==1);
       
       mhistory a;
       a.mid=_mid;
       a.provider=prodetails[msg.sender].pname;
       a.providerid=prodetails[msg.sender].pid;
       a.provideraddr=msg.sender;
       a.claimtype=_claimtype;
       a.cfs_id=_cfs_id;
       a.age=_age;
       a.adjd_date=_adjd_date;
       a.cca_nbr=_cca_nbr;
       a.diseaseid=_diseaseid;
       a.claimamount=_claimamount;
       a.description=_description;
      pmhistory[ad].push(a);
 
  }
  
  */

 
  function getmedicalhistorycount(uint _mid) public constant returns(uint)
  {
       address ad=fetchaddr[_mid];
       return pmhistory[ad].length;
   
  }
    function viewmedicalhistory(uint _mid,uint _index) public constant returns(string,uint,string,uint,uint,string,uint,uint,string)
   {
        if(_mid==0)
       {
           _mid=pdetails[msg.sender].mid;
       }
       address ad=fetchaddr[_mid];
       if(ad!=msg.sender)
       {require(checkpermission(_mid)==1);}
       var a=pmhistory[ad][_index];
       return (a.provider,a.providerid,a.claimtype,a.cfs_id,a.age,a.adjd_date,a.cca_nbr,a.claimamount,a.description);
       
   }
   
    function oviewmedicalhistory(uint _mid,uint _index) onlyOwner public constant returns(string,uint,string,uint,uint,string,uint,uint,string)
   {
       address ad=fetchaddr[_mid];
       var a=pmhistory[ad][_index];
       return (a.provider,a.providerid,a.claimtype,a.cfs_id,a.age,a.adjd_date,a.cca_nbr,a.claimamount,a.description);
    }
   
   function checkpermission(uint _mid) public returns(uint){
       
              address ad=fetchaddr[_mid];

       for(uint i=0;i<permissionlist[ad].length;i++)
       {
         if(permissionlist[ad][i]==msg.sender){
             return 1;
            }
       }
       return 0;
   }
   
   function addprovider(address publickey,string _pname,uint _pid) onlyOwner public
   {
          var t=prodetails[publickey]; 
            t.pname=_pname;
            t.pid=_pid;
            fetchpaddr[_pid]=publickey;
       
   }

   function viewprovider(uint _pid) onlyOwner public returns(string,uint)
   {
          var ad=fetchpaddr[_pid];
          return(prodetails[ad].pname,prodetails[ad].pid);
   }
   
    function testRecovery(bytes32 h, uint8 v, bytes32 r, bytes32 s) returns (address) {
       /* prefix might be needed for geth only
        * https://github.com/ethereum/go-ethereum/issues/3731*/
        // bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        // h = sha3(prefix, h);
        address addr = ecrecover(h, v, r, s);
        return addr;
    }
    
    function getaddress(uint _id) public returns(address)
    {
        return fetchaddr[_id];
    }
    
      function getpaddress(uint _id) public returns(address)
    {
        return fetchpaddr[_id];
    }
}
   


