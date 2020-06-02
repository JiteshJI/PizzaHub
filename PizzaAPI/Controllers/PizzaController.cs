using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PizzaEntities;
using PizzaAPI.Repositories.Interfaces;

namespace PizzaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {

        private readonly IPizza _pizza;
        //Implemented DI
        public PizzaController(IPizza pizza)
        {
            _pizza = pizza;
        }
        // GET: api/GetIngredientsWithPrice

        [HttpGet(Name = "GetIngredientsWithPrice")]
        [Route("GetIngredientsWithPrice")]
        public IEnumerable<Toppings> GetIngredientsWithPrice()
        {
            return _pizza.GetPizzaToppings();
        }

        [HttpGet(Name = "GetNonPizzaItems")]
        [Route("GetNonPizzaItems")]
        public IEnumerable<NonPizza> GetNonPizzaItems()
        {
            return _pizza.GetNonPizzaItemsWithPrice();
        }

        [HttpPost]
        [Route("AddOrder")]
        [System.Obsolete]
        public IActionResult AddOrder([FromBody] Order orderObj)
        {
            _pizza.AddOrder(orderObj);
            return Ok();
        }
    }
}
