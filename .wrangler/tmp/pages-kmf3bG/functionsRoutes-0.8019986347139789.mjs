import { onRequestOptions as __api_leads_presence_score_js_onRequestOptions } from "C:\\Users\\thouf\\Downloads\\DudeX-smart-academy-main\\functions\\api\\leads\\presence-score.js"
import { onRequestPost as __api_leads_presence_score_js_onRequestPost } from "C:\\Users\\thouf\\Downloads\\DudeX-smart-academy-main\\functions\\api\\leads\\presence-score.js"

export const routes = [
    {
      routePath: "/api/leads/presence-score",
      mountPath: "/api/leads",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_leads_presence_score_js_onRequestOptions],
    },
  {
      routePath: "/api/leads/presence-score",
      mountPath: "/api/leads",
      method: "POST",
      middlewares: [],
      modules: [__api_leads_presence_score_js_onRequestPost],
    },
  ]