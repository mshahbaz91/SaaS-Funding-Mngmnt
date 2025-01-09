using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.Mvc;
using System.Security.Principal;
using HFund.Data.Models;
using HFund.Repository;

namespace HFund.Web.Filters
{

   // https://www.mindstick.com/Articles/1123/session-management-in-asp-dot-net-mvc

   // http://stackoverflow.com/questions/1490879/detecting-session-expiry-on-asp-net-mvc

    public class SessionExpire : ActionFilterAttribute
    {

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;
           
           
            // check if session is supported
            if (ctx.Session != null)
            {
                // check if a new session id was generated
                if (ctx.Session.IsNewSession)
                {
                    
                    // If it says it is a new session, but an existing cookie exists, then it must
                    // have timed out
                    string sessionCookie = ctx.Request.Headers["Cookie"];
                    if (( sessionCookie != null) && (sessionCookie.IndexOf("ASP.NET_SessionId") >= 0))
                    {
                    
                        if (ctx.Request.IsAuthenticated)
                        {
                            FormsAuthentication.SignOut();
                        }

                        filterContext.Result = new RedirectToRouteResult(
                             new System.Web.Routing.RouteValueDictionary
                             {
                                 {"action", "SignIn" },
                                 {"controller", "Home" },
                                 {"returnUrl", filterContext.HttpContext.Request.RawUrl }
                             });
                    }
                }
            }

            base.OnActionExecuting(filterContext);
        }

    }

}