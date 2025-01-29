using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class Rating
    {
        public int Ratingid { get; set; }
        public int Custid { get; set; }
        public int Orgid { get; set; }
        public decimal Rating1 { get; set; }

        public virtual Customer Cust { get; set; } = null!;
        public virtual Organiser Org { get; set; } = null!;
    }
}
