using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class Paymentmode
    {
        public Paymentmode()
        {
            Payments = new HashSet<Payment>();
        }

        public int Paymentmodeid { get; set; }
        public string Paymentmodename { get; set; } = null!;

        public virtual ICollection<Payment> Payments { get; set; }
    }
}
