using DocuSign.eSign.Api;
using DocuSign.eSign.Client;
using DocuSign.eSign.Model;
using System;
using static DocuSign.eSign.Api.EnvelopesApi;

namespace ScheduledTask
{
    public static class SearchDocuSignData
    {

        public static EnvelopesInformation CheckConnection(string accessToken, string basePath, string accountId)
        {
            var apiClient = new ApiClient(basePath);
            apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);
            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            ListStatusChangesOptions options = new ListStatusChangesOptions();
            options.fromDate = DateTime.Now.AddDays(-180).ToString("yyyy/MM/dd");
            options.status = "sent,delivered";
            options.orderBy = "status_changed";

            EnvelopesInformation results = envelopesApi.ListStatusChanges(accountId, options);
            return results;
        }

        
    }
}
