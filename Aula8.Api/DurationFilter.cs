using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;
using System.Runtime.CompilerServices;

namespace Aula8.Api
{
    public class DurationFilter : Attribute, IActionFilter
    {
        private static Stopwatch stopwatch = new Stopwatch();
        public void OnActionExecuted(ActionExecutedContext context)
        {
            stopwatch.Stop();
            context.HttpContext.Response.Headers.Add("Duration", stopwatch.Elapsed.ToString());
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            stopwatch.Start();
        }
    }
}
