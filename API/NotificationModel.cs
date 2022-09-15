using System.Text.Json.Serialization;
using System;

namespace neighborhood
{
    public class NotificationModel
    {
        [JsonPropertyName("description")]
        public string Description { get; set; }
    }
}