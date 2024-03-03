using Chat_Backend.Models.Backend;
using Chat_Backend.Repositories.AccountRepository;

namespace Chat_Backend.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;

        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
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