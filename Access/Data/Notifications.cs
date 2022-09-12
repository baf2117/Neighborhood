using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace neighborhood
{
    class Notifications : Entity
    {
        public Profile Profile { get; set; }
        public Guid ProfileId { get; set; }
        public string Description { get; set; }
    }
}