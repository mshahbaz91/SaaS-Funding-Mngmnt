using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HFund.Web.ValidationRules
{
    public class FieldErrorMessage
    {
        public String FieldID { get; set; }
        public String ErrorMessage { get; set; }

        public FieldErrorMessage(String fieldID, String errMessage)
        {
            FieldID = fieldID;
            ErrorMessage = errMessage;
        }

    }

    public class ValidationResult : ICloneable
    {
        private Boolean _IsValid;
        private Boolean _Warning;
        private Object  _ErrorContent;

        public Object ErrorContent { get { return _ErrorContent; } private set { _ErrorContent = value; } }
        public Boolean IsValid { get { return _IsValid; } private set { _IsValid = value; } }
        public Boolean Warning { get { return _Warning; } private set { _Warning = value; } }

        public ValidationResult(Boolean value, Object errMessage)
        {
            IsValid = value;
            Warning = false;
            ErrorContent = errMessage;
        }

        public ValidationResult(Boolean value, Boolean warning, Object errMessage)
        {
            IsValid = value;
            Warning = warning;
            ErrorContent = errMessage;
        }

        public object Clone()
        {
            object VR = new ValidationResult(this.IsValid, this.ErrorContent);
            return VR;
        }
    }
}