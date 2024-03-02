namespace Chat_Backend.Models.Backend
{
    public class Account
    {
        public Guid Id { get; set; }
        public required string HashPassword { get; set; }
        public required string Salt { get; set; }
        public required string Login { get; set; }
        public required string Email { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string City { get; set; }
        public required int Age { get; set; }
        public required string Bio { get; set; }
        public required List<string> SocialMediaUrls { get; set; } = new List<string>();
        public required List<string> Specializations { get; set; } = new List<string>();
    }
}