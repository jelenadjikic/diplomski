
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class KeywordOccurrence
    {
        [Key]
        public int ID{get;set;}

        [Required]
        public string Word {get;set;}

        [Required]
        public string AuthorName {get;set;}

        [Required]
        public string Title {get;set;}

        [Required]
        public string Text {get;set;}

        [Required]
        public int Price {get;set;}

        [Required]
        public string Location {get;set;}

        [Required]
        public string ContactNumber {get;set;}

        [Required]
        public string Email {get;set;}

        [Required]
        public string Link {get;set;}
        
        [Required]
        public int Likes {get;set;}

        [Required]
        public string Sentiment {get;set;}

        [Required]
        public DateTime Date {get;set;}
    
    }
}