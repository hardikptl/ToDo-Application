using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{

    /// <summary>
    /// ToDoContext class to store data 
    /// </summary>
    public class ToDoContext : DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// adding todomodel to dbcontext
        /// </summary>
        public DbSet<ToDoModel> ToDoTable { get; set; }
    }
}
