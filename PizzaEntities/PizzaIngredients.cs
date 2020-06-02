using System;
using System.Collections.Generic;
using System.Text;

namespace PizzaEntities
{
    public class PizzaIngredients
    {
        public int PizzaIngredientId { get; set; }
        public int PizzaId { get; set; }
        public int IngredientId { get; set; }
    }
}
