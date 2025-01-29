using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class Securityquestion
    {
        public Securityquestion()
        {
            Users = new HashSet<User>();
        }

        public int Qid { get; set; }
        public string Question { get; set; } = null!;

        public virtual ICollection<User> Users { get; set; }
    }
}
