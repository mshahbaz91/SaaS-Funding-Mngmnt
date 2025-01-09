using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScheduledTask.Model
{
    public class SignerModel
    {
        public string SignerEmail { get; set; }
        public string SignerName { get; set; }
        public int ToSignItemCount { get; set; }
        public List<string> EnvelopeSubjects { get; set; }
    }
}
