using System;
using System.Collections.Generic;

namespace AdventureHub_DotNet_Admin.Models
{
    public partial class Category
    {
        public Category()
        {
            Events = new HashSet<Event>();
        }

        public int Categoryid { get; set; }
        public string Categoryname { get; set; } = null!;

        public virtual ICollection<Event> Events { get; set; }
    }
}
