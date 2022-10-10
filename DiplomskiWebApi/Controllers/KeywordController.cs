using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace DiplomskiWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KeywordController : ControllerBase
    {
       KeywordsDbContext Context { get; set; }

        public KeywordController(KeywordsDbContext context)
        {
            Context = context;
        }

        // ---------------------------------------- GET KEYWORDS ----------------------------------------------------
        [Route("GetKeywords")]
        [HttpGet]
        public async Task<ActionResult> GetKeywords()
        {
            try
            {
                return Ok(await Context.Keyword.ToListAsync());
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // ---------------------------------------- TRACK KEYWORD ----------------------------------------------------
        [EnableCors("CORS")]
        [Route("TrackKeyword/{keywordFromInput}/{lPriceFromInput}/{hPriceFromInput}/{locationFromInput}/{likesFromInput}")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         public async Task<ActionResult> TrackKeyword([FromRoute]string keywordFromInput, [FromRoute] int lPriceFromInput, [FromRoute] int hPriceFromInput, [FromRoute] string locationFromInput, [FromRoute] int likesFromInput)
        {
            try
            {
                var found=Context.Keyword.Where(o=>o.Word==keywordFromInput).FirstOrDefault();
                if(found==null)
                {
                    var newKeyword=new Keyword{
                        Word=keywordFromInput.ToLower(),
                        LowestPrice=lPriceFromInput,
                        HighestPrice=hPriceFromInput,
                        Location=locationFromInput,
                        MinNumOfLikes=likesFromInput
                    };
                        
                    Context.Keyword.Add(newKeyword);
                    await Context.SaveChangesAsync();
                    return Ok($"Keyword added!");
                }
                else return BadRequest($"Keyword already exsists!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       
        // --------------------------------------- UNTRACK KEYWORD ----------------------------------------------------
        [Route("UntrackKeyword/{keywordFromDelete}")]
        [HttpDelete]
        public async Task<ActionResult> UntrackKeyword(string keywordFromDelete)
            {
                try
                {
                    if(keywordFromDelete!=null)
                    {
                        var keyword = await Context.Keyword.Where(k=>k.Word==keywordFromDelete).FirstOrDefaultAsync();

                        if(keyword!=null)
                        {
                            Context.Keyword.Remove(keyword);
                            await Context.SaveChangesAsync();
                            return Ok($"Keyword untracked!");
                        }
                        else return BadRequest("This keyword does not exsist");
                    }
                    else return BadRequest("Enter some keyword!");
                }
                catch (Exception e)
                {
                    return BadRequest(e.Message);
                }
            }
        }
}
