using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class State
    {
        public State()
        {
            Cities = new HashSet<City>();
        }

        public int Stateid { get; set; }
        public string Statename { get; set; } = null!;

        public virtual ICollection<City> Cities { get; set; }
    }
}
