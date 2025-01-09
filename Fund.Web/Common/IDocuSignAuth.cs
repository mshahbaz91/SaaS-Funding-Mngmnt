using DocuSign.eSign.Client.Auth;

namespace AspNetMVCApiDocuSignDemo.Common
{
    public interface IDocuSignAuth
    {
        OAuth.OAuthToken AuthToken { get; set; }
        OAuth.OAuthToken GetOAuthToken();

        bool CheckToken(int bufferMin);

    }
}