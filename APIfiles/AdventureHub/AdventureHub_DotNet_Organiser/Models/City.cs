using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class City
    {
        public City()
        {
            Customers = new HashSet<Customer>();
            Organisers = new HashSet<Organiser>();
            Publishevents = new HashSet<Publishevent>();
        }

        public int Cityid { get; set; }
        public string Cityname { get; set; } = null!;
        public int Stateid { get; set; }

        public virtual State State { get; set; } = null!;
        public virtual ICollection<Customer> Customers { get; set; }
        public virtual ICollection<Organiser> Organisers { get; set; }
        public virtual ICollection<Publishevent> Publishevents { get; set; }
    }
}
