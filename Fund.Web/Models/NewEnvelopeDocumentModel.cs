using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspNetMVCApiDocuSignDemo.Models
{
    public class NewEnvelopeDocumentModel
    {
        public string DocumentName { get; set; }
        public string DocumentType { get; set; }
        public byte[] DocumentStreamFile { get; set; }
        public string DocumentFilePath { get; set; }
    }
}