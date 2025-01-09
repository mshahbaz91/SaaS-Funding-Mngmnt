using DocuSign.eSign.Model;

namespace ScheduledTask.Model
{
    public class EnvelopeViewModel: Envelope
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

        public string CurrentSignerEmail { get; set; }
        public string CurrentSignerName { get; set; }
        public string EmailSubject { get; set; }
    }
}
