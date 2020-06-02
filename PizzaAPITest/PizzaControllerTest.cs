using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using PizzaEntities;
using System.Collections.Generic;

namespace PizzaAPITest
{
    [TestClass]
    public class PizzaControllerTest
    {
        [TestMethod]
        public void TestGetPizzaToppings()
        {
            //Mock
            var mockToppings = new List<Toppings>();
            mockToppings.Add(new Toppings { Selected = false, Name = "Pepperon 1", Price = 5 });
            mockToppings.Add(new Toppings { Selected = false, Name = "Pepperon 2", Price = 3 });
            
            var pizzaRepositoryMock = TestInitializer.MockPizzaRepository;
            
            // Act
            pizzaRepositoryMock.Setup(x => x.GetPizzaToppings()).Returns(mockToppings);

            //Assert
            var response = TestInitializer.TestHttpClient.GetAsync("https://localhost:44301/api/Pizza/GetIngredientsWithPrice").Result;
            var resp = response.Content.ReadAsStringAsync().Result;
            var responseData = JsonConvert.DeserializeObject<List<Toppings>>(resp);
            Assert.AreEqual(mockToppings[0].Name, responseData[0].Name);
        }

        [TestMethod]
        public void TestGetGetNonPizzaItemsWithPrice()
        {
            //Mock
            var mockToppings = new List<NonPizza>();
            mockToppings.Add(new NonPizza { Selected = false, Name = "Pepperon 1", Price = 5 });
            mockToppings.Add(new NonPizza { Selected = false, Name = "Pepperon 2", Price = 3 });

            var pizzaRepositoryMock = TestInitializer.MockPizzaRepository;

            // Act
            pizzaRepositoryMock.Setup(x => x.GetNonPizzaItemsWithPrice()).Returns(mockToppings);

            //Assert
            var response = TestInitializer.TestHttpClient.GetAsync("https://localhost:44301/api/Pizza/GetIngredientsWithPrice").Result;
            var resp = response.Content.ReadAsStringAsync().Result;
            var responseData = JsonConvert.DeserializeObject<List<Toppings>>(resp);
            Assert.AreEqual(mockToppings[0].Name, responseData[0].Name);
        }

        [TestMethod]
        public void TestAddOrder()
        {
            //Mock
            var mockOrder = new Order { CustomerDetails = null, Pizzas = null, TotalPrice = 0 };
            var pizzaRepositoryMock = TestInitializer.MockPizzaRepository;

            // Act
            pizzaRepositoryMock.Setup(x => x.AddOrder(mockOrder));

            //Assert
            var response = TestInitializer.TestHttpClient.GetAsync("https://localhost:44301/api/Pizza/AddOrder").Result;
            Assert.AreEqual(402, response.StatusCode);
        }
    }
}
