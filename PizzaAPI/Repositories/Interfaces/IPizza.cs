using PizzaEntities;
using System.Collections.Generic;

namespace PizzaAPI.Repositories.Interfaces
{
    public interface IPizza
    {
        IEnumerable<Toppings> GetPizzaToppings();

        IEnumerable<NonPizza> GetNonPizzaItemsWithPrice();

        void AddOrder(Order order);
    }
}
