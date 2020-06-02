using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using PizzaAPI.Repositories.Interfaces;
using System.Net.Http;

namespace PizzaAPITest
{
    [TestClass]
    public class TestInitializer
    {
        public static HttpClient TestHttpClient;
        public static Mock<IPizza> MockPizzaRepository;

        [AssemblyInitialize]
        public static void InitializeTestServer(TestContext testContext)
        {
            var testServer = new TestServer(new WebHostBuilder()
               .UseStartup<TestStartup>()
               .UseEnvironment("IntegrationTest"));

            TestHttpClient = testServer.CreateClient();
        }

        public static void RegisterMockRepositories(IServiceCollection services)
        {
            MockPizzaRepository = (new Mock<IPizza>());
            services.AddSingleton(MockPizzaRepository.Object);
        }
    }
}
