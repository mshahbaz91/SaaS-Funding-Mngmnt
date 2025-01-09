using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AspNetMVCApiDocuSignDemo.Models
{
    public class CreateEnvelopeModel
    {
        [Required]
        [Display(Name = "Number of Recipient")]
        [Range(1, 3)]
        public int SignerCount { get; set; }

        [Display(Name = "Email Subject")]
        public string EmailSubject { get; set; }

        [Display(Name = "Recipient Name")]
        [Required(ErrorMessage = "The Signer Name is required")]
        public string SigningDirectorName { get; set; }

        [Display(Name = "Recipient Email")]
        [Required(ErrorMessage = "The Signer Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string SigningDirectorEmail { get; set; }

        [Display(Name = "Recipient2 Name")]
        public string SigningVicePresidentName { get; set; }

        [Display(Name = "Recipient2 Email")]
        public string SigningVicePresidentEmail { get; set; }

        [Display(Name = "Recipient3 Name")]
        public string SigningChiefRegionalOfficerName { get; set; }

        [Display(Name = "Recipient3 Email")]
        public string SigningChiefRegionalOfficerEmail { get; set; }

        [Display(Name = "CC Name")]
        public string CarbonCopyName { get; set; }

        [Display(Name = "CC Email")]
        public string CarbonCopyEmail { get; set; }

        [Display(Name = "Signign Group")]
        public string SigningGroupId { get; set; }
        [Display(Name = "Signign Group")]
        public string SigningGroupId2 { get; set; }
        [Display(Name = "Signign Group")]
        public string SigningGroupId3 { get; set; }
    }
}