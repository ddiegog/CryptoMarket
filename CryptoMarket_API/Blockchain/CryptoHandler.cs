using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nethereum.Hex.HexConvertors.Extensions;
using Nethereum.Signer;
using Nethereum.Util;


namespace Blockchain
{
    public static class CryptoHandler
    {
        public static bool ValidateSignature(string address, string signature, string signedPayload) {
            var signerAddressRecovered = new EthereumMessageSigner().EncodeUTF8AndEcRecover(signedPayload, signature);
            return signerAddressRecovered.ToLower() == address.ToLower();
        }

        public static bool Transfer(string from, string to, double amount, string message) {
            return true;
        }
    }
}
