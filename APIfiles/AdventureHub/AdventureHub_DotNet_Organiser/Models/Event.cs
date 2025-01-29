using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class Event
    {
        public Event()
        {
            Publishevents = new HashSet<Publishevent>();
        }

        public int Eventid { get; set; }
        public string Eventname { get; set; } = null!;
        public int Categoryid { get; set; }

        public virtual Category Category { get; set; } = null!;
        public virtual ICollection<Publishevent> Publishevents { get; set; }
    }
}
