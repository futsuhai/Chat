using AutoMapper;
using Chat_Backend.Models.Backend;
using Chat_Backend.Models.Frontend;
using Chat_Backend.Models.Options;
using Chat_Backend.Services.AccountService;
using Microsoft.AspNetCore.Mvc;

namespace Chat_Backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly CryptoOptions _cryptoOptions;
        private readonly JwtOptions _jwtOptions;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            IAccountService accountService,
            IMapper mapper,
            CryptoOptions cryptoOptions,
            JwtOptions jwtOptions,
            ILogger<AuthController> logger
        )
        {
            _accountService = accountService;
            _mapper = mapper;
            _cryptoOptions = cryptoOptions;
            _jwtOptions = jwtOptions;
            _logger = logger;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] AccountAuthModel accountAuthModel)
        {
            var salt = _cryptoOptions.GenerateSalt();
            var hashPassword = _cryptoOptions.GenerateHashPassword(accountAuthModel.Password, salt);
            var tokens = _jwtOptions.GetJwtTokens(accountAuthModel.Login);
            var account = new Account(accountAuthModel, Convert.ToBase64String(salt), Convert.ToBase64String(hashPassword), tokens);
            await _accountService.CreateAsync(account);
            var accountModel = _mapper.Map<AccountModel>(account);
            return Ok(accountModel);
        }

        [HttpPut("Auth")]
        public async Task<IActionResult> Login([FromBody] AccountAuthModel accountAuthModel)
        {
            var account = await _accountService.GetAccountByLoginAsync(accountAuthModel.Login);
            if (account == null)
            {
                return Unauthorized();
            }
            var hashPassword = _cryptoOptions.GenerateHashPassword(accountAuthModel.Password, Convert.FromBase64String(account.Salt));
            if (Convert.ToBase64String(hashPassword) == account.HashPassword)
            {
                var tokens = _jwtOptions.GetJwtTokens(account.Login);
                account.Tokens = tokens;
                await _accountService.UpdateAsync(account.Id, account);
                var loginedAccount = _mapper.Map<AccountModel>(account);
                return Ok(loginedAccount);
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}