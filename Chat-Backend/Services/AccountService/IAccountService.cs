using Chat_Backend.Models.Backend;

namespace Chat_Backend.Services.AccountService
{
    public interface IAccountService : IService<Account>
    {
        public Task<Account?> GetAccountByLoginAsync(string login);
        public Task<Tokens> RefreshTokens(Account account);
    }
}