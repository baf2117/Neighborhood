using System;
using System.Text;
using System.IO;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Crypto.Encodings;
using Org.BouncyCastle.Crypto.Engines;
using Microsoft.Extensions.Configuration;


namespace neighborhood
{
    public class PemKeyUtils
    {
        public (string, string) CreateKeyPair(int strength = 1024)
        {
            RsaKeyPairGenerator r = new RsaKeyPairGenerator();
            r.Init(new KeyGenerationParameters(new SecureRandom(), strength));
            AsymmetricCipherKeyPair keys = r.GenerateKeyPair();

            TextWriter privateTextWriter = new StringWriter();
            PemWriter privatePemWriter = new PemWriter(privateTextWriter);
            privatePemWriter.WriteObject(keys.Private);
            privatePemWriter.Writer.Flush();


            TextWriter publicTextWriter = new StringWriter();
            PemWriter publicPemWriter = new PemWriter(publicTextWriter);
            publicPemWriter.WriteObject(keys.Public);
            publicPemWriter.Writer.Flush();

            return (publicTextWriter.ToString(), privateTextWriter.ToString());
        }

        public string Decrypt(string decryptstring, string Private)
        {
            var keys = CreateKeyPair(1024);
            using (TextReader reader = new StringReader(Private))
            {
                dynamic key = new PemReader(reader).ReadObject();
                var rsaDecrypt = new Pkcs1Encoding(new RsaEngine());
                if (key is AsymmetricKeyParameter)
                {
                    key = (AsymmetricKeyParameter)key;
                }
                else if (key is AsymmetricCipherKeyPair)
                {
                    key = ((AsymmetricCipherKeyPair)key).Private;
                }
                rsaDecrypt.Init(false, key);

                byte[] entData = Convert.FromBase64String(decryptstring);
                entData = rsaDecrypt.ProcessBlock(entData, 0, entData.Length);
                return Encoding.UTF8.GetString(entData);
            }
        }

        public string Encrypt(string publicKey, string encryptstring)
        {
            using (TextReader reader = new StringReader(publicKey))
            {
                AsymmetricKeyParameter key = new PemReader(reader).ReadObject() as AsymmetricKeyParameter;
                Pkcs1Encoding pkcs1 = new Pkcs1Encoding(new RsaEngine());
                pkcs1.Init(true, key);//Encryption is TRUE; decrypt is False;
                byte[] entData = Encoding.UTF8.GetBytes(encryptstring);
                entData = pkcs1.ProcessBlock(entData, 0, entData.Length);
                return Convert.ToBase64String(entData);
            }
        }
    }
} 