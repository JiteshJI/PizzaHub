using System;
using System.Collections.Generic;
using System.Text;

namespace PizzaEntities
{
    public class Pizza
    {
        public int Price { get; set; }
        public int Size { get; set; }
        public List<Toppings> Toppings { get; set; }
        public int TotalPrice { get; set; }
    }
}
