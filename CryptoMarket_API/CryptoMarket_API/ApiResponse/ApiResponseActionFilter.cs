using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CryptoMarket_API.ApiResponse
{
    public class ApiResponseActionFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            ApiResponse<object> response = new ApiResponse<object>();
            context.HttpContext.Items["ApiResponse"] = response;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception != null)
            {
                // Manejar la excepción y reemplazar el resultado con uno nuevo
                var apiResponse = new ApiResponse<object>
                {
                    Error = context.Exception.Message
                };

                context.Result = new ObjectResult(apiResponse) { StatusCode = 500 };
                context.ExceptionHandled = true;
            }
            else if (context.Result is ObjectResult objectResult)
            {
                var apiResponse = new ApiResponse<object>
                {
                    Data = objectResult.Value
                };

                context.Result = new ObjectResult(apiResponse) { StatusCode = objectResult.StatusCode };
            }
        }
    }

}
