using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class KeywordsDbContext : DbContext
    {
        public DbSet <Keyword> Keyword {get;set;}
        public DbSet <KeywordOccurrence> KeywordOccurrence {get;set;}
   
        public KeywordsDbContext(DbContextOptions<KeywordsDbContext> options) : base(options)
        {

        }
    }
}
