using System;

namespace HFund.Web.Models
{
    public class DocumentViewModel
    {
        public bool Selected { get; set; } = false;
        public int FundingDetailID { get; set; }
        public int FundingDocumentID { get; set; }
        public string DocumentName { get; set; }
        public string DocumentType { get; set; }
        public string DocumentTypeDescription { get; set; }
        public string DoucmentDescription { get; set; }
        public DateTime? AddedDate { get; set; }
    }
}