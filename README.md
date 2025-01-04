# Treasury App

A simple app that pulls data on treasury yields, and displays the yield curve for the day. Users can also simulate placing orders for specific treasuries.

## Running the app

1. Install [uv](https://docs.astral.sh/uv/getting-started/installation/#installing-uv). This is the Python package manager / project manager that I used while building this. (Let me know if you prefer not to install this - uv has pretty good compatibility with other Python tools, so it wouldn't be much work for me to write up how to run the app without it.)
1. Run `uv run -- flask run` to start the Flask server. Make sure it's running on port 5000, which it should by default, unless you have something else running on that port. If you can't use port 5000, you'll need to change the port that the frontend proxies to in [ui/vite.config.ts](ui/vite.config.ts).
1. From the ui directory, run `npm install`, then `npm run dev` to start the UI server. This should output a link (likely something like `http://localhost:5173`) that you can use to check out the app in your browser.

## Assumptions made

These are some of the assumptions I made while working on the project.

- We only need to show the most recent day of yield data in the UI. This was mostly made for the sake of simplicity, but for a production version of something like this, you likely would want to be able to walk through historical yield data in the UI. This would be straightforward enough to add onto the existing code.
- We should force orders for treasuries to be in whole dollar amounts. Again, this was mostly motivated by simplicity, and would be straightforward to change. I also saw on Treasury Direct that Treasury Bond orders have to be made in increments of $100, I think, so my assumption seemed reasonable.
- We don't need persistent users / authentication. This seemed out of scope for the time limit imposed on this project, but again is something that would likely be wanted in a production version.
- I kept the caching very simple, so data from the Treasury site would persist unless the Flask server was restarted. This was helpful during development and saved me some time. Again, for a production version, it would probably make sense to use a persistent cache independent from the server.
- We don't need to persist the orders that are created in the UI. Again, this assumption was made for simplicity, and would need to change for a production version.
- We can use this [par yield data](https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value_month=202501). This was confirmed by Alex before I started building.

## Potential improvements

These are some potential improvements that could be made to the project. Most of these mirror the assumptions above.

- Historical yield data.
- User authentication.
- Improved persistent caching.
- Persistence of orders, probably in a DB.
- More UI polish, might also make sense to have a separate page for orders vs. yield data.
- Timezone aware timestamps for orders in the UI.