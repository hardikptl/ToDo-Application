using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    /// <summary>
    /// ToDo Model with three properties.
    /// </summary>
    public class ToDoModel
    {   
        [Key]
        public int ID { get; set; }

 
        [Required(ErrorMessage ="Please Enter Task")]
        public string Title { get; set; }


        public bool Completed { get; set; }

    }
}
