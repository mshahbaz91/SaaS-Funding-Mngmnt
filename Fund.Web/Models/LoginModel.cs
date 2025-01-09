using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using CompareAttribute = System.Web.Mvc.CompareAttribute;


namespace HFund.Web.Models
{

    public class LoginModel
    {
        [Required(ErrorMessage = "{0} address is required .")]
        [Display(Name = "Email Address")]
        [DataType(DataType.EmailAddress)]
        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", ErrorMessage = "Invalid Email Address")]
        [StringLength(150)]
        public string LoginEmail { get; set; }

        [Required]
        [Display(Name = "Password ")]
        [StringLength(128, ErrorMessage = "{0} must be at least 6 characters .", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

    }


    public class ChangePasswordModel
    {
        [Required(ErrorMessage = "{0}  is required .")]
        [DataType(DataType.Password)]
        [Display(Name = "Current Password")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "{0} is required .")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New Password")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "{0} is required .")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm New Password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }


    public class ForgetPasswordModel
    {
        [Required(ErrorMessage = "{0} address is required .")]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", ErrorMessage = "Invalid Email Address")]
        [StringLength(150)]
        public string LoginEmail { get; set; }

       
    }


    public class ResetPasswordModel
    {
        
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New Password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm New Password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }


    public class VerificationModel
    {
        [Required(ErrorMessage = "Verification code is required !")]
        [Display(Name = "Verification Code")]
        [StringLength(6, ErrorMessage = "Invalid verification code !")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Invalid Verification Code !")]
        public string VerificationCode { get; set; }
    }





}