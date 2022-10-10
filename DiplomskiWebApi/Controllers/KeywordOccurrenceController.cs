using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.EntityFrameworkCore;
using System.Text;
using KafkaNet;
using KafkaNet.Model;
using Confluent.Kafka;

namespace DiplomskiWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KeywordOccurrenceController : ControllerBase
    {
       KeywordsDbContext Context { get; set; }

        public KeywordOccurrenceController(KeywordsDbContext context)
        {
            Context = context;
        }

        [Route("GetKeywordOccurrences")]
        [HttpGet]
        public async Task<ActionResult> GetKeywordOccurrences()
        {
            try
            {
               return Ok(await Context.KeywordOccurrence.ToListAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

       
    }
}

