using Chat_Backend.Models.Backend;
using Chat_Backend.Models.Options;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Chat_Backend.Repositories.AccountRepository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IMongoCollection<Account> _accountsCollection;

        public AccountRepository(IOptions<DatabaseOptions> ChatDatabaseSettings)
        {
            var mongoClient = new MongoClient(ChatDatabaseSettings.Value.ConnectionString);
            var database = mongoClient.GetDatabase(ChatDatabaseSettings.Value.DatabaseName);
            _accountsCollection = database.GetCollection<Account>(ChatDatabaseSettings.Value.AccountsCollectionName);
        }

        public async Task CreateAsync(Account item) =>
            await _accountsCollection.InsertOneAsync(item);

        public async Task DeleteAsync(Guid id) =>
            await _accountsCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<IList<Account>> GetAllAsync() =>
            await _accountsCollection.Find(_ => true).ToListAsync();

        public async Task<Account> GetAsync(Guid id) =>
            await _accountsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task UpdateAsync(Guid id, Account item) =>
            await _accountsCollection.ReplaceOneAsync(x => x.Id == id, item);
    }
}