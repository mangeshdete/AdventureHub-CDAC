using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class Payment
    {
        public int Paymentid { get; set; }
        public int Registrationid { get; set; }
        public int Paymentmodeid { get; set; }
        public DateTime Date { get; set; }
        public float Amount { get; set; }
        public string Paymentstatus { get; set; } = null!;

        public virtual Paymentmode Paymentmode { get; set; } = null!;
        public virtual Eventregistration Registration { get; set; } = null!;
    }
}
