namespace Arcana.Framework.Encryption
{
    public interface IEncryptionService
    {
        string GenerateSalt();
        byte[] ConvertSaltToBytes(string salt);
        string CreateHash(string valToHash, string salt);
        string TestPasswordPolicy(string password);
    }
}
