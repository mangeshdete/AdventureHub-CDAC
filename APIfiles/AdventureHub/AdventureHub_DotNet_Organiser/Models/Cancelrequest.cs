using System;
using System.Collections.Generic;

namespace AdventureHub.Models
{
    public partial class Cancelrequest
    {
        public int Id { get; set; }
        public int Publishid { get; set; }
        public string FromStatus { get; set; } = null!;
        public string? ToStatus { get; set; }
        public string? CancellationReason { get; set; }

        public virtual Publishevent Publish { get; set; } = null!;
    }
}
