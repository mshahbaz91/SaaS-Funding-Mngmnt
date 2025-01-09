using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HFund.Data.Models
{
    public partial class ActionPlan
    {
        public ActionPlan()
        {
            this.IdentifiedActionPlans = new List<IdentifiedActionPlan>();
        }

        public int ActionPlanID { get; set; }

        public int WorkPlanDeliverableID { get; set; }

        public string ActionPlanDescription { get; set; }

        [Display(Name = "Due Date")]
        public Nullable<System.DateTime> ActionPlanDueDate { get; set; }

        [Display(Name = "Active ")]
        public bool ActiveInd { get; set; }

        public System.DateTime CreatedDate { get; set; }

        public string CreatedBy { get; set; }

        public System.DateTime UpdatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public virtual WorkPlanDeliverable WorkPlanDeliverable { get; set; }

        public virtual ICollection<IdentifiedActionPlan> IdentifiedActionPlans { get; set; }
    }



}
