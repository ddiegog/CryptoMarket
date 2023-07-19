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

            /*
            // The message is hashed and prefixed according to Ethereum's standard
            var messageHash = new EthereumMessageSigner().HashAndPrefixedUtf8(signedPayload);

            // The signature is decoded into r, s, v
            var signatureDecoded = signature.HexToByteArray();
            var r = signatureDecoded.Take(32).ToArray();
            var s = signatureDecoded.Skip(32).Take(32).ToArray();
            var v = signatureDecoded.Last();

            // Address is recovered from the prefixed message hash and the decoded signature
            signerAddressRecovered = new EthereumEcdsa().RecoverAddressFromSignature(messageHash, r, s, v);

            // The recovered address is compared with the expected address
            return signerAddressRecovered.ToLower() == expectedAddress.ToLower();
            */
            return true;

        }
    }
}
