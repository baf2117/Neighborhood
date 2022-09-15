using System.Text.Json.Serialization;

namespace neighborhood
{
    public class ProfileUpdateModel
    {

        [JsonPropertyName("userId")]
        public string UserId { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("lastname")]
        public string LastName { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("address")]
        public string Address { get; set; }

        [JsonPropertyName("phone")]
        public string Phone { get; set; }

        [JsonPropertyName("enable")]
        public bool Enable { get; set; }

        [JsonPropertyName("admin")]
        public bool Admin { get; set; }
    }
}