using Chat_Backend.Models.Backend;
using Chat_Backend.Models.Options;
using Chat_Backend.Repositories.AccountRepository;

namespace Chat_Backend.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly JwtOptions _jwtOptions;

        public AccountService
        (
            IAccountRepository accountRepository,
            JwtOptions jwtOptions
        )
        {
            _accountRepository = accountRepository;
            _jwtOptions = jwtOptions;
        }

        public async Task<Account?> GetAccountByLoginAsync(string login)
        {
            var accounts = await _accountRepository.GetAllAsync();
            var account = accounts.FirstOrDefault(a => a.Login == login);
            if (account == null)
            {
                return null;
            }
            return account;
        }

        public async Task<Tokens> RefreshTokens(Account account)
        {
            var tokens = _jwtOptions.GetJwtTokens(account.Login);
            account.Tokens = tokens;
            await UpdateAsync(account.Id, account);
            return account.Tokens;
        }

        public async Task<IList<Account>> GetAllAsync() =>
            await _accountRepository.GetAllAsync();

        public async Task<Account> GetAsync(Guid id) =>
            await _accountRepository.GetAsync(id);

        public async Task DeleteAsync(Guid id) =>
            await _accountRepository.DeleteAsync(id);

        public async Task UpdateAsync(Guid id, Account item) =>
            await _accountRepository.UpdateAsync(id, item);

        public async Task CreateAsync(Account item) =>
            await _accountRepository.CreateAsync(item);
    }
}