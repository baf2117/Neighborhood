using System.Text.Json.Serialization;
using System;

namespace neighborhood
{
    public class VisitsUpdateModel
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("dPI")]
        public string Email { get; set; }

        [JsonPropertyName("phone")]
        public string Phone { get; set; }

        [JsonPropertyName("date")]
        public DateTime Date { get; set; }
    }

    public class VisitsModel
    {
        [JsonPropertyName("Name")]
        public string Name { get; set; }

        [JsonPropertyName("DPI")]
        public string DPI { get; set; }

        [JsonPropertyName("Phone")]
        public string Phone { get; set; }

        [JsonPropertyName("Date")]
        public DateTime Date { get; set; }
    }
}