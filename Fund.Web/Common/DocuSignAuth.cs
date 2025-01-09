using DocuSign.eSign.Client;
using DocuSign.eSign.Client.Auth;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Text;
using System.Web;

namespace AspNetMVCApiDocuSignDemo.Common
{
    public class DocuSignAuth : IDocuSignAuth
    {
        public DocuSignAuth()
        {
        }

        public OAuth.OAuthToken AuthToken { get; set; }

        public OAuth.OAuthToken GetOAuthToken()
        {
            //Uri baseAddress = new Uri("https://demo.docusign.net/restapi");


            var apiClient = new ApiClient(ConfigurationManager.AppSettings["basePath"]);
            string integrateKey = ConfigurationManager.AppSettings["integrationKey"];
            string userId = ConfigurationManager.AppSettings["userId"];
            string authServer = ConfigurationManager.AppSettings["authServer"];
            string rsaKey = File.ReadAllText(HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["rsaKey"]));
            //string rsaKey = File.ReadAllText(HttpContext.Current.Server.MapPath("~/App_Data/DocuSign/Keys/docusign_private_key.txt"));
            //string rsaKey = File.ReadAllText(ConfigurationManager.AppSettings["rsaKey"]);

            //string authHeader = "{\"Username\":\"" + "scho@docusign.com" + "\",\"Password\":\"" + 
            //    password + "\",\"IntegratorKey\":\"" +
            //    integrateKey + "\"}";
            //apiClient.Configuration.DefaultHeader.Add("X-DocuSign-Authentication", authHeader);

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
            //&& (DateTime.Now.Subtract(TimeSpan.FromMinutes(bufferMin)) < AuthToken.expires_in);

            return isJWTGrantAuthenticated;
        }

    }

}