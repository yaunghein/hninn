export const WEBHOOK_FILTER = /* groq */ `_type in [
  "homePage",
  "conceptPage",
  "eventsPage",
  "galleryPage",
  "contactPage",
  "navbar",
  "footer"
]`

export const WEBHOOK_PROJECTION = /* groq */ `{
  _type,
  "paths": select(
    _type == "homePage" => ["/"],
    _type == "conceptPage" => ["/concept"],
    _type == "eventsPage" => ["/events"],
    _type == "galleryPage" => ["/gallery"],
    _type == "contactPage" => ["/contact"],
    _type == "footer" => ["/", "/contact"],
    _type == "navbar" => ["/", "/concept", "/events", "/gallery", "/contact"],
    []
  ),
  "layout": _type == "navbar"
}`
