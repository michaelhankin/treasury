from flask import Flask
import requests
from datetime import datetime
from dateutil.relativedelta import relativedelta

app = Flask(__name__)

# We cache the yields per day.
yield_cache = {}

def fetch_yields(date: str):
    # The URL and params were grabbed by copying the 'Download CSV' link here:
    # https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve
    url = f"https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/all/{date}"
    params = {
        "type": "daily_treasury_yield_curve",
        "field_tdr_date_value_month": date,
        "_format": "csv"
    }
    res = requests.get(url, params)
    res.raise_for_status()
    return res

@app.route("/yields")
def yields():
    today = datetime.now().strftime("%Y%m%d")
    if today in yield_cache:
        return yield_cache[today]

    # This is the format that the Treasury site requires.
    date = datetime.now().strftime("%Y%m")
    yields_res = fetch_yields(date)

    # When the response is empty, that means there's no data for this month yet.
    # It could be that the start of the month falls on a weekend / holiday.
    # In any case, when this happens we fall back to the previous month.
    if yields_res.text == "":
        one_month_ago = datetime.now() - relativedelta(months=1)
        date = one_month_ago.strftime("%Y%m")
        yields_res = fetch_yields(date)

    data = yields_res.text.split("\n")
    # We only return the yields from the most recent day.
    headers, data = data[0].split(","), data[1].split(",")
    yields = {
        headers[0]: data[0],
        # The terms are ordered by term length ascending, same with the yields.
        "Terms": [t.strip('"') for t in headers[1:]],
        "Yields": [float(y) for y in data[1:]]
    }

    yield_cache[today] = yields
    return yields
