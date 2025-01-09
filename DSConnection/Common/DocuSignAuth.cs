using DocuSign.eSign.Client;
using DocuSign.eSign.Client.Auth;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Text;

namespace ScheduledTask.Common
{
    public class DocuSignAuth : IDocuSignAuth
    {
        public OAuth.OAuthToken AuthToken { get; set; }

        public OAuth.OAuthToken GetOAuthToken()
        {   
            var apiClient = new ApiClient(ConfigurationManager.AppSettings["basePath"]);
            string integrateKey = ConfigurationManager.AppSettings["integrationKey"];
            string userId = ConfigurationManager.AppSettings["userId"];
            string authServer = ConfigurationManager.AppSettings["authServer"];
            string rsaKey = File.ReadAllText(ConfigurationManager.AppSettings["rsaKey"]);

            var scopes = new List<string>
            {
                "signature"
            };

            AuthToken = apiClient.RequestJWTUserToken(integrateKey,
                                                       userId,
                                                       authServer,
                                                       Encoding.UTF8.GetBytes(rsaKey),
                                                       1,
                                                       scopes);

            return AuthToken;
        }

        public bool CheckToken(int bufferMin = 60)
        {
            bool isJWTGrantAuthenticated = AuthToken != null;

            return isJWTGrantAuthenticated;
        }
    }
}
