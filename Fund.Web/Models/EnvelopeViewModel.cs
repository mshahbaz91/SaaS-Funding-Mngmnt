using DocuSign.eSign.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspNetMVCApiDocuSignDemo.Models
{
    public class EnvelopeViewModel : Envelope
    {
        public bool Selected { get; set; }
        public string EAVPEmail { get; set; }
        public string EAVPName { get; set; }
        public string EACEOEmail { get; set; }
        public string EACEOName { get; set; }

        public string UpdatedTime { get; set; }

        public int FundingDetailId { get; set; }
        public string FundingLetterName { get; set; }
        public string HSPName { get; set; }
        public decimal OneTime { get; set; }
        public decimal Base { get; set; }
        public decimal TotalAmount { get; set; }
        public string Deliverable { get; set; }
        public bool IsDelegate { get; set; }    
    }
}