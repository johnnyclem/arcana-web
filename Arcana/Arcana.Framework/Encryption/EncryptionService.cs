using System;
using PWDTK_DOTNET451;

namespace Arcana.Framework.Encryption
{
    public class EncryptionService : IEncryptionService
    {
        private const int NumberUpper = 1;
        private const int NumberNonAlphaNumeric = 1;
        private const int NumberNumeric = 2;
        private const int MinPasswordLength = 6;
        private const int MaxPasswordLength = Int32.MaxValue;

        public string GenerateSalt()
        {
            var bytes = PWDTK.GetRandomSalt(PWDTK.CDefaultSaltLength);
            var saltString = Convert.ToBase64String(bytes);
            return saltString;
        }

        public byte[] ConvertSaltToBytes(string salt)
        {
            var bytes = Convert.FromBase64String(salt);
            return bytes;
        }

        public string CreateHash(string valToHash, string salt)
        {
            var saltBytes = ConvertSaltToBytes(salt);
            var hash = PWDTK.PasswordToHash(saltBytes, valToHash, 8000);
            return PWDTK.HashBytesToHexString(hash);
        }

        public string TestPasswordPolicy(string password)
        {
            var passwordException = new PasswordPolicyException(string.Empty);
            var policy = new PWDTK.PasswordPolicy(NumberUpper, NumberNonAlphaNumeric, NumberNumeric, MinPasswordLength, MaxPasswordLength);
            if (PWDTK.TryPasswordPolicyCompliance(password, policy, ref passwordException))
            {
                return string.Empty;
            }

            return passwordException.Message;
        }
    }
}
