using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Arcana.Web.Models;
using AttributeRouting.Web.Mvc;
using WebMatrix.WebData;
using System.Web.Security;
using Arcana.Framework.Encryption;

namespace Arcana.Web.Controllers
{
    public class AuthController : BaseApiController
    {
        private readonly ArcanaEntities _db;
        private readonly IEncryptionService _encryptionService;

        public AuthController(IEncryptionService encryptionService)
        {
            _db = new ArcanaEntities();
            _encryptionService = encryptionService;
        }

        [HttpPost]
        public HttpResponseMessage Login(LoginModel model)
        {
            var dbUser = _db.Users.SingleOrDefault(u => u.UserName == model.UserName);
            if (dbUser != null)
            {
                var passwordHash = _encryptionService.CreateHash(model.Password, dbUser.Salt);
                if (passwordHash == dbUser.PasswordHash)
                {
                    var response = new LoginResponseViewModel
                    {
                        IsAuthenticated = true,
                        Username = dbUser.UserName,
                        Role = dbUser.UserRole
                    };
                    return Success(response);
                }

                return Error("Invalid credentials");
            }
            return Error("Invalid credentials");
        }

        [HttpPost]
        public HttpResponseMessage Logout()
        {
            return Success();
        }

        [HttpPost]
        public HttpResponseMessage Register(RegisterModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return Error("Passwords must match");
            }

            var policyTest = _encryptionService.TestPasswordPolicy(model.Password);
            if (string.IsNullOrEmpty(policyTest))
            {
                var salt = _encryptionService.GenerateSalt();
                var passwordHash = _encryptionService.CreateHash(model.Password, salt);
                var user = new User
                {
                    ID = Guid.NewGuid(),
                    PasswordHash = passwordHash,
                    Salt = salt,
                    UserName = model.UserName,
                    UserRole = "User"
                };

                _db.Users.Add(user);
                _db.SaveChanges();

                var response = new LoginResponseViewModel
                {
                    IsAuthenticated = true,
                    Username = user.UserName,
                    Role = user.UserRole
                };
                return Success(response);
            }

            return Error(policyTest);
        }
    }
}