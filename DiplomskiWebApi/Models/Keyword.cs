using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Keyword
    {
        [Key]
        [Required]
        public string Word {get;set;}

        public int LowestPrice {get;set;}

        public int HighestPrice {get;set;}

        public string Location {get;set;}

        public int MinNumOfLikes {get;set;}


    }
}