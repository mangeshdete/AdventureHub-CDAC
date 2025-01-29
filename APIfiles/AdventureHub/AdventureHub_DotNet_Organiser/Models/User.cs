using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class User
    {
        public User()
        {
            Customers = new HashSet<Customer>();
            Organisers = new HashSet<Organiser>();
        }

        public int Userid { get; set; }
        public string Password { get; set; } = null!;
        public string Contact { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int Securityqid { get; set; }
        public string Securityqans { get; set; } = null!;
        public int Roleid { get; set; }

        public virtual Role Role { get; set; } = null!;
        public virtual Securityquestion Securityq { get; set; } = null!;
        public virtual ICollection<Customer> Customers { get; set; }
        public virtual ICollection<Organiser> Organisers { get; set; }
    }
}
