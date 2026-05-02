# Geoapify as the Nearby places and routing provider

The Nearby feature shows the closest parks and malls to a caregiver's current
location with walking or driving travel time, and is intended to grow into
public transport later. We chose Geoapify (free tier, server-side only) because
it provides OpenStreetMap-backed Places, Routing, and Public Transit APIs
behind a single key, which keeps v1 cheap, lets us avoid running our own
Overpass/OSRM/OpenTripPlanner stack, and gives us a credible upgrade path for
transit without replacing the integration. The trade-offs are an external
dependency, a daily request quota, and required attribution to Geoapify and
OpenStreetMap contributors on the Nearby surface.

## Considered alternatives

- **Direct OpenStreetMap Overpass + OSRM**: free and key-less, but Overpass
  asks consumers not to hit it heavily from production, and we would still need
  a separate transit story (OpenTripPlanner with city GTFS feeds) when we
  expand. Higher operational cost for v1 with no clear win.
- **Google / HERE Places + Routing**: best-in-class transit and routing
  coverage, but the pricing model is a real future cost risk for a hobby-scale
  baby app, and Google's terms restrict caching and storage of results.

## Consequences

- The user's exact GPS coordinates are sent to Geoapify on every Nearby
  request. We never persist them in our database.
- The provider's category IDs (`leisure.park`, `commercial.shopping_mall`) and
  routing modes (`walk`, `drive`) are leaking into our server code; if we
  swap providers we will need a thin mapping layer.
- Attribution to Geoapify and OpenStreetMap contributors is required wherever
  Nearby results are displayed.
