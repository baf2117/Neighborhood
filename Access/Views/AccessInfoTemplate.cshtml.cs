using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace neighborhood.Views
{
    public class AccessInfoTemplateModel : PageModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string DPI { get; set; }
        public Profile Profile { get; set; }
        public Guid ProfileId { get; set; }
        public String Date { get; set; }
        public string Address { get; set; }
        public string Url { get; set; }
    }
}