"""One-off: fetch project titles from taeilcnt order_list.jsp (EUC-KR)."""
from __future__ import annotations

import pathlib
import re
import urllib.request

LIST_URL = "http://www.taeilcnt.co.kr/home/order/order_list.jsp"
PATTERN = re.compile(
    r'<h3><a href="/home/order/order_view\.jsp\?b_seq=\d+">([^<]+)</a></h3>'
)


def fetch_page(pg: int) -> str:
    body = f"pg={pg}&type_kind=&b_seq=&view_yn=Y".encode("ascii")
    req = urllib.request.Request(
        LIST_URL,
        data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    raw = urllib.request.urlopen(req).read()
    return raw.decode("euc-kr")


def main() -> None:
    all_titles: list[str] = []
    for pg in range(1, 15):
        html = fetch_page(pg)
        titles = PATTERN.findall(html)
        if not titles:
            break
        print(f"page {pg}: {len(titles)} items")
        all_titles.extend(titles)

    out = pathlib.Path("_order_titles.txt")
    out.write_text("\n".join(f"{i + 1}. {t}" for i, t in enumerate(all_titles)), encoding="utf-8")
    print("total", len(all_titles), "->", out.resolve())


if __name__ == "__main__":
    main()
