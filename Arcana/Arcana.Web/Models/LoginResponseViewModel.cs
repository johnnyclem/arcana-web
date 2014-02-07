namespace Arcana.Web.Models
{
    public class LoginResponseViewModel
    {
        public bool IsAuthenticated { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
    }
}