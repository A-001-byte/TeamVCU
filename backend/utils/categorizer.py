def auto_categorize(merchant: str) -> str:
    if not merchant:
        return "Uncategorized"

    m = merchant.lower()

    rules = {
        "food": ["zomato", "swiggy", "ubereats", "restaurant", "cafe"],
        "shopping": ["amazon", "flipkart", "myntra", "ajio"],
        "transport": ["uber", "ola", "rapido", "metro", "bus"],
        "entertainment": ["netflix", "spotify", "prime", "hotstar"],
        "utilities": ["electricity", "water", "gas", "recharge"],
        "health": ["pharmacy", "apollo", "hospital", "clinic"],
        "income": ["salary", "credited", "payroll"]
    }

    for category, keywords in rules.items():
        for keyword in keywords:
            if keyword in m:
                return category.capitalize()

    return "Other"
