using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class Eventregistration
    {
        public Eventregistration()
        {
            Payments = new HashSet<Payment>();
        }

        public int Registrationid { get; set; }
        public int Custid { get; set; }
        public int Publishid { get; set; }
        public int Participants { get; set; }

        public virtual Customer Cust { get; set; } = null!;
        public virtual Publishevent Publish { get; set; } = null!;
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
