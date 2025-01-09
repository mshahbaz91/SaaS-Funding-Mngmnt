using DocuSign.eSign.Client.Auth;

namespace ScheduledTask.Common
{
    public interface IDocuSignAuth
    {
        OAuth.OAuthToken AuthToken { get; set; }

        bool CheckToken(int bufferMin = 60);
        OAuth.OAuthToken GetOAuthToken();
    }
}