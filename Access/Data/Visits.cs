using System;

namespace neighborhood
{
    class Visits : Entity
    {
        public string Name { get; set; }
        public string Phone { get; set; } 
        public string DPI { get; set; }
        public Profile Profile { get; set; }
        public Guid ProfileId { get; set; }
        public DateTime Date { get; set; }
    }
}