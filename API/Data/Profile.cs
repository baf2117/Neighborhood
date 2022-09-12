namespace neighborhood
{
    public class Profile : Entity
    {

        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }
        public string Address { get; set; }
        public int Flags { get; set; }
        public string Phone { get; set; }
    }
}