using AspNetMVCApiDocuSignDemo.Models;
using DocuSign.eSign.Api;
using DocuSign.eSign.Client;
using DocuSign.eSign.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.UI.WebControls;
using static DocuSign.eSign.Api.EnvelopesApi;

namespace AspNetMVCApiDocuSignDemo.Data
{
    public static class EnvelopeData
    {
        public static EnvelopesInformation ListAllEnvelope(string accessToken, string basePath, string accountId)
        {
            var apiClient = new ApiClient(basePath);
            apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);
            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            ListStatusChangesOptions options = new ListStatusChangesOptions();
            options.fromDate = DateTime.Now.AddDays(-180).ToString("yyyy/MM/dd");
            options.orderBy = "status_changed";
            options.status = "created,signed,completed,declined,voided,deleted";

            // Call the API method:
            EnvelopesInformation results = envelopesApi.ListStatusChanges(accountId, options);
            return results;
        }


        public static EnvelopesInformation ListToSignEnvelope(string accessToken, string basePath, string accountId)
        {
            var apiClient = new ApiClient(basePath);
            apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);
            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            ListStatusChangesOptions options = new ListStatusChangesOptions();
            options.fromDate = DateTime.Now.AddDays(-180).ToString("yyyy/MM/dd");
            options.status = "sent,delivered";
            options.orderBy = "status_changed";
            //options.order = "asc" or "desc";

