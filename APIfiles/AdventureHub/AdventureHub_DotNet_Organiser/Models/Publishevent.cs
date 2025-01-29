using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class Publishevent
    {
        public Publishevent()
        {
            Eventregistrations = new HashSet<Eventregistration>();
        }

        public int Publishid { get; set; }
        public int Eventid { get; set; }
        public int Organiserid { get; set; }
        public DateOnly Eventdate { get; set; }
        public TimeOnly Eventtime { get; set; }
        public float Price { get; set; }
        public int Capacity { get; set; }
        public string Status { get; set; } = null!;
        public string Street { get; set; } = null!;
        public int Cityid { get; set; }
        public string Pincode { get; set; } = null!;

        public virtual City City { get; set; } = null!;
        public virtual Event Event { get; set; } = null!;
        public virtual Organiser Organiser { get; set; } = null!;
        public virtual ICollection<Eventregistration> Eventregistrations { get; set; }
    }
}
