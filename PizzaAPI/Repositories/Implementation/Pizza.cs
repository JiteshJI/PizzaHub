using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Nancy.Json;
using PizzaAPI.Repositories.Interfaces;
using PizzaEntities;
using System.Collections.Generic;
using System.IO;

namespace PizzaAPI.Repositories.Implementation
{
    public class Pizza : IPizza
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public Pizza(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        public void AddOrder(Order orderObj)
        {
            var json = new JavaScriptSerializer().Serialize(orderObj);
            var path = Path.Combine(_hostingEnvironment.ContentRootPath + "/App_Data", "Data.txt");

            // This text is added only once to the file.
            if (!File.Exists(path))
            {
                // Create a file to write to.
                using StreamWriter sw = File.CreateText(path);
                sw.WriteLine(json);
            }
            else
            {
                using StreamWriter sw = File.AppendText(path);
                sw.WriteLine(json);
            }
        }

        public IEnumerable<NonPizza> GetNonPizzaItemsWithPrice()
        {
            var NonPizzaItems = new List<NonPizza>();
            NonPizzaItems.Add(new NonPizza { Selected = false, Name = "Coke", Price = 1 });
            NonPizzaItems.Add(new NonPizza { Selected = false, Name = "Diet Coke", Price = 3 });
            NonPizzaItems.Add(new NonPizza { Selected = false, Name = "Ice Tea", Price = 4 });
            NonPizzaItems.Add(new NonPizza { Selected = false, Name = "Onion Rings", Price = 2 });
            NonPizzaItems.Add(new NonPizza { Selected = false, Name = "Ground Beef", Price = 7 });
            NonPizzaItems.Add(new NonPizza { Selected = false, Name = "Root Beer", Price = 5 });
            NonPizzaItems.Add(new NonPizza { Selected = false, Name = "Water", Price = 8 });
            NonPizzaItems.Add(new NonPizza { Selected = false, Name = "Dried Shrimps", Price = 5 });
            NonPizzaItems.Add(new NonPizza { Selected = false, Name = "Garlic Dip", Price = 4 });
            return NonPizzaItems;
        }

        public IEnumerable<Toppings> GetPizzaToppings()
        {
            var ingredientList = new List<Toppings>();
            ingredientList.Add(new Toppings { Selected = false, Name = "Pepperoni", Price = 5 });
            ingredientList.Add(new Toppings { Selected = false, Name = "Extra Cheese", Price = 3 });
            ingredientList.Add(new Toppings { Selected = false, Name = "Mushroom", Price = 3 });
            ingredientList.Add(new Toppings { Selected = false, Name = "Ham", Price = 4 });
            ingredientList.Add(new Toppings { Selected = false, Name = "Bacon", Price = 2 });
            ingredientList.Add(new Toppings { Selected = false, Name = "Ground Beef", Price = 7 });
            ingredientList.Add(new Toppings { Selected = false, Name = "Jalapeno", Price = 5 });
            ingredientList.Add(new Toppings { Selected = false, Name = "Pineapple", Price = 8 });
            ingredientList.Add(new Toppings { Selected = false, Name = "Dried Shrimps", Price = 5 });
            ingredientList.Add(new Toppings { Selected = false, Name = "Spinach", Price = 4 });
            ingredientList.Add(new Toppings { Selected = false, Name = "Roasted Garlic", Price = 2 });
            return ingredientList;
        }
    }
}
