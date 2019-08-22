var myInstance,account,x;

function instancecreator(r)
        {
            

         if (typeof web3 !== 'undefined') {
                web3 = new Web3(web3.currentProvider);
            } else {
                 web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
               // web3 = new Web3(new Web3.providers.HttpProvider("HTTP://10.198.49.86:5555"));
            }
            if(r==1)
            {
                account=$("#acc").val();

                console.log("contractor"+account);
            }
            else if(account=="")
            {
               // console.log("hahah");
                account="0xd864E9bc17FA24FEC9271Cd3E648Ec74e94010a0";//default account
            }
            web3.eth.defaultAccount = account;

            var abi =[
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_mid",
                            "type": "uint256"
                        },
                        {
                            "name": "_index",
                            "type": "uint256"
                        }
                    ],
                    "name": "viewmedicalhistory",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "h",
                            "type": "bytes32"
                        },
                        {
                            "name": "v",
                            "type": "uint8"
                        },
                        {
                            "name": "r",
                            "type": "bytes32"
                        },
                        {
                            "name": "s",
                            "type": "bytes32"
                        }
                    ],
                    "name": "testRecovery",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "publickey",
                            "type": "address"
                        },
                        {
                            "name": "_pname",
                            "type": "string"
                        },
                        {
                            "name": "_pid",
                            "type": "uint256"
                        }
                    ],
                    "name": "addprovider",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_zipcode",
                            "type": "uint256"
                        },
                        {
                            "name": "_phoneno",
                            "type": "uint256"
                        }
                    ],
                    "name": "updatepdetails",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "tprovider",
                            "type": "address"
                        }
                    ],
                    "name": "addpermission",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_mid",
                            "type": "uint256"
                        }
                    ],
                    "name": "oviewdetails",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_pid",
                            "type": "uint256"
                        }
                    ],
                    "name": "viewprovider",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "owner1",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "pidcounter",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_mid",
                            "type": "uint256"
                        }
                    ],
                    "name": "getmedicalhistorycount",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_mid",
                            "type": "uint256"
                        },
                        {
                            "name": "_claimamt",
                            "type": "uint256"
                        },
                        {
                            "name": "_claimtype",
                            "type": "string"
                        },
                        {
                            "name": "_cfs_id",
                            "type": "uint256"
                        },
                        {
                            "name": "_adjd_date",
                            "type": "string"
                        }
                    ],
                    "name": "updatemh1",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "tprovider",
                            "type": "address"
                        }
                    ],
                    "name": "removepermission",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_mid",
                            "type": "uint256"
                        },
                        {
                            "name": "_index",
                            "type": "uint256"
                        }
                    ],
                    "name": "oviewmedicalhistory",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_id",
                            "type": "uint256"
                        }
                    ],
                    "name": "getpaddress",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_mid",
                            "type": "uint256"
                        }
                    ],
                    "name": "checkpermission",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "publickey",
                            "type": "address"
                        },
                        {
                            "name": "_fname",
                            "type": "string"
                        },
                        {
                            "name": "_lname",
                            "type": "string"
                        },
                        {
                            "name": "_zipcode",
                            "type": "uint256"
                        },
                        {
                            "name": "_phoneno",
                            "type": "uint256"
                        },
                        {
                            "name": "_ssn",
                            "type": "uint256"
                        }
                    ],
                    "name": "addpatient",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_id",
                            "type": "uint256"
                        }
                    ],
                    "name": "getaddress",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "transferOwnership",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "addOwnership",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_mid",
                            "type": "uint256"
                        }
                    ],
                    "name": "viewdetails",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
                var myContract = web3.eth.contract(abi);
                myInstance = myContract.at('0x53C10c8998EEa36AEceb8022874a575D6528E781');
                x = web3.eth.blockNumber;   
                console.log("i m created");
                
        }