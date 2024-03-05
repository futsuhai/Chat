using Chat_Backend.Models.Backend;
using Chat_Backend.Models.Frontend;

namespace Chat_Backend.Services.AccountService
{
    public interface IAccountService : IService<Account>
    {
        public Task<Account?> GetAccountByLoginAsync(string login);
        public Task<Tokens> RefreshTokens(Account account);
        public Task<Error> RegistrationValidation(string control);
    }
}