export enum AppRoutes {
  // public
  HOME = "/",
  AUTH = "auth",
  AUTH_LOGIN = "/auth/login",
  AUTH_REGISTER = "/auth/register",
  PRIVACY_POLICY = "/privacy-policy",
  ABOUT_TARGET = "/about-target",
  NOT_FOUND = "*",
  // private user
  USER = "user",
  REQUEST = "/user/request",
  PRICING_PLAN_REQUEST = "/user/pricing-plans",
  PRICING_PLANS = "/user/pricing-plans",
  PRICING_PLAN = "/user/pricing-plan",
  // private admin
  ADMIN = "/admin",
}
