using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Eventregistrations = new HashSet<Eventregistration>();
            Ratings = new HashSet<Rating>();
        }

        public int Custid { get; set; }
        public int Userid { get; set; }
        public string Fname { get; set; } = null!;
        public string Lname { get; set; } = null!;
        public string Aadhaar { get; set; } = null!;
        public string Street { get; set; } = null!;
        public int Cityid { get; set; }
        public string Pincode { get; set; } = null!;
        public DateOnly Dob { get; set; }

        public virtual City City { get; set; } = null!;
        public virtual User User { get; set; } = null!;
        public virtual ICollection<Eventregistration> Eventregistrations { get; set; }
        public virtual ICollection<Rating> Ratings { get; set; }
    }
}