            // Call the API method:
            EnvelopesInformation results = envelopesApi.ListStatusChanges(accountId, options);
            return results;
        }


        public static Envelope GetEnvelope(string accessToken, string basePath, string accountId, string envelopeId)
        {
            // Step 1 start
            var apiClient = new ApiClient(basePath);
            apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);
            // Step 1 end

            // Step 2 start
            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            Envelope envelope = envelopesApi.GetEnvelope(accountId, envelopeId);
            //var listCustomFields = envelopesApi.ListCustomFields(accountId, envelopeId);
            //CustomFields customFields = new CustomFields();
            //List<TextCustomField> textCustomFields = listCustomFields.TextCustomFields;
            //customFields.TextCustomFields = textCustomFields;
            //envelope.CustomFields = customFields;

            return envelope;
            // Step 2 end
        }


        private static EnvelopeDefinition MakeEnvelope(string envelopeSubject, string envStatus, List<Signer> signerList, List<NewEnvelopeDocumentModel> documentList)
        {
            EnvelopeDefinition env = new EnvelopeDefinition();
            env.EmailSubject = envelopeSubject;
            env.Documents = MakeDocumentObjectByStream(documentList);
            env.Recipients = MakeRecipientObject(signerList);
            env.Status = envStatus;

            CustomFields customFields = new CustomFields();
            List<TextCustomField> textCustomFields = new List<TextCustomField>();
            TextCustomField textCustomField = new TextCustomField();
            textCustomField.Name = "System Code";
            textCustomField.Value = ConfigurationManager.AppSettings["sysCode"];
            textCustomFields.Add(textCustomField);
            customFields.TextCustomFields = textCustomFields;
            env.CustomFields = customFields;

            return env;
        }


        private static EnvelopeDefinition MakeEnvelope(string envelopeSubject,
                                               string envStatus,
                                               List<Signer> signerList,
                                               List<CarbonCopy> ccList,
                                               List<NewEnvelopeDocumentModel> documentList)
        {
            EnvelopeDefinition env = new EnvelopeDefinition();
            env.EmailSubject = envelopeSubject;
            env.Documents = MakeDocumentObjectByStream(documentList);
            env.Recipients = MakeRecipientObject(signerList, ccList);
            env.Status = envStatus;

            return env;
        }


        private static Recipients MakeRecipientObject(List<Signer> signers, List<CarbonCopy> carbonCopies)
        {
            for (int i = 0; i < signers.Count; i++)
            {
                int j = i + 1;
                signers[i].RoleName = "signer" + j.ToString();
                signers[i].RecipientId = j.ToString();
                signers[i].RoutingOrder = j.ToString();

                SignHere signHere = new SignHere
                {
                    AnchorString = "*signature_" + j.ToString() + "*",
                    AnchorUnits = "pixels",
                    AnchorYOffset = "5",
                    AnchorXOffset = "5"
                };

                FullName signerName = new FullName
                {
                    Name = signers[i].Name,
                    AnchorString = "*signerName_" + j.ToString() + "*"
                };

                DateSigned signedDate = new DateSigned
                {
                    Value = DateTime.Now.ToString("MMMM dd, yyyy"),
                    AnchorString = "*signedDate_" + j.ToString() + "*"
                };

                Tabs signerTabs = new Tabs();
                signerTabs.SignHereTabs = new List<SignHere> { signHere };
                signerTabs.FullNameTabs = new List<FullName> { signerName };
                signerTabs.DateSignedTabs = new List<DateSigned> { signedDate };
                signers[i].Tabs = signerTabs;
            }

            Recipients recipients = new Recipients
            {
                Signers = signers
                //,CarbonCopies = carbonCopies
            };

            if (carbonCopies.Count > 0)
            {
                for (int i = 0; i < carbonCopies.Count; i++)
                {
                    int j = i + 1 + signers.Count;
                    carbonCopies[i].RecipientId = j.ToString();
                    carbonCopies[i].RoutingOrder = j.ToString();
                }
                recipients.CarbonCopies = carbonCopies;
            }

            return recipients;
        }


        public static string SendEnvelopeForEmbeddedSigning(string envelopeSubject,
                                                                      string envStatus,
                                                                      List<Signer> signerList,
                                                                      List<NewEnvelopeDocumentModel> docList,
                                                                      string accessToken,
                                                                      string basePath,
                                                                      string accountId)
        {
            EnvelopeDefinition envelope = MakeEnvelope(envelopeSubject, envStatus, signerList, docList);

            var apiClient = new ApiClient(basePath);
            apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);

            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            try
            {
                EnvelopeSummary results = envelopesApi.CreateEnvelope(accountId, envelope);
                return results.EnvelopeId;
            }
            catch(Exception ex)
            {
                if(ex.Message.Contains("NO_DOCUMENT_RECEIVED"))
                {
                    throw new Exception("The funding Letter was not found in the request!");
                }
                if (ex.Message.Contains("INVALID_EMAIL_ADDRESS_FOR_RECIPIENT"))
                {
                    throw new Exception("The email address for the recipient is invalid. ");
                }
                throw new Exception(ex.Message + " \r\n If Error is not clear, please contact your administrator!");
            }
           
        }


        public static Recipients GetRecipients(string accessToken, string basePath, string accountId, string envelopeId)
        {
            var apiClient = new ApiClient(basePath);
            apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);
            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            Recipients results = envelopesApi.ListRecipients(accountId, envelopeId);
            return results;
        }


        public static string UpdateRecipient(string envelopeId, Recipients recipients, string accessToken, string basePath, string accountId)
        {
            var apiClient = new ApiClient(basePath);
            apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);

            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            string updateResult = "";

            RecipientsUpdateSummary result = envelopesApi.UpdateRecipients(accountId, envelopeId, recipients);

            List<string> resultLog = new List<string>();
            foreach (var item in result.RecipientUpdateResults)
            {
                if (item.ErrorDetails != null)
                {
                    resultLog.Add(item.ErrorDetails.ErrorCode + ": " + item.ErrorDetails.Message);
                }
            }

            return (updateResult);
        }


        public static string UpdateRecipients(List<EnvelopeViewModel> envelopes, string accessToken, string basePath, string accountId)
        {
            var apiClient = new ApiClient(basePath);
            apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);

            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            string updateResult = "";

            for (int i = 0; i < envelopes.Count; i++)
            {
                Recipients recipients = EnvelopeData.GetRecipients(accessToken, basePath, accountId, envelopes[i].EnvelopeId);
                int currentOrderIndex = int.Parse(envelopes[i].Recipients.CurrentRoutingOrder) - 1;
                string clientId = recipients.Signers[currentOrderIndex].ClientUserId;

                if (clientId == "2000")
                {
                    recipients.Signers[currentOrderIndex].Email = envelopes[i].EAVPEmail;
                    recipients.Signers[currentOrderIndex].Name = envelopes[i].EAVPName;
                    recipients.Signers[currentOrderIndex].ClientUserId = "2001";
                }
                else if (clientId == "3000")
                {
                    recipients.Signers[currentOrderIndex].Email = envelopes[i].EACEOEmail;
                    recipients.Signers[currentOrderIndex].Name = envelopes[i].EACEOName;
                    recipients.Signers[currentOrderIndex].ClientUserId = "3001";
                }

                RecipientsUpdateSummary result = envelopesApi.UpdateRecipients(accountId, envelopes[i].EnvelopeId, recipients);
            }

            return (updateResult);
        }


        private static Recipients MakeRecipientObject(List<Signer> signers)
        {
            for (int i = 0; i < signers.Count; i++)
            {
                int j = i + 1;
                signers[i].RoleName = "signer" + j.ToString();
                signers[i].RecipientId = j.ToString();
                signers[i].RoutingOrder = j.ToString();

                //Decline decline = new Decline();
                //if (signers[i].ClientUserId == "2000" || signers[i].ClientUserId == "3000")
                //{
                //    decline.DocumentId = "1";
                //    decline.PageNumber = "1";
                //    decline.XPosition = "500";
                //    decline.YPosition = "90";
                //    decline.Height = "20";
                //    decline.Width = "60";
                //}

                SignHere signHere = new SignHere
                {
                    AnchorString = "*signature_" + j.ToString() + "*",
                    AnchorUnits = "pixels",
                    AnchorYOffset = "5",
                    AnchorXOffset = "5"
                };

                FullName signerName = new FullName
                {
                    Name = signers[i].Name,
                    AnchorString = "*signerName_" + j.ToString() + "*"
                };

                DateSigned signedDate = new DateSigned
                {
                    Value = DateTime.Now.ToString("MMMM dd, yyyy"),
                    AnchorString = "*signedDate_" + j.ToString() + "*"
                };

                Tabs signerTabs = new Tabs();
                signerTabs.SignHereTabs = new List<SignHere> { signHere };
                signerTabs.FullNameTabs = new List<FullName> { signerName };
                signerTabs.DateSignedTabs = new List<DateSigned> { signedDate };
                //signerTabs.DeclineTabs = new List<Decline> { decline };
                signers[i].Tabs = signerTabs;
            }

            Recipients recipients = new Recipients
            {
                Signers = signers
            };

            return recipients;
        }


        private static List<Document> MakeDocumentObjectByStream(List<NewEnvelopeDocumentModel> documents)
        {
            List<Document> result = new List<Document>();
            for (int i = 0; i < documents.Count; i++)
            {
                int j = i + 1;
                Document doc = new Document();
                doc.DocumentBase64 = Convert.ToBase64String(documents[i].DocumentStreamFile);
                doc.Name = documents[i].DocumentName;
                doc.FileExtension = documents[i].DocumentType;
                doc.DocumentId = j.ToString();

                result.Add(doc);
            }

            return result;
        }


        private static List<Document> MakeDocumentObjectByFilePath(List<NewEnvelopeDocumentModel> documents)
        {
            List<Document> result = new List<Document>();
            for (int i = 0; i < documents.Count; i++)
            {
                int j = i + 1;
                Document doc = new Document();
                doc.DocumentBase64 = Convert.ToBase64String(System.IO.File.ReadAllBytes(documents[i].DocumentFilePath));
                doc.Name = documents[i].DocumentName;
                doc.FileExtension = documents[i].DocumentType;
                doc.DocumentId = j.ToString();

                result.Add(doc);
            }

            return result;
        }


        public static string CreateEmbeddedConsoleView(string accessToken, string basePath, string accountId, string startingView, string returnUrl, string envelopeId)
        {
            var apiClient = new ApiClient(basePath);
            apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);
            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            ConsoleViewRequest viewRequest = MakeConsoleViewRequest(returnUrl,
                startingView, envelopeId);

            // Step 1. create the NDSE view
            // Call the CreateSenderView API
            // Exceptions will be caught by the calling function
            ViewUrl results = envelopesApi.CreateConsoleView(accountId, viewRequest);
            string redirectUrl = results.Url;
            return redirectUrl;
        }


        public static string CreateEmbeddedRecipientView(string signerEmail,
                                                         string signerName,
                                                         string signerClientId,
                                                         string envelopeId,
                                                         string accessToken,
                                                         string basePath,
                                                         string accountId,
                                                         string returnUrl,
                                                         string pingUrl)
        {
            var apiClient = new ApiClient(basePath);
            apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);
            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            
            //signerEmail, signerName and signerClientId must match exactly.
            RecipientViewRequest viewRequest = MakeRecipientViewRequest(signerEmail, signerName, signerClientId, returnUrl, pingUrl);
            try
            {
                ViewUrl result = envelopesApi.CreateRecipientView(accountId, envelopeId, viewRequest);
                return result.Url;
            }
            catch (Exception)
            {
                return "Error";
            }            
        }


        private static RecipientViewRequest MakeRecipientViewRequest(string signerEmail,
                                                                     string signerName,
                                                                     string signerClientId,
                                                                     string returnUrl,
                                                                     string pingUrl = null)
        {
            RecipientViewRequest viewRequest = new RecipientViewRequest();

            viewRequest.ReturnUrl = returnUrl;
            viewRequest.AuthenticationMethod = "none";

            viewRequest.Email = signerEmail;
            viewRequest.UserName = signerName;
            viewRequest.ClientUserId = signerClientId;

            if (pingUrl != null)
            {
                viewRequest.PingFrequency = "600"; // seconds
                viewRequest.PingUrl = pingUrl; // optional setting
            }

            return viewRequest;
        }


        private static ConsoleViewRequest MakeConsoleViewRequest(string dsReturnUrl, string startingView, string envelopeId)
        {
            // Data for this method
            // dsReturnUrl
            // startingView
            // envelopeId

            ConsoleViewRequest viewRequest = new ConsoleViewRequest();
            // Set the URL where you want the recipient to go once they are done
            // with the NDSE. It is usually the case that the
            // user will never "finish" with the NDSE.
            // Assume that control will not be passed back to your app.
            viewRequest.ReturnUrl = dsReturnUrl;

            if ("envelope".Equals(startingView) && envelopeId != null)
            {
                viewRequest.EnvelopeId = envelopeId;
            }

            return viewRequest;
        }




        public static string UpdateEnvelope(string envelopeId, Envelope envelope, string accessToken, string basePath, string accountId)
        {
            var apiClient = new ApiClient(basePath);
            apiClient.Configuration.DefaultHeader.Add("Authorization", "Bearer " + accessToken);

            EnvelopesApi envelopesApi = new EnvelopesApi(apiClient);
            string updateResult = "";

            var result = envelopesApi.Update(accountId, envelopeId, envelope);

            return (updateResult);
        }
    }
}