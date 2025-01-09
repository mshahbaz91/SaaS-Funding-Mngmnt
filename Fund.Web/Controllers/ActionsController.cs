using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFund.Data.Models;
using HFund.Utility;
using System.Data.Entity;
using HFund.Web.Models;
using DocumentFormat.OpenXml.Drawing;

namespace HFund.Web.Controllers
{


    [Authorize(Roles = Common.LHINBaseRole)]
    public class ActionsController : BaseController
    {

        public ActionResult Edit(int id)
        {
            FundingDetail fundingDetail = (from c in UoW.DBContext.FundingDetails where (c.FundingDetailID == id) select c).Include("EntityStatu").FirstOrDefault();
            try
            {
                ViewBag.FundingDetailID = id;
                ViewBag.EntityType = fundingDetail.FundingEntityTypeID;
                fundingDetail.StatusComment = String.Empty;

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                ///
                var _fundingDocumentItems = UoW.FundingDocumentRepo.GetFundingDocument_FilterByFundingDetailId(id);

                List<DocumentViewModel> documents = new List<DocumentViewModel>();
                foreach (var item in _fundingDocumentItems)
                {
                    string selectedExtension = System.IO.Path.GetExtension(item.DocumentName);
                    // Supported file extension by DocuSign
                    string supportedExtensions = ".docx,.pdf";
                    string[] extensions = supportedExtensions.Split(',', ' ');

                    if (item.DocumentType.DocumentTypeShortDescription == "FL" && (extensions.Contains(selectedExtension))) 
                    {
                        DocumentViewModel document = new DocumentViewModel();
                        document.FundingDetailID = item.FundingDetailID;
                        document.FundingDocumentID = item.FundingDocumentID;
                        document.DocumentName = item.DocumentName;
                        document.DocumentTypeDescription = item.DocumentType.DocumentTypeDescription;
                        document.DoucmentDescription = item.DoucmentDescription;
                        document.AddedDate = item.AddedDate;

                        documents.Add(document);
                    }
                }
                ViewBag.DocumentList = documents;

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                return View(fundingDetail);
            }
            catch (Exception ex)
            {
                throw new HttpException(404, "Not Found - Funding Entity: " + id);
            }
        }

        [ChildActionOnly]
        public PartialViewResult DocumentList(int fundingDetailId)
        {
            ViewBag.FundingDetailId = fundingDetailId;


            var _fundingDocumentItems = UoW.FundingDocumentRepo.GetFundingDocument_FilterByFundingDetailId(fundingDetailId);
            List<DocumentViewModel> documents = new List<DocumentViewModel>();
            foreach (var item in _fundingDocumentItems)
            {
                DocumentViewModel document = new DocumentViewModel();
                document.FundingDetailID = item.FundingDetailID;
                document.FundingDocumentID = item.FundingDocumentID;
                document.DocumentName = item.DocumentName;
                //document.DocumentType = item.DocumentType;
                document.DocumentTypeDescription = item.DocumentType.DocumentTypeDescription;
                document.DoucmentDescription = item.DoucmentDescription;
                document.AddedDate = item.AddedDate;

                documents.Add(document);
            }


            return PartialView("_DocumentList", documents);
        }

    }
}
