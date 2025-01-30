using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class Organiser
    {
        public Organiser()
        {
            Publishevents = new HashSet<Publishevent>();
            Ratings = new HashSet<Rating>();
        }

        public int Organiserid { get; set; }
        public int Userid { get; set; }
        public string Orgname { get; set; } = null!;
        public string Gst { get; set; } = null!;
        public string Pancard { get; set; } = null!;
        public string Street { get; set; } = null!;
        public int Cityid { get; set; }
        public string Pincode { get; set; } = null!;
        public decimal Rating { get; set; }

        public virtual City? City { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<Publishevent>? Publishevents { get; set; }
        public virtual ICollection<Rating>? Ratings { get; set; }
    }
}
