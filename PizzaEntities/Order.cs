using System;
using System.Collections.Generic;
using System.Text;

namespace PizzaEntities
{
    public class Order
    {
        public CustomerDetails CustomerDetails { get; set; }
        public List<Pizza> Pizzas { get; set; }
        public int TotalPrice { get; set; }
    }
}
